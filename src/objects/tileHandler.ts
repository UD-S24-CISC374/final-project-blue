import Phaser from "phaser";
import { Stage } from "./stage";

export default class TileHandler {
    private scene: Phaser.Scene;
    private selected_tile: Phaser.GameObjects.Sprite | null = null;
    private border: Phaser.GameObjects.Graphics | null = null;
    private rows: number;
    private columns: number;
    private cellSize: number;

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
                        this.rowCheck(group);
                    }
                });
            }
        );
    }

    private highlightTile(tile: Phaser.GameObjects.Sprite) {
        this.border = this.scene.add.graphics();
        this.border.lineStyle(10, 0xffef79);
        this.border.strokeRect(
            tile.x - this.cellSize / 2,
            tile.y - this.cellSize / 2,
            this.cellSize,
            this.cellSize
        );
    }

    private removeHighlight() {
        if (this.border) {
            this.border.destroy();
            this.border = null;
        }
    }

    private swapTiles(
        group: Phaser.GameObjects.Group,
        tile1: Phaser.GameObjects.Sprite,
        tile2: Phaser.GameObjects.Sprite
    ) {
        const index = group.getChildren().indexOf(tile1);
        const index2 = group.getChildren().indexOf(tile2);

        Phaser.Utils.Array.MoveTo(group.getChildren(), tile2, index);
        Phaser.Utils.Array.MoveTo(group.getChildren(), tile1, index2);

        const tempX = tile1.x;
        const tempY = tile1.y;
        tile1.setPosition(tile2.x, tile2.y);
        tile2.setPosition(tempX, tempY);
    }

    private rowCheck(group: Phaser.GameObjects.Group) {
        const children = group.getChildren() as Phaser.GameObjects.Sprite[];
        const columns = this.columns;
        const rows = this.rows;

        for (let row = 0; row < rows; row++) {
            let rowTiles: Phaser.GameObjects.Sprite[] = [];
            for (let col = 0; col < columns; col++) {
                const index = col + row * columns;
                const tile = children[index];
                rowTiles.push(tile);
            }
            this.scoreCheck(rowTiles);
        }
    }

    // so far this only works for a 3x3
    private scoreCheck(rowTiles: Phaser.GameObjects.Sprite[]) {
        if (rowTiles.length == 3) {
            let row1 = rowTiles[0].name + rowTiles[1].name + rowTiles[2].name;
            console.log(row1);

            if (
                row1.includes("tort") ||
                row1.includes("torf") ||
                row1.includes("fort") ||
                row1.includes("tandt")
            ) {
                Stage.score += 500;
            }
            if (Stage.score >= 2000) {
                this.scene.scene.start("StageTwo");
            }
        }

        if (rowTiles.length == 5) {
            let row1 =
                rowTiles[0].name +
                rowTiles[1].name +
                rowTiles[2].name +
                rowTiles[3].name +
                rowTiles[4].name;
            console.log(row1);

            // need to get the reverse or change this
            if (
                row1.includes("tortorf") ||
                row1.includes("tortandf") ||
                row1.includes("tandtorf") ||
                row1.includes("torfort") ||
                row1.includes("torfandt") ||
                row1.includes("tandfort") ||
                row1.includes("torforf") ||
                row1.includes("torfandf") ||
                row1.includes("tandforf") ||
                row1.includes("tortort") ||
                row1.includes("tandtandt") ||
                row1.includes("tortandt") ||
                row1.includes("tandtort")
            ) {
                Stage.score += 500;
            }
        }
    }
}
