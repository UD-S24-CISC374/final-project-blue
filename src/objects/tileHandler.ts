import Phaser from "phaser";
import { Stage } from "./stage";

export default class TileHandler {
    private scene: Phaser.Scene;
    private selected_tile: Phaser.GameObjects.Sprite | null = null;
    private border: Phaser.GameObjects.Graphics | null = null;
    private rows: number;
    private columns: number;
    private cellSize: number;
    private button: Phaser.GameObjects.Sprite | null = null;
    private tileRotationTween: Phaser.Tweens.Tween | null = null;
    private checkButton: Phaser.GameObjects.Sprite;

    constructor(
        scene: Phaser.Scene,
        rows: number,
        columns: number,
        cellSize: number
    ) {
        this.scene = scene;
        this.rows = rows;
        this.columns = columns;
        this.cellSize = cellSize;
    }

    tileSetup(group: Phaser.GameObjects.Group) {
        this.checkButton = this.scene.add.sprite(1075, 360, "checkButton");

        this.checkButton.setScale(0.2);
        this.checkButton.setInteractive();
        this.checkButton.setDepth(1);
        this.checkButton.on("pointerover", () => {
            this.checkButton.setScale(0.22);
        });

        this.checkButton.on("pointerout", () => {
            this.checkButton.setScale(0.2);
        });

        (group.getChildren() as Phaser.GameObjects.Sprite[]).forEach(
            (tile: Phaser.GameObjects.Sprite) => {
                tile.setInteractive();
                tile.on("pointerdown", () => {
                    if (!this.selected_tile) {
                        this.selected_tile = tile;
                        this.highlightTile(tile);
                    } else {
                        this.swapTiles(group, this.selected_tile, tile);
                        this.selected_tile = null;
                        this.removeHighlight();
                        //this.rowCheck(group);
                    }
                });
            }
        );
        this.checkButton.on("pointerdown", () => {
            this.rowCheck(group);
        });
    }

    private highlightTile(tile: Phaser.GameObjects.Sprite) {
        const originalAngle = tile.angle;

        tile.angle = originalAngle + 15;

        this.tileRotationTween = this.scene.tweens.add({
            targets: tile,
            angle: originalAngle,
            duration: 200,
            ease: "Linear",
            repeat: -1,
            yoyo: true,
            onComplete: () => {
                this.scene.tweens.add({
                    targets: tile,
                    angle: 0,
                    duration: 100,
                    ease: "Linear",
                });
            },
        });
    }

    private removeHighlight() {
        if (this.tileRotationTween) {
            this.tileRotationTween.complete();
        }
    }

    private swapTiles(
        group: Phaser.GameObjects.Group,
        tile1: Phaser.GameObjects.Sprite,
        tile2: Phaser.GameObjects.Sprite
    ) {
        const index = group.getChildren().indexOf(tile1);
        const index2 = group.getChildren().indexOf(tile2);

        // Calculate the distance to slide
        const distanceX = tile2.x - tile1.x;
        const distanceY = tile2.y - tile1.y;

        // Move the tiles in the group array
        Phaser.Utils.Array.MoveTo(group.getChildren(), tile2, index);
        Phaser.Utils.Array.MoveTo(group.getChildren(), tile1, index2);

        // Slide animation for tile1
        this.scene.tweens.add({
            targets: tile1,
            x: tile1.x + distanceX,
            y: tile1.y + distanceY,
            duration: 200,
            ease: "Linear",
        });

        // Slide animation for tile2
        this.scene.tweens.add({
            targets: tile2,
            x: tile2.x - distanceX,
            y: tile2.y - distanceY,
            duration: 200,
            ease: "Linear",
        });
    }

    private rowCheck(group: Phaser.GameObjects.Group) {
        const children = group.getChildren() as Phaser.GameObjects.Sprite[];
        const columns = this.columns;
        const rows = this.rows;
        let anyTilesCleared: boolean = false;

        for (let row = 0; row < rows; row++) {
            let rowTiles: Phaser.GameObjects.Sprite[] = [];
            for (let col = 0; col < columns; col++) {
                const index = col + row * columns;
                const tile = children[index];
                rowTiles.push(tile);
            }
            anyTilesCleared = this.scoreCheck(rowTiles, anyTilesCleared);
        }
        if (!anyTilesCleared) {
            this.scene.sound.play("tileWrongSound");
        }
    }

