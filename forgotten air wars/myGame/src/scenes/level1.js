import { Player } from "../enteties/player";
import { Enemy } from "../enteties/enemy";
import { Transport } from "../enteties/transport";

export const level1=()=>{
    
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
    const player = new Player(350,700,"i-16",5,20900, borderUp, borderDown, borderLeft, borderRight);//x, y, sprite, speed, lives
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
                new Enemy(enemyPosX,enemyPosY,"bf109white",  2, "down", increaseScore);
                currentEnemies++;
                break;
            case 2:
                new Enemy(enemyPosX,enemyPosY,"bf109", 2, "down", increaseScore);
                currentEnemies++;
                break;
            case 3:
                new Enemy(enemyPosX,enemyPosY,"bf109white",  2, "down", increaseScore);
                currentEnemies++;
                break;
            case 4:
                new Enemy(enemyPosX,enemyPosYDown,"bf109", 2, "up", increaseScore);
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
        }
        console.log(currentEnemies)
    };
    let interval=4;
    loop(interval,()=>{
        
        if(currentEnemies<maxEnemies){
            spawnEnemyFighter();
        }
        if(scoreNumber>=700){
            interval=3;
        }else if(scoreNumber>1500){
            interval=2;
        }
        if(scoreNumber>=2000){
            go("victoryscreen");
        };
    }); 
};