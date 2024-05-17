export class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene')
    }
    preload() {
        // Image  
        this.load.image('paper', '/assets/background/paper.png')
        this.load.image('sky', 'assets/background/sky.png')
        this.load.image('block', 'assets/input/block.png');
        this.load.image('rub', 'assets/input/rub.png');
        this.load.image('end', 'assets/input/end.png');
        this.load.image('tiles', '/assets/background/dungeon.png')
        this.load.image('tree', '/assets/background/tree.png')
        this.load.image('grass', '/assets/background/grass.png')

        // Atlas
        this.load.atlas('lizard', '/assets/stuff/lizard.png', '/assets/stuff/lizard.json')
        this.load.atlas('treasure', '/assets/stuff/treasure.png', '/assets/stuff/treasure.json')
        this.load.atlas('character', '/assets/characters/character.png', '/assets/characters/character.json')
        this.load.tilemapTiledJSON('dungeon', '/assets/background/map03.json')

        // Font 
        this.load.bitmapFont('arcade', 'assets/fonts/bitmap/arcade.png', 'assets/fonts/bitmap/arcade.xml');
    
        // Spritesheet 
        this.load.spritesheet('enchantress_idle', '/assets/characters/enchantress.png', {
            frameWidth: 128, 
            frameHeight: 128,
            spacing: 0
        })   
        this.load.spritesheet('knight_idle', '/assets/characters/knight.png', {
            frameWidth: 128, 
            frameHeight: 128,
            spacing: 0
        }) 
        this.load.spritesheet('enchantress_attack', '/assets/characters/enchantress_attack.png', {
            frameWidth: 128, 
            frameHeight: 128,
            spacing: 0
        })   
        this.load.spritesheet('knight_attack', '/assets/characters/knight_attack.png', {
            frameWidth: 128, 
            frameHeight: 128,
            spacing: 0
        })
    }
    create() {
        this.scene.stop('PreloadScene')
        this.scene.start('InitScene')
    }
} 