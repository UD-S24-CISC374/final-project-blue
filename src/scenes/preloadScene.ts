import Phaser from "phaser";
import TutorialScene from "./tutorialScene";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("phaser-logo", "assets/img/phaser-logo.png");
        this.load.image("nextStage", "assets/img/nextStage.png");
        this.load.audio("tileClearSound", "assets/sound/tileClearSound.mp3");
    }

    create() {
        this.scene.start("TutorialScene");
    }
}
