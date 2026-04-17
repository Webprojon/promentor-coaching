const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

export async function readImageFileAsDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image must be 2MB or smaller.");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Could not read image."));
        return;
      }
      const allowed =
        result.startsWith("data:image/png") ||
        result.startsWith("data:image/jpeg") ||
        result.startsWith("data:image/jpg") ||
        result.startsWith("data:image/gif") ||
        result.startsWith("data:image/webp");
      if (!allowed) {
        reject(new Error("Use a PNG, JPEG, GIF, or WebP image."));
        return;
      }
      resolve(result);
    };
    reader.onerror = () => reject(new Error("Could not read image."));
    reader.readAsDataURL(file);
  });
}
