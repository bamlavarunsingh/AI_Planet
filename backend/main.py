from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pdf_utils import extract_text_from_pdf
from qa_engine import get_answer
from database import insert_document, get_document_text
import shutil
import os
from uuid import uuid4

app = FastAPI()

# Allow CORS from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Upload PDF Endpoint
@app.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    file_id = str(uuid4())
    file_path = f"{UPLOAD_FOLDER}/{file_id}_{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text_from_pdf(file_path)
    insert_document(file_id, file.filename, text)

    return {"file_id": file_id, "filename": file.filename}

# Define Pydantic model for /ask/
class AskRequest(BaseModel):
    file_id: str
    question: str

# Ask a question (JSON body)
@app.post("/ask/")
async def ask_question(req: AskRequest):
    text = get_document_text(req.file_id)
    if not text:
        return {"error": "Document not found"}
    answer = get_answer(text, req.question)
    return {"answer": answer}
