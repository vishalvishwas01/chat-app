import PropTypes from "prop-types";

const Message = ({ sender, content, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className="flex flex-col max-w-xs md:max-w-md">
        
        {/* Sender name */}
        {!isOwn && (
          <span className="text-xs text-gray-500 mb-1 px-1">
            {sender}
          </span>
        )}

        {/* Message bubble */}
        <div
          className={`
            px-4 py-2 rounded-2xl text-sm leading-relaxed
            shadow-sm
            ${
              isOwn
                ? "bg-blue-500 text-white rounded-br-sm"
                : "bg-gray-200 text-gray-900 rounded-bl-sm"
            }
          `}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  sender: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isOwn: PropTypes.bool.isRequired,
};

export default Message;