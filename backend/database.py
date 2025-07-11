import sqlite3

conn = sqlite3.connect("documents.db", check_same_thread=False)
c = conn.cursor()

c.execute('''
    CREATE TABLE IF NOT EXISTS documents (
        id TEXT PRIMARY KEY,
        filename TEXT,
        content TEXT
    )
''')
conn.commit()

def insert_document(doc_id, filename, content):
    c.execute("INSERT INTO documents (id, filename, content) VALUES (?, ?, ?)", (doc_id, filename, content))
    conn.commit()

def get_document_text(doc_id):
    result = c.execute("SELECT content FROM documents WHERE id=?", (doc_id,)).fetchone()
    return result[0] if result else None
