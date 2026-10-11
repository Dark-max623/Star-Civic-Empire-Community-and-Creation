/**
 * Compresses an image file using an offscreen canvas.
 * Resizes to fit within `maxDimension` while preserving aspect ratio,
 * then exports as a JPEG data URL.
 */
export const compressImage = (
  file: File,
  maxDimension = 1200,
  quality = 0.85
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('File is not an image.'));
      return;
    }

    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image.'));
      img.onload = () => {
        let { width, height } = img;

        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas not supported.'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // JPEG for photos — much smaller than PNG at comparable quality
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Estimates the byte size of a base64 data URL.
 * Used for quota pre-checks before writing to localStorage.
 */
export const estimateDataUrlSize = (dataUrl: string): number => {
  const base64 = dataUrl.split(',')[1] || '';
  return Math.ceil((base64.length * 3) / 4);
};

export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

/**
 * localStorage quota is ~5MB; we warn above 4MB to leave headroom.
 */
export const STORAGE_WARN_BYTES = 4 * 1024 * 1024;