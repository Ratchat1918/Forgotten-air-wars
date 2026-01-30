export const mainMenu=()=>{
    var startBtn = add([
    anchor("center"),
    pos(center()),
    rect(100, 80, { radius: 8 }),
    outline(4, BLACK),
    "startBtn",
    area(),
]);
startBtn.add([
    anchor("center"),
    text("Press to play",{
        size:12,
    }),
    color(0,0,0)
])
onClick("startBtn",()=>{
    go("level1")
})
}