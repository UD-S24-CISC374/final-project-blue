import Phaser from "phaser";

export default class MainMenuScene extends Phaser.Scene {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private tutorialButton!: Phaser.GameObjects.Text;
    private gameButton!: Phaser.GameObjects.Text;

    constructor() {
        super("main-menu");
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
        
    }

    create() {
        this.tutorialButton = this.add
            .text(100, 100, "Tutorial", { color: "#0f0" })
            .setInteractive();
        this.tutorialButton.on("pointerdown", () => {
            this.scene.start("tutorialScene");
        });
 
        this.gameButton = this.add
            .text(100, 150, "Play", { color: "#f00" })
            .setInteractive();
        this.gameButton.on("pointerdown", () => {
            this.scene.start("stageOne");
        });
    
    }


    update() {}
}
