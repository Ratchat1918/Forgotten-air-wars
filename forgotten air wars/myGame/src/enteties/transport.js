export class Transport{
    constructor(posX,direction,onDeath){
        this.initialX=posX;
        this.initialY;
        this.sprite="sm81";
        this.hits=4;
        this.onDeath = onDeath;
        this.direction=direction;
        let animationFlip;
        if(this.direction===0){
            this.initialY=0;
            animationFlip=true;
            this.makeTransport(animationFlip);
            this.transportMoveDown();
        }else{
            this.initialY=960;
            animationFlip=false;
            this.makeTransport(animationFlip);
            this.transportMoveUp();
        }
        this.destroyTransport();
    };
    makeTransport(animationFlip){
        this.transportObj=add([
            rect(256,128),
            anchor("center"),
            pos(this.initialX,this.initialY ),
            "transport",
            opacity(0),
            area(),
        ]);
        this.transportSprite=this.transportObj.add([
            sprite(this.sprite,{anim:"default", flipY:animationFlip}),
            anchor("center"),
            scale(2),
        ])
    };
    livePack(){
        let livepack=add([
            "healthPack",
            pos(this.transportObj.pos.x, this.transportObj.pos.y),
            sprite("healthPickup",{anim:"default"}),
            scale(3),
            area()
        ])
        livepack.onCollide("player",()=>{
            livepack.destroy();
        })
        wait(6,()=>{
            livepack.destroy();
        })
    }
    ammoPack(){
        let ammoPack=add([
            "ammoPack",
            pos(this.transportObj.pos.x+50, this.transportObj.pos.y),
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
    destroyTransport(){
        this.transportObj.onCollide("bulletPlayer",()=>{
            this.transportSprite.play("damage");
            wait(1,()=>{
                this.transportSprite.play("default");
            })
            play("enemyHit");
            this.hits--
            if(this.hits===0){
                play("bomberDie");
                if (this.onDeath) this.onDeath();
                this.transportObj.destroy();
                this.livePack();
                this.ammoPack();
            }
        });
        this.transportObj.onCollide("player",()=>{
            this.transportSprite.play("damage");
            wait(1,()=>{
                this.transportSprite.play("default");
            })
            play("enemyHit");
            this.hits--
            if(this.hits===0){
                play("bomberDie");
                if (this.onDeath) this.onDeath();
                this.transportObj.destroy();
                this.livePack();
                this.ammoPack();
            }
        });
    }
    transportMoveDown(){
        const startTween = () => {
            if(this.hits>0){
                tween(
                    this.transportObj.pos.y,
                    1024,
                    14,
                    (val) => this.transportObj.pos.y = val,
                    easings.linear
                );
            }
        };
        startTween();
        this.transportObj.onCollide("borderDown",()=>{
            this.transportObj.pos.y = 0;
            if(this.transportObj.pos.x>=820){
                this.transportObj.pos.x=100;
            }else{
                this.transportObj.pos.x+=100;
            };
            startTween(); // Restart movement after respawn
        });
    }
    transportMoveUp(){
        const startTween = () => {
            if(this.hits>0){
                tween(
                    this.transportObj.pos.y,
                    -128,
                    14,
                    (val) => this.transportObj.pos.y = val,
                    easings.linear
                );
            }
        };
        startTween();
        this.transportObj.onCollide("borderUp",()=>{
            this.transportObj.pos.y = 960;
            if(this.transportObj.pos.x>=820){
                this.transportObj.pos.x=100;
            }else{
                this.transportObj.pos.x+=100;
            };
            startTween(); // Restart movement after respawn
        });
    }
};