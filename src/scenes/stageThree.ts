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
    }

    update() {
        super.update();
    }
}
