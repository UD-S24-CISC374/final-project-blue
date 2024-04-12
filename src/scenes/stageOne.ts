import Phaser from "phaser";
import Swap from "../objects/swap";

export default class StageOne extends Phaser.Scene {
    private boardGroup: Phaser.GameObjects.Group;
    private swap: Swap;
    private scoreText: Phaser.GameObjects.Text;
    static score: number = 0;

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
        this.cameras.main.setBackgroundColor("#C9E5F3");
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

        grid.active; // temporary

        this.scoreText = this.add
            .text(
                this.cameras.main.width - 15,
                15,
                "Score: " + StageOne.score,
                {
                    color: "#000000",
                    fontSize: "24px",
                }
            )
            .setOrigin(1, -1);
        /*const group = this.add.group({
            key: "tiles",
            frame: [0, 2, 3],
            frameQuantity: 3,
            randomKey: true,
        });*/

        // add tiles with unique keys corresponding to their value
        const group = this.add.group();
        group.add(this.add.sprite(0, 0, "tiles", 0).setName("and"));
        for (let i = 0; i < 2; i++) {
            group.add(this.add.sprite(0, 0, "tiles", 2).setName("f"));
            group.add(this.add.sprite(0, 0, "tiles", 1).setName("or"));
        }
        for (let i = 0; i < 4; i++) {
            group.add(this.add.sprite(0, 0, "tiles", 3).setName("t"));
        }

        Phaser.Utils.Array.Shuffle(group.getChildren());

        Phaser.Actions.GridAlign(group.getChildren(), {
            width: 3,
            height: 3,
            cellWidth: 150,
            cellHeight: 150,
            x: 416,
            y: 135,
        });
        this.swap = new Swap(this);
        this.swap.tileSetup(group);
    }

    update() {
        this.scoreText.setText("Score: " + StageOne.score);
    }
}
