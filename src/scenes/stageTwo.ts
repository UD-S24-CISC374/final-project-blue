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
    }

    update() {
        super.update();
    }
}
