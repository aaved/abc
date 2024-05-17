import { createCharacterAnims, createChestAnims, createPartnerAnims, createLizardAnims } from '../anims'
import { Chest } from '../physics/chest'
import '../physics/character'
import '../physics/lizard'
import { getContent, OpenDialog, CreateDialog, } from '../utils'
import questions from '../data/questions.json'

const sceneEvents = new Phaser.Events.EventEmitter()

export class GameUIScene extends Phaser.Scene {
    constructor() {
        super('GameUIScene')
        this.items = []
    }
    init({displayName, total}) {
        this.displayName = displayName
        this.total = total
    }
    create() {
        this.add.bitmapText(10, 10, 'arcade', `Oi, ${this.displayName} Tu deves salvar \nsua companheira\nLutando contra seu captor`, 8).setTint(0xffffff);
        this.count = this.add.bitmapText(300, 10, 'arcade', `Items: ${this.items.length} \nde ${this.total}`, 8).setTint(0xffffff);
        this.count.setInteractive()

        this.groupText = this.add.group()
        this.groupText.setActive(false)

        this.count.on('pointerdown', () => { 
            this.groupText.setVisible(!this.groupText.active)
            this.groupText.setActive(!this.groupText.active)
        })
        sceneEvents.on('character-item-add', this.handleCharacterItemAdd, this)
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off('character-item-add', this.handleCharacterItemAdd)
        })
    }

    handleCharacterItemAdd(data) {
        this.items.push(data)
        this.count.text = `Items: ${this.items.length} \nde ${this.total}`
        const text = this.add.bitmapText(50, 50 + (10 * this.items.length), 'arcade', data.name , 8)
        text.setActive(false)
        text.setVisible(false)
        text.setInteractive()
        text.on('pointerdown', () => {
            this.scene.run('ScrollScene', {content: `${data.name}\n\n${data.description}`})
        })
        this.groupText.add(text)
        if(this.items.length === this.total){
            sceneEvents.emit('isCollectedAll')
        }
    }
}


