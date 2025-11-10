import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>💬 My AI Chatbot</h1>
      <textarea
        rows="4"
        cols="50"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <br />
      <button onClick={sendMessage}>Send</button>
      <h3>🤖 Reply:</h3>
      <p>{reply}</p>
    </div>
  );
}

export default App;
