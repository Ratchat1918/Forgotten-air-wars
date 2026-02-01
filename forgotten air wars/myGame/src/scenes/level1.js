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
    const maxEnemies=5;
    let currentEnemies=0;
    let borderDown=add([
        rect(960,1),
        pos(0, 1024),
        area(),
        "borderDown"
        ]);
    let borderUp=add([
        rect(960,1),
        pos(0, -64),
        area(),
        "borderUp"
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
        let staticBackground=add([
            sprite("background1"),
            "staticBackground",
            scale(),
            pos(0,0),
            layer("staticBackground")
        ]);
        let background2=add([
            sprite("background2"),
            "background2",
            scale(),
            pos(0,0),
            layer("background2")
        ]);
        let background3=add([
            sprite("background3"),
            "background3",
            scale(),
            pos(0,-960),
            layer("background2")
        ]);
        loop(0.1,()=>{
            if(background2.pos.y>=960){
                background2.destroy();
                background2 = add([
                    sprite("background2"),
                    "background2",
                    scale(),
                    pos(0,-960),
                    layer("background2")
                ]);
            }
            if(background3.pos.y>=960){
                background3.destroy();
                background3 = add([
                    sprite("background3"),
                    "background3",
                    scale(),
                    pos(0,-960),
                    layer("background2")
                ]);
            }
            background2.moveBy(0,10);
            background3.moveBy(0,10);
        });
    }
    renderBackground();
    const player = new Player(480,480,"i-16",5, borderUp, borderDown, borderLeft, borderRight);//x, y, sprite, speed
    let scoreNumber=0;
    let score=add([
        pos(32,32),
        text(`Score: ${scoreNumber}`)
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
    const spawnEnemyFighter=()=>{
        let enemyKind = Math.floor(Math.random()*8);
        let enemyPosX=Math.floor(Math.random()*(800-100)+100);
        let enemyPosY = 0+32;
        let enemyPosYDown = 960-32;
        switch (enemyKind) {
            case 1:
                new Enemy(enemyPosX,enemyPosY,"bf109white",  3, "down", increaseScore);
                currentEnemies++;
                break;
            case 2:
                new Enemy(enemyPosX,enemyPosY,"bf109", 3, "down", increaseScore);
                currentEnemies++;
                break;
            case 3:
                new Enemy(enemyPosX,enemyPosY,"bf109white",  3, "down", increaseScore);
                currentEnemies++;
                break;
            case 4:
                new Enemy(enemyPosX,enemyPosYDown,"bf109", 3, "up", increaseScore);
                currentEnemies++;
                break;
            case 5:
                new Enemy(enemyPosX,enemyPosYDown,"cr31", 2, "up", increaseScore);
                currentEnemies++;
                break;
            case 6:
                new Enemy(enemyPosX,enemyPosY,"cr31", 2, "down", increaseScore);
                currentEnemies++;
                break;
            case 7:
                new Transport("sm81", 5, increaseScoreTransport);
                currentEnemies++;
                break;
            default:
                break;
        };
    };
    let interval=3;
    loop(interval,()=>{
        
        if(currentEnemies<maxEnemies){
            spawnEnemyFighter();
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