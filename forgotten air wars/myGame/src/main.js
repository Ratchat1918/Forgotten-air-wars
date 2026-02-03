import kaplay from "kaplay";
import "kaplay/global";
import { loadUi, loadSfx } from "./services/loader.js";
import { mainMenu } from "./scenes/mainMenu.js";
import { gameOverScene } from "./scenes/gameover.js";
import { victoryScreen } from "./scenes/victoryScreen.js";
import { level1 } from "./scenes/level1.js";
kaplay({
    width: 960,
    height: 960,
    letterbox:true,
});
layers([
    "staticBackground",
    "background2"
    ,"background3",
    "ui",
    "game",],"game");
loadUi();
loadSfx();
//debug.inspect=true;
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