import { io } from "socket.io-client";

const SOCKET_URL = ""; // Empty string = same origin, nginx proxies /socket.io/ to backend

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});