import ChatBox from "./ChatBox";

export default {
  title: "Chat/ChatBox",
  component: ChatBox,
};

const sampleMessages = [
  { sender: "Vishal", content: "Hey" },
  { sender: "You", content: "Hello" },
  { sender: "Vishal", content: "Ready for the demo" },
  { sender: "You", content: "Yes, almost done" },
];

export const Default = () => (
  <div className="h-screen flex items-center justify-center bg-red-100">
    <ChatBox
      room="room1"
      currentUser="You"
      messages={sampleMessages}
      onlineUsers={["You", "Vishal"]}
      onSendMessage={(msg) => console.log("Send:", msg)}
    />
  </div>
);

export const EmptyChat = () => (
  <div className="h-screen flex items-center justify-center bg-gray-100">
    <ChatBox
      room="room2"
      currentUser="You"
      initialMessages={[]}
    />
  </div>
);