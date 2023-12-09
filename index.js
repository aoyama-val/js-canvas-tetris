const FPS = 30;
const CELL_SIZE_PX = 20;

const game = {
    block: {
        x: 0,
        y: 0,
        rot: 0,
    },
    piles: [],
};
const commands = [];
let ctx;

for (let i = 0; i < BOARD_Y_LEN; i++) {
    game.piles.push(new Array(BOARD_X_LEN).fill(0));
}

window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    setTimeout(onTick, 1000 / FPS);

});

window.addEventListener("keydown", (ev) => {
    switch (ev.key) {
        case "ArrowLeft":
            commands.push(COMMAND_LEFT);
            break;
        case "ArrowRight":
            commands.push(COMMAND_RIGHT);
            break;
        case "ArrowDown":
            commands.push(COMMAND_DOWN);
            break;
        case "z":
            commands.push(COMMAND_RORATE_LEFT);
            break;
        case "x":
            commands.push(COMMAND_RORATE_RIGHT);
            break;
        default:
            return;
    }
    ev.preventDefault();
});

function onTick() {
    for (let command of commands) {
        switch (command) {
            case COMMAND_LEFT:
                game.block.x -= 1;
                break;
            case COMMAND_RIGHT:
                game.block.x += 1;
                break;
            case COMMAND_DOWN:
                game.block.y += 1;
                break;
        }
    }
    commands.splice(0);
    render();
    setTimeout(onTick, 1000 / FPS);
}

function render() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 640, 420);
    ctx.fillStyle = "green";
    ctx.fillRect(game.block.x * CELL_SIZE_PX, game.block.y * CELL_SIZE_PX, CELL_SIZE_PX, CELL_SIZE_PX);
    // render walls
    for (let i = 0; i < BOARD_Y_LEN; i++) {
        renderSquare(6, i, "rgb(128, 128, 128)");
        renderSquare(6 + BOARD_X_LEN + 1, i, "rgb(128, 128, 128)");
    }
    // render floor
    for (let i = 0; i < BOARD_X_LEN + 2; i++) {
        renderSquare(6 + i, BOARD_Y_LEN, "rgb(128, 128, 128)");
    }
    // render piles
    // render block
    // render next block
}

function renderSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE_PX, y * CELL_SIZE_PX, CELL_SIZE_PX, CELL_SIZE_PX);
}
