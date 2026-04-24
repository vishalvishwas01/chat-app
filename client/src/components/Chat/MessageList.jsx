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
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 3L15.5 9.5L22 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
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