import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MessageList from "./MessageList";

const ChatBox = ({
  room,
  currentUser,
  messages = [],
  onSendMessage,
  onlineUsers = [],
}) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;

    onSendMessage(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-background">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="chat-box">
        {/* Header */}
        <div className="chat-header">
          <div className="header-left">
            <div className="room-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="room-info">
              <span className="room-name">#{room}</span>
              <span className="online-count">
                <span className="online-dot"></span>
                {onlineUsers.length} online
              </span>
            </div>
          </div>

          {/* Avatars */}
          <div className="header-right">
            <div className="user-avatars">
              {onlineUsers.slice(0, 4).map((user, index) => (
                <div
                  key={user.id || index}
                  className="user-avatar"
                  style={{ 
                    background: `linear-gradient(135deg, ${getGradientColors(index)})`,
                    zIndex: 4 - index 
                  }}
                  title={user}
                >
                  {user.charAt(0).toUpperCase()}
                </div>
              ))}
              {onlineUsers.length > 4 && (
                <div className="user-avatar more-users">
                  +{onlineUsers.length - 4}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <MessageList
          messages={messages}
          currentUser={currentUser}
        />

        {/* Input Area */}
        <div className={`chat-input-area ${isFocused ? 'focused' : ''}`}>
          <div className="input-wrapper">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Type a message..."
              className="chat-input"
            />
            <button 
              onClick={handleSend}
              className={`send-button ${message.trim() ? 'active' : ''}`}
              disabled={!message.trim()}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for gradient colors
function getGradientColors(index) {
  const colors = [
    '#667eea, #764ba2',
    '#f093fb, #f5576c', 
    '#4facfe, #00f2fe',
    '#43e97b, #38f9d7'
  ];
  return colors[index % colors.length];
}

ChatBox.propTypes = {
  room: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired,
  messages: PropTypes.array,
  onSendMessage: PropTypes.func.isRequired,
  onlineUsers: PropTypes.array,
};

export default ChatBox;
