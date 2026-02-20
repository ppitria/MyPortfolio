# Deteksi Teks Generatif AI pada Penilaian Otomatis
Proyek ini mengintegrasikan model deteksi teks AI dengan sistem penilaian otomatis untuk jawaban esai. Tujuannya adalah membantu proses evaluasi jawaban siswa sekaligus memberikan indikasi apakah jawaban tersebut ditulis secara mandiri atau dihasilkan oleh AI.

## Gambaran Umum Sistem
Sistem terdiri dari dua komponen utama:
1. Model Deteksi Teks AI vs Manusia
Model ini bertugas mengidentifikasi apakah suatu teks ditulis oleh manusia atau dihasilkan oleh AI.
Pendekatan yang digunakan adalah fine-tuning pada model IndoBERT, sehingga model dapat memahami karakteristik bahasa Indonesia secara lebih akurat.

2. Sistem Penilaian Otomatis Jawaban Esai
Sistem ini menilai kualitas jawaban siswa secara otomatis menggunakan:
- Representasi teks berbasis word embedding
- Perhitungan kemiripan menggunakan cosine similarity
Pendekatan ini memungkinkan sistem membandingkan jawaban siswa dengan jawaban referensi secara objektif dan terukur.
Sistem ini dirancang untuk digunakan pada ujian, tugas, maupun evaluasi berbasis esai lainnya.

## Mekanisme Integrasi dan Alur Proses
Penggabungan kedua komponen dilakukan menggunakan pendekatan rule-based, dengan menerapkan AI penalty sebagai rekomendasi penyesuaian nilai.
Alur prosesnya adalah sebagai berikut:
1. Jawaban siswa diproses oleh model deteksi untuk menghitung persentase kemungkinan penggunaan AI.
2. Secara paralel, jawaban yang sama dinilai menggunakan sistem penilaian otomatis.
3. Nilai akhir direkomendasikan dengan mengurangi skor otomatis berdasarkan persentase AI yang terdeteksi.
Pendekatan ini tidak serta-merta menghukum, tetapi memberikan rekomendasi berbasis data sebagai bahan pertimbangan dalam proses penilaian.

## Dataset dan Sumber Data
Dataset yang digunakan bersifat privat, dikumpulkan dari jawaban siswa berbagai rumpun ilmu pengetahuan.
Untuk data berlabel AI, jawaban dibuat secara generatif menggunakan beberapa model AI populer, yaitu:
- ChatGPT
- Gemini
- Microsoft Copilot
- DeepSeek
- Claude
- Perplexity
- Meta AI
Pendekatan ini memungkinkan model deteksi dilatih dengan variasi gaya generatif yang beragam.