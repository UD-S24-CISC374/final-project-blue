import { Stage } from "../objects/stage";

export default class StageOneNew extends Stage {
    constructor() {
        super("StageOneNew", 450, 150, 3, 3, 415, 135);
        // {450, 150} 450 / 150 = 3 -> represents grid size
        // {3, 3} -> positioning for tiles based on matrix size
        // {415, 135} -> x and y positioning of tiles
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();
    }

    update() {
        super.update();
    }

    addTilesToGroup() {
        this.boardGroup.add(this.add.sprite(0, 0, "tiles", 0).setName("and"));

        for (let i = 0; i < 2; i++) {
            this.boardGroup.add(this.add.sprite(0, 0, "tiles", 2).setName("f"));
            this.boardGroup.add(
                this.add.sprite(0, 0, "tiles", 1).setName("or")
            );
        }

        for (let i = 0; i < 4; i++) {
            this.boardGroup.add(this.add.sprite(0, 0, "tiles", 3).setName("t"));
        }
    }
}
