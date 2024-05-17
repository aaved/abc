import { KEYBOARD_CHARACTERS } from '../constants'
import { generateKeyboardStr } from '../utils'

export class InitScene extends Phaser.Scene
{
    constructor() {
        super('InitScene')
        this.name = ''
        this.chars = KEYBOARD_CHARACTERS
        this.cursor = { x: 0, y: 0 };
        this.isTypingName = true
        this.selectedCharacter = 'knight'
    }

    create () {
        this.anims.create({
            key: 'enchantress_idle',
            frames: this.anims.generateFrameNames('enchantress_idle', {
                start: 0,
                end: 4,
            }),
            frameRate: 8,
            repeat: -1, 
        })
        this.anims.create({
            key: 'knight_idle',
            frames: this.anims.generateFrameNames('knight_idle', {
                start: 0,
                end: 5,
            }),
            frameRate: 8,
            repeat: -1, 
        })

        this.add.image(200, 150, 'sky');
        this.add.bitmapText(70, 40, 'arcade', 'Nome:', 12).setTint(0xffffff);
        this.add.bitmapText(70, 175, 'arcade', 'Quem vai te acompanhar ?', 12).setTint(0xffffff);
        const input = this.add.bitmapText(70, 70, 'arcade', generateKeyboardStr(this.chars), 16).setLetterSpacing(20);
        input.setInteractive();
        const rub = this.add.image(input.x + 215 , input.y + 73, 'rub').setScale(0.7);
        const end = this.add.image(input.x + 242, input.y + 73, 'end').setScale(0.7);
        this.block = this.add.image(input.x - 10, input.y - 5, 'block').setOrigin(0).setScale(0.70);
        this.playerText = this.add.bitmapText(140, 40, 'arcade', this.name, 12).setTint(0xff0000);
        this.input.keyboard.on('keyup', this.handleKeyboardInput.bind(this));

        this.block2 = this.add.image(100, 250, 'block').setScale(2);
        const op1 = this.physics.add.sprite(100, 230, 'knight_idle').setScale(.75)
        op1.anims.play('knight_idle')
        const opt2 = this.physics.add.sprite(300, 230, 'enchantress_idle').setScale(.75)
        opt2.anims.play('enchantress_idle')
    }
    handleKeyboardInput(event) {
        if(!this.isTypingName) {
            if(event.keyCode === 37 || event.keyCode === 39) {
                if(this.selectedCharacter === 'knight') {
                    this.selectedCharacter = 'enchantress'
                    this.block2.x = 300
                    this.block2.y = 250
                } else {
                    this.selectedCharacter = 'knight'
                    this.block2.x = 100
                    this.block2.y = 250
                }
            } else if (event.keyCode === 13 || event.keyCode === 32) {
                this.scene.stop('InitScreen')
                this.scene.start('GameScene', { displayName: this.name, partnerName: this.selectedCharacter })    
            }
            return
        }
        if (event.keyCode === 37) {
            if (this.cursor.x > 0)
            {
                this.cursor.x--;
                this.block.x -= 26;
            }
        }
        else if (event.keyCode === 39) {
            if (this.cursor.x < 9)
            {
                this.cursor.x++;
                this.block.x += 26;
            }
        }
        else if (event.keyCode === 38) {
            if (this.cursor.y > 0) {
                this.cursor.y--;
                this.block.y -= 31;
            }
        }
        else if (event.keyCode === 40) {
            if (this.cursor.y < 2)
            {
                this.cursor.y++;
                this.block.y += 31;
            }
        }
        else if (event.keyCode === 13 || event.keyCode === 32) {
            if (this.cursor.x === 9 && this.cursor.y === 2 && this.name.length > 0) {
                this.isTypingName = false
            }
            else if (this.cursor.x === 8 && this.cursor.y === 2 && this.name.length >= 0) {
                this.name = this.name.slice(0, this.name.length - 1);
                this.playerText.text = this.name;
            }
            else if (this.name.length < 5) {
                this.name = this.name.concat(this.chars[this.cursor.y][this.cursor.x]);
                this.playerText.text = this.name;
            } else {
                alert('Chega')
            }
        }
    }
}