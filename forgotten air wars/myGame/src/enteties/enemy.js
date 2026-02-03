export class Enemy{
    constructor(posX,spriteIndex, directionIndex, onDeath){//direction 1 is up 0 is down
        this.hits=3;
        this.direction=directionIndex;
        this.onDeath = onDeath;
        this.initialX=posX;
        this.initialY;
        this.spriteList=["bf109","bf109white","cr31"];
        this.bulletSpriteList=["bf109Bullet","bf109Bullet","cr31Bullet"];
        this.sprite=this.spriteList[spriteIndex];
        this.bulletSprite=this.bulletSpriteList[spriteIndex];
        let animationFlip;
        if(this.direction===0){
            this.initialY=0;
            animationFlip=true;
            this.makeEnemy(animationFlip);
            this.enemyMovementDown();
        }else{
            this.initialY=960;
            animationFlip=false;
            this.makeEnemy(animationFlip);
            this.enemyMovementUp();
        }
        this.destroyEnemy();
        this.bulletCleanUp();
        let shootInterval=1;
        loop(shootInterval,()=>{
            let shootChance=Math.floor(Math.random()*4);
            if(this.enemyObj.exists()){
                if(shootChance===1||shootChance===2){
                  this.enemyShoot(animationFlip);  
                }
            }
        });
        
        switch(this.sprite){
            case "bf109":
                this.speed=3;
                this.hits=3;
                this.bulletSprite="bf109Bullet";
                break;
            case "bf109white":
                this.speed=2.5;
                this.hits=3;
                this.bulletSprite="bf109Bullet";
                break;
            default:
                this.speed=1.5;
                this.hits=2;
                this.bulletSprite="cr31Bullet";
        }
    };
    bulletCleanUp(){
        loop(2,()=>{
            get("enemyBullet").forEach(element => {
                if(element.pos.y>1024 || element.pos.y<0){
                    element.destroy();
                }
            });
        });
    }
    makeEnemy(animationFlip){
        this.enemyObj=add([
            rect(100,64),
            anchor("center"),
            pos(this.initialX,this.initialY ),
            "enemy",
            opacity(0),
            area(),
        ]);
        this.enemySprite=this.enemyObj.add([
            sprite(this.sprite,{anim:"default", flipY:animationFlip}),
            anchor("center"),
            scale(2),
        ])
    };
    enemyShoot(animationFlip){
        let rateOfFire=0.02;
        let enemyBullet = add([
            rect(10,10),
                pos(this.enemyObj.pos.x, this.enemyObj.pos.y),
                area(),
                opacity(0),
                "enemyBullet",
            ]);
            enemyBullet.add([
                sprite(this.bulletSprite,{
                    flipY:animationFlip
                }),
                anchor("center"),
                scale(2),])
            if(enemyBullet.pos.y>1024){
                enemyBullet.destroy();
            }else if(enemyBullet.pos.y<-64){
                enemyBullet.destroy();
            }
            if(this.direction===1){
                loop(rateOfFire,()=>{
                    enemyBullet.moveBy(0,-5);
                })
            }else{
                loop(rateOfFire,()=>{
                    enemyBullet.moveBy(0,5);
                })
            }
            enemyBullet.onCollide("player",()=>{
                enemyBullet.destroy()
            })
            enemyBullet.onCollide("borderDown",()=>{
                enemyBullet.destroy()
            })
            enemyBullet.onCollide("borderUp",()=>{
                enemyBullet.destroy();
            })    
    };
    livePack(){
        let livepack=add([
            "healthPack",
            pos(this.enemyObj.pos.x, this.enemyObj.pos.y),
            sprite("healthPickup",{anim:"default"}),
            scale(3),
            area()
        ])
        livepack.onCollide("player",()=>{
            livepack.destroy();
        })
        wait(4,()=>{
            livepack.destroy();
        })
    }
    ammoPack(){
        let ammoPack=add([
            "ammoPack",
            pos(this.enemyObj.pos.x, this.enemyObj.pos.y),
            sprite("ammoPickUp",{anim:"default"}),
            area()
        ])
        ammoPack.onCollide("player",()=>{
            ammoPack.destroy();
        })
        wait(6,()=>{
            ammoPack.destroy();
        })
    }
    destroyEnemy(){
        this.enemyObj.onCollide("bulletPlayer",()=>{
            this.enemySprite.play("damage");
            wait(1,()=>{
                this.enemySprite.play("default");
            })
            play("enemyHit");
            this.hits--
            if(this.hits===0){
                if (this.onDeath) this.onDeath();
                play("fighterDie",{volume:0.8});
                this.enemyObj.destroy();
                let chanceToDrop=Math.floor(Math.random()*5);
                if(chanceToDrop===2){
                    this.livePack();
                }else if(chanceToDrop===1){
                    this.ammoPack();
                }
            }
        });
        this.enemyObj.onCollide("player",()=>{
            this.enemySprite.play("damage");
            wait(1,()=>{
                this.enemySprite.play("default");
            })
            play("enemyHit");
            this.hits--
            if(this.hits===0){
                if (this.onDeath) this.onDeath();
                play("fighterDie",{volume:0.8});;
                this.enemyObj.destroy();
                let chanceToDrop=Math.floor(Math.random()*5);
                if(chanceToDrop===2){
                    this.livePack();
                }else if(chanceToDrop===1){
                    this.ammoPack();
                }
            }
        });
    }
    enemyMovementDown(){
        const startTween = () => {
            if(this.hits>0){
                tween(
                    this.enemyObj.pos.y,
                    1024,
                    8,
                    (val) => this.enemyObj.pos.y = val,
                    easings.linear
                );
            }
        };
        startTween();
        this.enemyObj.onCollide("borderDown",()=>{
            this.hits=3;
            this.enemyObj.pos.y = 0;
            if(this.enemyObj.pos.x>=820){
                this.enemyObj.pos.x=100;
            }else{
                this.enemyObj.pos.x+=100;
            }
            startTween(); // Restart movement after respawn
        });
    }
    enemyMovementUp(){
        const startTween = () => {
            if(this.hits>0){
                tween(
                    this.enemyObj.pos.y,
                    -64,
                    8,
                    (val) => this.enemyObj.pos.y = val,
                    easings.linear
                );
            }
        };
        startTween();
        this.enemyObj.onCollide("borderUp",()=>{
            this.hits=3;
            this.enemyObj.pos.y = 960;
            if(this.enemyObj.pos.x>=820){
                this.enemyObj.pos.x=100;
            }else{
                this.enemyObj.pos.x+=100;
            }
            startTween(); // Restart movement after respawn
        });
    }
};