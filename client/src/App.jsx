import { useEffect, useMemo, useState, useRef } from "react";
import io from "socket.io-client";
const socket = io.connect("http://127.0.0.1:8000/");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null);
  const [room, setRoom] = useState("");
  const [isInRoom, setIsInRoom] = useState(false);
  const joinRoom = () => {
    console.log("joining room");
    if (room === "") {
      alert("Please enter a room value");
      return;
    }
    socket.emit("join_room", room);
    setIsInRoom(true);
  };
  const sendMessage = () => {
    setMessages([...messages, { message, sender: true }]);
    setMessage("");
    socket.emit("send_message", { message, room });
  };
  useMemo(() => {
    socket.on("receive_message", (data) => {
      console.log(data, socket);
      const isSender = data.sender === socket.id;
      if (!isSender) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: data, sender: false },
        ]);
      }
    });
  }, [socket]);
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll to bottom whenever messages change

  return (
    <div className="flex flex-col h-screen items-center my-4">
      <h1 className="text-lg">
        <b>Chat App</b>
      </h1>
      <div className="border-2 border-pink-500 mt-2">
        <input
          type="text"
          className="p-1 outline-none"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />{" "}
        <button className="bg-pink-500 p-1 text-white" onClick={joinRoom}>
          {!isInRoom ? "Join Room" : `Joined Room ${room}`}
        </button>
      </div>
      {/* <div>QR Login</div> */}
      <div className="w-[95%] md:w-[60%] h-[80%] border-2 border-blue-800 mx-auto my-4 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto" ref={messagesContainerRef}>
          {messages.map((data, i) => (
            <div
              key={i}
              className={
                data.sender
                  ? "ml-auto rounded p-1 bg-blue-400 my-2 w-fit"
                  : "mr-auto rounded p-1 bg-gray-400 my-2 w-fit"
              }
            >
              {data.message}
            </div>
          ))}
        </div>
        <div className="m-3 flex">
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Messages..."
            className="p-2 flex-1 border-2 border-red-500 outline-none"
          />
          <button onClick={sendMessage} className="bg-red-500 p-2 text-cyan-50">
            {" "}
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
