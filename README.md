# 🤖 LLM Assistant + LM Studio + Memory (SQLite)

Sebuah proyek chatbot **AI lokal** berbasis LLM (Large Language Model) menggunakan **[LM Studio](https://lmstudio.ai/)** + **SQLite memory** + **WhatsApp bot (via Baileys)**.  
Asisten ini bisa "mengingat" obrolan kamu dan merespons secara personal, 100% berjalan di perangkat lokal (tanpa OpenAI).

---

## 🚀 Fitur Utama

- 🔌 Integrasi langsung dengan LM Studio (localhost LLM API)
- 🧠 Memory per user menggunakan SQLite
- 💬 Bisa diakses via API atau WhatsApp bot (pakai Baileys)
- 📓 Logging percakapan ke file `chat.log`
- 🛠️ Modular & bisa dikembangkan jadi RAG, dashboard, dsb

---

## 🧰 Tech Stack

- Node.js + Express
- SQLite (via `sqlite3` & `sqlite`)
- LM Studio (GGUF model, local server)
- Baileys (WhatsApp bot library)
- Vector DB / LangChain (next roadmap)

---

## 🧑‍💻 Cara Menjalankan

### 1. Clone Repo & Install
```bash
git clone https://github.com/hasyimenricodenis/llm-assisstant-lmstudio-memory.git
cd llm-assisstant-lmstudio-memory
npm install
```

### 2. Jalankan LM Studio

- Buka LM Studio
- Load model `.gguf` (misalnya: Mistral, Gemma, dll)
- Aktifkan: **Enable local server**
- Pastikan endpoint aktif di: `http://127.0.0.1:1234/v1/chat/completions`

### 3. Jalankan Server
```bash
npm start
```

Akan aktif di: `http://localhost:3000`

### 4. Kirim Chat via cURL
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "message": "Halo, nama saya Budi"
  }'
```

---

## 📱 Jalankan WhatsApp Bot (Opsional)

### 1. Jalankan bot
```bash
npm run wa
```

### 2. Scan QR Code di terminal pakai WA
### 3. Kirim pesan: `Halo` → Bot akan menjawab dan mengingatmu!

---

## 📁 Struktur Folder

```
├── index.js               # Main server
├── wa-bot.js              # WhatsApp bot handler
├── routes/
│   └── chat.route.js      # API endpoint
├── services/
│   └── chat.service.js    # Logika chat + memory + LM Studio API
├── memory/
│   └── memory.db.js       # SQLite interface
├── chat.log               # Log interaksi
└── auth.json              # WhatsApp session
```

---

## 🔒 Privacy Friendly

- ✅ Tidak kirim data ke cloud
- ✅ Bisa offline
- ✅ Semua memory disimpan lokal

---

## 🧠 Roadmap (next)
- [ ] Command `/forget` untuk hapus memori
- [ ] Dashboard admin histori chat
- [ ] Integrasi vector search (Qdrant, Weaviate)
- [ ] Dukungan persona AI yang bisa diubah user
- [ ] Versi dengan embedding file/dokumen (RAG)

---

## 🤝 Kontribusi

Pull Request dan ide baru sangat disambut! Silakan fork repo ini dan ajukan PR.

---

## 🧑‍💻 Author

**[@hasyimenricodenis](https://github.com/hasyimenricodenis)**  
📫 Contact: DM via GitHub atau open issue untuk diskusi

---

## 📝 License

MIT License