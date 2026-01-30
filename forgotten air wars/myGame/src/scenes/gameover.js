export const gameOverScene=()=>{
    var backToMenuBtn = add([
    anchor("center"),
    pos(center()),
    rect(100, 80, { radius: 8 }),
    outline(4, BLACK),
    "backToMenuBtn",
    area(),
]);
backToMenuBtn.add([
    anchor("center"),
    text("back to menu",{
        size:12,
    }),
    color(0,0,0)
])
//Start game
onClick("backToMenuBtn",()=>{
    go("menu")
})
}