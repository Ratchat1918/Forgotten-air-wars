export const victoryScreen=(level)=>{
    var nextLevelBtn=add([
        pos(760, 760),
        rect(100, 100, { radius: 8 }),
        outline(4, BLACK),
        "nextLevel",
        area(),
    ])
    nextLevelBtn.add([anchor("center"),text("Next level",{size:24,}),color(0,0,0)])
    var playAgain=add([
        pos(20, 760),
        rect(100, 100, { radius: 8 }),
        outline(4, BLACK),
        "palyAgain",
        area(),
    ])
    playAgain.add([anchor('center'), text("Play again",{size:24,}),color(0,0,0)])
    var mainMenu=add([
        pos(center()),
        rect(100, 100, { radius: 8 }),
        outline(4, BLACK),
        "mainMenu",
        area(),
    ])
    mainMenu.add([anchor("center"),text("Go to main menu",{size:24,}),color(0,0,0)])
    onClick("nextLevel",()=>{
        if(level<3){
            go(level+1);
        }
    })
    onClick("palyAgain",()=>{
        go("level1")
    })
    onClick("mainMenu",()=>{
        go("menu");
    })
}
