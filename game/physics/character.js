export class Character extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, a, b) {
        super(scene, x, y, a, b)
        this.anims.play('character-idle-down')
        this.speed = 200
    }

    getCursor(cursor) {
        return {
            isLeft: cursor.left.isDown,
            isRight: cursor.right.isDown,
            isUp: cursor.up.isDown,
            isDown: cursor.down.isDown,
            isSpace: Phaser.Input.Keyboard.JustDown(cursor.space)
        }
    }

    update(cursor) {

        const {
            isLeft,
            isRight,
            isDown,
            isUp,
            isSpace
        }  = this.getCursor(cursor)
        
        
        if(isRight) {
            this.updateCollider('right')
            this.anims.play('character-run-side', true)
            this.scaleX = 1
            this.body.offset.x = 10
            this.body.setVelocity(this.speed, 0)
        }
        else if(isLeft) {
            this.updateCollider('left')
            this.anims.play('character-run-side', true)
            this.scaleX = -1
            this.body.offset.x = 20
            this.body.setVelocity(-this.speed, 0)
        }
        else if(isDown) {
            this.updateCollider('down')
            this.anims.play('character-run-down', true)
            this.body.setVelocity(0, this.speed)
        }
        else if(isUp) {
            this.updateCollider('up')
            this.anims.play('character-run-up', true)
            this.body.setVelocity(0, -this.speed)
        }
        else if(isSpace) {
            this.updateCollider('space')
        }
        else {
            this.body.setVelocity(0, 0)        
            const parts = this.anims.currentAnim.key.split('-')
            parts[1] = 'idle'
            this.anims.play(parts.join('-'))
        }
    }

    handleCageCollide(dir) {
        console.log('gege')
    }

    updateCollider(direction) {
        this.customCollider.isInteracting = false
        switch (direction) {
            case 'left':
                this.customCollider.x = this.body.x - 10
                this.customCollider.y = this.body.y + 8
                break;
            case 'right':
                this.customCollider.x = this.body.x + 25
                this.customCollider.y = this.body.y + 8
                break;                
            case 'up':
                this.customCollider.x = this.body.x + 8 
                this.customCollider.y = this.body.y - 10
                break;
            case 'down':
                this.customCollider.x = this.body.x + 8 
                this.customCollider.y = this.body.y + 25
                break;    
            case 'space':
                this.customCollider.isInteracting = true
            default:
                break;
        }
    }
    
}

Phaser.GameObjects.GameObjectFactory.register('character', function (x, y, a, b) {
	const character = new Character(this.scene, x, y, a, b)
    this.displayList.add(character)
    this.updateList.add(character)
    this.scene.physics.world.enableBody(character, Phaser.Physics.Arcade.DYNAMIC_BODY)
    character.body.setSize(character.width * 0.5, character.height * 0.5)
    return character
})