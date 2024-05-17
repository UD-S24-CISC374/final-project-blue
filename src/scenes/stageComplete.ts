import Phaser from "phaser";

export default class StageComplete extends Phaser.Scene {
    private button: Phaser.GameObjects.Sprite;

    constructor() {
        super({ key: "StageComplete" });
    }

    preload() {
        this.load.image("nextStage", "assets/img/nextStage.png");
    }

    create() {
        this.add.text(400, 300, "Stage Complete!", {
            fontSize: "60px",
            color: "#ffffff",
        });
    }

    update() {}
}

// "Stage ____ Complete!"

// Stage ___

// scene.key
//
