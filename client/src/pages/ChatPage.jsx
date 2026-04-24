import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import ChatBox from "../components/Chat/ChatBox";

const ChatPage = () => {
  const {
    joinRoom,
    sendMessage,
    onReceiveMessage,
    onChatHistory,
    onOnlineUsers,
    offEvents,
  } = useSocket();

  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // handle receiving messages
  useEffect(() => {
    onReceiveMessage((msg) => {
      setMessages((prev) => [...prev, { ...msg, id: `${Date.now()}-${Math.random()}` }]);
    });

    onChatHistory((history) => {
      setMessages(history.map((msg, index) => ({ ...msg, id: msg.id || `${Date.now()}-${index}` })));
    });

    onOnlineUsers((users) => {
      setOnlineUsers(users);
    });

    return () => offEvents();
  }, [offEvents, onChatHistory, onOnlineUsers, onReceiveMessage]);

  const handleJoin = () => {
    if (!room || !username) return;

    joinRoom({ room, username });
    setJoined(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleJoin();
    }
  };



  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      {joined ? (
        <ChatBox
          room={room}
          currentUser={username}
          messages={messages}
          onlineUsers={onlineUsers}
          onSendMessage={(text) => {
            const messageData = {
              id: `${Date.now()}-${Math.random()}`,
              sender: username,
              content: text,
              room,
            };

            sendMessage(messageData);
          }}
        />
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow w-80 space-y-4">
          <h2 className="text-xl font-semibold text-center">Join Chat</h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <input
            type="text"
            placeholder="Room ID"
            className="w-full p-2 border rounded-lg"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={handleJoin}
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Join
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatPage;