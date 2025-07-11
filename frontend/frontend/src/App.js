import React, { useState } from "react";
import axios from "axios";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [fileId, setFileId] = useState(null);
  const [loading, setLoading] = useState(false); // 🔥 New

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setPdfName(file.name);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("http://localhost:8000/upload/", formData);
      setFileId(res.data.file_id);
      alert("PDF uploaded successfully");
    } catch (err) {
      alert("Upload failed");
    }
  };

  const handleSend = async () => {
    if (!input || !fileId) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true); // 🔥 Show loading
    try {
      const res = await axios.post("http://localhost:8000/ask/", {
        file_id: fileId,
        question: input,
      });
      setMessages([
        ...newMessages,
        { sender: "bot", text: res.data.answer || "[Empty response]" },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "[Error]: Failed to get response" },
      ]);
    } finally {
      setLoading(false); // 🔥 Hide loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow flex flex-col h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <img
            src="https://framerusercontent.com/images/aH0aUDpSiUrVC1nwJAwiUCXUtU.svg"
            alt="logo"
            className="h-12"
          />
          <div className="flex items-center gap-4">
            {pdfName && (
              <span className="text-sm text-green-600 font-medium">
                📄 {pdfName}
              </span>
            )}
            <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded">
              Upload PDF
              <input type="file" className="hidden" onChange={handleUpload} />
            </label>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-start" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-xl max-w-xl text-sm leading-relaxed whitespace-pre-wrap
                ${
                  msg.sender === "user"
                    ? "bg-indigo-100 text-indigo-800"
                    : "bg-gray-100 text-gray-800 flex items-start gap-2"
                }`}
              >
                {msg.sender === "bot" && (
                  <img
                    src="https://yt3.googleusercontent.com/VsoXGXDmf3Aw0xkO6ccYLWLcDWUMfCejabyUUOd2QOk9luKr6HVVTBKkFHaIqJ6rEMZ8OqBH=s900-c-k-c0x00ffffff-no-rj"
                    alt="ai"
                    className="h-10 w-10 mt-1"
                  />
                )}
                <span>{msg.text}</span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-sm text-gray-500 italic">
              Please wait...
            </div>
          )}
        </div>

        {/* Input Box (sticky at bottom) */}
        <div className="border-t p-4 flex items-center">
          <input
            type="text"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-grow border rounded-l-xl px-4 py-3 text-sm focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="px-4 py-3 bg-green-600 text-white text-sm font-medium rounded-r-xl hover:bg-green-700"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