    private scoreCheck(
        rowTiles: Phaser.GameObjects.Sprite[],
        anyTilesCleared: boolean
    ): boolean {
        let row = this.generateExpression(rowTiles);

        if (
            this.scene.scene.key == "TutorialScene" ||
            this.scene.scene.key == "TutorialScene_2"
        ) {
            anyTilesCleared = this.tutorialScoreCheck(rowTiles, row);
            if (anyTilesCleared) {
                return true;
            }
            return false;
        } else {
            // rowTiles[0].input?.enabled checks if a tile is interactive;
            if (this.evaluateExpression(row) && rowTiles[0].input?.enabled) {
                this.disableTiles(rowTiles);

                /* indicates that the board has been cleared and will
                   start the corresponding scene */
                if (Stage.targetGoal == rowTiles.length) {
                    console.log("Target goal met");
                    Stage.targetGoal = 0;
                    this.scene.scene.run("StageComplete");
                    this.continueButton(rowTiles);
                    this.backgroundColorComplete();
                }
                return true;
            }
        }
        if (anyTilesCleared) {
            return true;
        }
        return false;
    }

    private stageTransition(rowTiles: Phaser.GameObjects.Sprite[]) {
        this.scene.scene.stop("StageComplete");
        switch (rowTiles.length) {
            case 3:
                this.scene.scene.start("StageTwo");
                break;
            case 5:
                this.scene.scene.start("StageThree");
                break;
            case 7:
                this.scene.scene.start("GameComplete");
                break;
            default:
                break;
        }
    }

    // tutorial to be completed in different scene parts due to some rows completing at the same time
    // will generate a button to continue
    private tutorialScoreCheck(
        rowTiles: Phaser.GameObjects.Sprite[],
        row: string
    ): boolean {
        // make user perform true and true
        if (row.trimEnd() === "true && true") {
            this.disableTiles(rowTiles);
            this.createContinueButton();
            return true;
        }

        // make user perform false or true
        if (
            row.trimEnd() === "false || true" ||
            row.trimEnd() === "true || false"
        ) {
            this.disableTiles(rowTiles);
            this.createContinueButton();
            return true;
        }
        return false;
    }

    private generateExpression(rowTiles: Phaser.GameObjects.Sprite[]): string {
        let row = "";
        for (let i = 0; i < rowTiles.length; i++) {
            row += rowTiles[i].name + " ";
        }
        console.log(row);
        return row;
    }

    private evaluateExpression(row: string): boolean {
        let expression = false;
        try {
            expression = eval(row);
        } catch (error) {
            console.error("false");
        }
        return expression;
    }

    // disables interactive functionality for the tiles in the row
    private disableTiles(rowTiles: Phaser.GameObjects.Sprite[]) {
        Stage.targetGoal++;

        this.scene.sound.play("tileClearSound");

        rowTiles.forEach((tile) => {
            tile.disableInteractive();
            tile.setTint(0x566573);
        });
    }

    public createContinueButton() {
        this.button = this.scene.add.sprite(640, 650, "nextStage");
        this.button.setInteractive();
        this.button.setScale(0.2);
        this.button.on("pointerover", () => {
            this.button?.setScale(0.22);
        });

        this.button.on("pointerout", () => {
            this.button?.setScale(0.2);
        });

        this.button.on("pointerdown", () => {
            if (this.scene.scene.key == "TutorialScene") {
                this.scene.scene.start("TutorialScene_2");
            } else {
                this.scene.scene.start("StageOne");
            }
        });

        this.button.on("pointerdown", () => {
            if (this.scene.scene.key == "TutorialScene") {
                this.scene.scene.start("TutorialScene_2");
            } else {
                Stage.targetGoal = 0;
                this.scene.scene.start("StageOne");
            }
        });
        this.checkButton.setVisible(false);
    }

    // previous continue button will be for tutorial
    private continueButton(rowTiles: Phaser.GameObjects.Sprite[]) {
        this.button = this.scene.add.sprite(640, 650, "nextStage");
        this.button.setScale(0.2);
        this.button.setInteractive();
        this.button.setDepth(1);
        this.button.on("pointerover", () => {
            this.button?.setScale(0.22);
        });

        this.button.on("pointerout", () => {
            this.button?.setScale(0.2);
        });
        this.button.on("pointerdown", () => {
            this.stageTransition(rowTiles);
        });
        this.checkButton.setVisible(false);
    }

    private backgroundColorComplete() {
        const backgroundColor = this.scene.add.rectangle(
            0,
            0,
            this.scene.cameras.main.width * 2,
            this.scene.cameras.main.height * 2,
            0x17202a
        );
        backgroundColor.setAlpha(0.8);
        backgroundColor.setDepth(0);
    }
}
