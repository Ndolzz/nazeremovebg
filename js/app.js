/*
 * Titik masuk aplikasi: penyambungan antarmuka dan batas modul mesin.
 */

import { engine } from './services/engine.js';
import { initUpload } from './modules/upload.js';
import { initCompare } from './modules/compare.js';

const upload = initUpload(document.querySelector('[data-upload]'));
const compare = initCompare(document.querySelector('[data-compare]'));

if (!upload) {
  console.warn('NAZE: elemen unggah tidak ditemukan pada halaman.');
}

if (!compare) {
  console.warn('NAZE: elemen perbandingan tidak ditemukan pada halaman.');
}

const processButton = document.querySelector('[data-process]');

if (processButton) {
  processButton.disabled = !engine.isAvailable;
}

const statusText = document.querySelector('#status-mesin');

if (statusText) {
  statusText.textContent = engine.statusMessage;
}
