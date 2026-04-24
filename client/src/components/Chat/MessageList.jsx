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
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.length === 0 ? (
        <div className="text-center text-gray-400">
          No messages yet
        </div>
      ) : (
        messages.map((msg) => (
          <Message
            key={msg.id}
            sender={msg.sender}
            content={msg.content}
            isOwn={msg.sender === currentUser}
          />
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