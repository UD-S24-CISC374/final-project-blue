import Phaser from "phaser";

export default class Swap {
    private scene: Phaser.Scene;
    private selected_tile: Phaser.GameObjects.Sprite | null = null;

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
                    } else {
                        this.swapTiles(this.selected_tile, tile);
                        this.selected_tile = null;
                    }
                });
            }
        );
    }

    private swapTiles(
        tile1: Phaser.GameObjects.Sprite,
        tile2: Phaser.GameObjects.Sprite
    ) {
        const tempX = tile1.x;
        const tempY = tile1.y;

        tile1.setPosition(tile2.x, tile2.y);
        tile2.setPosition(tempX, tempY);
    }
}
