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
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

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

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    joinRoom({ room, username });
    setJoined(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleJoin();
    }
  };

  const isFormValid = username.trim() && room.trim();

  const handleSendMessage = (text) => {
    const messageData = {
      id: `${Date.now()}-${Math.random()}`,
      sender: username,
      content: text,
      room,
    };

    sendMessage(messageData);
  };

  if (joined) {
    return (
      <ChatBox
        room={room}
        currentUser={username}
        messages={messages}
        onlineUsers={onlineUsers}
        onSendMessage={handleSendMessage}
      />
    );
  }

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-icon">
              <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M22 3L15.5 9.5L22 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="login-title">Welcome to Chat</h1>
          <p className="login-subtitle">Connect with your team in real-time</p>
        </div>

        <div className="login-form">
          <div className="input-group">
            <label className="input-label">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
              </svg>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="input-group">
            <label className="input-label">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Room Code
            </label>
            <input
              type="text"
              placeholder="Enter room code"
              className="login-input"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button
            onClick={handleJoin}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`login-button ${isFormValid ? "active" : "disabled"}`}
            disabled={!isFormValid}
          >
            <span className="button-text">
              {isHovering && isFormValid ? "Rocket" : "Chat"} Join Room
            </span>
            <div className="button-glow"></div>
          </button>
        </div>

        <div className="login-footer">
          <p>Enter your details to start chatting</p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
