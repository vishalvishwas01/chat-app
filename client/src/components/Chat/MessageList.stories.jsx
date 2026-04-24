import MessageList from "./MessageList";

export default {
  title: "Chat/MessageList",
  component: MessageList,
};

const sampleMessages = [
  { sender: "Vishal", content: "Hey there" },
  { sender: "You", content: "Hello" },
  { sender: "Vishal", content: "How are you" },
  { sender: "You", content: "I'm good, working on Storybook" },
  { sender: "Vishal", content: "Nice! Keep going" },
];

export const Default = () => (
  <div className="h-screen bg-gray-100">
    <MessageList messages={sampleMessages} currentUser="You" />
  </div>
);

export const EmptyState = () => (
  <div className="h-screen bg-gray-100">
    <MessageList messages={[]} currentUser="You" />
  </div>
);

export const LongConversation = () => {
  const longMessages = Array.from({ length: 15 }, (_, i) => ({
    sender: i % 2 === 0 ? "You" : "Vishal",
    content: `Message number ${i + 1}`,
  }));

  return (
    <div className="h-screen bg-gray-100">
      <MessageList messages={longMessages} currentUser="You" />
    </div>
  );
};