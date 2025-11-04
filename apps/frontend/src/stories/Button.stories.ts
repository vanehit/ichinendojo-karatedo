import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, type ButtonProps } from "../components/ui/Button/Button";

// Metadata de la story
const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary", "danger"],
    },
    children: { control: "text" },
    onClick: { action: "clicked" },
  } as Record<string, any>, 
};

export default meta;
type Story = StoryObj<ButtonProps>;

// Stories
export const Primary: Story = {
  args: { variant: "primary", children: "Primary Button" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary Button" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Danger Button" },
};
