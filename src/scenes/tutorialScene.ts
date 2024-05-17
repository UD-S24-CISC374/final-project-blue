import { Stage } from "../objects/stage";

export default class TutorialScene extends Stage {
    constructor() {
        super("TutorialScene", 450, 150, 1, 3, 415, 285);
        // {450, 150} 450 / 150 = 3 -> represents grid size
        // {3, 3} -> positioning for tiles based on matrix size
        // {415, 135} -> x and y positioning of tiles
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();
        this.addTilesToGroup(1, 0, 0, 2);
        const tutText = this.add.text(
            this.cameras.main.width / 20,
            this.cameras.main.height / 4,
            'Try creating "True and True" to clear the board',
            {
                fontSize: "40px",
                color: "#000000",
                stroke: "#EAF2F8",
                strokeThickness: 5,
            }
        );

        const graphics = this.add.graphics();

        const paddingX = 100;
        const paddingY = 15;
        const rectWidth = tutText.width + 2 * paddingX;
        const rectHeight = tutText.height + 2 * paddingY;

        graphics.strokeRect(
            tutText.x - paddingX,
            tutText.y - paddingY,
            rectWidth,
            rectHeight
        );

        const background = graphics.fillStyle(0x000000, 0.3);
        background.fillRect(
            tutText.x - paddingX,
            tutText.y - paddingY,
            rectWidth,
            rectHeight
        );

        tutText.setAlpha(0);

        this.tweens.add({
            targets: tutText,
            alpha: 1,
            duration: 1000,
            yoyo: true,
            repeat: -1,
        });
    }

    update() {
        super.update();
    }
}
