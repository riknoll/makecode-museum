
/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace custom {
    let renderable: scene.Renderable;

    //% block
    export function showArtInfo(sprite: Sprite) {
        const name = new sprites.RenderText((sprite.data.name as string).toUpperCase(), 90);
        name.font = image.doubledFont(image.font8);
        name.setMaxWidth(150);
        const year = new sprites.RenderText(sprite.data.year, 40);
        year.font = image.font8;
        year.setMaxWidth(60);
        const artist = new sprites.RenderText(sprite.data.artist, 80);
        artist.font = image.font8;
        artist.setMaxWidth(120);
        const description = new sprites.RenderText(sprite.data.description, 120);

        let toDraw = sprite.image;

        const availableHeight = screen.height - name.height - artist.height - 4;

        if (sprite.image.height * 4 < availableHeight) {
            toDraw = simpleScale(toDraw, 4);
        }
        else if (sprite.image.height * 3 < availableHeight) {
            toDraw = simpleScale(toDraw, 3);
        }
        else if (sprite.image.height * 2 < availableHeight) {
            toDraw = simpleScale(toDraw, 2);
        }

        renderable = scene.createRenderable(10, () => {
            screen.fillRect(2, 2, 156, 116, 13);
            screen.fillRect(3, 3, 154, 114, 12);
            screen.drawTransparentImage(toDraw, 80 - toDraw.width / 2, screen.height - 5 - toDraw.height);

            name.draw(screen, 8, 4, 1,)
            artist.draw(screen, 8, 4 + name.height, 11);
            year.draw(screen, 8 + artist.width + 4, 4 + name.height, 11)

            description.draw(screen, 8, Math.max(45, 8 + name.height) + artist.height + 4, 1)
        })
    }

    //% block
    export function hideArtInfo() {
        if (renderable) renderable.destroy();
    }

    function simpleScale(toScale: Image, factor: number) {
        const out = image.create(toScale.width * factor, toScale.height * factor);
        for (let x = 0; x < toScale.width; x++) {
            for (let y = 0; y < toScale.height; y++) {
                out.fillRect(x * factor, y * factor, factor, factor, toScale.getPixel(x, y));
            }
        }
        return out;
    }
}
