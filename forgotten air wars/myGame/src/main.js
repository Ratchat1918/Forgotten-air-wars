import kaplay from "kaplay";
import "kaplay/global";
import { loadSprites } from "./services/loader.js";
import { mainMenu } from "./scenes/mainMenu.js";
import { gameOverScene } from "./scenes/gameover.js";
import { victoryScreen } from "./scenes/victoryScreen.js";
import { level1 } from "./scenes/level1.js";

kaplay({
    width: 960,
    height: 960,
    letterbox:true,
    
});
debug.inspect=true;
loadSprites();
const scenes={
    menu:()=>{
        mainMenu();
    },
    gameover:()=>{
        gameOverScene();
    },
    victoryscreen:()=>{
        victoryScreen();
    },
    level1:()=>{
        level1();
    },
    level2:()=>{

    },
    level3:()=>{

    },
};

for(const key in scenes){
    scene(key, scenes[key])
};
go("menu");