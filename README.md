# Full Stack AI PDF Question Answering App

## 👨‍💻 Internship Assignment Submission – Bamla Varun Singh

---

## 📌 Objective
Build a full-stack application that allows users to:
- Upload PDF documents
- Ask questions about the PDF content
- Get intelligent answers powered by LLMs (Ollama + LangChain)

This submission strictly follows the assignment specifications using FastAPI, LangChain, and React.js.

---

## 🚀 Technologies Used

| Layer        | Tech Stack                        |
|--------------|-----------------------------------|
| **Frontend** | React.js + Axios + Tailwind CSS   |
| **Backend**  | FastAPI + LangChain + PyMuPDF     |
| **LLM**      | Ollama with Mistral               |
| **Database** | SQLite (storing document metadata)|
| **Storage**  | Local file system (PDFs)          |

---

## 🔧 Setup Instructions

### 📁 Clone & Navigate
```bash
git clone https://github.com/your-username/pdf-app.git
cd pdf-app/backend
```

### 🐍 Backend Setup (FastAPI + Ollama)
```bash
# Make sure Python 3.10+ is installed
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

pip install -r requirements.txt

# Run Ollama model
ollama run mistral

# Run backend
uvicorn main:app --reload
```

### 💻 Frontend Setup (React)
```bash
cd ../frontend
npm install
npm start
```

---

## 📂 Folder Structure
```
pdf-app/
├── backend/
│   ├── main.py             # FastAPI server
│   ├── qa_engine.py        # LLM interface (Ollama)
│   ├── pdf_utils.py        # PDF to text
│   ├── database.py         # SQLite insert/query
│   └── uploads/            # Stored PDFs
├── frontend/
│   ├── src/
│   │   └── App.js     # Main chat interface
│   └── public/
│   └── ...
├── pdf_data.db             # SQLite DB file
└── README.md
```

---

## 💬 Application Flow

1. **Upload PDF**
   - PDF file is uploaded to the FastAPI server
   - Saved in `uploads/`
   - PyMuPDF extracts and stores text into SQLite

2. **Ask Question**
   - User types a question via React chat UI
   - Backend fetches related PDF content from DB
   - LangChain + Ollama (Mistral) generates a response

3. **Answer Display**
   - The answer is shown below the user's question in chat format
   - Follow-up questions are supported

---

## ⚙️ API Endpoints

### `POST /upload/`
- Accepts: PDF file (form-data)
- Returns: `{ file_id, filename }`

### `POST /ask/`
- Accepts: JSON `{ file_id, question }`
- Returns: `{ answer }`

---

## 💡 Challenges Faced & Solutions

### ❌ 422 Unprocessable Entity Error
**Cause**: FastAPI expected `Form`, but frontend sent JSON.
**Fix**: Switched to Pydantic model for clean JSON body parsing.

### ❌ LangChain + Gemini 404 Error
**Cause**: Gemini models like `gemini-pro` not fully supported in LangChain.
**Fix**: Switched to **Ollama** + `mistral` — open-source, offline, and fast.

### ❌ OpenAI API Quota Exhaustion
**Fix**: Migrated to local inference using `ollama` to stay fully free and offline.

### ❌ UI Responsiveness
**Fix**: Used Tailwind’s flexbox and `min-h-screen` layouts. Input bar is sticky at bottom like ChatGPT.

### ✅ Improvements Made
- Added "Please wait..." loader
- Displayed PDF filename in header
- Modern chat-style interface
- Graceful error handling + alerts

---

## 🧠 Performance Handling

To optimize response time:
- Text is extracted **once** on upload and cached in SQLite
- Ollama model is **preloaded** and runs in local memory
- Lightweight, fast UI avoids re-renders
- For production: can switch to OpenAI or hosted models for faster inference

---

## 📸 Screenshots
- ✅ App Home Page
  ![Screenshot_11-7-2025_234233_localhost](https://github.com/user-attachments/assets/ec3071e7-dfd0-43ab-a386-89438720fef4)

- ✅ Uploading PDF
  <img width="1920" height="1037" alt="Screenshot (47)" src="https://github.com/user-attachments/assets/a11d6143-0996-494f-a425-aec3bbe3b388" />

- ✅ Asking questions
  <img width="1838" height="903" alt="image" src="https://github.com/user-attachments/assets/c4bd3a2e-a8ea-4c24-bf25-c135f098819f" />

- ✅ Answer from Mistral
  <img width="1920" height="1045" alt="Screenshot (49)" src="https://github.com/user-attachments/assets/7627b77c-9a53-4570-a4bc-2fb3f2ae9f98" />

- ✅ SQLite DB storing file metadata
<img width="1920" height="1080" alt="Screenshot (50)" src="https://github.com/user-attachments/assets/f83bb028-bb95-4f8f-b5bc-38394f0196f8" />


---

## 🎥 Demo Video
- A screencast walkthrough is provided.
- Covers upload, ask, and response cycles.

---

## ✅ Summary
This submission covers every requirement in the prompt:
- ✅ Functional & Non-functional features
- ✅ Clean architecture & code
- ✅ Matching UI to design
- ✅ Performance optimization
- ✅ Clear documentation

Thank you for the opportunity! 🙌

---

## 🙋‍♂️ Author
**Name**: Bamla Varun Singh  
**GitHub**: [singghh](https://github.com/bamlavarunsingh)  
**Email**: vaarunsingghh@gmail.com

---

## 📄 License
This project is part of the Full Stack Internship Assignment and open for educational use.

