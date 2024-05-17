import Phaser from "phaser";
import TileHandler from "./tileHandler";

export class Stage extends Phaser.Scene {
    private _boardGroup: Phaser.GameObjects.Group;
    static targetGoal: number = 0;
    private tileHandler: TileHandler;
    private gridSize: number;
    private cellSize: number;
    private rows: number;
    private columns: number;
    private xPos: number;
    private yPos: number;
    private button: Phaser.GameObjects.Sprite | null = null;

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

        this.load.image("shuffleButton", "assets/img/shuffleButton.png");
        this.load.image("background1", "assets/img/stage1bg.png");
        this.load.image("background2", "assets/img/stage2bg.png");
        this.load.image("background3", "assets/img/stage3bg.png");
    }

    create() {
        let background;
        if (this.scene.key == "StageThree") {
            background = this.add.image(0, 0, "background3").setOrigin(0);
        } else if (this.scene.key == "StageTwo") {
            background = this.add.image(0, 0, "background2").setOrigin(0);
        } else {
            background = this.add.image(0, 0, "background1").setOrigin(0);
        }
        background.setScale(
            this.cameras.main.width / background.width,
            this.cameras.main.height / background.height
        );

        this.cameras.main.setScroll(0, 0);
        //this.cameras.main.setBackgroundColor("#566573");
        const grid = this.add.grid(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            this.gridSize,
            this.gridSize,
            this.cellSize,
            this.cellSize,
            0xd5d8dc
        );
        grid.active; // temporary
        grid.setAlpha(0.75);

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

    update() {}

    shuffleTiles() {
        this.button = this.add.sprite(
            this.cameras.main.width - 110,
            30,
            "shuffleButton"
        );
        this.button.setInteractive();
        this.button.setScale(0.2);

        this.button.on("pointerover", () => {
            this.button?.setScale(0.22);
        });

        this.button.on("pointerout", () => {
            this.button?.setScale(0.2);
        });

        this.button.on("pointerdown", () => {
            const children =
                this.boardGroup.getChildren() as Phaser.GameObjects.Sprite[];

            children.forEach((child: Phaser.GameObjects.Sprite) => {
                if (child.input?.enabled) {
                    if (child.name == "&&" || child.name == "||") {
                        this.getRandomOperator(0, 1, child);
                    } else {
                        this.getRandomValue(2, 3, child);
                    }
                }
            });
        });
    }

    getRandomOperator(
        min: number,
        max: number,
        child: Phaser.GameObjects.Sprite
    ) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

        switch (randomNum) {
            case 0:
                child.setTexture("tiles", 0).setName("&&");
                break;
            case 1:
                child.setTexture("tiles", 1).setName("||");
                break;
            default:
                break;
        }
    }
    getRandomValue(min: number, max: number, child: Phaser.GameObjects.Sprite) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

        switch (randomNum) {
            case 2:
                child.setTexture("tiles", 2).setName("false");

                break;
            case 3:
                child.setTexture("tiles", 3).setName("true");
                break;
            default:
                break;
        }
    }
}
