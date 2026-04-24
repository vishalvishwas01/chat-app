import PropTypes from "prop-types";

const Message = ({ sender, content, isOwn }) => {

  return (
    <div 
      className={`message-wrapper ${isOwn ? "own" : "other"}`}
    >
      {!isOwn && (
        <div className="message-avatar">
          {sender.charAt(0).toUpperCase()}
        </div>
      )}
      
      <div className="message-content-wrapper">
        {!isOwn && (
          <span className="message-sender">{sender}</span>
        )}

        <div className={`message-bubble ${isOwn ? "own" : "other"}`}>
          <p className="message-text">{content}</p>
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