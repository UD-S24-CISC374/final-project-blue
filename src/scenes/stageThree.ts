import { Stage } from "../objects/stage";

export default class StageThree extends Stage {
    constructor() {
        super("StageThree", 630, 90, 7, 7, 293, 15);
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();
        this.addTilesToGroup(11, 10, 14, 14);
        this.boardGroup.scaleXY(-0.4);
        this.shuffleTiles();
        let stageText = this.add.text(80, 640, "STAGE 3", {
            fontSize: "40px",
            color: "#EAF2F8",
        });
        stageText.setShadow(5, 5, "#000000", 5, true, true);
    }

    update() {
        super.update();
    }
}
