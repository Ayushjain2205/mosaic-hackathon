import { NextResponse } from "next/server";

const mockVideoCourse = {
  title: "Introduction to React Hooks",
  description: "Learn the fundamentals of React Hooks with this animated video course",
  sections: [
    {
      title: "What are React Hooks?",
      content:
        "React Hooks are functions that let you use state and other React features without writing a class component. They were introduced in React 16.8.",
      key_points: [
        "Introduced in React 16.8",
        "Allow using state in functional components",
        "Simplify complex component logic",
      ],
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
      title: "useState Hook",
      content:
        "The useState hook lets you add state to functional components. It returns an array with two elements: the current state value and a function to update it.",
      key_points: [
        "Manages state in functional components",
        "Returns current state and updater function",
        "Can be used multiple times in a component",
      ],
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
      title: "useEffect Hook",
      content:
        "The useEffect hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes.",
      key_points: [
        "Handles side effects in components",
        "Replaces lifecycle methods",
        "Can specify dependencies",
      ],
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
  ],
};

export async function GET() {
  return NextResponse.json(mockVideoCourse);
}
