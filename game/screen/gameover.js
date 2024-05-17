export class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene')
    }

    preload() {
        this.load.tilemapTiledJSON('gameoverscreen', '/assets/background/gameover.json')
    }

    init(data) {
    }

    create() {
        const map = this.make.tilemap({ key: 'gameoverscreen' })

        const grassTileset = map.addTilesetImage('grass', 'grass')
        const treeTileset = map.addTilesetImage('tree', 'tree')        
        map.createLayer('grass', grassTileset, 0, 0)
        map.createLayer('tree', treeTileset, 0, 0)

        this.add.bitmapText(10, 10, 'arcade', 'E viveram felizes para sempre ?', 12).setTint(0xffffff);
    }
}