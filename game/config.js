import { GameScene, GameUIScene } from './screen/game'
import { InitScene } from './screen/init'
import { PreloadScene } from './screen/preload'
import { ScrollScene } from './screen/scroll'
import { GameOverScene } from './screen/gameover'

export const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: 400,
    height: 300,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [PreloadScene, InitScene, GameScene, GameUIScene, ScrollScene, GameOverScene ],
    scale: {
        zoom: 2, 
    },
    audio: {
        disableWebAudio: true
    }
}
