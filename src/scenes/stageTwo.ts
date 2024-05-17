import { Stage } from "../objects/stage";

export default class StageTwo extends Stage {
    constructor() {
        super("StageTwo", 450, 90, 5, 5, 385, 105);
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();
        this.addTilesToGroup(5, 5, 8, 7);
        this.boardGroup.scaleXY(-0.4);
        this.shuffleTiles();
        let stageText = this.add.text(80, 640, "STAGE 2", {
            fontSize: "40px",
            color: "#EAF2F8",
        });
        stageText.setShadow(1, 4, "#000000", 10, true, true);
    }

    update() {
        super.update();
    }
}
