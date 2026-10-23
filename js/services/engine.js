/*
 * Batas modul untuk mesin penghapus background NAZE.
 *
 * Seluruh logika pemrosesan gambar hanya boleh diakses melalui modul ini.
 * Mesin sesungguhnya akan diintegrasikan dari repositori Ndolzz/naze_bot_wa;
 * ketika siap, implementasi cukup mengganti isi modul ini tanpa mengubah UI.
 */

export const ENGINE_SOURCE = 'Ndolzz/naze_bot_wa';

export const engine = {
  isAvailable: false,

  statusMessage:
    'Mesin penghapus background belum terintegrasi. Tombol proses akan aktif otomatis setelah integrasi selesai.',

  async process() {
    throw new Error(
      `Pemrosesan background belum tersedia. Mesin dari ${ENGINE_SOURCE} masih dalam tahap integrasi.`
    );
  },
};
