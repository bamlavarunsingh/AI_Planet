from langchain_community.llms import Ollama
from langchain.chains.question_answering import load_qa_chain
from langchain.docstore.document import Document

def get_answer(text, question):
    try:
        llm = Ollama(model="mistral")  # You can also try llama2, phi, or llama3
        docs = [Document(page_content=text)]
        chain = load_qa_chain(llm, chain_type="stuff")
        return chain.run(input_documents=docs, question=question)
    except Exception as e:
        return f"[Ollama Error]: {str(e)}"
