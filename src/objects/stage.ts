import Phaser from "phaser";
import TileHandler from "./tileHandler";

export class Stage extends Phaser.Scene {
    private _boardGroup: Phaser.GameObjects.Group;
    private scoreText: Phaser.GameObjects.Text;
    static score: number = 0;
    private tileHandler: TileHandler;
    private gridSize: number;
    private cellSize: number;
    private rows: number;
    private columns: number;
    private xPos: number;
    private yPos: number;

    constructor(
        key: string,
        gridSize: number,
        cellSize: number,
        rows: number,
        columns: number,
        xPos: number,
        yPos: number
    ) {
        super({ key });
        this.gridSize = gridSize;
        this.cellSize = cellSize;
        this.rows = rows;
        this.columns = columns;
        this.xPos = xPos;
        this.yPos = yPos;
    }

    get boardGroup(): Phaser.GameObjects.Group {
        return this._boardGroup;
    }

    set boardGroup(group: Phaser.GameObjects.Group) {
        this._boardGroup = group;
    }

    preload() {
        this.load.spritesheet("tiles", "assets/img/tile_spritesheet.png", {
            frameWidth: 150,
            frameHeight: 150,
        });
    }

    create() {
        this.cameras.main.setBackgroundColor("#C9E5F3");

        const grid = this.add.grid(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            this.gridSize,
            this.gridSize,
            this.cellSize,
            this.cellSize,
            0x909090
        );
        grid.active; // temporary

        this.scoreText = this.add
            .text(this.cameras.main.width - 15, 15, "Score: " + Stage.score, {
                color: "#000000",
                fontSize: "24px",
            })
            .setOrigin(1, -1);

        this.boardGroup = this.add.group();
    }

    addTilesToGroup(
        andTiles: number,
        orTiles: number,
        falseTiles: number,
        trueTiles: number
    ) {
        for (let i = 0; i < andTiles; i++) {
            this.boardGroup.add(
                this.add.sprite(0, 0, "tiles", 0).setName("and")
            );
        }
        for (let i = 0; i < orTiles; i++) {
            this.boardGroup.add(
                this.add.sprite(0, 0, "tiles", 1).setName("or")
            );
        }
        for (let i = 0; i < falseTiles; i++) {
            this.boardGroup.add(this.add.sprite(0, 0, "tiles", 2).setName("f"));
        }
        for (let i = 0; i < trueTiles; i++) {
            this.boardGroup.add(this.add.sprite(0, 0, "tiles", 3).setName("t"));
        }
        Phaser.Utils.Array.Shuffle(this.boardGroup.getChildren());

        Phaser.Actions.GridAlign(this.boardGroup.getChildren(), {
            width: this.columns,
            height: this.rows,
            cellWidth: this.cellSize,
            cellHeight: this.cellSize,
            x: this.xPos,
            y: this.yPos,
        });
        this.tileHandler = new TileHandler(
            this,
            this.rows,
            this.columns,
            this.cellSize
        );
        this.tileHandler.tileSetup(this.boardGroup);
    }

    update() {
        this.scoreText.setText("Score: " + Stage.score);
    }
}
