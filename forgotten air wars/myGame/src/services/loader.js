export const loadGermans =()=>{
    loadSprite("bf109","src/sprites/level1/bf 109 Spain.png",{
        sliceX:3, sliceY:2, anims:{default:{from:0,to:1,loop:true}, damage:{from:1,to:3,loop:false}}
    });
    loadSprite("bf109white","src/sprites/level1/bf 109b white Spain.png",{
        sliceX:3, sliceY:2, anims:{default:{from:0,to:1,loop:true}, damage:{from:1,to:3,loop:false}}
    });
    loadSprite("bf109Bullet","src/sprites/level1/bf109Bullet.png");
}
export const loadItalians =()=>{
    loadSprite("sm81","src/sprites/level1/sm81 Italy.png",{
        sliceX:3, sliceY:2, anims:{default:{from:0,to:1,loop:true}, damage:{from:1,to:3,loop:false}}
    });
    loadSprite("cr31","src/sprites/level1/cr31 Italy.png",{
        sliceX:3, sliceY:2, anims:{default:{from:0,to:1,loop:true}, damage:{from:1,to:3,loop:false}}
    });
    loadSprite("cr31Bullet","src/sprites/level1/cr31Bullet.png");
}
export const loadPlayerLvl1=()=>{
    loadSprite("i-16","src/sprites/level1/I-16 Spain.png",{
        sliceX:3, sliceY:2, anims:{default:{from:0,to:1,loop:true}, damage:{from:1,to:5,loop:false}}
    });
    loadSprite("i16Bullet","src/sprites/level1/i16 bullets.png");
}
export const loadPlayerLvl3=()=>{
    loadSprite("i-16","src/sprites/level1/I-16 Spain.png",{
        sliceX:3, sliceY:2, anims:{default:{from:0,to:1,loop:true}, damage:{from:1,to:5,loop:false}}
    });
    loadSprite("i16Bullet","src/sprites/level1/i16 bullets.png");
    loadSprite("gunnerSight","src/sprites/level3/gunnerSight.png");
}
export const loadPickUpables=()=>{
    loadSprite("healthPickup","src/sprites/healthPickup.png",{
        sliceX:10, sliceY:0, anims:{default:{from:0,to:9,loop:true}}
    });
    loadSprite("ammoPickUp","src/sprites/ammoPickup.png",{
        sliceX:3, sliceY:2, anims:{default:{from:0,to:5,loop:true}}
    });
}
export const loadLevel1=()=>{
    loadSprite("tempStaticBg","src/sprites/level1/tempStaticBg.png");
    loadSprite("tempBg","src/sprites/level1/tempBg.png");
}
export const loadLevel3=()=>{
    loadSprite("tempStaticBg","src/sprites/level1/tempStaticBg.png");
    loadSprite("tempBg","src/sprites/level1/tempBg.png");
}
export const loadUi=()=>{
    loadFont("yoster","src/fonts/yoster.ttf");
    loadSprite("lives","src/sprites/playerHealth.png",{sliceX:0, sliceY:3,});
    loadSprite("ammo","src/sprites/ammo.png",{sliceX:0, sliceY:11,});
}
export const loadSfx=()=>{
    loadSound("fighterDie","/src/sounds/fighterDie.mp3");
    loadSound("bomberDie","/src/sounds/bomberDie.wav");
    loadSound("enemyHit","src/sounds/enemyHit.wav");
    loadSound("playerShoot","src/sounds/playerShoot.wav");
}