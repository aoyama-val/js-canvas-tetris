const BOARD_X_LEN = 10;
const BOARD_Y_LEN = 20;

const COMMAND_LEFT         = "left";
const COMMAND_RIGHT        = "right";
const COMMAND_DOWN         = "down";
const COMMAND_RORATE_LEFT  = "rotate_left";
const COMMAND_RORATE_RIGHT = "rotate_right";

const Shapes = [
    [
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,0,0,0],
    ],
    [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,1,0],
        [0,0,0,0,0],
    ],
    [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,1,1,0,0],
        [0,0,0,0,0],
    ],
    [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,1,1,0],
        [0,0,1,1,0],
        [0,0,0,0,0],
    ],
    [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,1,1,1,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
    ],
    [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,0,1,1,0],
        [0,0,0,1,0],
        [0,0,0,0,0],
    ],
    [
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,1,1,0,0],
        [0,1,0,0,0],
        [0,0,0,0,0],
    ],
];

class Block {
    constructor(color) {
        this.x = 0;
        this.y = 0;
        this.rot = randRange(4);
        this.shape = randRange(Shapes.length);
        this.color = color % 3;
    }

    getPattern() {
        let result = Shapes[this.shape];
        for (let n = 0; n < this.rot; n++) {
            const next = [];
            for (let i = 0; i < 5; i++) {
                next.push(new Array(5).fill(0));
            }
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    next[4 - j][i] = result[i][j];
                }
            }
            result = next;
        }
        return result;
    }
}

class Game {
    constructor() {
        this.blockCreatedCount = 0;
        this.block = new Block(this.blockCreatedCount++);
        this.nextBlock = new Block(this.blockCreatedCount++);
        this.piles = [];
        for (let i = 0; i < BOARD_Y_LEN; i++) {
            this.piles.push(new Array(BOARD_X_LEN).fill(0));
        }
    }

    update(command) {
        switch (command) {
            case COMMAND_LEFT:
                this.move(-1, 0);
                break;
            case COMMAND_RIGHT:
                this.move(1, 0);
                break;
            case COMMAND_DOWN:
                this.move(0, 1);
                break;
            case COMMAND_RORATE_LEFT:
                this.rotate(1);
                break;
            case COMMAND_RORATE_RIGHT:
                this.rotate(-1);
                break;
        }
    }

    move(x, y) {
        this.block.x += x;
        this.block.y += y;
    }

    rotate(dir) {
        this.block.rot = (4 + this.block.rot + dir) % 4;
        console.log(this.block);
    }
}

function randRange(max) {
    return Math.floor(Math.random() * max);
}
