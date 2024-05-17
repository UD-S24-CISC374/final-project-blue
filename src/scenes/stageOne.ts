import { Stage } from "../objects/stage";

export default class StageOne extends Stage {
    constructor() {
        super("StageOne", 450, 150, 3, 3, 415, 135);
        // {450, 150} 450 / 150 = 3 -> represents grid size
        // {3, 3} -> positioning for tiles based on matrix size
        // {415, 135} -> x and y positioning of tiles
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();
        this.addTilesToGroup(1, 2, 2, 4);
        this.shuffleTiles();
        let stageText = this.add.text(70, 640, "STAGE 1", {
            fontSize: "40px",
            color: "#EAF2F8",
        });
        stageText.setShadow(5, 5, "#000000", 5, true, true);

        this.add.text(
            75,
            290,
            "Evaluate all\nrows to True\nto proceed to\nthe next stage",
            {
                fontSize: "30px",
                color: "#000000",
                stroke: "#ffffff",
                strokeThickness: 5,
                align: "center",
            }
        );

        let objectiveRectangle = this.add.graphics();

        let background = objectiveRectangle.fillStyle(0x000000, 0.3);
        background.fillRect(50, 275, 300, 170);
    }

    update() {
        super.update();
    }
}
