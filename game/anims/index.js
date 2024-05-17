export const createChestAnims = (anims) => {
	anims.create({
		key: 'chest-open',
		frames: anims.generateFrameNames('treasure', { start: 0, end: 2, prefix: 'chest_empty_open_anim_f', suffix: '.png' }),
		frameRate: 5
	})
}

export function createCharacterAnims(anims) {
    anims.create({
        key: 'character-idle-down',
        frames: [{ key: 'character', frame: 'walk-down-3.png'}]
    })

    anims.create({
        key: 'character-idle-up',
        frames: [{ key: 'character', frame: 'walk-up-3.png'}]
    })

    anims.create({
        key: 'character-idle-side',
        frames: [{ key: 'character', frame: 'walk-side-3.png'}]
    })

    anims.create({
        key: 'character-run-down',
        frames: anims.generateFrameNames('character', {
            start: 1,
            end: 8,
            prefix: 'run-down-',
            suffix: '.png'
        }),
    })


    anims.create({
        key: 'character-run-up',
        frames: anims.generateFrameNames('character', {
            start: 1,
            end: 8,
            prefix: 'run-up-',
            suffix: '.png'
        }),
    })

    anims.create({
        key: 'character-run-side',
        frames: anims.generateFrameNames('character', {
            start: 1,
            end: 8,
            prefix: 'run-side-',
            suffix: '.png'
        }),
    })

    anims.create({
        key: 'character-faint',
        frames: anims.generateFrameNames('character', {
            start: 1,
            end: 4,
            prefix: 'faint-',
            suffix: '.png'
        }),
    })

}

export function createPartnerAnims(anims, partner) {
    if(partner === 'knight') {
        anims.create({
            key: 'knight_attack',
            frames: anims.generateFrameNames('knight_attack', {
                start: 0,
                end: 4,
            }),
            frameRate: 8,
            repeat: -1, 
        })
        // anims.create({
        //     key: 'knight_idle',
        //     frames: anims.generateFrameNames('knight_idle', {
        //         start: 0,
        //         end: 5,
        //     }),
        //     frameRate: 8,
        //     repeat: -1, 
        // })
    } else {
        // anims.create({
        //     key: 'enchantress_idle',
        //     frames: anims.generateFrameNames('enchantress_idle', {
        //         start: 0,
        //         end: 4,
        //     }),
        //     frameRate: 8,
        //     repeat: -1, 
        // })
        anims.create({
            key: 'enchantress_attack',
            frames: anims.generateFrameNames('enchantress_attack', {
                start: 0,
                end: 5,
            }),
            frameRate: 8,
            repeat: -1, 
        })
    }
}

export  function createLizardAnims (anims) {
    anims.create({
        key: 'lizard-idle',
        frames: anims.generateFrameNames('lizard', {
            prefix: 'lizard_m_idle_anim_f',
            suffix: '.png',
            start: 0,
            end: 3
        }),
        frameRate: 8,
        repeat: -1
    })
}