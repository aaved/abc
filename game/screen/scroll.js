import { updatePanel } from '../utils'

export class ScrollScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'ScrollScene'
        })
        this.content =  `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
    }

    preload() { 
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        })
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    init(data) {
        if(data.content) {
            this.content = data.content
        }
    }

    create() {
        this.add.image(200, 150, 'paper').setScale(.35)
        this.scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 200,
            y: 150,
            width: 200,
            height: 200,
            panel: {
                child: this.rexUI.add.fixWidthSizer({
                    space: {
                        left: 2,
                        right: 10,
                        top: 2,
                        bottom: 2,
                        item: 8,
                        line: 2,
                    }
                }),
            },
            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 2, 0x000000),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 5, 0x83d388),
            },
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
                panel: 10,
            }
        }).layout()

        updatePanel(this.scrollablePanel, this.content);
    }

    update() {
        if(this.cursors.space.isDown) {
            this.scene.stop()
        }
    }
}