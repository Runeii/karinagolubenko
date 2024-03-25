export const drawPixellatedImage = async (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  pixelSize = 80
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return null;
  }
  // Calculate the reduced resolution sizes
  const scaledWidth = Math.ceil(canvas.width / pixelSize);
  const scaledHeight = Math.ceil(canvas.height / pixelSize);

  // Draw the image in reduced resolution
  ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight);

  // Scale the image back up to original size, causing the pixellation effect
  ctx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, canvas.width, canvas.height);
};
