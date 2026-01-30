export const loadGermans =()=>{
    loadSprite("bf109","src/sprites/level1/bf 109 Spain.png",{
        sliceX:3, sliceY:2, anims:{default:{from:3,to:4,loop:true}, up:{from:0,to:1,loop:true}}
    });
    loadSprite("bf109white","src/sprites/level1/bf 109b white Spain.png",{
        sliceX:3, sliceY:2, anims:{default:{from:3,to:4,loop:true}, up:{from:0,to:1,loop:true}}
    });
    loadSprite("bf109Bullet","src/sprites/level1/bf109Bullet.png");
}
export const loadItalians =()=>{
    loadSprite("sm81","src/sprites/level1/sm81 Italy.png",{
        sliceX:3, sliceY:1, anims:{default:{from:0,to:1,loop:true}}
    });
    loadSprite("cr31","src/sprites/level1/cr31 Italy.png",{
        sliceX:3, sliceY:2, anims:{default:{from:3,to:4,loop:true}, up:{from:0,to:1,loop:true}}
    });
    loadSprite("cr31Bullet","src/sprites/level1/cr31Bullet.png");
}
export const loadPlayer=()=>{
    loadSprite("i-16","src/sprites/level1/I-16 Spain.png",{
        sliceX:3, sliceY:0, anims:{default:{from:0,to:1,loop:true}, damage:{from:0,to:2}}
    });
    loadSprite("i16Bullet","src/sprites/level1/i16 bullets.png");
    loadSprite("lives","src/sprites/playerHealth.png",{sliceX:0, sliceY:3,});
}
export const loadPickUpables=()=>{
    loadSprite("healtPickup","src/sprites/healthPickup.png",{
        sliceX:0, sliceY:10, anims:{default:{from:0,to:10,loop:true}}
    });
}