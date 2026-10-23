# NAZE Background Remover

Landing page dan fondasi antarmuka untuk NAZE Background Remover — alat penghapus background gambar yang menghasilkan PNG transparan.

## Status

- [x] Landing page: hero, demonstrasi before/after, cara kerja, footer
- [x] Unggah gambar lokal dengan validasi tipe dan ukuran
- [x] Pratinjau gambar yang dipilih; object URL dibersihkan otomatis
- [x] Slider perbandingan before/after (pointer, sentuhan, papan ketik)
- [ ] Mesin penghapus background — belum terintegrasi

Mesin penghapus background yang sama dengan bot WhatsApp (repo `Ndolzz/naze_bot_wa`) akan diintegrasikan melalui batas modul `js/services/engine.js`. Setelah modul tersebut tersedia, tombol proses pada antarmuka aktif otomatis tanpa perubahan UI.

## Struktur

```
nazeremovebg/
├── index.html
├── css/            # stylesheet per tanggung jawab (tokens, reset, tipografi, layout, komponen, hero, preview, animasi, responsif)
├── js/
│   ├── app.js      # titik masuk dan penyambungan modul
│   ├── modules/    # perilaku UI (upload, perbandingan before/after)
│   └── services/  # batas modul mesin (engine.js)
└── assets/        # ikon dan contoh gambar SVG
```

## Menjalankan Lokal

Buka `index.html` langsung di peramban, atau jalankan server statis apa pun dari direktori ini (misalnya ekstensi Live Server atau `npx serve`).

## Deployment (Vercel)

Situs statis tanpa build step. Impor repositori ini ke Vercel dengan preset "Other"; tidak ada konfigurasi tambahan yang diperlukan karena `index.html` berada di akar direktori.

## Catatan

- Contoh gambar pada bagian demonstrasi adalah ilustrasi SVG buatan sendiri, ditandai sebagai demonstrasi, bukan hasil mesin.
- Tombol "Proses Background" sengaja dinonaktifkan; statusnya jujur dijelaskan pada antarmuka dan akan aktif otomatis setelah mesin tersedia.
