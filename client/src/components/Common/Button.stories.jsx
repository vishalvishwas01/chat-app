import Button from "./Button";

export default {
  title: "Common/Button",
  component: Button,
};

export const Primary = () => (
  <Button>Primary Button</Button>
);

export const Custom = () => (
  <Button className="bg-green-500 hover:bg-green-600">
    Custom Button
  </Button>
);