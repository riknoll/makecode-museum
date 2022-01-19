namespace SpriteKind {
    export const Art = SpriteKind.create()
    export const stanchion = SpriteKind.create()
    export const Backdrop = SpriteKind.create()
    export const SculptureOverlap = SpriteKind.create()
}
function updateCursor () {
    if (characterIndex == 0) {
        cursor.setPosition(50, 30)
        textSprite.setText("Ignatius")
    } else if (characterIndex == 1) {
        cursor.setPosition(80, 30)
        textSprite.setText("Penelope")
    } else {
        cursor.setPosition(110, 30)
        textSprite.setText("Madame")
    }
    textSprite.setPosition(94, 95)
}
function cloneAndFlip (image2: Image) {
    tempImage = image2.clone()
    tempImage.flipX()
    return tempImage
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (showing_art) {
        showing_art = false
        custom.hideArtInfo()
        controller.moveSprite(patron_of_the_arts)
    }
})
function hangArt (portrait: Sprite) {
    if (sprites.readDataString(portrait, "name") == "name") {
        return
    }
    tempLocation = tiles.getTilesByType(assets.tile`myTile12`)[0]
    tiles.setTileAt(tempLocation, assets.tile`myTile1`)
    if (portrait.width == 16) {
        tiles.setTileAt(tiles.locationInDirection(tempLocation, CollisionDirection.Bottom), assets.tile`myTile14`)
    } else {
        tiles.setTileAt(tiles.locationInDirection(tempLocation, CollisionDirection.Bottom), assets.tile`myTile6`)
        tiles.setTileAt(tiles.locationInDirection(tiles.locationInDirection(tempLocation, CollisionDirection.Bottom), CollisionDirection.Right), assets.tile`myTile5`)
    }
    tiles.setTileAt(tiles.locationInDirection(tempLocation, CollisionDirection.Left), assets.tile`myTile2`)
    if (portrait.height == 16) {
        if (portrait.width == 32) {
            tiles.setTileAt(tiles.locationInDirection(tempLocation, CollisionDirection.Top), assets.tile`myTile4`)
            tiles.setTileAt(tiles.locationInDirection(tiles.locationInDirection(tempLocation, CollisionDirection.Right), CollisionDirection.Top), assets.tile`myTile4`)
            tiles.setTileAt(tiles.locationInDirection(tiles.locationInDirection(tempLocation, CollisionDirection.Right), CollisionDirection.Right), assets.tile`myTile3`)
        } else {
            tiles.setTileAt(tiles.locationInDirection(tempLocation, CollisionDirection.Right), assets.tile`myTile3`)
            tiles.setTileAt(tiles.locationInDirection(tempLocation, CollisionDirection.Top), assets.tile`myTile4`)
        }
    } else {
        tiles.setTileAt(tiles.locationInDirection(tiles.locationInDirection(tempLocation, CollisionDirection.Top), CollisionDirection.Top), assets.tile`myTile4`)
        tiles.setTileAt(tiles.locationInDirection(tiles.locationInDirection(tempLocation, CollisionDirection.Left), CollisionDirection.Top), assets.tile`myTile2`)
        if (portrait.width == 32) {
            tiles.setTileAt(tiles.locationInDirection(tiles.locationInDirection(tiles.locationInDirection(tempLocation, CollisionDirection.Right), CollisionDirection.Top), CollisionDirection.Top), assets.tile`myTile4`)
            tiles.setTileAt(tiles.locationInDirection(tiles.locationInDirection(tiles.locationInDirection(tempLocation, CollisionDirection.Right), CollisionDirection.Right), CollisionDirection.Top), assets.tile`myTile3`)
            tiles.setTileAt(tiles.locationInDirection(tiles.locationInDirection(tempLocation, CollisionDirection.Right), CollisionDirection.Right), assets.tile`myTile3`)
        } else {
            tiles.setTileAt(tiles.locationInDirection(tiles.locationInDirection(tempLocation, CollisionDirection.Right), CollisionDirection.Top), assets.tile`myTile3`)
            tiles.setTileAt(tiles.locationInDirection(tempLocation, CollisionDirection.Right), assets.tile`myTile3`)
        }
    }
    portrait.bottom = tiles.locationXY(tempLocation, tiles.XY.bottom)
    portrait.left = tiles.locationXY(tempLocation, tiles.XY.left)
    tempSprite = sprites.create(img`
        ...55......................................55...
        ..5555....................................5555..
        ..5555....................................5555..
        ..5555....................................5555..
        ...44......................................44...
        ...5522..................................2255...
        ...55ee2................................2ee55...
        ...55..e2..............................2e..55...
        ...55...e22..........................22e...55...
        ...55....ee2........................2ee....55...
        ...55......e22....................22e......55...
        ...55.......ee22................22ee.......55...
        ...55.........ee222..........222ee.........55...
        ..4554..........eee2222222222eee..........4554..
        .445544............eeeeeeeeee............445544.
        44e55e44................................44e55e44
        444ee444................................444ee444
        e444444e................................e444444e
        .e4444e..................................e4444e.
        ..eeee....................................eeee..
        `, SpriteKind.stanchion)
    if (portrait.width == 32) {
        tempSprite.x = tiles.locationXY(tempLocation, tiles.XY.x) + 8
    } else {
        tempSprite.x = tiles.locationXY(tempLocation, tiles.XY.x)
    }
    tempSprite.z = -1
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (inCharacterSelect) {
        inCharacterSelect = false
        tiles.destroySpritesOfKind(SpriteKind.Player)
        tiles.destroySpritesOfKind(SpriteKind.Text)
        startGame()
    }
})
function startGame () {
    if (characterIndex == 0) {
        createPatron(img`
            .....ffffffffff.....
            ....fddddddddddf....
            ...fddddddddddddf...
            ..fddddddddddddddf..
            ..fddddddddddddddf..
            ..fddd6666666666df..
            ..fdd66666664466df..
            .fddd66616641146ddf.
            fdddd66616641146ddf.
            fdddd66666664466ddf.
            .fdd666666666666ff..
            ..ff66e6eeeee6e6f...
            ...f666eee6eee66f...
            ...f666666666666f...
            ...fbbbbbb4bbbbbf...
            ..ffccccccccccccff..
            .fccccc1ccccc1ccccf.
            fcccc4c1ccccc1cccccf
            fcccccc1dcccd1c1cccf
            fccfc4c1d1d1d1ccfccf
            fccfccc1d1d1d1ccfccf
            fccfc4c1d1d1d1ccfccf
            f4cfccc1d1d1d1ccfccf
            f11cc4c1d1d1d1ccfc4f
            f66cccc1d1d1d1ccc11f
            f6fcccceeeeeeeccc66f
            .ffcccaaaaaaaacccf6f
            ...fffaaaaaaaaaffff.
            .....faaaaaaaaaf....
            ......ffafffaff.....
            .......faf.fef......
            .......fef.feef.....
            .......feef.ff......
            ........ff..........
            `, img`
            .....ffffffffff.....
            ....fddddddddddf....
            ...fddddddddddddf...
            ..fddddddddddddddf..
            ..fddddddddddddddf..
            ..fddd6666666666df..
            ..fdd66666664466df..
            .fddd66616641146ddf.
            fdddd66616641146ddf.
            fdddd66666664466ddf.
            .fdd666666666666ff..
            ..ff66e6eeeee6e6f...
            ...f666eee6eee66f...
            ...f666666666666f...
            ...fbbbbbb4bbbbbf...
            ..ffccccccccccccff..
            .fccccc1ccccc1ccccf.
            fcccc4c1ccccc1cccccf
            fcccccc1dcccd1c1cccf
            fccfc4c1d1d1d1ccfccf
            fccfccc1d1d1d1ccfccf
            fccfc4c1d1d1d1ccfccf
            f4cfccc1d1d1d1ccfccf
            f11cc4c1d1d1d1ccfc4f
            f66cccc1d1d1d1ccc11f
            f6fcccceeeeeeeccc66f
            .ffcccaaaaaaaacccf6f
            ...fffaaaaaaaaaffff.
            .....faaaaaaaaaf....
            ......ffafffaff.....
            .......fef.faf......
            .......feeffef......
            ........ff.feef.....
            ............ff......
            `)
    } else if (characterIndex == 1) {
        createPatron(img`
            .........fff........
            ..fff...f33bf.......
            .f333f..f333bf......
            .f3d33f.fbbb3f......
            .fbdd33fffbbbbf.....
            .fbbdd3b333333cf....
            ..fbbbb33cc3cc1cf...
            ...fbb33c11c33cf....
            ....fb33c11c3333f...
            ....fbb33cc3333bf...
            .....fbb3333333bf...
            ......fbbbbbbbbf....
            ......fccc81121f....
            .....f888c88121f....
            .....fc888c8828f....
            .....fc88c8ccccf....
            .....fcb3c888c8f....
            .....feb3c888c8f....
            .....feeeeeeeeef....
            ......fccccfeef.....
            .......feef.ff......
            ........ff..........
            `, img`
            .........fff........
            ..fff...f33bf.......
            .f333f..f333bf......
            .f3d33f.fbbb3f......
            .fbdd33fffbbbbf.....
            .fbbdd3b333333cf....
            ..fbbbb33cc3cc1cf...
            ...fbb33c11c33cf....
            ....fb33c11c3333f...
            ....fbb33cc3333bf...
            .....fbb3333333bf...
            ......fbbbbbbbbf....
            ......fccc81121f....
            .....f888c88121f....
            .....fc888c8828f....
            .....fc88c8ccccf....
            .....fcb3c888c8f....
            .....feb3c888c8f....
            .....feeeeeeeeef....
            ......ffeefcccf.....
            ........ff.feef.....
            ............ff......
            `)
    } else {
        createPatron(img`
            ........77..........
            .......75554..666...
            ......75111e477666..
            ......751ff74e7776..
            ......751f675e7777..
            .....77586775e77777.
            ...bb7774555e7777777
            ..bbb7777e4e77777777
            ..ccc877771777777777
            .c111187774777776667
            .b11116777577767777.
            .b1111167717777777..
            .b1111dd675777777b..
            ..b1ddd116477777cd..
            ..fbd1111157776cb11.
            ..fb1111111666bcd11.
            ..ffb1111d511d11dd1.
            ..fffb11dd411d111dd.
            ...cffbbd1511d1111d.
            ...ffffbb1111b111d..
            ...cf77ffb5bbbbbb...
            ...ff77fff4f4f......
            ...ff777ff5f5f......
            ...ff677fff1f.......
            ...fff777ffff.77....
            ...ffff7777777777...
            ...ffff6777776876...
            ...fffff6776f.f6....
            ...ffffffffff.ee....
            ...fffffffffffe.....
            ..fffffcffffffe.....
            ..ffffffbfffffe.....
            ..ffffffffffffe.....
            ..fffffcfcffffe.....
            ..ffffffffffffef....
            ..fffffffcffffef....
            ..ffffffbfffffef....
            .fffffffffffffeff...
            .fffffffffffffeff...
            .fffffffffffffeff...
            .fffcfffffbfffefff..
            .ffffffffffcffefff..
            .fffffffffffffefff..
            .fffffffffcfffefff..
            .fffffffffffcfefff..
            .ffffffffffbff5fff..
            ..ffffffffffff4fff..
            ....fffffffffffff...
            `, img`
            ........77..........
            .......75554..666...
            ......75111e477666..
            ......751ff74e7776..
            ......751f675e7777..
            .....77586775e77777.
            ...bb7774555e7777777
            ..bbb7777e4e77777777
            ..ccc877771777777777
            .c111187774777776667
            .b11116777577767777.
            .b1111167717777777..
            .b1111dd675777777b..
            ..b1ddd116477777cd..
            ..fbd1111157776cb11.
            ..fb1111111666bcd11.
            ..ffb1111d511d11dd1.
            ..fffb11dd411d111dd.
            ...cffbbd1511d1111d.
            ...ffffbb1111b111d..
            ...cf77ffb5bbbbbb...
            ...ff77fff4f4f......
            ...ff777ff5f5f......
            ...ff677fff1f.......
            ...fff77777777777...
            ...ffff7777776876...
            ...ffff66776f.f6....
            ...ffffffffff.ee....
            ...ffffffffff.e.....
            ...fffffffffffe.....
            ..fffffcffffffe.....
            ..ffffffbfffffe.....
            ..ffffffffffffe.....
            ..fffffcfcffffe.....
            ..ffffffffffffef....
            ..fffffffcffffef....
            ..ffffffbfffffef....
            .fffffffffffffeff...
            .fffffffffffffeff...
            .fffffffffffffeff...
            .fffcfffffbfffefff..
            .ffffffffffcffefff..
            .fffffffffffffefff..
            .fffffffffcfffefff..
            .fffffffffffcf5fff..
            .ffffffffffbff4fff..
            ..ffffffffffffffff..
            ....fffffffffffff...
            `)
    }
    galleries = []
    createGalleryRoom()
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    characterIndex = (characterIndex + 2) % 3
    updateCursor()
})
function showPatronSelect () {
    mySprite = sprites.create(img`
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc66666cccccccccccccccccccccccc
        ccccccc2222222222c22222222222ccccccccccccccccccccccccccccccccc222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc66666cccccccccccccccccccccccc
        ccccccc22222222222222222222222ccccccccccccccccccccccccccccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc66666cccccccc666666666ccccccc
        cccccc222222222222222222222222ccccccccccccccccccccccccccccccc2222ccc2222cccccccc222222ccccccccccccccccccccccc6666666ccccccccccccccc66666cccccc6666666666666ccccc
        cccccc22222ccc22222222222222222cccccccccc2222222ccccccccccc222222cc2222222cccc2222222222cccccc6666666cccccccc666666666ccccccccccccc66666ccccc66666666666666ccccc
        ccccc22222ccccc222222cc22222222cccccccc222222222222cccccccc222222c22222222cccc2222222222ccccc666666666cccccc66666666666ccccccccccccc6666ccccc666666c66666666cccc
        ccccc22222ccccc222222ccc2222222ccccccc2222222222222cccccccc222222c22222222ccc22222222222cccc6666666666ccccc6666666666666ccccccc6666666666ccc666666cccc666666cccc
        cccc222222ccccc222222ccc2222222ccccccc2222222222222ccccccccc2222222222222cccc22222c22222ccc66666666666ccccc666666cc66666cccccc66666666666ccc666666ccccc66666cccc
        cccc22222cccccc222222cccc2222222ccccc22222ccc2222222ccccccccc22222222222ccccc2222ccc2222cc6666666cccccccccc66666cccc66666cccc6666666666666cc66666ccccccc6666cccc
        cccc22222cccccc222222cccc2222222ccccc22222ccccc222222cccccccc2222222222ccccc2222cc222222cc6666666ccccccccc66666ccccc66666cccc6666666666666cc6666666666666666cccc
        cccc22222cccccc222222cccc2222222ccccc2222ccccccc22222cccccccc22222222ccccccc222222222222cc666666cccccccccc66666ccccc66666cccc666666ccc6666cc6666666666666666cccc
        cccc22222cccccc222222cccc2222222ccccc2222cccccc2222222ccccccc222222222cccccc222222222222cc66666ccccccccccc6666ccccccc6666cccc66666cccc6666cc6666666666666666cccc
        cccc22222cccccc222222cccc2222222ccccc22222ccccc22222222cccccc222222222cccccc222222222ccccc66666ccccccccccc6666ccccccc6666cccc6666ccccc6666cc6666cc6666666666cccc
        cccc22222cccccc22222ccccc2222222ccccc222222ccc2222222222ccccc2222222222ccccc2222cccccccccc6666cccc6666cccc6666cccccc66666cccc66666cccc6666cc66666ccccccccccccccc
        cccc22222cccccc22222ccccc2222222ccccc2222222222222222222cccc22222222222cccccc2222ccccccccc66666ccc6666cccc666666cccc66666cccc666666cc6666ccc6666666ccccccccccccc
        cccc22222cccccc22222cccccccccccccccccc222222222222c2222222cc222222c22222ccccc22222cccccccc6666666666666cccc66666666666666ccccc66666666666cccc66666666ccccccccccc
        cccc222ccccccccccccccccccccccccccccccc22222222222ccc222222cc222222cc22222cccc2222222222cccc666666666666ccccc6666666666666cccccc6666666666ccccc666666666666cccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccc22222ccc22222cc22222cccccc22222222cccc666666666666cccccc66666666666ccccccc6666666666cccccc66666666666cccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc22222ccc2222ccccccc2222222ccccc6666666666cccccccc666666666cccccccccc6666666ccccccccc666666666cccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc22222cccc222cccccccccccccccccccc66666666cccccccccc6666666cccccccccccc66666cccccccccccc6666666cccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccccccc2222ccccccccccccccccccccccccccccccccccccccccc222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccccccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222cccccc22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222cccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222cccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222cccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222cccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222cccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222ccccc222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222222c2222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc2222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc2222222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc22222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccc22222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccc222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc22222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc22222ccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc22222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc2222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccc222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222ccccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222cccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222222cc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc22222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccc222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccc2222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc22222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222222cc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222ccccc22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222ccccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc22222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccc2222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccc222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccc2222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccccccccc222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc2222222cccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222222ccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222222ccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222222ccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222222cc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc2222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc222222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccc2222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccccccccc22222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccc22222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc2222222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc222222222222cc22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc22222222222cccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc2222c222222ccccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc2222cc22222ccccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc222cccc2222ccccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc2222ccc2222ccccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc2222ccc2222cccccc222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc2222ccc2222cccccc222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc2222ccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccc222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        `, SpriteKind.Player)
    animation.runImageAnimation(
    mySprite,
    [img`
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc66666cccccccccccccccccccccccc
        ccccccc2222222222c22222222222ccccccccccccccccccccccccccccccccc222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc66666cccccccccccccccccccccccc
        ccccccc22222222222222222222222ccccccccccccccccccccccccccccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc66666cccccccc666666666ccccccc
        cccccc222222222222222222222222ccccccccccccccccccccccccccccccc2222ccc2222cccccccc222222ccccccccccccccccccccccc6666666ccccccccccccccc66666cccccc6666666666666ccccc
        cccccc22222ccc22222222222222222cccccccccc2222222ccccccccccc222222cc2222222cccc2222222222cccccc6666666cccccccc666666666ccccccccccccc66666ccccc66666666666666ccccc
        ccccc22222ccccc222222cc22222222cccccccc222222222222cccccccc222222c22222222cccc2222222222ccccc666666666cccccc66666666666ccccccccccccc6666ccccc666666c66666666cccc
        ccccc22222ccccc222222ccc2222222ccccccc2222222222222cccccccc222222c22222222ccc22222222222cccc6666666666ccccc6666666666666ccccccc6666666666ccc666666cccc666666cccc
        cccc222222ccccc222222ccc2222222ccccccc2222222222222ccccccccc2222222222222cccc22222c22222ccc66666666666ccccc666666cc66666cccccc66666666666ccc666666ccccc66666cccc
        cccc22222cccccc222222cccc2222222ccccc22222ccc2222222ccccccccc22222222222ccccc2222ccc2222cc6666666cccccccccc66666cccc66666cccc6666666666666cc66666ccccccc6666cccc
        cccc22222cccccc222222cccc2222222ccccc22222ccccc222222cccccccc2222222222ccccc2222cc222222cc6666666ccccccccc66666ccccc66666cccc6666666666666cc6666666666666666cccc
        cccc22222cccccc222222cccc2222222ccccc2222ccccccc22222cccccccc22222222ccccccc222222222222cc666666cccccccccc66666ccccc66666cccc666666ccc6666cc6666666666666666cccc
        cccc22222cccccc222222cccc2222222ccccc2222cccccc2222222ccccccc222222222cccccc222222222222cc66666ccccccccccc6666ccccccc6666cccc66666cccc6666cc6666666666666666cccc
        cccc22222cccccc222222cccc2222222ccccc22222ccccc22222222cccccc222222222cccccc222222222ccccc66666ccccccccccc6666ccccccc6666cccc6666ccccc6666cc6666cc6666666666cccc
        cccc22222cccccc22222ccccc2222222ccccc222222ccc2222222222ccccc2222222222ccccc2222cccccccccc6666cccc6666cccc6666cccccc66666cccc66666cccc6666cc66666ccccccccccccccc
        cccc22222cccccc22222ccccc2222222ccccc2222222222222222222cccc22222222222cccccc2222ccccccccc66666ccc6666cccc666666cccc66666cccc666666cc6666ccc6666666ccccccccccccc
        cccc22222cccccc22222cccccccccccccccccc222222222222c2222222cc222222c22222ccccc22222cccccccc6666666666666cccc66666666666666ccccc66666666666cccc66666666ccccccccccc
        cccc222ccccccccccccccccccccccccccccccc22222222222ccc222222cc222222cc22222cccc2222222222cccc666666666666ccccc6666666666666cccccc6666666666ccccc666666666666cccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccc22222ccc22222cc22222cccccc22222222cccc666666666666cccccc66666666666ccccccc6666666666cccccc66666666666cccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc22222ccc2222ccccccc2222222ccccc6666666666cccccccc666666666cccccccccc6666666ccccccccc666666666cccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc22222cccc222cccccccccccccccccccc66666666cccccccccc6666666cccccccccccc66666cccccccccccc6666666cccccc
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccccccc2222ccccccccccccccccccccccccccccccccccccccccc222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccccccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222cccccc22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222cccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222cccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222cccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222cccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222cccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222ccccc222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222222c2222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc2222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc2222222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc22222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccc22222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccc222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc22222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc22222ccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc22222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc2222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccc222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222ccccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222cccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222222cc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc22222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccc222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccc2222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc22222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222222cc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222ccccc22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222ccccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc22222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccc2222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccc222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccc2222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccccccccc222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc2222222cccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222222ccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222222ccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222222ccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222222cc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc2222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc222222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccc2222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccccccccc22222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccc22222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc2222222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc222222222222cc22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc22222222222cccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc2222c222222ccccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc2222cc22222ccccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc222cccc2222ccccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc2222ccc2222ccccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc2222ccc2222cccccc222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc2222ccc2222cccccc222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc2222ccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccc222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        `,img`
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc66666cccccccccccccccccccccc
        cccccccccccccccccc222222cccccccccccccccccccccccccccccccccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc66666cccccccccccccccccccccc
        ccccccccccccccccc22222222cccccccccccccccccccccccccccccccc22222ccccccccccccc22222222cccccccccccccccccccccccccccccccccccccccccccccccccc66666cccccc666666cccccccccc
        cccccc222222222cc222222222cccccccccccccccccccccccccccccc222222c222ccccccc222222222222cccccccccccccccccccccccccccccccccccccccccccccccc66666cccc66666666666ccccccc
        cccccc2222222222222222222222ccccccccccc222222222cccccccc2222222222cccccc2222222222222ccccccc666666666cccccccccccccccccccccccccccc6666666666cc666666666666ccccccc
        ccccc2222222222222222c222222ccccccccc22222222222cccccccc2222222222cccccc2222222c22222ccccc66666666666ccccc66666666666cccccccccc666666666666cc6666666666666cccccc
        cccc2222222222222222ccc22222ccccccccc222222222222ccccccc222222222cccccc22222ccccc22222cccc66666666666cccc666666666666ccccccccc6666666666666c666666cccc66666ccccc
        cccc2222222c22222222ccc222222ccccccc2222222ccc222ccccccc22222222ccccccc2222ccccccc2222ccc666666ccccccccc66666666666666cccccc666666666666666c66666ccccc66666ccccc
        cccc222222cc2222222cccc222222ccccccc222222cccc2222cccccc22222222cccccc2222222ccccc2222ccc66666ccccccccc666666ccc666666cccccc666666666666666c6666cccccc66666ccccc
        cccc22222cccc222222cccc222222ccccccc222222cccc22222ccccc22222222cccccc222222222c222222ccc66666ccccccccc6666ccccc6666666cccc66666666ccc66666c666666666666666ccccc
        cccc22222cccc222222cccc222222cccccc222222ccccc222222cccc2222222222cccc2222222222222222cc66666cccccccccc6666cccccc666666cccc666666ccccc66666c66666666666666cccccc
        cccc2222cccccc22222ccccc22222cccccc222222ccccc22222222cc22222222222ccc2222c22222222222cc66666cccccccccc666cccccccc66666cccc66666cccccc66666c66666666666666cccccc
        cccc2222cccccc22222ccccc22222cccccc2222222cccc22222222cc22222222222cc22222ccc22222222ccc66666cccccccccc6666ccccccc66666cccc66666cccccc66666c6666c66666666ccccccc
        cccc2222cccccc22222ccccc22222cccccc222222222c222222222cc22222222222cc22222cccccccccccccc66666cccccccccc66666ccccc666666cccc66666ccccc66666cc66666ccccccccccccccc
        cccc2222cccccc22222ccccc22222ccccccc222222222222222222ccc2222222222cc222222cccccccccccccc66666cccccccccc666666cc6666666cccc666666ccc666666ccc66666cccccccccccccc
        cccc2222cccccccc222ccccc222cccccccccc22222222222222222ccc22222c2222cc2222222ccccccccccccc66666666666cccc66666666666666cccccc66666666666666ccc666666ccccccccccccc
        ccccccccccccccccccccccccccccccccccccc222222222222cc222ccc22222c2222ccc222222222ccccccccccc66666666666ccc66666666666666cccccc6666666666666ccccc666666cccc666ccccc
        ccccccccccccccccccccccccccccccccccccccc2222222222cccccccc22222cc222cccc222222222ccccccccccc6666666666cccc6666666666666ccccccc666666666666cccccc666666666666ccccc
        cccccccccccccccccccccccccccccccccccccccc222222cccccccccccc2222ccccccccc222222222cccccccccccc666666666ccccc66666666666ccccccccc666666666ccccccccc66666666666ccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc222ccccccccccc22222222ccccccccccccc6666666ccccccccccccccccccccccccccc6666666ccccccccccc6666666666ccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc222ccccccccccccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc222cccccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222cccc22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222cccc22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222ccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222ccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222ccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222cccc22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222cccc222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222c22222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc2222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc2222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc22222222222c222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc222222222cc222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccc2222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc2222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc2222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccc2222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccc2222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccccc222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc22222cccccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc222222ccccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc2222222ccc222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc222222c222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc22222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222ccc222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc222222ccc222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc222222ccc222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccc22222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc222ccccc222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc222ccccc222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222ccccc222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222cccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222cccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222cccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222ccc22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222cc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc22222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc2222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccc22222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccccc22222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccc22222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc222222222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc222222222222ccc222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222c22222cccc222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222cc2222cccc222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222cc2222ccccc222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222cc2222ccccc222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222ccc222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        `,img`
        cccccc222222cccc2222222cccccccccccccccccccccccccccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc666cccccccccccccccccccccccc
        ccccc222222222c222222222cccccccccccccccccccccccccccc22222ccccccccccccccc222222222cccccccccccccccccccccccccccccccccccccccccccccccccccc666cccccccccccccccccccccccc
        cccc222222222222222222222ccccccccccccccccccccccccccc22222cccccc222cccccc2222222222ccccccccccccccccccccccccccccccccccccccccccccccccccc666cccccccccccccccccccccccc
        ccc22222222222222222222222cccccccc222222222ccccccccc222222cccc2222cccc22222222222222ccccccccccccccccccccccccccccccccccccccccccccccccc666cccccccc66666666cccccccc
        cc222222222222222cc22222222ccccc222222222222222ccccc222222cccc2222cccc22222222222222ccccccccc66666666666ccccccccccccccccccccccccccccc666cccccc66666666666ccccccc
        cc222222222222222ccc2222222cccc2222222222222222ccccc222222cc222222ccc2222222222222222ccccccc666666666666ccccccccccccccccccccccccccccc666cccccc666666666666cccccc
        c222222222c222222ccc2222222cccc2222222222222222ccccc222222c2222222ccc2222ccc222222222cccccc6666666666666cccccccccccccccccccc6666666666666ccccc6666cccc66666ccccc
        c222222ccccc2222ccccc222222ccc22222222cccc2222cccccc22222222222222cc2222cccc222222222ccccc66666cccccc666ccccccccccccccccccc66666666666666cccc6666cccccc6666ccccc
        c222222ccccc2222ccccc2222222cc222222cccccc2222cccccc2222222222222ccc22222222222222222ccccc6666ccccccccccccc66666666ccccccc666666666666666cccc6666ccccccc666ccccc
        c222222ccccc2222ccccc2222222cc222222ccccc22222cccccc222222222222cccc22222222222222222ccccc6666cccccccccccc6666666666cccccc66666ccccccc666ccc6666ccccccc6666ccccc
        c222222cccccc222ccccc222c222cc22222cccccc222222ccccc22222222222ccccc2222222222222222cccccc666cccccccccccc66666666666cccccc6666cccccccc666ccc6666ccccc666666ccccc
        c222222cccccc222ccccc222c222cc222222cccc222222222ccc22222222222ccccc222222222222222ccccccc666cccccccccccc66666ccc6666ccccc666ccccccccc666ccc666666666666666ccccc
        c222222cccccc222ccccc2222222cc2222222cc2222222222ccc22222c222222cccc2222ccc2222222cccccccc666cccccccccccc666ccccc6666ccccc666cccccccc6666ccc6666666666666ccccccc
        c222222cccccc222cccccccc2222cc2222222222222222222ccc22222cc22222cccc22222cccccccccccccccc6666cccccccccccc666ccccc6666ccccc666cccccccc6666ccc666666666666cccccccc
        c222222ccccccccccccccccc2222cc222222222222222222cccc22222ccc22222ccc2222222222ccccccccccc6666ccccccccccc6666cccccc666ccccc666ccccccc6666cccc666ccccccccccccccccc
        ccccccccccccccccccccccccccccccc222222222222222222ccc22222ccc22222ccc222222222222ccccccccc66666cccc666ccc6666ccccc6666ccccc666ccccccc6666cccc666ccccccccccccccccc
        ccccccccccccccccccccccccccccccc222222222222222222cccc222cccc22222ccc222222222222cccccccccc66666666666ccc6666cccc66666ccccc6666ccccc6666ccccc666ccccccccccccccccc
        cccccccccccccccccccccccccccccccc22222222222222222cccc222ccccc222ccccc22222222222cccccccccc66666666666ccc6666666666666ccccc66666cc666666ccccc6666cccccccccccccccc
        ccccccccccccccccccccccccccccccccc2222222222222222cccc222cccccccccccccc2222222ccccccccccccccc666666666cccc66666666666ccccccc66666666666cccccc66666ccccccccccccccc
        cccccccccccccccccccccccccccccccccc222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc66666666ccccccccc6666666666cccccccc6666666cccccccccccc
        cccccccccccccc22222cccccccccccccccccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc666666ccccccccccc66666666666ccccccc
        cccccc222ccccc22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc6666666666ccccccc
        cccc22222ccccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc6666666ccccccc
        cccc22222cccc2222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccc22222cccc22222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccc22222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccc222222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccc222222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccc222222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccc222222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc2222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccccccc22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccc22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc2222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc2222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc2222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc2222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc22222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccc2222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc2222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccc222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccc2222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccc2222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccc2222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccc22222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc2222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc2222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccc2222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccc22222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccc222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc222222ccc2222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc22222ccccc222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc22222ccc22222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc22222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc222222ccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc22222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc2222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc2222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccc222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc22222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccc222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccc22222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccc222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc2222ccccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc2222ccccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc2222ccccc222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc2222cccc22222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc22222ccc2222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc2222222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc222222222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc222222222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc222222222222222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccc222222222cccccccc222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccc2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccccc2222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccc222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccc22222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccccccccc22222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccccc222222222222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc222222222222c2222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc22222222222cccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc22222222222cccc22222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc22222c22222ccccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc22222cc2222ccccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc2222ccc2222ccccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc2222cccc222ccccc222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        ccc222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        `],
    200,
    true
    )
    mySprite2 = sprites.create(img`
        .....ffffffffff.....
        ....fddddddddddf....
        ...fddddddddddddf...
        ..fddddddddddddddf..
        ..fddddddddddddddf..
        ..fddd6666666666df..
        ..fdd66666664466df..
        .fddd66616641146ddf.
        fdddd66616641146ddf.
        fdddd66666664466ddf.
        .fdd666666666666ff..
        ..ff66e6eeeee6e6f...
        ...f666eee6eee66f...
        ...f666666666666f...
        ...fbbbbbb4bbbbbf...
        ..ffccccccccccccff..
        .fccccc1ccccc1ccccf.
        fcccc4c1ccccc1cccccf
        fcccccc1dcccd1c1cccf
        fccfc4c1d1d1d1ccfccf
        fccfccc1d1d1d1ccfccf
        fccfc4c1d1d1d1ccfccf
        f4cfccc1d1d1d1ccfccf
        f11cc4c1d1d1d1ccfc4f
        f66cccc1d1d1d1ccc11f
        f6fcccceeeeeeeccc66f
        .ffcccaaaaaaaacccf6f
        ...fffaaaaaaaaaffff.
        .....faaaaaaaaaf....
        ......ffafffaff.....
        .......faf.fef......
        .......fef.feef.....
        .......feef.ff......
        ........ff..........
        `, SpriteKind.Player)
    mySprite2.setPosition(50, 60)
    mySprite2 = sprites.create(img`
        .........fff........
        ..fff...f33bf.......
        .f333f..f333bf......
        .f3d33f.fbbb3f......
        .fbdd33fffbbbbf.....
        .fbbdd3b333333cf....
        ..fbbbb33cc3cc1cf...
        ...fbb33c11c33cf....
        ....fb33c11c3333f...
        ....fbb33cc3333bf...
        .....fbb3333333bf...
        ......fbbbbbbbbf....
        ......fccc81121f....
        .....f888c88121f....
        .....fc888c8828f....
        .....fc88c8ccccf....
        .....fcb3c888c8f....
        .....feb3c888c8f....
        .....feeeeeeeeef....
        ......fccccfeef.....
        .......feef.ff......
        ........ff..........
        `, SpriteKind.Player)
    mySprite2.setPosition(80, 60)
    mySprite2 = sprites.create(img`
        ........77..........
        .......75554..666...
        ......75111e477666..
        ......751ff74e7776..
        ......751f675e7777..
        .....77586775e77777.
        ...bb7774555e7777777
        ..bbb7777e4e77777777
        ..ccc877771777777777
        .c111187774777776667
        .b11116777577767777.
        .b1111167717777777..
        .b1111dd675777777b..
        ..b1ddd116477777cd..
        ..fbd1111157776cb11.
        ..fb1111111666bcd11.
        ..ffb1111d511d11dd1.
        ..fffb11dd411d111dd.
        ...cffbbd1511d1111d.
        ...ffffbb1111b111d..
        ...cf77ffb5bbbbbb...
        ...ff77fff4f4f......
        ...ff777ff5f5f......
        ...ff677fff1f.......
        ...fff777ffff.77....
        ...ffff7777777777...
        ...ffff6777776876...
        ...fffff6776f.f6....
        ...ffffffffff.ee....
        ...fffffffffffe.....
        ..fffffcffffffe.....
        ..ffffffbfffffe.....
        ..ffffffffffffe.....
        ..fffffcfcffffe.....
        ..ffffffffffffef....
        ..fffffffcffffef....
        ..ffffffbfffffef....
        .fffffffffffffeff...
        .fffffffffffffeff...
        .fffffffffffffeff...
        .fffcfffffbfffefff..
        .ffffffffffcffefff..
        .fffffffffffffefff..
        .fffffffffcfffefff..
        .fffffffffffcfefff..
        .ffffffffffbff5fff..
        ..ffffffffffff4fff..
        ....fffffffffffff...
        `, SpriteKind.Player)
    mySprite2.setPosition(110, 60)
    textSprite = textsprite.create("choose your character")
    textSprite.setPosition(94, 110)
    textSprite = textsprite.create("")
    textSprite.setOutline(1, 6)
    textSprite.setMaxFontHeight(12)
    inCharacterSelect = true
    characterIndex = 0
    cursor = sprites.create(img`
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
        . 3 3 3 3 3 3 3 3 3 3 3 3 3 . 
        . . 3 3 3 3 3 3 3 3 3 3 3 . . 
        . . . 3 3 3 3 3 3 3 3 3 . . . 
        . . . . 3 3 3 3 3 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . 3 3 3 . . . . . . 
        . . . . . . . 3 . . . . . . . 
        `, SpriteKind.Player)
    updateCursor()
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    characterIndex = (characterIndex + 1) % 3
    updateCursor()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Art, function (sprite, otherSprite) {
    if (controller.A.isPressed() && !(showing_art)) {
        showing_art = true
        custom.showArtInfo(otherSprite)
        controller.moveSprite(patron_of_the_arts, 0, 0)
    }
})
function setSculpture (sculpture: Sprite) {
    if (sprites.readDataString(sculpture, "name") == "name") {
        return
    }
    tempLocation = tiles.getTilesByType(assets.tile`myTile13`)[0]
    tiles.setTileAt(tempLocation, assets.tile`myTile1`)
    tiles.setTileAt(tiles.locationInDirection(tempLocation, CollisionDirection.Bottom), assets.tile`myTile10`)
    tiles.setTileAt(tiles.locationInDirection(tiles.locationInDirection(tempLocation, CollisionDirection.Left), CollisionDirection.Bottom), assets.tile`myTile9`)
    tiles.setTileAt(tiles.locationInDirection(tiles.locationInDirection(tempLocation, CollisionDirection.Right), CollisionDirection.Bottom), assets.tile`myTile11`)
    tiles.setTileAt(tiles.locationInDirection(tempLocation, CollisionDirection.Left), assets.tile`myTile1`)
    tiles.setTileAt(tiles.locationInDirection(tempLocation, CollisionDirection.Right), assets.tile`myTile1`)
    tiles.setTileAt(tiles.locationInDirection(tiles.locationInDirection(tempLocation, CollisionDirection.Top), CollisionDirection.Right), assets.tile`myTile1`)
    tiles.setTileAt(tiles.locationInDirection(tiles.locationInDirection(tempLocation, CollisionDirection.Top), CollisionDirection.Left), assets.tile`myTile1`)
    tiles.setTileAt(tiles.locationInDirection(tempLocation, CollisionDirection.Top), assets.tile`myTile1`)
    tiles.setWallAt(tiles.locationInDirection(tempLocation, CollisionDirection.Bottom), true)
    tiles.setWallAt(tiles.locationInDirection(tiles.locationInDirection(tempLocation, CollisionDirection.Left), CollisionDirection.Bottom), true)
    tiles.setWallAt(tiles.locationInDirection(tiles.locationInDirection(tempLocation, CollisionDirection.Right), CollisionDirection.Bottom), true)
    tiles.setWallAt(tiles.locationInDirection(tempLocation, CollisionDirection.Left), true)
    tiles.setWallAt(tiles.locationInDirection(tempLocation, CollisionDirection.Right), true)
    tiles.setWallAt(tiles.locationInDirection(tiles.locationInDirection(tempLocation, CollisionDirection.Top), CollisionDirection.Right), true)
    tiles.setWallAt(tiles.locationInDirection(tiles.locationInDirection(tempLocation, CollisionDirection.Top), CollisionDirection.Left), true)
    tiles.setWallAt(tiles.locationInDirection(tempLocation, CollisionDirection.Top), true)
    sculpture.bottom = tiles.locationXY(tempLocation, tiles.XY.bottom)
    sculpture.x = tiles.locationXY(tempLocation, tiles.XY.x)
    sculpture.z = 5
    tempSprite = sprites.create(img`
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        33333333333333333333333333333333
        `, SpriteKind.SculptureOverlap)
    sprites.setDataSprite(tempSprite, "sculpture", sculpture)
    tempSprite.top = tiles.locationXY(tempLocation, tiles.XY.bottom)
    tempSprite.x = tiles.locationXY(tempLocation, tiles.XY.x)
    tempSprite.setFlag(SpriteFlag.Invisible, true)
}
function createArtPiece (image2: Image, name: string, artist: string, year: string, description: string) {
    newArtPiece = sprites.create(image2, SpriteKind.Art)
    sprites.setDataString(newArtPiece, "name", name)
    sprites.setDataString(newArtPiece, "artist", artist)
    sprites.setDataString(newArtPiece, "year", year)
    sprites.setDataString(newArtPiece, "description", description)
    return newArtPiece
}
function createPatron (image2: Image, image3: Image) {
    patron_of_the_arts = sprites.create(image2, SpriteKind.Player)
    controller.moveSprite(patron_of_the_arts)
    characterAnimations.loopFrames(
    patron_of_the_arts,
    [image2, image3],
    200,
    characterAnimations.rule(Predicate.FacingRight, Predicate.Moving)
    )
    characterAnimations.loopFrames(
    patron_of_the_arts,
    [cloneAndFlip(image2), cloneAndFlip(image3)],
    200,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.Moving)
    )
    scene.cameraFollowSprite(patron_of_the_arts)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.SculptureOverlap, function (sprite, otherSprite) {
    if (controller.A.isPressed() && !(showing_art)) {
        showing_art = true
        custom.showArtInfo(sprites.readDataSprite(otherSprite, "sculpture"))
        controller.moveSprite(patron_of_the_arts, 0, 0)
    }
})
function createGalleryRoom () {
    tiles.loadMap(tiles.copyMap(tiles.createMap(tilemap`level2`)))
    for (let value of art) {
        if (tiles.getTilesByType(assets.tile`myTile12`).length > 0) {
            hangArt(value)
        }
    }
    for (let value2 of sculptures) {
        if (tiles.getTilesByType(assets.tile`myTile13`).length > 0) {
            setSculpture(value2)
        }
    }
    tiles.replaceAllTiles(assets.tile`myTile12`, assets.tile`myTile1`)
    tiles.replaceAllTiles(assets.tile`myTile13`, assets.tile`myTile8`)
}
let newArtPiece: Sprite = null
let mySprite2: Sprite = null
let mySprite: Sprite = null
let galleries: number[] = []
let inCharacterSelect = false
let tempSprite: Sprite = null
let tempLocation: tiles.Location = null
let patron_of_the_arts: Sprite = null
let showing_art = false
let tempImage: Image = null
let textSprite: TextSprite = null
let cursor: Sprite = null
let characterIndex = 0
let sculptures: Sprite[] = []
let art: Sprite[] = []
art = [
createArtPiece(img`
    bbbbbbbbbddddbbbbbbbbbbbbbbbbbbb
    bbdddddddddddddddddbbbbbbddddddb
    bbddddddddddddddddbbbbdddddddddd
    bbbbbbbbddddddddddbddddddddddddd
    bbddddddddddddddbbbbdddddddddddd
    bddddbbbbbbbbbbbbbbbbbdddbbbbbbb
    bdddddddddbbbbbbbbbbbbbbbbbbbbbb
    bbdddddbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbb777bbbbbb777bbbbbbbbbbbb
    bbbb777777777bb77777bbbbbbbbbbbb
    bbb77777777777777bbbbb22222bbbbb
    bbbbbbbbbbb77777bbbbb2222222bbbb
    bbbbbbbbbbbbee777bbbb2222222bbbb
    bbbbbbbbbbbeee777bbbb4242424bbbb
    bbbbbbbbbeeebb777bbbb2424242bbbb
    bbbbbbbbeeebbbb77bbbb4444444bbbb
    66bbbbeeeebbbbb777bbbb44444bbb66
    6666eeeee6666666776666666ddc6666
    666eeeee6666666667666c666dcdd666
    555eeeee666666666666cec66cddd666
    555eeee5556666666666ceecc66d666c
    555eeee5555566666666ceeec6666cce
    555555555eee55666666ceeeec6cceee
    25552555544e55556666666666666666
    522255555b4e55555666666666666666
    52225555544455444556666666666666
    52525544554444455555666666666666
    55555554444444445555566666666666
    55555555444444448555666666666666
    55555555555544448856666666666666
    55555555555555888886666666666666
    55555555555556688666666666666666
    `, "shipwreck", "Richard", "1943", ""),
createArtPiece(img`
    111b111199999911111f11111f113333
    111b111699999991111f11881f113333
    1111111699999991111f11881f111333
    1111111699999991111f11111f111133
    1188111699999991111f11111f111111
    1188111669999961111f555555555511
    111b111166666611111f5bbb5f5bbbbb
    111b111111111111111f555555555511
    ffffffffffffffffffffffffffffffff
    11111111111111111111555555555511
    111b111111111111111155555f555511
    111b111111111111111155555f555511
    111b122222222222221fffff5f5ff5ff
    111b122222882222111155555f555511
    1111222222882222111155555f555511
    1112222222222221119999999f5555f1
    1112222222222211191155555f5555f1
    1112222222222211911155555f9555f1
    1112222222222111911155555f9555f1
    1112222222222211911155555f9555f1
    1111222222222221911155555f9555f1
    1111122222222222911155555f9555f1
    111b111222222222221155555f9555f1
    111b111122222222921155555f9555f1
    1888888812222222292155555f5555f1
    1888888812222222222999999f5555f1
    1888888811222222222111111f1111f1
    1888888812222222222211111f1111f1
    1888888812222222222211bb1f1bbbf1
    111b111112222222222211111f1111f1
    111b111122222222222111111f1111f1
    111b111122222222222111111f111111
    `, "tango on the sidewalk", "Vivian", "2022", ""),
createArtPiece(img`
    d d d d 9 9 5 5 5 5 5 9 9 9 9 9 
    d d d d 9 9 9 5 5 5 9 9 9 9 9 9 
    9 9 9 9 9 9 9 9 9 9 9 d d d d d 
    9 9 9 e 9 9 9 e 9 9 9 d d d d d 
    9 9 e e e 9 e e e 9 9 9 9 9 9 9 
    d 9 1 1 1 1 1 1 1 9 9 9 9 9 9 9 
    d 9 1 1 1 1 1 1 1 9 9 9 9 d d d 
    9 9 9 1 1 9 1 1 9 9 9 9 9 d d d 
    9 9 9 e 1 9 e 1 9 9 e e 9 9 9 9 
    9 9 e e e e e e e e e e 9 9 9 9 
    8 8 8 e e e e e e e e 8 8 8 8 8 
    8 2 8 8 8 8 8 8 8 8 8 8 6 8 6 8 
    8 2 2 8 8 2 8 8 8 4 4 8 6 6 8 8 
    8 8 8 2 2 8 8 5 8 8 4 8 8 6 8 8 
    5 8 5 5 5 5 5 5 5 4 4 4 8 6 8 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    `, "blackjack's ship", "Lucas", "1871", ""),
createArtPiece(img`
    ffffffffffffffffff88188ffffffffc
    8fffff8881888888888888ff88ffffff
    fffffff88888888ffff8888fffffffff
    8ffffff8888888888188ffcccfffffcc
    ffff8888888888888888ffcfffffcfcc
    ffff888888886668888ffffffffffccc
    8888888888666666888fffffffffffcc
    8888888888666666666fffff22fcffff
    8888888888666666686fff2222ffffff
    8888881886666666668fff222fffffff
    8888888666666666fffff2242ff22ffc
    bb88888666666bbfccff22222f222fff
    cccb88bbb666ccfcffff2242222422ff
    8888888666666fcff222222224222222
    866666866666ffff2224244244224f52
    866666866666fff22445422454224fff
    66666666ccccff22245424ff44ff2fcc
    666666cccccf622244ff54fff4c4cfcc
    66666666666f62245fa2faaff444cc42
    666666f66f666242fcccccccffaac2fb
    66aaffff6cfcffffcc8cccabccf2ffbb
    888888886888ccffffccccccaf245abc
    88888888886888cccccccccccccccccc
    888888666666688888666428cccccccc
    888888888866222882888868866ccccc
    8888811668886245488625882482845c
    88888888888888886688848546685288
    88888888886888824422882222828668
    81188888888668882288828844888888
    88888888888888888866888888886888
    88888811888888888888888888888888
    88888888888888888888811888888888
    `, "seattle on fire", "Shannon", "1802", ""),
createArtPiece(img`
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 9 8 8 8 9 8 8 9 8 8 8 8 8 8 
    9 9 1 9 9 9 1 9 9 1 9 9 9 9 9 9 
    1 1 8 1 1 1 8 1 1 8 1 1 1 1 1 1 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    8 8 8 9 8 8 8 9 8 9 8 8 9 8 8 8 
    9 9 9 1 9 9 9 1 9 1 9 9 1 9 9 9 
    1 1 1 8 1 1 1 8 1 8 1 1 8 1 1 1 
    8 6 6 6 8 8 c c 8 c 8 8 8 8 8 8 
    6 6 e 6 6 6 c c c c 8 8 8 8 8 8 
    6 8 e 6 8 6 c c c 1 4 8 4 8 8 8 
    8 e 8 8 8 d c c c 1 f 4 f 8 8 8 
    8 e 8 d d d c c d 4 4 4 4 d 8 8 
    e d d d b d d d d 1 4 4 4 d d d 
    e b d d d d d b d 1 4 d 4 d b d 
    e d d d d d d d d d d d d d d d 
    `, "Untitled", "Gideon", "1900", ""),
createArtPiece(img`
    4343636363d3c3c3838383e3e3e3b3b3
    343636363d3d3c383838373e3e3b3b3b
    43636363d3d3d38383837373e3b3b3b3
    3636363d3d3d3d38383737373b3b3b3b
    636363a3d3d3d3d383737373b3b3b3b3
    36363a3a3d3d3d3d3737373b3b3b3b3b
    6363a3a3a3d3d3d3d37373b3b3b3b3b3
    363a3a3a3a3d3d3d3d373b3b3b3b3b3b
    6393a3a3a3a3d3d3d3d3b3b3b3b3b3b3
    39393a3a3a3a3d3d3d3b3b3b3b3b3b3b
    939393a3a3a3a3d3d3b3b3b3b3b3b3b3
    3939323a3a3a3a3d3b3b3b3b3b3b3b3b
    93932323a3a3a3a3b3b3b3b3b3b3b3b3
    393532323a3a3a3b3b3b3b3b3b3b3b3b
    9353532323a3a3b3b3b3b3b3b3b3b3b3
    35353532323a3b3b3b3b3b3b3b3b3b3b
    `, "Dot Party", "Richard", "1989", ""),
createArtPiece(img`
    88888889888889888888988898888988
    8988898889889888558988898ff89888
    98ff9888988fff8555588898fff988ff
    8ff9f888669fff55ee5588888fff8fff
    8866ff866968f855dd5588888fff89ff
    696666869666f882445888889ff88fff
    66666689866ffff844818189f889888f
    8b666688c8fffff8428888888ccc8c66
    bbb66681888ffcff4888888111818666
    bbb8118666818fff8666968888886666
    bffff666666668ff6666696888fff666
    ffff6f666666668966666696fffffff6
    ffffffffff6f6688ffff669fffffffff
    ccffff666666f6fffffff8fffffccccf
    cccffff666666ffffccff6fffffcfffc
    cccffff666666ff1ccccfffffccffffc
    `, "raindrop in the storm", "Vivian", "1", ""),
createArtPiece(img`
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbb288888a1f1388888888888888bbbb
    bbb499998a1b1388888888899998bbbb
    bbb494888a3a3388888888888898bbbb
    bbb49558863a3888833333888898bbbb
    bbb89558863a3888831113888898bbbb
    bbb88888863a3888831f13888888bbbb
    bbb88888863a3883331113888888bbbb
    bbb888888a3a3333333333888888bbbb
    bbb888888a1b1333338888888882bbbb
    bbb888888a1f1333388888884444bbbb
    bbb888888a1b1333888888855444bbbb
    bbb883333a3a3333338888555444bbbb
    bbb883333a8a3333333888888882bbbb
    bbb883333a8a3333333888888888bbbb
    bbb83333368a3388333333388888bbbb
    bbb83111368a3388883111388888bbbb
    bbb831f1368a33888831f1388888bbbb
    bbb83111368a3388883111388888bbbb
    bbb83333368a3388883333388888bbbb
    bbb88888868a3388888888888888bbbb
    bbbeeeeee68a3388888888888888bbbb
    bbbdef11e68a3388888888888888bbbb
    bbbdd111ec8a3388888888888888bbbb
    bbbdd911dc8a3388888888888898bbbb
    bbbcc9cccfcfcccccccccccccc9cbbbb
    bbbee9eeececeeeeeeeeeeeeee9ebbbb
    bbbee9999ceceeeeeeeeeee9999ebbbb
    bbbeeeeeececeeeeeeeeeeeeeeeebbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    `, "I see you", "Lucas", "2034", ""),
createArtPiece(img`
    bbbbbbbbbbbbbbbbbbb1bbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbb1bbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbb1bbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbb1bbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbb1bbbbbbbbbbbb
    66ff1fff1ff666666661aaaaaaaaaaaa
    66ff1fff1ff666666661aaaaaaaaaaaa
    66fffffffff666666661aaaaaaaaaaaa
    666fffffff6666666661aaaaaaaaaaaa
    66666666666666666661aaaaaaaaaaaa
    66666666666222222221aaaaaaaaaaaa
    666666666222ccccccc17aaaaaaaaaaa
    666666622ccc4444444187aaaaaaaaaa
    6666662cc44ccccccc4187aaaaaaaaaa
    6666662c4cc2222222c187aaaaaaaaaa
    6666622cc2244444442187aaaaaaaaaa
    666662cc22444224444177aaaaaaaaaa
    666662cc24442222224157aaaaaaaaaa
    666662c224442444424157aaaaaaaaaa
    66662c4244442224424157aaaaaaaaaa
    66662c4244444444224177aaaaaaaaaa
    666622422444444424417aa9999999aa
    66666244222224422421aa9ff999999a
    66666624444442244221aa999999f99a
    66666662244422222661aa99f999f99a
    bbbbbbbbb2222bbbbbb1bbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbb1bbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbb1bbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbb1bbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbb1bbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbb1bbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbb1bbbbbbbbbbbb
    `, "Sneaky Soldiers", "Gideon", "1840", ""),
createArtPiece(img`
    88888888888888888888888888888888
    88888888888888888888888888888888
    d88dd88888d888888888888888888888
    ddddddd88dddd8888888888888888888
    ddddddddddddddd88888888888888888
    dddddddddddddddddd88888888888888
    ddddddddddddddddddd888ddd8888ddd
    666ddddddddddededdddddddd88ddddd
    6666666666666eeedddddddddddddddd
    6666666666666eee6ddddddddddddddd
    6666612166666eee66ddd6dddddddd66
    6666626266666eee6666666666666666
    6666612166666eee6566666666666666
    66666666646566665564666666666666
    66666666664655556646666666666666
    66666666664555555566666666666666
    `, "Moving Water", "Waddles", "2022", ""),
createArtPiece(img`
    8886969998869969
    8886669888869966
    8886669958869966
    8886669558888866
    6886665888886966
    6886665558886888
    6886666688886969
    6886669588886669
    6886699988886888
    6886669988886669
    6886669888886969
    6886666688888889
    6888669988886699
    6888669988886699
    6886669988886669
    8886869988886669
    88c8688888886669
    8c86669988f66699
    6c86669988f66699
    8c88669998f66699
    8c8866998ff86699
    cc8888998f886699
    fc8866998ff86699
    fc88669986f66696
    fc8866998ff68696
    fc8c66998ff68686
    fc8c66998fff8886
    fccc6cc9f8ff8888
    fff8c6c9f8f888ff
    fff8c6c9fff8ffcf
    ffffffffffffffcf
    fffcf8c8ffffffff
    `, "Trees?", "Shannon", "1345", ""),
createArtPiece(img`
    33ff3333333333333333333ffffff333
    33f4ff3333333333333333f44444f333
    33f444ff3333333333333f444444f333
    33f44444ff3333333333f4444444f333
    33f4444444ffffffffff44444444f333
    33f4444444444444444444444444f333
    33f44fffffffff4444ffffffff44f333
    33f44f91ffffff4444f91fffff44f333
    33f44f9fffffff4444f9ffffff44f333
    33f44fffffffff4444ffffffff44f333
    33f44fffffffff4444ffffffff44f333
    33f44fffffffff4444ffffffff44f333
    33f44fffffffff4444ffffffff44f333
    33f44fffffffff4444ffffffff44f333
    33f44fffffffff4444ffffffff44f333
    33f44fffffffff4444ffffffff44f333
    33f44fffffffff4444ffffffff44f333
    33f44fffffffff4444ffffffff44f333
    33f44fffffffff4444ffffffff4ef333
    33fe4fffffffff4444ffffffff4ef333
    33fe4fffffffff4444ffffffff4ef333
    33fe4fffffffff4444ffffffff44f333
    33f44fffffffff4444ffffffff44f333
    33fe4fffffffff4444ffffffff44f333
    33fe4fffffffff4444ffffffff4ef333
    33fe4fffffffff4444ffffffff4ef333
    33fe4fffffffff4444ffffffff4ef333
    33f4444444444444444444444444f333
    33f44444444444444f4444444444f333
    33f44444444444fff44444444444f333
    33f4444444444444444444444444f333
    33fffffffffffffffffffffffffff333
    `, "This is cute", "Lucas", "2021", ""),
createArtPiece(img`
    88888888888888882222222222222222
    99999999999999999999999999999992
    88888888888888882222222222222229
    88999999999999999999999999999229
    89888888888888882222222222222929
    89889999999999999999999999922929
    89898888888888882222222222292929
    89898899999999999999999992292929
    89898988888888882222222229292929
    89898988999999999999999229292929
    89898989888888882222222929292929
    89898989889999999999922929292929
    89898989898888882222292929292929
    89898989898899999992292929292929
    89898989898988882229292929292929
    89898989898988999229292929292929
    89898989898989882929292929292929
    89898989898989899229292929292929
    89898989898989882229292929292929
    89898989898988999992292929292929
    89898989898988882222292929292929
    89898989898899999999922929292929
    89898989898888882222222929292929
    89898989889999999999999229292929
    89898989888888882222222229292929
    89898988999999999999999992292929
    89898988888888882222222222292929
    89898899999999999999999999922929
    89898888888888882222222222222929
    89889999999999999999999999999229
    89888888888888882222222222222229
    88999999999999999999999999999993
    `, "Galaxy from 3022", "Kiwiphoenix", "3022", ""),
createArtPiece(img`
    33333333333333333333333333333333
    33333333333333333333333333333333
    33333333333333333333333333333333
    33333333333333333333333333333333
    33333333333aaaaaaaaaaa3333333333
    3333333333a33333333333a333333333
    33333333aa3333333333333aa3333333
    3333333a33333333333333333a333333
    333333a3333333333333333333a33333
    333333a33aaa333333333aaa33a33333
    33333a333a3333333333333a333a3333
    3333a3333a3333333333333a3333a333
    3333a3333a3333333333333a3333a333
    3333a3333a3333333333333a3333a333
    3333a3333a33333aaa33333a3333a333
    3333a33aaa33333aaa33333aaa33a333
    3333a3333a3333aaaaa3333a3333a333
    3333a3333a3333aaaaa3333a3333a333
    3333a3333a3333aaaa33333a3333a333
    3333a3333a3333aaaaa3333a3333a333
    3333a3333a3333aaaaa3333a3333a333
    3333a3333a3333333333333a3333a333
    33333a333a3333333333333a333a3333
    333333a33aaa333333333aaa33a33333
    333333a3333333333333333333a33333
    3333333a33333333333333333a333333
    33333333aa3333333333333aa3333333
    3333333333a33333333333a333333333
    33333333333aaaaaaaaaaa3333333333
    33333333333333333333333333333333
    33333333333333333333333333333333
    33333333333333333333333333333333
    `, "Makecode", "Waddles", "2022", "")
]
sculptures = [
createArtPiece(img`
    ...........ff...
    ..........f54f..
    ..........f54ff.
    .........f45c55f
    .........f45555f
    .........f4e5ff.
    ....fff.fffe5f..
    ...f444f44455f..
    ..f4e5555ee5ef..
    ..f455ee55555f..
    ..f455fffffff...
    ...f5ef.........
    ..f45efffffff...
    ..f4555ee55e5f..
    ..f4e55555ee5f..
    ...f444f44455f..
    ....fff.fff5ef..
    .........f45ef..
    .........f455f..
    .........f4e5f..
    ..........f55f..
    .........f45ef..
    .........f455f..
    .........f4e5f..
    ..fffffffff55f..
    .f45ee555555ef..
    f4f5ee5ee5e5ef..
    f4f5555ee5555f..
    f4f5ee5555ee5f..
    .ff5555555ee5f..
    ..f5f4ffff4f5f..
    ...f.f....f.f...
    `, "Unique giraffe", "Richard", "1653", ""),
createArtPiece(img`
    ......ffffffff..
    .....fceeee333f.
    ....fcceeeeeee3f
    ..ffccceeffeeeff
    .fccceeeeffeeeff
    f8cceeeeeeeeffef
    f888c8eeeeeeffef
    f888cccceeeeeeef
    f3ee88cceeeeeeef
    fe3ecc8cceeeeeef
    ffeeececceeeeecf
    ffeeececceeeeecf
    feeeeeeceeeee8f.
    ffeeeeeceeeee8f.
    feeeeecceee888f.
    .feeeeceeee8eef.
    .feeeccc888ce3ef
    .feeecccecceeeef
    ..feceeccceeeecf
    ..fce33ecccee8cf
    .feeeeefeccc88f.
    .fefeeefece888f.
    .fefeeeeeeecc8f.
    .feeeffeeecccccf
    .feeeffeeecce3cf
    ..feeeeeeecceeef
    ...feeeeeeecccef
    ...feeeeeeecceef
    .ff88eeeeeeccccf
    fccc88eeeecccccf
    fcccc8888cceeccf
    feeeeeeeeeeeeeef
    `, "Escape from the city", "Vivian", "2023", ""),
createArtPiece(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . f 1 1 f . . . . . . 
    . . . . . f 1 1 1 1 f . . . . . 
    . . . . f 1 1 1 1 1 1 f . . . . 
    . . . . f 1 1 5 5 1 1 f . . . . 
    . . . . f 1 5 5 5 5 1 f . . . . 
    . . . . f 1 5 5 5 5 1 f . . . . 
    . . . . f 1 1 5 5 1 1 f . . . . 
    . . . . . f 1 1 1 1 f . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, "Breakfast?", "Shannon", "2016", ""),
createArtPiece(img`
    ...........................c....................................
    ......................c.....c.....cc............................
    ......................cc....c....cdc............................
    ......................cdcc...c..cddc............................
    ......................cdddc..c.cdddc............................
    ......................cddddccccddddc............................
    ......................cdddddccdddddc............................
    ......................cdddddddddddddc...........................
    .......................cddddcccccccddc..........................
    .......................cbcddcdddddcddcc.........................
    ......................cbbbcdcdccddcdcbbc........................
    .....................cbbbbbbcdccddcbbbbc........................
    .....................cbbbbbbcdddddcbbbbbc.......................
    ....................cbbbbbbbcdddddcbbbbbbc......................
    ...................cbbbbbbbbcccccccbbbbbbbc.....................
    ...................cbbbbbbbbbbbbbbbbbbbbbbbc....................
    ...................cbbbbbbbbbbbbbbbbbbbcccccc...................
    ...................cbbbbbbbbbbbbbcccccc.........................
    ....................cbbbbbbbbbbbbc....................cccc......
    ....................cbbbbbbbbbbbbc.........cccccccccccbbbc......
    ...ccccc............cbbbbbbbbbbbbc..ccccccccccbbbbbbbbbbbc......
    ...cbbbbcccccccc....cbbbbbbbbbbbbcccccbbbbbbbbbbbbbbbbbbc.......
    ...cbbbbbbbbbbbbcccccbbbbbbbbbbbbcbbbbbbbbbbbbbbbccccccc........
    ....ccccbbbbbbbbbbbbcbbbbbbbbbbbbccbbbbbbbbccccccbbbbbbc........
    .....cbbccccbbbbbbbccbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbc.........
    .....cbbbbbbcccbbbbcbbbbbbbbbbbbbccbbbbbbbbbbbbbbbbbbbc.........
    ......cbbbbbbbbbbbbcbbbbbbbbbbbbbcbbbbbbbbbbbbbbcccccc..........
    ......cbbbbbbbbbbbbcbbbbbbbbbbbbbcbbbbbbbbbcccccbbbbbc..........
    .......ccbbbbbbbbbccbbbbbbbbbbbbbccbbbbbbbbbbbbbbbbbc...........
    ........cccccbbbbbcbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbc............
    ........cbbbbccbbbcbbbbbbbbbbbbbbbccbbbbbbbbbbbbbbbc..ccc.......
    .........cbbbbbbbbcbbbbbbbbbbbbbbbbcbbbbbbbcccccccccccbbc.......
    .........ccccbbbbbcbbbbbbbbbbbbbbbbcccccccc......ccbbbbccc......
    .............ccccccbbbbbbbbbbbbbbbcc...........ccbbbbbccbc......
    .................cbbbbbbbbbbbbbbbbccc........ccbbbbbbccbbc......
    ..................cbbbbbbbbbbbbbbbcbcccccccccbbbbbbbccbbbcc.....
    ...................cbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbccbbbbbc.....
    ....................cbbbbbbbbbbbbcccccccccccccccbbbbbbbbbc......
    .....................cbbbbbbbbbbcbc.............ccbbbbbbcc......
    .....................cccbbbbcccccbcc..............ccbbccc.......
    .....................cbcccccc..ccbbcccccccc........cccc.........
    .....................cbbbc......ccbbbbbbcc......................
    ......................cbbcc......cccccccccc.....................
    ......................cbbbcccccc................................
    ......................ccbbbbbcccccc.............................
    .......................cccbbbcccc...............................
    .........................cccccccccc.............................
    ................................................................
    `, "Phoenix", "Lucas", "1104", ""),
createArtPiece(img`
    ................................
    ................................
    ................................
    ................................
    ..................f.f...........
    .................f4f4f..........
    .................f444f..........
    .................f4f4f..........
    .................f444f..........
    ...............fff444f..........
    .............ff2ff44f...........
    ...........ff2222ff4f...........
    ..........fff2222ffff...........
    .........f77ffffff..............
    .........f777f..................
    ........f777f...................
    ........f77f....................
    ........ffff....................
    ........f222fffffffffff.........
    ........f222f4444f77777f........
    .........f22f4444f777fff........
    ..........ffffffffffff44f.......
    ......f.............f444f.......
    .....fbff.......fffff444f.......
    ......f77f.ffffff444ff4f........
    ......f77ffff222f4444ff.........
    ......f7f44f2222f44fff..........
    .......f444f2fffffff............
    .....bbbfffffbbbbbbbbbbbbbb.....
    .....bbbbbbbbbbbbbbbbbbbbbb.....
    .....bbbbbbbbbbbbbbbbbbbbbb.....
    ......bbbbbbbbbbbbbbbbbbbb......
    `, "The disaster of 1990", "Gideon", "1990", ""),
createArtPiece(img`
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    .........ff.........ff..........
    ........feefffffffffeef.........
    .......feddeeeeeeeeeddef........
    .......fedddddddddddddef........
    ........fedddddddddddef.........
    ........fedddddddddddef.........
    ........fedd44ddd44ddef.........
    .........fdd4fddd4fddf..........
    ........fffdddddddddfff.........
    .........fdddddddddddf..........
    ........fedddddddddddef.........
    ........fedddddddddddef.........
    .........fedddddddeeef..........
    ..........fedddddeeefff.........
    ..........feddddddddeeef........
    .........feddddddddddddef.......
    ........fedddddddddddddef.......
    ........fedddddddddddddef.......
    .........feddeeddddddddef.......
    ........fedddedddddddddef.......
    ........feddeeddeeeedddef.......
    ........fe11ee11effe1def........
    .........fee..ee....eef.........
    `, "A cat that is here", "Kiwiphoenix", "2022", ""),
createArtPiece(img`
    ..fffff....................fffff
    ..fbbbfff..................fbbf.
    ..fbbbbbf.................fbbbf.
    ...ffbbbf.................fbbbf.
    ....fbbbf.................fbbbf.
    ....f222ffff.............1112ff.
    ....f2111122ff......fffff2222ff.
    ....f222222222ffffff221222122f..
    ....f222211222222222212222211f..
    ....f2211222222122221222222221..
    ....f222222fff221122222fff222f..
    ....f222222fff222222222fff222f..
    .....f22222fff222222222fff222f..
    .....f2222222222222222222222f...
    .....f2222222222222111122222f...
    ......f222221112221111112222f...
    ......f222221111111111111112f...
    .......f22221111111111111112f...
    .......f22221111111122111112f...
    .......f22222222222222222222f...
    ........f22222ffffffffffff22f...
    ........f22222ffffffffffff22f...
    .........f2222ffffffffffff22f...
    .........f2222ffffffffffff22f...
    ..........ff222222222222222f....
    ............ff222222222222f.....
    ..............ff222222222ff.....
    ................fffffffffff.....
    ................................
    ................................
    ................................
    ................................
    `, "white mustache mask", "Gideon", "1769", ""),
createArtPiece(img`
    ................................................
    .....................................ff.........
    ...................................ffd1ff.......
    .................................ffd1dd1dff.....
    ..........................fff..ff1dddfffd1dff...
    ........................ffbbbffddd1ff...ffdd1f..
    .....................fffbbbbbbd1dff.......ffddf.
    ...................ffbbbbbfbbbbff...........ff..
    ..................fbbbbbbbbbbbbbf...............
    .................fbbbbbbbbbbbbbbf...............
    ................fbbbbbbbbbbbbffff...............
    ...............fbbbbbbbbbbbbbbbbf...............
    ............fffbbbbbbbbbbbbbbbbbf...............
    ...........fbbbbbbbbbbbbbbbbbbbf................
    ..........fbbbbbbbbbbbbbbbbbbbf.................
    ..........fbbbbbbbbbbccccbbbcccf................
    .........fbbbbbbbbbcccccbbbcccccf...............
    ........fbbbbbbbbbbcccccbfccccccf...............
    .......fbbbbbbbbbbbccccbf.fcccccf...............
    .......fbbbbbbbbbbbccccff..fccccf...............
    ......fbbbbbbbbbbbbbcccf....ffccf...............
    .....fbbbbbbbbbbbbffccf.......ff................
    .....fbbbbbbbbbbff..fcf.........................
    ....fbbbbbbbbbff.....f..........................
    ...fbbbbbbbfff..................................
    .ffbbbbbbbf.....................................
    .fbbbfffbbf.....................................
    .fffff.fbbf.....................................
    .......fbbf.....................................
    ........ff......................................
    ................................................
    ................................................
    `, "Unique Narwhal", "Richard", "1834", ""),
createArtPiece(img`
    ..................................................
    ..................................................
    .................77777............................
    ..............7777777766..........................
    .............6777777766777........................
    ...........6666777766677766.......................
    ..........666666666666776666......................
    .........66666666666677766688aaaa.................
    ........6666777777777777668aaaca11a...............
    .......667777777777fff766a1aaaccaaaa..............
    ......6677777777777fff668aa1aaaccccc..............
    .....66677777666777fff68afaacaaaaaaa..............
    .....6677777666666666668aaaccacaaaaaaaaaa.........
    ....66777766666666666687aacaaaccaaccaacccaa.......
    ...77677766ff6666666668777ccaa1ccccaacaaa1aa......
    ...76777666ff6666f6f688faafcaaa1ccccccafaf1a......
    ..776777666ff66666f668aaaaacfafacaa1ccaaaaac......
    ..76677766666666666888ccccccacaacafa1cccaacca.....
    ..7667766666666777887aaccccccccacaaafcccccca1a....
    ..766776666667777777aa1aacccaaccccaaaccccccaa1....
    ..76677665511777777aaaaeeccaa1acccccccccccafafa...
    ..55676655155577777aa77ee77aaaaccaaacaacccaaaaa...
    ..55566555555577777aa777777caacccaaacccaaccaaaa...
    ..6565745555447777ccc7777777ccccccaca11caacccc....
    ..5565744444448777ccc777777777ccccccaaacaaaaaa....
    ..555578444444888ccc77777777777cccccaaacaaaccca...
    ..656588555555558ccc777777777777cccccacccaccaaa...
    ...55588555555555ccc7777777777f77ccccccccccafaf...
    ...55885555554555cc6777f77f77772222ccccccccaaaa...
    ...677855555545555567777777ff722222222cccccaaaa...
    ....77755555544555566677777772222222222cc2222c....
    ....67755455554555556666777662222ff22222222f22....
    .....655545555445555566666662222222f2222222222....
    ......55545555545555556666662222222222222222f22...
    ......5554555554455555556666222222ff22222222ff2...
    .....55554555555445555555662222222ff22222222ff2...
    .....55544555555444455555552222222ff22222222222...
    ....55554455555544445555555555222222222222222222..
    ....5f55445555555444445555f5555522222222ff222222..
    ....555544555555554444445555555522222222ff22222...
    ...555544455f555f54444444455555555552222ff22222...
    ...555444455f555f554444444455555555522222222222...
    ...5554444555555555544444444445555552222222222....
    ..55444444..55f555554444444444455552222222222.....
    ..444444....555555555444444444445552222222222.....
    ...4444......555555554444444444..2222222222.......
    ..............5555555544444444.....222222.........
    ..............55555555544444......................
    ...............55555555...........................
    .................5555.............................
    `, "STILL LIFE OF THE PARTY", "Vivian", "20222", ""),
createArtPiece(img`
    . . . . f f f f f f f . . . . . 
    . . f f f f f f 1 1 1 f f . . . 
    . f f f f f f f 1 1 1 1 1 f . . 
    . f f f f f f f 7 7 7 7 1 f . . 
    f f f f f f f f 1 1 7 7 1 1 f . 
    f f f f f f f f 1 1 1 1 1 1 f . 
    f f f f f f f f 1 1 1 1 1 1 f . 
    f f f f f f f f 1 1 1 1 1 1 f . 
    f 1 1 1 1 1 1 1 f f f f f f f . 
    f 1 1 7 7 1 1 1 f f f f f f f . 
    f 1 1 7 7 7 7 7 f f f f f f f . 
    . f 1 1 1 1 1 1 f f f f f f . . 
    . f 1 1 1 1 1 1 f f f f f f . . 
    . . f f 1 1 1 1 f f f f f . . . 
    . . . . f f f f f f f . . . . . 
    . . . . . . . . . . . . . . . . 
    `, "Small marble", "Gideon", "1010", ""),
createArtPiece(img`
    ......................f.........
    ............f........ff.........
    ............f.......f4f.........
    ............ff......f4f.........
    ............f4ffffff44f.........
    ............f444444444f.........
    ............f41f444f14f.........
    ............f41f444f14f.........
    ............fe4433344ef.........
    ............f444434444f.........
    ......fff...fe4444444ef.........
    .....f11ff..fffffffffff.........
    .....f114ff..fffffffff..........
    .....f144effff4444444f..........
    ......ffe44e4f4444444f..........
    .......ff4e44fee444eef..........
    ........ff44ef44f4f44f..........
    .........fffff11f4f11f..........
    .............fffffffff..........
    ............ffffffffffff........
    ............fbbbbbbbbbbf........
    ............fbbbbbbbbbbf........
    ............fbbbbbbbbbbf........
    ............fbbbbbbbbbbf........
    ............fbbbbbbbbbbf........
    ............fbbbbbbbbbbf........
    ............fbbbbbbbbbbf........
    ............fbbbbbbbbbbf........
    ............fbbbbbbbbbbf........
    ............fbbbbbbbbbbf........
    ............fbbbbbbbbbbf........
    ............ffffffffffff........
    `, "This is cuter", "Lucas", "2022", "")
]
showPatronSelect()
