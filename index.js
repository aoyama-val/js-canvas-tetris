const FPS = 30;
const CELL_SIZE_PX = 20;
const NEXT_BLOCK_X = 20;
const LEFT_WALL_X = 6;

const game = new Game();
const commands = [];
let ctx;

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
    game.update(commands[commands.length - 1]);
    commands.splice(0);
    render();
    setTimeout(onTick, 1000 / FPS);
}

function render() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 640, 420);
    // render walls
    for (let i = 0; i < BOARD_Y_LEN; i++) {
        renderSquare(LEFT_WALL_X, i, "rgb(128, 128, 128)");
        renderSquare(LEFT_WALL_X + BOARD_X_LEN + 1, i, "rgb(128, 128, 128)");
    }
    // render floor
    for (let i = 0; i < BOARD_X_LEN + 2; i++) {
        renderSquare(LEFT_WALL_X + i, BOARD_Y_LEN, "rgb(128, 128, 128)");
    }
    // render piles
    for (let j = 0; j < BOARD_Y_LEN; j++) {
        for (let i = 0; i < BOARD_X_LEN; i++) {
            switch (game.piles[j][i]) {
                case 0:
                    continue;
                case 2:
                    color = "rgb(255, 128, 128)";
                    break;
                case 3:
                    color = "rgb(128, 255, 128)";
                    break;
                case 4:
                    color = "rgb(128, 128, 255)";
                    break;
            }
            renderSquare(LEFT_WALL_X + 1 + i, j, color);
        }
    }
    // render block
    renderBlock(game.block, LEFT_WALL_X + 1, 0);
    // render next block
    renderBlock(game.nextBlock, NEXT_BLOCK_X, 0);
}

function renderSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE_PX, y * CELL_SIZE_PX, CELL_SIZE_PX, CELL_SIZE_PX);
}

function renderBlock(block, offx, offy) {
    let color;
    switch (block.color) {
        case 0:
            color = "rgb(255, 128, 128)";
            break;
        case 1:
            color = "rgb(128, 255, 128)";
            break;
        case 2:
            color = "rgb(128, 128, 255)";
            break;
    }

    const pattern = block.getPattern();
    for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[i].length; j++) {
            if (pattern[i][j] != 0) {
                renderSquare(block.x + j + offx, block.y + i + offy, color);
            }
        }
    }
}
