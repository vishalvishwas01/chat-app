import Message from "./Message";

export default {
  title: "Chat/Message",
  component: Message,
};

export const SentMessage = () => (
  <div className="p-4 bg-gray-100 h-screen">
    <Message
      sender="You"
      content="This is a message I sent"
      isOwn={true}
    />
  </div>
);

export const ReceivedMessage = () => (
  <div className="p-4 bg-gray-100 h-screen">
    <Message
      sender="Vishal"
      content="Hey This is a received message"
      isOwn={false}
    />
  </div>
);

export const LongMessage = () => (
  <div className="p-4 bg-gray-100 h-screen">
    <Message
      sender="User"
      content="This is a longer message to test how the UI behaves when the content increases. It should wrap properly without breaking layout."
      isOwn={false}
    />
  </div>
);