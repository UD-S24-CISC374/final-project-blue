import Phaser from "phaser";
import MainScene from "./scenes/mainScene";
import PreloadScene from "./scenes/preloadScene";
import StageOne from "./scenes/stageOne";
import StageTwo from "./scenes/stageTwo";
import TutorialScene from "./scenes/tutorialScene";
import TutorialScene_2 from "./scenes/tutorialScene_2";
import StageThree from "./scenes/stageThree";
import StageComplete from "./scenes/stageComplete";
import GameComplete from "./scenes/gameComplete";
import MainMenuScene from "./scenes/mainMenu";

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

export const CONFIG = {
    title: "My Untitled Phaser 3 Game",
    version: "0.0.1",
    type: Phaser.AUTO,
    backgroundColor: "#ffffff",
    scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    },
    scene: [
        PreloadScene,
        MainScene,
        StageOne,
        StageTwo,
        TutorialScene,
        TutorialScene_2,
        StageThree,
        StageComplete,
        GameComplete,
        MainMenuScene,
    ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 300 },
        },
    },
    input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: false,
    },
    render: {
        pixelArt: false,
        antialias: true,
    },
};
