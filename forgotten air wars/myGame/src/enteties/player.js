export class Player{
    constructor(posX,posY,sprite, speed, lives, borderUp, borderDown, borderLeft, borderRight){
        this.initialX=posX;
        this.initialY=posY;
        this.sprite=sprite
        this.currentSpeed=speed;
        this.lives=lives;
        this.borderUp=borderUp;
        this.borderDown=borderDown;
        this.borderLeft=borderLeft;
        this.borderRight=borderRight;
        this.bulletCleanUp();
        this.makePlayer();
        this.setPlayerControls();
        this.playerShoot();
        this.playerDeath()
    }
    makePlayer(){
        this.playerObj=add([
            rect(100,64),
            color(0,0,0,0),
            anchor("center"),
            pos(this.initialX,this.initialY ),
            "player",
            body(),
            area(),
            opacity(0),
        ])
        this.playerObj.add([
            sprite(this.sprite,{anim:"default"}),
            anchor("center"),
            scale(2)
        ])
    };
    
    playerDeath(){
        let livesUi=add([
            pos(800, 64),
            sprite("lives",{frame:this.lives-1}),
            scale(4),
            anchor("center")
        ])
        const createNewLivesUi=(lives)=>{
            if(lives>0){
               let livesUi=add([
                pos(800, 64),
                sprite("lives",{frame:lives-1}),
                scale(4),
                anchor("center")
            ]); 
            }
            };
        this.playerObj.onCollide("enemy",()=>{
            this.lives--;
            createNewLivesUi(this.lives);
            livesUi.destroy();
            this.playerObj.sprite=sprite(this.sprite,{anim:"damage"});
            
            wait(3,()=>{
                this.playerObj.sprite=sprite(this.sprite,{anim:"default"});
            })
            if(this.lives===0){
                go("gameover")
            }
        })
        this.playerObj.onCollide("transport",()=>{
            this.lives--;
            createNewLivesUi(this.lives);
            livesUi.destroy();
            this.playerObj.sprite=sprite(this.sprite,{anim:"damage"});
            
            wait(3,()=>{
                this.playerObj.sprite=sprite(this.sprite,{anim:"default"});
            })
            if(this.lives===0){
                go("gameover")
            }
        })
        this.playerObj.onCollide("enemyBullet",()=>{
            this.lives--;
            livesUi.destroy()
            createNewLivesUi(this.lives);
            if(this.lives===0){
                go("gameover")
            }
        })
        
    }
    playerShoot(){
        let lastShotTime = 0;
        const shootCooldown = 350; // milliseconds
        onKeyDown("space", () => {
            const now = Date.now();
            if (now - lastShotTime >= shootCooldown) {
                let bullet = add([
                    rect(100,10),
                    pos(this.playerObj.pos.x , this.playerObj.pos.y - 48),
                    area(),
                    body(),
                    "bulletPlayer",
                    opacity(0),
                    anchor("center"),
                    offscreen({destroy:true}),
                ]);
                bullet.add([
                    sprite("i16Bullet"),
                    scale(2),
                    anchor("center")
                ])
                tween(
                    bullet.pos.y,
                    -64-5,
                    1,
                    (val) => bullet.pos.y = val,
                    easings.linear
                );
                bullet.onCollide("enemy",()=>{
                    bullet.destroy()
                })
                bullet.onCollide("transport",()=>{
                    bullet.destroy()
                })
                onDestroy("bulletPlayer",()=>{
                })
                lastShotTime = now;
            }
        });
    }
    bulletCleanUp(){
        loop(2,()=>{
            get("bulletPlayer").forEach(element => {
                if(element.pos.y>1024 || element.pos.y<0){
                    element.destroy();
                }
            });
        });
    }
    setPlayerControls(){
        const diagonalSpeed = this.currentSpeed / Math.sqrt(2);
        this.playerObj.onUpdate(()=>{
            if(isKeyDown("w") && isKeyDown("a")){
                if(this.playerObj.checkCollision(this.borderUp) || this.playerObj.checkCollision(this.borderLeft)){
                    this.playerObj.moveBy(0, 0);
                }else{
                    this.playerObj.moveBy(-diagonalSpeed, -diagonalSpeed);
                }
            } else if(isKeyDown("w") && isKeyDown("d")){
                if(this.playerObj.checkCollision(this.borderUp) || this.playerObj.checkCollision(this.borderRight)){
                    this.playerObj.moveBy(0, 0);
                }else{
                    this.playerObj.moveBy(diagonalSpeed, -diagonalSpeed);
                }
            } else if(isKeyDown("s") && isKeyDown("a")){
                if(this.playerObj.checkCollision(this.borderDown) || this.playerObj.checkCollision(this.borderLeft)){
                    this.playerObj.moveBy(0, 0);
                }else{
                    this.playerObj.moveBy(-diagonalSpeed, diagonalSpeed);
                }
            } else if(isKeyDown("s") && isKeyDown("d")){
                if(this.playerObj.checkCollision(this.borderDown) || this.playerObj.checkCollision(this.borderRight)){
                    this.playerObj.moveBy(0, 0);
                }else{
                    this.playerObj.moveBy(diagonalSpeed, diagonalSpeed);
                }
            } else if(isKeyDown("w")){
                if(this.playerObj.checkCollision(this.borderUp)){
                    this.playerObj.moveBy(0, 0);
                }else{
                    this.playerObj.moveBy(0, -this.currentSpeed);
                }
            } else if(isKeyDown("s")){
                if(this.playerObj.checkCollision(this.borderDown)){
                    this.playerObj.moveBy(0, 0);
                }else{
                    this.playerObj.moveBy(0, this.currentSpeed);
                }
            } else if(isKeyDown("a")){
                if(this.playerObj.checkCollision(this.borderLeft)){
                    this.playerObj.moveBy(0, 0);
                }else{
                    this.playerObj.moveBy(-this.currentSpeed, 0);
                }
            } else if(isKeyDown("d")){
                if(this.playerObj.checkCollision(this.borderRight)){
                    this.playerObj.moveBy(0, 0);
                }else{
                    this.playerObj.moveBy(this.currentSpeed, 0);
                }
            }
        })
    }
};