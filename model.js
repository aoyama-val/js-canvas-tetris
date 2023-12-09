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
];

class Block {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.rot = 0;
        this.shape = 0;
    }

    getPattern() {
        // TODO: consider rotate
        return Shapes[this.shape];
    }
}

class Game {
    constructor() {
        this.block = new Block();
        this.nextBlock = new Block();
        this.piles = [];
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
        }
    }

    move(x, y) {
        this.block.x += x;
        this.block.y += y;
    }

    rotate(dir) {
        this.block.rot = (this.block.rot + 1) % 4;
    }
}
