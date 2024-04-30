import Phaser from "phaser";

export default class StageComplete extends Phaser.Scene {
    constructor() {
        super({ key: "StageComplete" });
    }

    preload() {}

    create() {
        const backgroundColor = this.add.rectangle(
            0,
            0,
            this.cameras.main.width * 2,
            this.cameras.main.height * 2,
            0x17202a
        );
        backgroundColor.setAlpha(0.8); // 20% transparency
        backgroundColor.setDepth(0);
        this.add.text(400, 300, "Stage Complete!", {
            fontSize: "60px",
            color: "#ffffff",
        });

        const coverRectangle = this.add.rectangle(700, 850, 800, 870, 0xffffff);
        coverRectangle.setDepth(1);
        coverRectangle.setAlpha(0.5);
    }

    update() {}
}

// "Stage ____ Complete!"

// Stage ___

// scene.key
//