export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
        this.isDialog = false
        this.isCollectedAll = false
    }
    init(data) {
        this.displayName =  data.displayName || 'Anon'
        this.partnerName = data.partnerName || 'enchantress'
    }
    preload(){
        this.cursors = this.input.keyboard.createCursorKeys()
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });   
    }

    

    createMap() {
        this.map = this.make.tilemap({ key: 'dungeon' })
        const dungeonTileset = this.map.addTilesetImage('dungeon', 'tiles')
        const treeTileset = this.map.addTilesetImage('tree', 'tree')
        const grassTileset = this.map.addTilesetImage('grass', 'grass')
        this.map.createLayer('ground', dungeonTileset, 0, 0)
        this.map.createLayer('grass', grassTileset, 0, 0)
        this.cage = this.map.createLayer('cage', dungeonTileset, 0, 0)
        this.wallsLayer = this.map.createLayer('walls', dungeonTileset, 0, 0)
        this.treeLayer = this.map.createLayer('tree', treeTileset, 0, 0)
        this.treeLayer.setCollisionByProperty({collider: true })
        this.wallsLayer.setCollisionByProperty({colides: true})
        this.cage.setCollisionByProperty({colides: true})
        this.chestLayer = this.map.getObjectLayer('chest')
    }

    create() {
        let personNames = getContent()

        this.scene.run('GameUIScene', { displayName: this.displayName, total: personNames.length })

        // Map
        this.createMap()

        // Chest
        createChestAnims(this.anims)
        const chests = this.physics.add.staticGroup({ classType: Chest })
        const selectedChests = new Set()
        selectedChests.add(11)
        while (selectedChests.size < personNames.length) {
            var value = Phaser.Math.Between(0, this.chestLayer.objects.length - 1)
            selectedChests.add(value)
        }
        let j = 0
        this.chestLayer.objects.filter((_, i) => selectedChests.has(i)).forEach(c => {
            const chest = chests.get(c.x, c.y, 'treasure')
            chest.content = personNames[j++]
        })

        // Lizard
        createLizardAnims(this.anims)
        this.lizard = this.add.lizard(80, 200, 'lizard', 'lizard_m_idle_anim_f0.png')


        // Character
        createCharacterAnims(this.anims)
        this.character = this.add.character(200, 300, 'character', 'walk-down-3.png')
        this.cameras.main.startFollow(this.character, true)


        const customCollider = new Phaser.GameObjects.Rectangle(this, this.character.x , this.character.y + 16, 16, 16)
        customCollider.isInteracting = false 
        this.physics.add.existing(customCollider)
        this.character.customCollider = customCollider

        // Partner
        createPartnerAnims(this.anims, this.partnerName)
        let parterStr = `${this.partnerName}_attack`
        this.partner = this.physics.add.staticSprite(140, 100, `${parterStr}`).setScale(.37)
        this.partner.anims.play(`${parterStr}`, true)
        
        // Collisions
        this.physics.add.overlap(customCollider,chests, this.handleOverlapColliderChest.bind(this))
        this.physics.add.collider(this.character, chests)
        this.physics.add.collider(this.character, this.treeLayer)
        this.physics.add.collider(this.character, this.lizard, this.handleLizardCharacterCollider.bind(this))
        this.physics.add.collider(this.character, this.wallsLayer)
        this.physics.add.overlap(this.character, this.partner, this.handlePartnerCollision.bind(this))
        this.cageCharacterCollider =  this.physics.add.collider(this.character, this.cage)

        sceneEvents.on('isCollectedAll', this.isCollectedAllEvent, this)
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off('isCollectedAll', this.isCollectedAllEvent)
        })
    }

    handlePartnerCollision(p1, p2) {
        if(this.lizard.isDefeat) {
            this.scene.stop('GameUIScene')
            this.scene.stop('GameScene')
            this.scene.start('GameOverScene')    
        }
    }

    isCollectedAllEvent() {
        this.isCollectedAll = true
        this.partner.anims.play(`${this.partnerName}_idle`)
    }

    update(t, dt) {
        if(this.isDialog) return
        this.character.update(this.cursors)
    }

    handleOverlapColliderChest(collider, chest) {
        if(collider.isInteracting && chest.isOpen === false) {
            chest.setOpen()
            this.time.delayedCall(500, () => {
                this.scene.run('ScrollScene', {content: `${chest.content.name}\n\n${chest.content.description}`})
                sceneEvents.emit('character-item-add', chest.content)
            })
        }
    }

    deleteCageLayer() {
        this.cage.setVisible(false)
        this.cage.setActive(false)
        this.cageCharacterCollider.destroy()
    }

    diagnosticAnswer(result) {
        if(result.every(i => i === true)) {
            var dialog = CreateDialog(this, 'Dragão:', formatToDialog('Soltarei ela'), ["Ok"], () => {
                this.isDialog = false
                this.deleteCageLayer()
                this.lizard.isDefeat = true
            }).setPosition(50, 200)
            OpenDialog(dialog)  
        } else {
            var dialog = CreateDialog(this, 'Dragão:', formatToDialog('Tente novamente'), ["Ok"], () => {
                this.isDialog = false
            }).setPosition(50, 200)
            OpenDialog(dialog)
        }
    }

    handleLizardCharacterCollider(character ,lizard) {
        if(this.lizard.isDefeat) return

        this.isDialog = true

        if(this.isCollectedAll) {
            let results = []
            var dialog = CreateDialog(this, 'Dragão:', 'Responda minhas perguntas, ok ?', ["Ok"], () => {
                
                questions.forEach((item, i) => {
                    var dialog = CreateDialog(this, `Questão ${questions.length - (i)}`, formatToDialog(item.question, 20), item.options.map(opt => formatToDialog(opt.option, 15)), () => {
                    })
                    .setPosition(100, 200)
                    .on('button.click',  (button, groupName, index) => {
                        results.push(item.options[index].isCorrect)
                        if(i === 0) {
                            this.diagnosticAnswer(results)
                        }
                    }, this)
                    
                    OpenDialog(dialog)
                })
            }).setPosition(50, 150)
            OpenDialog(dialog)
        } else {
            const dir = new Phaser.Math.Vector2(character.x - lizard.x , character.y - lizard.y).normalize().scale(20)
            character.body.x = character.body.x + dir.x
            character.body.y = character.body.y + dir.y
            var dialog = CreateDialog(this, 'Dragão:', formatToDialog('Pegue os papeis para mim. So assim ira conseguir ver sua companheira'), ["Ok"], () => {
                this.isDialog = false
            }).setPosition(50, 200)
            OpenDialog(dialog)
        }
    }
}


function formatToDialog(text,  len = 20) {
    let lines = [];
    let init = 0;
    let end = len ;
  
    while (end < text.length) {
        lines.push(text.substring(init, end));
        init = end;
        end += len ;
    }
  
    if (init < text.length) {
        lines.push(text.substring(init));
    }
  
    return lines.join("\n");
  }
  