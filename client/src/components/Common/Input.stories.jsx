import { useState } from "react";
import Input from "./Input";

export default {
  title: "Common/Input",
  component: Input,
};

export const Default = () => {
  const [value, setValue] = useState("");

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type something..."
    />
  );
};

export const WithText = () => {
  const [value, setValue] = useState("Hello");

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Typing..."
    />
  );
};

export const CustomStyle = () => {
  const [value, setValue] = useState("");

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Custom styled input"
      className="border-green-500 focus:ring-green-500"
    />
  );
};