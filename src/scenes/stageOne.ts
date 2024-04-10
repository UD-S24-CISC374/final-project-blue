import Phaser from "phaser";
import Swap from "../objects/swap";

export default class StageOne extends Phaser.Scene {
    private boardGroup: Phaser.GameObjects.Group;
    private swap: Swap;

    constructor() {
        super({ key: "StageOne" });
    }

    preload() {
        this.load.spritesheet("tiles", "assets/img/tile_spritesheet.png", {
            frameWidth: 150,
            frameHeight: 150,
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
            key: "tiles",
            frame: [0, 2, 3],
            frameQuantity: 3,
            randomKey: true,
        });

        Phaser.Actions.GridAlign(group.getChildren(), {
            width: 3,
            height: 3,
            cellWidth: 150,
            cellHeight: 150,
            x: 410,
            y: 130,
        });
        this.swap = new Swap(this);
        this.swap.tileSetup(group);
    }
}
