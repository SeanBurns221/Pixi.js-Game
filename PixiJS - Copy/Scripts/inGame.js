class InGame
{
    constructor()
    {
        this._numOfTrees = 20;
        this._allTrees = [];
    }

    setup()
    {
        this._player = new Player(gameScene, "images/player.png", 1, WIDTH / 1.9, HEIGHT / 4);
        this._player.scale.set(0.6);

                //create trees
        for(var i = 0; i < this._numOfTrees; i++)
        {
            let tree = new Tree(gameScene, "images/tree2.png", 3);
            tree.scale.set(0.7);
            this._allTrees.push(tree);
        }

        let style = new PIXI.TextStyle(
        {
            fontFamily: 'Century Gothic',
            fontSize: 40,
            fill: 0x8ed1db,
            align: 'center'
        });

        // create score text
        this._scoreText = new PIXI.Text('0', style);
        this._scoreText.anchor.set(0.5);
        this._scoreText.position.set(WIDTH / 2, HEIGHT / 13);
        gameScene.addChild(this._scoreText);
    }

    update(delta)
    {
        this._player.update(delta);

        if(this._player.checkOutOfBounds())
        {
            this.OnCollisionHit();
        }

        for (var i = 0; i < this._allTrees.length; i++)
        {
            this._allTrees[i].update();
            if(this.collisionDetection(this._player, this._allTrees[i]))
            {
                console.log("Hit Something");
                this.OnCollisionHit();
            }
        }

        //update the score
        this._scoreText.text = this._player.score;
    }

    OnCollisionHit()
    {
        //change state
        gameScene.visible = false;
        gameOverScene.visible = true;
        state = end;

        //reset player and trees for next play thorugh
        this._player.resetPlayer();
        for(var i = 0; i < this._allTrees.length; i++)
            this._allTrees[i].calcPosition();
    }

    //The `hitTestRectangle` function
    collisionDetection(r1, r2) {
    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
    //hit will determine whether there's a collision
    hit = false;
    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2; 
    r1.centerY = r1.y + r1.height / 2; 
    r2.centerX = r2.x + r2.width / 2; 
    r2.centerY = r2.y + r2.height / 2; 
    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 3;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 5;
    r2.halfHeight = r2.height / 4;
    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;
    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;
    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
      //A collision might be occuring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
        //There's definitely a collision happening
        hit = true;
      } else {
        //There's no collision on the y axis
        hit = false;
      }
    } else {
      //There's no collision on the x axis
      hit = false;
    }
    //`hit` will be either `true` or `false`
    return hit;
  };
}