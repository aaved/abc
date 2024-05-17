export class Lizard extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, a, b) {
        super(scene, x, y, a, b)
        this.anims.play('lizard-idle')
        this.isDefeat = false
    }    


}

Phaser.GameObjects.GameObjectFactory.register('lizard', function (x, y, a, b) {
	const lizard = new Lizard(this.scene, x, y, a, b)
    this.displayList.add(lizard)
    this.updateList.add(lizard)
    this.scene.physics.world.enableBody(lizard, Phaser.Physics.Arcade.STATIC_BODY)
    lizard.body.setSize(lizard.width * 0.5, lizard.height * 0.5)
    return lizard
})