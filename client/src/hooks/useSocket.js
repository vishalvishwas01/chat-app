import { useEffect } from "react";
import { socket } from "../services/socket";

const useSocket = () => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  // join room
  const joinRoom = ({ room, username }) => {
    socket.emit("join_room", { room, username });
  };

  const sendMessage = (data) => {
    socket.emit("send_message", data);
  };

  // message listeners
  const onReceiveMessage = (callback) => {
    socket.on("receive_message", callback);
  };

  const onChatHistory = (callback) => {
    socket.on("chat_history", callback);
  };

  // online users listener
  const onOnlineUsers = (callback) => {
    socket.on("online_users", callback);
  };

  // cleanup
  const offEvents = () => {
    socket.off("receive_message");
    socket.off("chat_history");
    socket.off("online_users");
  };

  return {
    joinRoom,
    sendMessage,
    onReceiveMessage,
    onChatHistory,
    onOnlineUsers,
    offEvents,
  };
};

export default useSocket;