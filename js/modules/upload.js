/*
 * Modul unggah gambar: pemilihan berkas, validasi dasar, pratinjau lokal,
 * dan daur hidup object URL.
 */

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_FILE_SIZE = 15 * 1024 * 1024;
const BYTES_PER_KB = 1024;

function formatFileSize(bytes) {
  if (bytes >= BYTES_PER_KB * BYTES_PER_KB) {
    return `${(bytes / (BYTES_PER_KB * BYTES_PER_KB)).toFixed(1)} MB`;
  }
  return `${Math.max(1, Math.round(bytes / BYTES_PER_KB))} KB`;
}

export function initUpload(root) {
  if (!root) return null;

  const input = root.querySelector('[data-upload-input]');
  const dropzone = root.querySelector('[data-dropzone]');
  const errorBox = root.querySelector('[data-upload-error]');
  const preview = root.querySelector('[data-upload-preview]');
  const previewImage = root.querySelector('[data-upload-image]');
  const nameField = root.querySelector('[data-upload-name]');
  const sizeField = root.querySelector('[data-upload-size]');
  const replaceButton = root.querySelector('[data-upload-replace]');
  const removeButton = root.querySelector('[data-upload-remove]');

  if (
    !input ||
    !dropzone ||
    !errorBox ||
    !preview ||
    !previewImage ||
    !nameField ||
    !sizeField ||
    !replaceButton ||
    !removeButton
  ) {
    return null;
  }

  let objectUrl = null;

  const releaseObjectUrl = () => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      objectUrl = null;
    }
  };

  const showError = (message) => {
    errorBox.textContent = message;
    errorBox.hidden = false;
  };

  const clearError = () => {
    errorBox.textContent = '';
    errorBox.hidden = true;
  };

  const showPreview = (file) => {
    releaseObjectUrl();
    objectUrl = URL.createObjectURL(file);
    previewImage.src = objectUrl;
    previewImage.alt = `Pratinjau gambar: ${file.name}`;
    nameField.textContent = file.name;
    sizeField.textContent = formatFileSize(file.size);
    dropzone.hidden = true;
    preview.hidden = false;
  };

  const resetUpload = () => {
    releaseObjectUrl();
    previewImage.removeAttribute('src');
    previewImage.alt = 'Pratinjau gambar yang dipilih';
    nameField.textContent = '—';
    sizeField.textContent = '—';
    input.value = '';
    preview.hidden = true;
    dropzone.hidden = false;
    clearError();
  };

  const acceptFile = (file) => {
    clearError();
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      showError('Format tidak didukung. Gunakan PNG, JPG, atau WebP.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      showError('Ukuran file melebihi 15 MB. Pilih gambar yang lebih kecil.');
      return;
    }
    if (file.size === 0) {
      showError('File kosong atau tidak dapat dibaca. Pilih gambar lain.');
      return;
    }
    showPreview(file);
  };

  input.addEventListener('change', () => {
    const file = input.files && input.files[0];
    acceptFile(file);
    input.value = '';
  });

  replaceButton.addEventListener('click', () => input.click());
  removeButton.addEventListener('click', resetUpload);

  let dragDepth = 0;

  dropzone.addEventListener('dragenter', (event) => {
    event.preventDefault();
    dragDepth += 1;
    dropzone.classList.add('is-dragover');
  });

  dropzone.addEventListener('dragover', (event) => event.preventDefault());

  dropzone.addEventListener('dragleave', () => {
    dragDepth = Math.max(0, dragDepth - 1);
    if (dragDepth === 0) dropzone.classList.remove('is-dragover');
  });

  dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    dragDepth = 0;
    dropzone.classList.remove('is-dragover');
    const file = event.dataTransfer && event.dataTransfer.files[0];
    acceptFile(file);
  });

  window.addEventListener('pagehide', releaseObjectUrl);

  return { reset: resetUpload };
}
