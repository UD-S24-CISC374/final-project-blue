import Phaser from "phaser";

export default class GameComplete extends Phaser.Scene {
    constructor() {
        super({ key: "GameComplete" });
    }

    preload() {}

    create() {
        this.add.rectangle(
            0,
            0,
            this.cameras.main.width * 2,
            this.cameras.main.height * 2,
            0x17202a
        );

        this.add.text(250, 300, "You've completed all the levels!", {
            fontSize: "40px",
            color: "#ffffff",
        });
    }

    update() {}
}
