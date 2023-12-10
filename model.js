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
        this.x = 4;
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
        this.isOver = false;
        this.blockCreatedCount = 0;
        this.block = new Block(this.blockCreatedCount++);
        this.nextBlock = new Block(this.blockCreatedCount++);
        this.piles = [];
        for (let i = 0; i < BOARD_Y_LEN; i++) {
            this.piles.push(new Array(BOARD_X_LEN).fill(0));
        }
        this.frame = 0;
    }

    update(command) {
        if (this.isOver) {
            return;
        }
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
        if (this.frame != 0 && this.frame % 20 == 0) {
            this.drop();
        }
        this.frame += 1;
    }

    move(x, y) {
        this.block.x += x;
        this.block.y += y;
        if (this.isCollide()) {
            this.block.x -= x;
            this.block.y -= y;
        }
    }

    isCollide() {
        const pattern = this.block.getPattern();
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (pattern[i][j] == 1) {
                    if (this.block.x + j < 0) {
                        return true;
                    }
                    if (this.block.x + j >= BOARD_X_LEN) {
                        return true;
                    }
                    if (this.block.y + i >= BOARD_Y_LEN) {
                        return true;
                    }
                    if (this.piles[this.block.y + i][this.block.x + j] != 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    rotate(dir) {
        let savedRot = this.block.rot;
        this.block.rot = (4 + this.block.rot + dir) % 4;
        if (this.isCollide()) {
            this.block.rot = savedRot;
        }
    }

    drop() {
        this.block.y += 1;
        if (this.isCollide()) {
            this.block.y -= 1;
             this.settle();
        }
    }

    settle() {
        const pattern = this.block.getPattern();
        for (let j = 0; j < 5; j++) {
            for (let i = 0; i < 5; i++) {
                if (pattern[j][i] == 1) {
                    this.piles[this.block.y + j][this.block.x + i] = 2 + this.block.color;
                }
            }
        }
        this.checkEraseRows();
        this.block = this.nextBlock;
        if (this.isCollide()) {
            this.isOver = true;
        }
        this.nextBlock = new Block(this.blockCreatedCount++);
    }

    checkEraseRows() {
        let filledRows = [];
        for (let i = BOARD_Y_LEN - 1; i >= 0; i--) {
            if (this.piles[i].every(pile => pile != 0)) {
                filledRows.push(i);
            }
        }
        for (let filledRow of filledRows) {
            this.piles.splice(filledRow, 1);
        }
        for (let filledRow of filledRows) {
            this.piles.unshift(new Array(BOARD_X_LEN).fill(0));
        }
    }
}

function randRange(max) {
    return Math.floor(Math.random() * max);
}
