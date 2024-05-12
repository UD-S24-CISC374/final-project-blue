import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("phaser-logo", "assets/img/phaser-logo.png");
        this.load.image("nextStage", "assets/img/nextStage.png");
        this.load.audio("tileClearSound", "assets/sound/tileClearSound.mp3");
        this.load.image("checkButton", "assets/img/checkButton.png");
    }

    create() {
        this.scene.start("main-menu");
    }
}
