declare global {
  interface Window { cloudinary: object }
}

window.cloudinary = window.cloudinary || {};
