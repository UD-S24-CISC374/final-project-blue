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
    }

    update() {
        super.update();
    }
}
