// Resize and compress an image in the browser before upload.
const MAX_SIDE = 1800;

function readAsDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(new Error('Could not read file'));
    r.readAsDataURL(blob);
  });
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`${file.name} is not an image the browser can open`));
    };
    img.src = url;
  });
}

export async function prepareImage(file) {
  if (!file.type.startsWith('image/')) throw new Error(`${file.name} is not an image`);
  // Keep animated GIFs and SVG-free small files as they are.
  if (file.type === 'image/gif' || (file.size < 400 * 1024 && /jpeg|webp|png/.test(file.type))) {
    return { filename: file.name, contentType: file.type, data: await readAsDataUrl(file) };
  }
  const img = await loadImage(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
  let blob = await new Promise((r) => canvas.toBlob(r, 'image/webp', 0.84));
  if (!blob || blob.type !== 'image/webp') blob = await new Promise((r) => canvas.toBlob(r, 'image/jpeg', 0.85));
  return { filename: file.name, contentType: blob.type, data: await readAsDataUrl(blob) };
}
