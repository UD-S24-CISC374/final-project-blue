import Phaser from "phaser";

export default class MainMenuScene extends Phaser.Scene {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private tutorialButton!: Phaser.GameObjects.Image;
    private gameButton!: Phaser.GameObjects.Image;

    constructor() {
        super({ key: "main-menu" });
    }

    init() {
        const cursorkeys = this.input.keyboard?.createCursorKeys();
        if (cursorkeys) {
            this.cursors = cursorkeys;
        } else {
            console.error("error");
        }
    }

    preload() {
        this.load.image("mainmenubg", "assets/img/mainmenubackground.png");
        this.load.image("title", "assets/img/title.png");
        this.load.image("tutorialButton", "assets/img/tutorialButton.png");
        this.load.image("playButton", "assets/img/playButton.png");
    }

    create() {
        let background = this.add.image(0, 0, "mainmenubg").setOrigin(0);
        background.setScale(
            this.cameras.main.width / background.width,
            this.cameras.main.height / background.height
        );

        let title = this.add.image(1000, 600, "title");
        title.setScale(0.6);

        this.tutorialButton = this.add
            .image(245, 100, "tutorialButton")
            .setInteractive();
        this.tutorialButton.setScale(0.4);
        this.tutorialButton.on("pointerdown", () => {
            this.scene.start("TutorialScene");
        });

        this.tutorialButton.on("pointerover", () => {
            this.tutorialButton.setScale(0.42);
        });

        this.tutorialButton.on("pointerout", () => {
            this.tutorialButton.setScale(0.4);
        });

        this.gameButton = this.add
            .image(200, 180, "playButton")
            .setInteractive();
        this.gameButton.setScale(0.3);
        this.gameButton.on("pointerdown", () => {
            this.scene.start("StageOne");
        });

        this.gameButton.on("pointerover", () => {
            this.gameButton.setScale(0.32);
        });

        this.gameButton.on("pointerout", () => {
            this.gameButton.setScale(0.3);
        });
    }

    update() {}
}
