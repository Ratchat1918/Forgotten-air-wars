export class Player{
    constructor(posX,posY,sprite, speed,ammo, borderUp, borderDown, borderLeft, borderRight){
        this.initialX=posX;
        this.initialY=posY;
        this.sprite=sprite
        this.currentSpeed=speed;
        this.lives=3;
        this.ammo=ammo;
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
            rect(100,80),
            color(0,0,0,0),
            anchor("center"),
            pos(this.initialX,this.initialY ),
            "player",
            body(),
            area(),
            opacity(0),
        ])
        this.playerSprite=this.playerObj.add([
            sprite(this.sprite,{anim:"default"}),
            anchor("center"),
            scale(2)
        ])
    };
    playerShoot(){
        let lastShotTime = 0;
        const shootCooldown = 350; // milliseconds
        let rateOfFire=0.04;
        let bulletSpeed=-50;
        let ammoFrame;
        if(this.ammo===50){
            ammoFrame=11;
        }else{
            ammoFrame=Math.floor(this.ammo*0.2)+1;
        }
        this.ammoUi=add([
            pos(450, 900),
            sprite("ammo",{frame:ammoFrame-1}),
            scale(3),
            anchor("center"),
            layer("ui"),
        ]);
        onKeyDown("space", () => {
            const now = Date.now();
            if (now - lastShotTime >= shootCooldown && this.ammo > 0) {
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
                play("playerShoot");
                this.ammo--;
                if(this.ammo===50){
                    ammoFrame=11;
                }else{
                    ammoFrame=Math.floor(this.ammo*0.2)+1;
                }
                this.ammoUi.destroy();
                this.ammoUi=add([
                    pos(450, 900),
                    sprite("ammo",{frame:ammoFrame-1}),
                    scale(3),
                    anchor("center"),
                    layer("ui"),
                ]);
                loop(rateOfFire,()=>{
                    bullet.moveBy(0,bulletSpeed);
                })
                bullet.onCollide("enemy",()=>{
                    bullet.destroy()
                })
                bullet.onCollide("transport",()=>{
                    bullet.destroy()
                })
                bullet.onCollide("transport",()=>{
                    bullet.destroy()
                })
                bullet.onCollide("borderUp",()=>{
                    bullet.destroy();
                })
                lastShotTime = now;
            }
        });
    }
    playerDeath(){
        let livesUi=add([
            pos(800, 900),
            sprite("lives",{frame:this.lives-1}),
            scale(4),
            anchor("center"),
            layer("ui")
        ])
        const createNewLivesUi=(lives)=>{
            if(lives>0){
               livesUi=add([
                pos(800, 900),
                sprite("lives",{frame:lives-1}),
                scale(4),
                anchor("center")
            ]);};
        };
        this.playerObj.onCollide("enemy",()=>{
            this.playerSprite.play("damage");
            wait(1,()=>{
                this.playerSprite.play("default");
            })
            this.lives--;
            livesUi.destroy();
            createNewLivesUi(this.lives);
            if(this.lives===0){
                go("gameover")
            }
        })
        this.playerObj.onCollide("transport",()=>{
            this.playerSprite.play("damage");
            wait(1,()=>{
                this.playerSprite.play("default");
            })
            this.lives--;
            livesUi.destroy();
            createNewLivesUi(this.lives);
            if(this.lives===0){
                go("gameover")
            }
        })
        this.playerObj.onCollide("enemyBullet",()=>{
            this.playerSprite.play("damage");
            wait(1,()=>{
                this.playerSprite.play("default");
            })
            this.lives--;
            livesUi.destroy();
            createNewLivesUi(this.lives);
            if(this.lives===0){
                go("gameover")
            }
        })
        this.playerObj.onCollide("healthPack",()=>{
            if(this.lives<3){
                this.lives++;
                livesUi.destroy();
                createNewLivesUi(this.lives);
            }
        })
        this.playerObj.onCollide("ammoPack",()=>{
            if(this.ammo<=40){
                this.ammo+=10;
                this.ammoUi.destroy();
                this.ammoUi=add([
                    pos(450, 900),
                    sprite("ammo",{frame:Math.floor(this.ammo*0.2)+1-1}),
                    scale(3),
                    anchor("center"),
                    layer("ui"),
                ]);
            }else if(this.ammo>40 && this.ammo<50){
                this.ammo=50;
                this.ammoUi.destroy();
                this.ammoUi=add([
                    pos(450, 900),
                    sprite("ammo",{frame:11-1}),
                    scale(3),
                    anchor("center"),
                    layer("ui"),
                ]);
            }
        })
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