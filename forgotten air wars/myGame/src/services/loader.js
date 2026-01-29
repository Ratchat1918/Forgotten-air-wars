export const loadSprites =()=>{
    loadSprite("i-16","src/sprites/I-16 Spain.png",{
        sliceX:3, sliceY:0, anims:{default:{from:0,to:1,loop:true}, damage:{from:0,to:2}}
    });
    loadSprite("bf109","src/sprites/bf 109 Spain.png",{
        sliceX:3, sliceY:2, anims:{default:{from:3,to:4,loop:true}, up:{from:0,to:1,loop:true}}
    });
    loadSprite("bf109white","src/sprites/bf 109b white Spain.png",{
        sliceX:3, sliceY:2, anims:{default:{from:3,to:4,loop:true}, up:{from:0,to:1,loop:true}}
    });
    loadSprite("sm81","src/sprites/sm81 Italy.png",{
        sliceX:3, sliceY:1, anims:{default:{from:0,to:1,loop:true}}
    });
    loadSprite("cr31","src/sprites/cr31 Italy.png",{
        sliceX:3, sliceY:2, anims:{default:{from:3,to:4,loop:true}, up:{from:0,to:1,loop:true}}
    });
}