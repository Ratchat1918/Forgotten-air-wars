import { loadPlayerLvl3, loadPickUpables, loadLevel3} from "../services/loader.js";
import { Player } from "../enteties/player.js";
export const level3 =()=>{
    loadPlayerLvl3();
    loadPickUpables();
    loadLevel3();
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
        let tempStaticBg=add([
            sprite("tempStaticBg"),
            "tempStaticBg",
            scale(3),
            pos(0,0),
            layer("staticBackground")
        ]);
        let tempBg=add([
            sprite("tempBg"),
            "tempBg",
            scale(3),
            pos(0,0),
            layer("background3")
        ]);
        loop(0.04,()=>{
            if(tempBg.pos.y>=960){
                tempBg.destroy();
                tempBg = add([
                    sprite("tempBg"),
                    "tempBg",
                    scale(3),
                    pos(0,-960),
                    layer("background2")
                ]);
            }
            tempBg.moveBy(0,6);
        });
    }
    renderBackground();
    const player = new Player(480,480,"i-16",5, 50, borderUpPlayer, borderDownPlayer, borderLeft, borderRight);//x, y, sprite, speed
}