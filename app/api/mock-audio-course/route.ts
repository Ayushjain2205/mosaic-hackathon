import { NextResponse } from "next/server";

const mockAudioCourse = {
  title: "Introduction to React Hooks - Audio Edition",
  description:
    "Learn the fundamentals of React Hooks with this immersive audio course",
  sections: [
    {
      title: "What are React Hooks?",
      content:
        "React Hooks are functions that let you use state and other React features without writing a class component. They were introduced in React 16.8 and revolutionized how we write React applications.",
      key_points: [
        "Introduced in React 16.8",
        "Allow using state in functional components",
        "Simplify complex component logic",
        "Enable better code reuse and organization",
      ],
      audioUrl: "/test-audio.mp3", // Test audio file
      duration: 120, // 2 minutes in seconds
      quiz: {
        question: "What is the main benefit of React Hooks?",
        options: [
          "They make components render faster",
          "They allow using state in functional components",
          "They replace the need for React entirely",
          "They only work in class components",
        ],
        correct_answer: "They allow using state in functional components",
        explanation:
          "React Hooks allow functional components to use state and other React features that were previously only available in class components, making your code more concise and easier to understand.",
      },
    },
    {
      title: "useState Hook Deep Dive",
      content:
        "The useState hook is the most fundamental hook in React. It lets you add state to functional components and returns an array with two elements: the current state value and a function to update it. This pattern enables reactive programming in functional components.",
      key_points: [
        "Manages state in functional components",
        "Returns current state and updater function",
        "Can be used multiple times in a component",
        "Triggers re-renders when state changes",
      ],
      audioUrl: "/test-audio.mp3", // Test audio file
      duration: 150, // 2.5 minutes in seconds
      quiz: {
        question: "What does the useState hook return?",
        options: [
          "A single state value",
          "An array with the current state and updater function",
          "Just a function to update state",
          "A boolean value",
        ],
        correct_answer: "An array with the current state and updater function",
        explanation:
          "The useState hook returns an array containing two elements: the current state value and a function that lets you update that state. This is why we often use array destructuring when working with useState.",
      },
    },
    {
      title: "useEffect Hook Mastery",
      content:
        "The useEffect hook is your gateway to side effects in React. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but with a more declarative approach. You can specify dependencies to control when effects run.",
      key_points: [
        "Handles side effects in components",
        "Replaces lifecycle methods",
        "Can specify dependencies",
        "Runs after every render by default",
      ],
      audioUrl: "/test-audio.mp3", // Test audio file
      duration: 180, // 3 minutes in seconds
      quiz: {
        question: "What is the primary purpose of useEffect?",
        options: [
          "To create new components",
          "To handle side effects in function components",
          "To style components",
          "To manage state",
        ],
        correct_answer: "To handle side effects in function components",
        explanation:
          "The useEffect hook is used for handling side effects in function components, such as data fetching, subscriptions, or manually changing the DOM. It replaces lifecycle methods that were previously only available in class components.",
      },
    },
    {
      title: "Custom Hooks and Best Practices",
      content:
        "Custom hooks are a powerful way to extract component logic into reusable functions. They follow the same rules as built-in hooks and allow you to share stateful logic between components. This is where the real power of hooks becomes apparent.",
      key_points: [
        "Extract component logic into reusable functions",
        "Must start with 'use' prefix",
        "Can use other hooks inside custom hooks",
        "Enable better code organization and reuse",
      ],
      audioUrl: "/test-audio.mp3", // Test audio file
      duration: 200, // 3.33 minutes in seconds
      quiz: {
        question: "What is a key characteristic of custom hooks?",
        options: [
          "They must be class components",
          "They must start with 'use' prefix",
          "They cannot use other hooks",
          "They only work with state",
        ],
        correct_answer: "They must start with 'use' prefix",
        explanation:
          "Custom hooks must start with the 'use' prefix to follow React's rules of hooks. This naming convention helps React identify hooks and ensures they are called in the correct order.",
      },
    },
  ],
};

export async function GET() {
  return NextResponse.json(mockAudioCourse);
}
