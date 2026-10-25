
# 🐻 Fazbear Archives
> *"Another Night. Another Shift. Stay Alert."*

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

Fazbear Archives adalah aplikasi website fiktif bertema *Security Management System* yang terinspirasi dari dunia **Five Nights at Freddy's (FNAF)**. Aplikasi ini dirancang sebagai sistem internal bagi petugas keamanan untuk mengakses dashboard, mempelajari panduan encounter, dan mencatat kejadian yang berkaitan dengan animatronic selama shift malam.

Proyek ini dikembangkan menggunakan React.js, Vite, dan Tailwind CSS sebagai implementasi pembelajaran React Dasar.

## 📋 Fitur Utama

| Fitur | Deskripsi |
| :--- | :--- |
| 🔐 **Simulated Login** | Masuk menggunakan nama petugas dan Security ID. |
| 📊 **Dashboard** | Menampilkan sapaan dan informasi utama sistem. |
| 📖 **About** | Informasi mengenai Fazbear Archives. |
| 📋 **Encounter Guide** | Panduan pencatatan kejadian animatronic. |
| 📝 **Encounter Records** | Menambahkan dan menampilkan catatan encounter. |
| 👤 **Guard Profile** | Melihat identitas dan status petugas. |
| 🚪 **Log Out** | Keluar dari sistem simulasi. |
| 📱 **Responsive UI** | Tampilan responsif dengan Tailwind CSS. |

## 🔄 Alur Sistem

```text
Login
  |
  v
Dashboard
  |
  +----> About
  |
  +----> Encounter Guide
  |
  +----> Encounter Records
  |
  +----> Guard Profile
  |
  v
Log Out
```

**Alur pencatatan encounter:**

```text
Isi Form Encounter
        |
        v
Tambah Catatan
        |
        v
Simpan ke React State
        |
        v
Tampilkan Daftar Encounter
```

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, JavaScript (JSX)
- **Styling:** Tailwind CSS
- **State Management:** React `useState`
- **Development Tools:** Node.js, npm, Git, GitHub
- **Backend & Database:** Belum diimplementasikan

### Konsep React

- Components dan Props
- State Management menggunakan `useState`
- Controlled Form
- List Rendering menggunakan `.map()` dengan `key` unik
- Conditional Rendering untuk kondisi data kosong

## 📁 Struktur Project

```text
fazbear-archives/
├── public/
├── src/
│   ├── components/
│   │   ├── LoginPage.jsx
│   │   ├── Topbar.jsx
│   │   ├── Navbar.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AboutSection.jsx
│   │   ├── EncounterGuide.jsx
│   │   ├── EncounterRecords.jsx
│   │   └── ProfilePopup.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Cara Menjalankan Project

**1. Clone repository**

```bash
git clone https://github.com/username/fazbear-archives.git
cd fazbear-archives
```

**2. Install dependencies**

```bash
npm install
```

**3. Jalankan development server**

```bash
npm run dev
```

Buka alamat berikut pada browser:

```text
http://localhost:5173
```

> Pastikan konfigurasi React, Vite, dan Tailwind CSS sudah sesuai dengan versi yang digunakan dalam project.

## 📌 Catatan Pengembangan

- Login masih berupa simulasi frontend tanpa autentikasi sungguhan.
- Data encounter disimpan sementara menggunakan React State.
- Data tidak tersimpan secara permanen setelah halaman dimuat ulang.
- Backend API dan database belum digunakan.
- Struktur folder dapat disesuaikan dengan implementasi aktual.

## 🔮 Future Development

- Integrasi backend API.
- Penyimpanan data encounter secara permanen.
- Sistem autentikasi petugas.
- Informasi detail animatronic.
- Riwayat dan pencarian encounter.

<p align="center">
  <strong>FAZBEAR ARCHIVES</strong><br>
  <em>"Another Night. Another Shift. Stay Alert."</em><br><br>
  Made with React and inspired by the Five Nights at Freddy's universe.
</p>
