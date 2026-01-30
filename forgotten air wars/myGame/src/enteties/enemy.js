export class Enemy{
    constructor(posX,posY,sprite, hits, direction, onDeath){
        this.initialX=posX;
        this.initialY=posY;
        this.sprite=sprite;
        this.hits=hits;
        this.direction=direction;
        this.onDeath = onDeath;
        this.bulletSprite;
        if(this.direction==="down"){
            this.makeEnemy("default");
            this.enemyMovementDown();
        }else{
            this.makeEnemy("up");
            this.enemyMovementUp();
        }
        this.destroyEnemy();
        this.bulletCleanUp();
        let shootInterval=1;
        loop(shootInterval,()=>{
            let shootChance=Math.floor(Math.random()*4);
            if(this.enemyObj.exists()){
                if(shootChance===1||shootChance===2){
                  this.enemyShoot();  
                }
            }
        });
        
        switch(this.sprite){
            case "bf109":
                this.speed=3;
                this.bulletSprite="bf109Bullet";
                break;
            case "bf109white":
                this.speed=2.5;
                this.bulletSprite="bf109Bullet";
                break;
            default:
                this.speed=1.5;
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
    makeEnemy(animation){
        this.enemyObj=add([
            rect(100,64),
            anchor("center"),
            pos(this.initialX,this.initialY ),
            "enemy",
            opacity(0),
            area(),
        ]);
        this.enemyObj.add([
            sprite(this.sprite,{anim:animation}),
            anchor("center"),
            scale(2),
        ])
    };
    enemyShoot(){
        let BulletOffset=32;
        let bulletSpeed=3.5;
        let enemyBullet = add([
            rect(10,10),
                pos(this.enemyObj.pos.x, this.enemyObj.pos.y),
                area(),
                body(),
                opacity(0),
                "enemyBullet",
            ]);
            if(this.direction==="down"){
                enemyBullet.add([
                sprite(this.bulletSprite,{
                    flipY:true
                }),
                anchor("center"),
                scale(2),])
            }else{
                enemyBullet.add([
                sprite(this.bulletSprite),
                anchor("center"),
                scale(2),])
            }
            
            if(enemyBullet.pos.y>1024){
                enemyBullet.destroy();
            }else if(enemyBullet.pos.y<-64){
                enemyBullet.destroy();
            }
            if(this.direction==="up"){
                tween(
                enemyBullet.pos.y-BulletOffset,
                -64-50,
                bulletSpeed,
                (val) => enemyBullet.pos.y = val,
                easings.linear);
            }else{
                if(enemyBullet.pos.y>750){
                    bulletSpeed=1;
                };
                tween(
                enemyBullet.pos.y+BulletOffset,
                1024,
                bulletSpeed,
                (val) => enemyBullet.pos.y = val,
                easings.linear);
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
    destroyEnemy(){
        this.enemyObj.onCollide("bulletPlayer",()=>{
            this.hits--
            if(this.hits===0){
                if (this.onDeath) this.onDeath();
                this.enemyObj.destroy();
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
            this.enemyObj.pos.y = 0;
            this.enemyObj.pos.x = Math.floor(Math.random() * (800 - 100) + 100);
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
            this.enemyObj.pos.y = 960;
            this.enemyObj.pos.x = Math.floor(Math.random() * (800 - 100) + 100);
            startTween(); // Restart movement after respawn
        });
    }
};