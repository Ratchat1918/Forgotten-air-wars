export class Transport{
    constructor(sprite, hits, onDeath){
        this.initialX=Math.floor(Math.random()*(600-300)+300);
        this.initialY=-128;
        this.sprite=sprite;
        this.hits=hits;
        this.onDeath = onDeath;
        this.makeTransport();
        this.transportMoveDown();
        this.destroyTransport();
    };
    makeTransport(){
        this.transportObj=add([
            rect(256,128),
            anchor("center"),
            pos(this.initialX,this.initialY ),
            "transport",
            opacity(0),
            area(),
        ]);
        this.transportObj.add([
            sprite(this.sprite,{anim:"default"}),
            anchor("center"),
            scale(2),
        ])
    };
    livePack(){
        let livepack=add([
            "health",
            pos(this.transportObj.pos.x, this.transportObj.pos.y),
            sprite("healtPickup",{anim:"default"}),
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
    destroyTransport(){
        this.transportObj.onCollide("bulletPlayer",()=>{
            this.hits--
            if(this.hits===0){
                if (this.onDeath) this.onDeath();
                this.transportObj.destroy();
                this.livePack();
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
            this.transportObj.pos.x = Math.floor(Math.random() * (800 - 100) + 100);
            startTween(); // Restart movement after respawn
        });
    }
};