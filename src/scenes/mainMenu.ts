import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super('main-menu');
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    preload() {
        
    }

    create() {
        
    }


    update() {
        
    }
}
