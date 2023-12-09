const g = {
    commands: [],
    block: {
        x: 0,
        y: 0,
        rot: 0,
    },
    piles: [],
};

for (let i = 0; i < BOARD_Y_LEN; i++) {
    g.piles.push(new Array(BOARD_X_LEN).fill(0));
}

window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 640, 420);
    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 150, 100);
});

window.addEventListener("keydown", (ev) => {
    switch (ev.key) {
        case "ArrowLeft":
            g.commands.push(COMMAND_LEFT);
            break;
        case "ArrowRight":
            g.commands.push(COMMAND_RIGHT);
            break;
        case "ArrowDown":
            g.commands.push(COMMAND_DOWN);
            break;
        case "z":
            g.commands.push(COMMAND_RORATE_LEFT);
            break;
        case "x":
            g.commands.push(COMMAND_RORATE_RIGHT);
            break;
    }
});

function render() {
    // render walls
    // render floor
    // render piles
    // render block
    // render next block
}
