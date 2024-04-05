import Phaser from "phaser";

export default class StageOne extends Phaser.Scene {
    private boardGroup: Phaser.GameObjects.Group;
    constructor() {
        super({ key: "StageOne" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#61F1FF");

        const cellSize = 100;

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
        }
    }
    private onCellClicked(cell: Phaser.GameObjects.Sprite) {
        cell.setScale(1.5);
    }
}
