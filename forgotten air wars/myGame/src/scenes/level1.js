import { loadGermans, loadItalians, loadPlayer, loadPickUpables, loadLevel1 } from "../services/loader.js";
import { Player } from "../enteties/player";
import { Enemy } from "../enteties/enemy";
import { Transport } from "../enteties/transport";

export const level1=()=>{
    loadLevel1();
    loadPlayer();
    loadGermans();
    loadItalians();
    loadPickUpables();
    const maxEnemies=8;
    let currentEnemies=0;
    let borderDown=add([
        rect(960,1),
        pos(0, 1024),
        area(),
        "borderDown"
        ]);
    let borderUp=add([
        rect(960,1),
        pos(0, -96),
        area(),
        "borderUp"
    ]);
    let borderUpPlayer=add([
        rect(960,1),
        pos(0, 0),
        area(),
        "borderUpPlayer"
    ]);
    let borderDownPlayer=add([
        rect(960,1),
        pos(0, 890),
        opacity(0),
        area(),
        "borderDownPlayer"
        ]);
    let borderLeft=add([
        rect(1,960),
        pos(0,0),
        area(),
        "borderLeft"
    ]);
    let borderRight=add([
        rect(1,960),
        pos(960,0),
        area(),
        "borderRight"
    ]);
    const renderBackground=()=>{//infinite parallax background:]]]]
        let staticBG=add([
            sprite("staticBG"),
            "staticBG",
            scale(2),
            pos(0,0),
            layer("staticBackground")
        ]);
        let cloudsBG=add([
            sprite("cloudsBG"),
            "cloudsBG",
            scale(2),
            pos(0,0),
            layer("background3")
        ]);
        let cloudsBG2=add([
            sprite("cloudsBG"),
            "cloudsBG",
            scale(2),
            pos(0,-960),
            layer("background3")
        ]);
        let greeneryBG=add([
            sprite("greeneryBG"),
            "greeneryBG",
            scale(2),
            pos(0,-960),
            layer("background2")
        ]);
        loop(0.04,()=>{
            if(cloudsBG.pos.y>=960){
                cloudsBG.destroy();
                cloudsBG = add([
                    sprite("cloudsBG"),
                    "cloudsBG",
                    scale(2),
                    pos(0,-960),
                    layer("background2")
                ]);
            }
            if(greeneryBG.pos.y>=960){
                greeneryBG.destroy();
                greeneryBG = add([
                    sprite("greeneryBG"),
                    "greeneryBG",
                    scale(2),
                    pos(0,-960),
                    layer("background2")
                ]);
            }

            cloudsBG.moveBy(0,6);
            cloudsBG2.moveBy(0,6);
            greeneryBG.moveBy(0,4);
        });
    }
    renderBackground();
    const player = new Player(480,480,"i-16",5, 50, borderUpPlayer, borderDownPlayer, borderLeft, borderRight);//x, y, sprite, speed
    let scoreNumber=0;
    let score=add([
        pos(32,900),
        text(`Score: ${scoreNumber}`,{font:"yoster", size:32}),
        layer("ui"),
    ]);

    function increaseScore(amount = 100) {
        scoreNumber += amount;
        score.text = `Score: ${scoreNumber}`;
    }
    function increaseScoreTransport(amount = 200) {
        scoreNumber += amount;
        score.text = `Score: ${scoreNumber}`;
    }
    onDestroy("enemy",()=>{
        currentEnemies--;
    })
    onDestroy("transport",()=>{
        currentEnemies--;
    })
    const spawnAmmoPack=()=>{
        let ammoPack=add([
            "ammoPack",
            pos(Math.floor(Math.random()*800), Math.floor(Math.random()*600)),
            sprite("ammoPickUp",{anim:"default"}),
            area()])
            ammoPack.onCollide("player",()=>{
                ammoPack.destroy();})
            wait(6,()=>{
                ammoPack.destroy();});};
    const spawnEnemies=()=>{
        let spawnIndex = Math.floor(Math.random()*10);
        let spriteIndex;
        let directionIndex;
        switch(spawnIndex){
            case 1:
                spriteIndex=Math.floor(Math.random()*3);
                directionIndex=Math.floor(Math.random()*2);
                new Enemy(100,spriteIndex,directionIndex, increaseScore)//pos x, sprite index, direction, onDeath function
                currentEnemies++;
                break;
            case 2:
                spriteIndex=Math.floor(Math.random()*3);
                directionIndex=Math.floor(Math.random()*2);
                new Enemy(200,spriteIndex,directionIndex, increaseScore)//pos x, sprite index, direction, onDeath function
                currentEnemies++;
                break;
            case 3:
                spriteIndex=Math.floor(Math.random()*3);
                directionIndex=Math.floor(Math.random()*2);
                new Enemy(300,spriteIndex,directionIndex, increaseScore)
                currentEnemies++;
                break;
            case 4:
                spriteIndex=Math.floor(Math.random()*3);
                directionIndex=Math.floor(Math.random()*2);
                new Enemy(420,spriteIndex,directionIndex, increaseScore)
                currentEnemies++;
                break;
            case 5:
                spriteIndex=Math.floor(Math.random()*3);
                directionIndex=Math.floor(Math.random()*2);
                new Enemy(520,spriteIndex,directionIndex, increaseScore)
                currentEnemies++;
                break;
            case 6:
                spriteIndex=Math.floor(Math.random()*3);
                directionIndex=Math.floor(Math.random()*2);
                new Enemy(620,spriteIndex,directionIndex, increaseScore)
                currentEnemies++;
                break;
            case 7:
                spriteIndex=Math.floor(Math.random()*3);
                directionIndex=Math.floor(Math.random()*2);
                new Enemy(720,spriteIndex,directionIndex, increaseScore)
                currentEnemies++;
                break;
            case 8:
                directionIndex=Math.floor(Math.random()*2);
                new Transport(320, directionIndex, increaseScoreTransport);
                currentEnemies++;
                break;
            case 9:
                spawnAmmoPack();
                break;
            default:
                break
        }
    };
    let interval=3;
    loop(interval,()=>{
        if(currentEnemies<maxEnemies){
            spawnEnemies();
        }
        if(scoreNumber>=700){
            interval=2;
        }else if(scoreNumber>1500){
            interval=1;
        }
        else if(scoreNumber>2000){
            interval=0.5;
        }
        if(scoreNumber>=3000){
            go("victoryscreen");
        };
    }); 
};