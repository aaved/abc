export class Chest extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture, 'chest_empty_open_anim_f0.png')
        this.isOpen = false
    }
    setOpen() {
        if(this.isOpen) return
        this.isOpen = true
        this.play('chest-open')
    }
}