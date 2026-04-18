export function renderImageToCanvas(ctx, canvas, img) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cW = canvas.width;
    const cH = canvas.height;
    const scale = Math.max(cW / img.width, cH / img.height);
    const x = (cW / 2) - (img.width / 2) * scale;
    const y = (cH / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

export function getValidImage(images, index, totalFrames) {
    let img = images[index];
    if (!img || img.width === 0) {
        for (let offset = 1; offset < totalFrames; offset++) {
            if (images[index - offset] && images[index - offset].width > 0) return images[index - offset];
            if (images[index + offset] && images[index + offset].width > 0) return images[index + offset];
        }
        return null;
    }
    return img;
}
