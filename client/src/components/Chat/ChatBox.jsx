import { useState } from "react";
import PropTypes from "prop-types";
import MessageList from "./MessageList";
import Input from "../Common/Input";
import Button from "../Common/Button";

const ChatBox = ({
  room,
  currentUser,
  messages = [],
  onSendMessage,
  onlineUsers = [],
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className="w-full max-w-3xl h-[85vh] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="px-5 py-3 border-b flex items-center justify-between bg-gray-50">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">
            #{room}
          </span>
          <span className="text-xs text-gray-500">
            {onlineUsers.length} online
          </span>
        </div>

        {/* Avatars */}
        <div className="flex -space-x-2">
          {onlineUsers.slice(0, 4).map((user) => (
            <div
              key={user.id}
              className="w-7 h-7 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border-2 border-white"
            >
              {user.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <MessageList
        messages={messages}
        currentUser={currentUser}
      />

      {/* Input Area */}
      <div className="p-3 border-t bg-white flex items-center gap-2">
        
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <Button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

ChatBox.propTypes = {
  room: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired,
  messages: PropTypes.array,
  onSendMessage: PropTypes.func.isRequired,
  onlineUsers: PropTypes.array,
};

export default ChatBox;