import type { Meta, StoryObj } from "@storybook/react";
import { Card, type CardProps } from "../components/ui/cards/Card";

// 📸 Importamos imágenes de ejemplo
import sensei1 from "../../public/img/sensei1.jpg";
import alumno1 from "../../public/img/alumno1.jpg";
import distintivo1 from "../../public/img/distintivo1.jpg";

const meta: Meta<CardProps> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "sensei", "alumno"],
    },
    title: { control: "text" },
    subtitle: { control: "text" },
    belt: { control: "text" },
    description: { control: "text" },
    photo: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<CardProps>;

/**
 * 🌸 Default card — ejemplo institucional
 */
export const Default: Story = {
  args: {
    title: "Ichinen Dojo Karate-Do",
    subtitle: "Escuela Shorin Ryu Kaizenkan Argentina",
    description:
      "Entrenamiento físico, mente y espíritu con respeto, disciplina y perseverancia.",
    photo: distintivo1,
  },
};

/**
 * 🥋 Card de Sensei — muestra un instructor del dojo
 */
export const Sensei: Story = {
  args: {
    variant: "sensei",
    title: "Sensei Morinobu Maeshiro",
    subtitle: "10º Dan Shorin-Ryu Karate",
    belt: "Cinturón Negro",
    description:
      "Gran Maestro del Karate Shōrin-ryū de Okinawa. Portador del título Hanshi y referente internacional del estilo.",
    photo: sensei1,
  },
};

/**
 * 👩‍🎓 Card de Alumno — muestra un estudiante del dojo
 */
export const Alumno: Story = {
  args: {
    variant: "alumno",
    title: "Vanesa Soria",
    subtitle: "Estudiante de Karate Tradicional",
    belt: "Cinturón Verde",
    description:
      "Apasionada por el aprendizaje constante y la disciplina del Karate-Do.",
    photo: alumno1,
  },
};
