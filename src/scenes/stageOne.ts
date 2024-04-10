import Phaser from "phaser";

export default class StageOne extends Phaser.Scene {
    private boardGroup: Phaser.GameObjects.Group;
    constructor() {
        super({ key: "StageOne" });
    }

    preload() {
        this.load.spritesheet("diamonds", "assets/img/diamonds32x24x5.png", {
            frameWidth: 32,
            frameHeight: 24,
        });
    }

    create() {
        this.cameras.main.setBackgroundColor("#61F1FF");
        // creates a 3x3 grid (450/150 = 3, hence 3x3)
        const grid = this.add.grid(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            450,
            450,
            150,
            150,
            0x909090
        );
        const message = "List: " + grid.cellHeight + ", " + grid.cellWidth;
        this.add
            .text(this.cameras.main.width - 15, 15, message, {
                color: "#000000",
                fontSize: "24px",
            })
            .setOrigin(1, -1);

        const group = this.add.group({
            key: "diamonds",
            frame: [0, 1, 2],
            frameQuantity: 3,
        });

        Phaser.Actions.GridAlign(group.getChildren(), {
            width: 3,
            height: 3,
            cellWidth: 150,
            cellHeight: 150,
            x: 472.5,
            y: 200,
        });
        Phaser.Actions.ScaleXY(group.getChildren(), 2, 2);

        /* const cellSize = 100;

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.boardGroup = this.add.group();

        // creates the board
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const x = j * cellSize + cellSize / 2 + centerX / 1.5;
                const y = i * cellSize + cellSize / 2 + centerY / 1.5;

                const cell = this.add.sprite(x, y, "cellImage");

                cell.setInteractive();

                this.boardGroup.add(cell);

                // increases tile size
                cell.on("pointerdown", () => {
                    this.onCellClicked(cell);
                });
            }
        }*/
    }
    private onCellClicked(diamonds: Phaser.GameObjects.Sprite) {
        diamonds.setScale(1.5);
    }
}
