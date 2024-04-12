import Phaser from "phaser";
import StageOne from "../scenes/stageOne";

export default class TileHandler {
    private scene: Phaser.Scene;
    private selected_tile: Phaser.GameObjects.Sprite | null = null;
    private border: Phaser.GameObjects.Graphics | null = null;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
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
            tile.x - tile.width / 2,
            tile.y - tile.height / 2,
            tile.width,
            tile.height
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
        const columns = 3;
        const rows = 3;

        for (let row = 0; row < rows; row++) {
            let rowTiles: Phaser.GameObjects.Sprite[] = [];
            for (let col = 0; col < columns; col++) {
                const index = col + row * columns;
                const tile = children[index];
                rowTiles.push(tile);
            }
            this.doSomethingWithTile(rowTiles);
        }
    }

    private doSomethingWithTile(rowTiles: Phaser.GameObjects.Sprite[]) {
        let row1 = rowTiles[0].name + rowTiles[1].name + rowTiles[2].name;
        console.log(row1);

        if (
            row1.includes("tort") ||
            row1.includes("torf") ||
            row1.includes("fort") ||
            row1.includes("tandt")
        ) {
            StageOne.score += 500;
        }
    }
}
