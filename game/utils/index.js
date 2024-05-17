import  data from '../data'

export function generateKeyboardStr(chars) {
    return chars.map( (c, i)=> {
        return c.filter(v => /[A-Z-.]/.test(v)).join('') + ( i < chars.length - 1 ? '\n\n' : '' )
    }).join('')
}

export function getNames() {
    return data.information.map(p => p.name)
}

export function getContent() {
    return data.information
}

export function updatePanel(panel, content) {
    var sizer = panel.getElement('panel');
    var scene = panel.scene;

    sizer.clear(true);
    var lines = content.split('\n');
    for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
        var words = lines[li].split(' ');
        for (var wi = 0, wcnt = words.length; wi < wcnt; wi++) {
            sizer.add(
                scene.add.text(0, 0, words[wi], {
                    fontSize: 12,
                    color: 0xeeeeee
                })
            );
        }
        if (li < (lcnt - 1)) {
            sizer.addNewLine();
        }
    }


    panel.layout();
    return panel;
}

export const CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        text: scene.add.text(0, 0, text, {
            fontSize: '12px'
        }),

    });
}



export const CreateDialog = function (scene, title, text, acs, onClickButton) {
    var dialog = scene.rexUI.add.dialog({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, 0x999999),

        title: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, 0x444444),
            text: scene.add.text(0, 0, title, {
                fontSize: '12px'
            }),
            space: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            }
        }),


        content: scene.add.text(0, 0, text, {
            fontSize: '12px'
        }),

        actions: acs.map(a => CreateLabel(scene, a)),

        space: {
            content: 25,
            action: 15,

            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
        },

        align: {
            actions: 'center',
        },

        expand: {
            content: false,  // Content is a pure text object
        }
    })

    dialog
        .on('button.click', function (button, groupName, index, pointer, event) {
            dialog.scaleDown(1000)
            if (onClickButton) {
                onClickButton(button, index)
            }
        })

    dialog
        .layout()
        .setScale(0);

    return dialog;
}


export const  OpenDialog = function (dialog) {
    if (dialog.scaleX > 0) {
        return;
    }
    dialog
        .setScale(1)
        .popUp(1000)
}

