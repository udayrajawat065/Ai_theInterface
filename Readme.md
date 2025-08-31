# AI Playground Prototype

## Overview
This project is a frontend-only prototype of an AI Playground interface. It allows users to select different AI models, configure parameters, and interact with the AI in a clean, responsive, and accessible chat-style interface. The design is a curated blend of the most compelling features from leading AI platforms.

## Features
- **Model Selector**: A dropdown to easily switch between different AI models (e.g., GPT-3.5, Custom).
- **Prompt Editor**: A flexible text area with the ability to save, load, and manage prompt templates from a mock API.
- **Parameters Panel**: Sliders and input fields for real-time adjustments of parameters like temperature, max tokens, and frequency penalty.
- **Chat/Output Area**: A dynamic display for the AI's responses, complete with "Copy" and "Download JSON" actions.
- **Theme Toggle**: A light/dark mode switch, with user preference persisted in local storage.
- **Responsive Layout**: A mobile-first design that seamlessly adapts to tablet and desktop breakpoints.

---

## 1. Research & Design

### a. Platforms Reviewed & Chosen Features
Our design is a synthesis of the best elements from four leading AI UIs:
- **OpenAI Playground**: We adopted its clean, structured layout with a prominent parameters panel for easy fine-tuning.
- **Anthropic Claude**: The minimalist chat-focused UI was our inspiration for the main output area, prioritizing readability for long-form responses.
- **Hugging Face Spaces**: The concept of a flexible, embeddable interface with customizable templates was integrated into our prompt editor.
- **Microsoft Copilot Lab**: Its focus on pre-configured, task-specific templates guided the design of our template management system.

### b. Design Mockup & Tailwind Mapping
The entire UI was first mocked up in Figma/Adobe XD, then translated into code using React and Tailwind CSS. The design adheres to a strict token-based system for consistency.

**[Figma/XD Design Link Here]**

**Tailwind Token Mapping:**
- **Typography**: Our headings and body text use specific font sizes and weights mapped to Tailwind's `text-3xl`, `text-lg`, and `font-bold` classes.
- **Colors**: All color schemes for light and dark modes are based on a predefined palette, utilizing classes like `bg-gray-900`, `text-gray-100`, and `bg-blue-600`.
- **Spacing**: Margins and padding are standardized using Tailwind's spacing scale (e.g., `p-4`, `m-2`) for a consistent layout.

---

## 2. Development

### a. Implementation Notes & Limitations
- **State Management**: React Context was used to manage the theme and session state, ensuring a single source of truth across the application.
- **Accessibility**: All interactive components are keyboard-navigable with clear focus states. We have also included ARIA labels for improved screen reader support.
- **Known Limitations**:
    - The `Model Selector` and `Prompt Editor` fetch data from a static mock API. It does not connect to a real AI backend.
    - Template saving and loading functionality is for demonstration purposes only and does not persist data on a server.

### b. Mock API Setup
- **Models API**: The list of available models is fetched from `src\api\mockApi.ts`.
- **Templates API**: The prompt templates are fetched from `\src\components\panels\TemplatesPanel.tsx`.

## 3. Component Library & Storybook
We've set up a Storybook to create and document reusable UI components in isolation.
- **Stories Folder**: You can view the component stories in the `storybook/` directory.
- **Key Components**: Stories have been created for core components like `Button`, `Slider`, `Modal`, and `ChatBubble` to ensure consistency and reusability.

---

## Tech Stack
- **Frontend**: React.js with TypeScript (`strict` mode)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel and  GitHub 

## Live URL
**https://ai-the-interface.vercel.app/**
**https://68b4410ed6dac416aa70594f--ainterface065.netlify.app/**
