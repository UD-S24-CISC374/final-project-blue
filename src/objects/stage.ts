import Phaser from "phaser";
import TileHandler from "./tileHandler";

export class Stage extends Phaser.Scene {
    private _boardGroup: Phaser.GameObjects.Group;
    private scoreText: Phaser.GameObjects.Text;
    static score: number = 0;
    static targetGoal: number = 0;
    private tileHandler: TileHandler;
    private gridSize: number;
    private cellSize: number;
    private rows: number;
    private columns: number;
    private xPos: number;
    private yPos: number;
    static restartButton: Phaser.GameObjects.Sprite; // might try and make it a getter

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
        this.load.spritesheet("tiles", "assets/img/spritesheet_maybe.png", {
            frameWidth: 150,
            frameHeight: 150,
        });
        this.load.spritesheet("tiles", "assets/img/spritesheet_select.png", {
            frameWidth: 150,
            frameHeight: 150,
        });

        this.load.image("restartButton", "assets/img/restartButton.png");
    }

    create() {
        this.cameras.main.setBackgroundColor("#566573");
        const grid = this.add.grid(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            this.gridSize,
            this.gridSize,
            this.cellSize,
            this.cellSize,
            0xf7f9f9
        );
        grid.active; // temporary

        this.scoreText = this.add
            .text(this.cameras.main.width - 15, 15, "Score: " + Stage.score, {
                color: "#000000",
                fontSize: "24px",
            })
            .setOrigin(1, -1);

        this.boardGroup = this.add.group();

        if (
            !(
                this.scene.key == "TutorialScene" ||
                this.scene.key == "TutorialScene_2"
            )
        ) {
            Stage.restartButton = this.add.sprite(250, 180, "restartButton");
            Stage.restartButton.setInteractive();
            Stage.restartButton.setScale(0.2);

            Stage.restartButton.on("pointerdown", () => {
                if (!(this.scene.key == "StageComplete")) {
                    Stage.targetGoal = 0;
                    this.scene.start(this.scene.key);
                }
            });
        }
    }

    addTilesToGroup(
        andTiles: number,
        orTiles: number,
        falseTiles: number,
        trueTiles: number
    ) {
        for (let i = 0; i < andTiles; i++) {
            this.boardGroup.add(
                this.add.sprite(0, 0, "tiles", 0).setName("&&")
            );
        }
        for (let i = 0; i < orTiles; i++) {
            this.boardGroup.add(
                this.add.sprite(0, 0, "tiles", 1).setName("||")
            );
        }
        for (let i = 0; i < falseTiles; i++) {
            this.boardGroup.add(
                this.add.sprite(0, 0, "tiles", 2).setName("false")
            );
        }
        for (let i = 0; i < trueTiles; i++) {
            this.boardGroup.add(
                this.add.sprite(0, 0, "tiles", 3).setName("true")
            );
        }
        if (
            !(
                this.scene.key == "TutorialScene" ||
                this.scene.key == "TutorialScene_2"
            )
        ) {
            Phaser.Utils.Array.Shuffle(this.boardGroup.getChildren());
        }
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
