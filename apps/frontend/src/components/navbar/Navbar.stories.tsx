import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar.js";
import React from "react";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof Navbar> = {
  title: "Components/Navbar",
  component: Navbar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

// Mock del logout para Storybook
const mockLogout = () => alert("Logout desde Storybook!");

export const Admin: Story = {
  args: { userRole: "ADMIN", onLogout: mockLogout },
};

export const Teacher: Story = {
  args: { userRole: "TEACHER", onLogout: mockLogout },
};

export const Student: Story = {
  args: { userRole: "STUDENT", onLogout: mockLogout },
};
