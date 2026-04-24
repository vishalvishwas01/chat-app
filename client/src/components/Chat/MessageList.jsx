import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Message from "./Message";

const MessageList = ({ messages = [], currentUser }) => {
  const messagesEndRef = useRef(null);

  // auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="empty-messages">
          <p>No messages yet</p>
          <span>Start the conversation!</span>
        </div>
      ) : (
        messages.map((msg, index) => (
          <div 
            key={msg.id || index} 
            className="message-item"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <Message
              sender={msg.sender}
              content={msg.content}
              isOwn={msg.sender === currentUser}
            />
          </div>
        ))
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
  currentUser: PropTypes.string.isRequired,
};

export default MessageList;