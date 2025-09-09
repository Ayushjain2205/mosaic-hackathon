import { NextResponse } from "next/server"

const mockCourse = {
  title: "Introduction to JavaScript Programming",
  description: "A comprehensive introduction to JavaScript basics and core concepts",
  total_slides: 5,
  slides: [
    {
      slide_number: 1,
      title: "Introduction to JavaScript",
      content:
        "## What is JavaScript?\n\nJavaScript is a versatile programming language primarily used for web development. It enables interactive and dynamic content on websites.\n\n### Key Features:\n- Client-side scripting language\n- Runs in web browsers\n- Supports both object-oriented and functional programming\n- Essential for modern web development\n\n### Use Cases:\n- Adding interactivity to web pages\n- Form validation\n- Dynamic content updates\n- Creating web applications\n\nWithout JavaScript, modern web pages would be static and unable to respond to user actions in real-time.",
      quiz: {
        question: "Why is JavaScript considered crucial in web development?",
        options: [
          "It is the only language that can be used on servers.",
          "It allows for the creation of static web pages.",
          "It enables the addition of interactivity to web pages.",
          "It is used to style web pages.",
        ],
        correct_answer: "It enables the addition of interactivity to web pages.",
        explanation:
          "JavaScript is crucial in web development because it is the primary language that adds interactivity to web pages. This includes everything from forms validation to dynamic content loading, which are key for engaging user experiences.",
      },
    },
    {
      slide_number: 2,
      title: "Basic Syntax and Structure",
      content:
        "## Basic Syntax and Structure in JavaScript\n\n### Understanding Variables and Data Types\n- **Variables** are containers for storing data values.\n- Use the `var`, `let`, or `const` keyword to declare variables.\n- JavaScript is **dynamically typed**, meaning variables do not need a type declared.\n- Common data types include:\n  - String\n  - Number\n  - Boolean\n  - Array\n  - Object\n  - Undefined\n\n### Introduction to Operators and Expressions\n- **Operators** are symbols that perform operations on variables and values.\n- Types of operators include:\n  - Arithmetic (`+`, `-`, `*`, `/`)\n  - Comparison (`==`, `!=`, `>`, `<`)\n  - Logical (`&&`, `||`, `!`)\n- **Expressions** combine variables and operators to create a value.\n\n### Function and Syntax Structure\n- A **function** is a block of code designed to perform a particular task.\n- Declared with the `function` keyword, followed by a name, parameters, and a code block.\n- Example:\n  ```javascript\n  function myFunction(p1, p2) {\n    return p1 * p2;\n  }\n  ```\n- Functions can be named or anonymous and can be declared or expressed.",
      quiz: {
        question: "Which of the following is NOT a valid JavaScript variable declaration?",
        options: ["var name = 'John';", "let age = 30;", "const job = 'Developer';", "int height = 175;"],
        correct_answer: "int height = 175;",
        explanation:
          "JavaScript does not use `int` for declaring variables. Instead, it uses `var`, `let`, or `const`. The correct way to declare a variable for height would be using one of these keywords, not `int`.",
      },
    },
    {
      slide_number: 3,
      title: "Control Structures",
      content:
        "## Control Structures in JavaScript\n\n### 1. **If-Else Statements**\n- Basic form of decision making in programming.\n- Executes a block of code if a specified condition is true, otherwise, executes another block of code.\n- Syntax:\n  ```javascript\n  if (condition) {\n    // block of code to be executed if the condition is true\n  } else {\n    // block of code to be executed if the condition is false\n  }\n  ```\n\n### 2. **Looping with For and While Loops**\n- **For Loop:** Used to run a block of code a specific number of times.\n- Syntax:\n  ```javascript\n  for (initialization; condition; iteration) {\n    // block of code to be executed\n  }\n  ```\n- **While Loop:** Runs as long as a specified condition is true.\n- Syntax:\n  ```javascript\n  while (condition) {\n    // block of code to be executed\n  }\n  ```\n\n### 3. **Switch-Case for Decision Making**\n- Allows a variable to be tested for equality against a list of values.\n- Each value is called a case, and the variable being switched on is checked for each case.\n- Syntax:\n  ```javascript\n  switch(expression) {\n    case x:\n      // block of code to be executed if the expression matches x\n      break;\n    case y:\n      // block of code to be executed if the expression matches y\n      break;\n    default:\n      // block of code to be executed if the expression doesn't match any case\n  }\n  ```",
      quiz: {
        question:
          "Which control structure is best used for executing a block of code multiple times with a known number of iterations?",
        options: ["If-Else Statements", "For Loop", "While Loop", "Switch-Case"],
        correct_answer: "For Loop",
        explanation:
          "The For Loop is specifically designed for executing a block of code a specific number of times, making it the best choice for iterating a known number of times.",
      },
    },
    {
      slide_number: 4,
      title: "Functions and Events",
      content:
        "## Functions in JavaScript\n\n**Defining a Function**\n\nA function is a block of code designed to perform a particular task. It is defined using the `function` keyword, followed by a name, followed by parentheses `()`.\n\n```javascript\nfunction myFunction(p1, p2) {\n  return p1 * p2; // The function returns the product of p1 and p2\n}\n```\n\n**Invoking (Calling) a Function**\n\nTo execute the function, you call its name followed by parentheses.\n\n```javascript\nvar result = myFunction(4, 3); // result will store 12\n```\n\n## Scope and Closure\n\n**Scope**\n\nScope determines the accessibility of variables. JavaScript has two types of scopes:\n\n- **Global Scope**: Variables defined outside any function have global scope.\n- **Local Scope**: Variables declared within a function are local to that function.\n\n**Closure**\n\nA closure is a function having access to the parent scope, even after the parent function has closed.\n\n```javascript\nfunction parentFunc() {\n  var localVar = 'I am local';\n  function childFunc() {\n    return localVar; // childFunc can access localVar of parentFunc\n  }\n  return childFunc;\n}\n```\n\n## Handling Events in the Browser\n\nEvents in JavaScript provide a way to execute code when something happens. Here are common events:\n\n- **onclick**: User clicks on an element\n- **onload**: Web page has finished loading\n\n```javascript\n// Example of onclick event\n<button onclick=\"alert('Button clicked!')\">Click me</button>\n\n// Example of onload event\nwindow.onload = function() {\n  alert('Page is fully loaded');\n};\n```\n\nEvents are crucial for creating interactive web applications.",
      quiz: {
        question: "Which of the following is true about JavaScript functions?",
        options: [
          "Functions cannot return values",
          "Functions are defined with the `var` keyword",
          "A function can access variables within its scope even after the parent function has closed",
          "Events cannot be handled using functions",
        ],
        correct_answer: "A function can access variables within its scope even after the parent function has closed",
        explanation:
          "This statement is true and describes a closure, where a function can access variables from its parent function's scope even after the parent function has executed, showcasing the unique feature of closures in JavaScript.",
      },
    },
    {
      slide_number: 5,
      title: "DOM Manipulation and Introduction to ES6",
      content:
        "## Basics of Document Object Model (DOM)\n\n- The DOM is a programming interface for web documents.\n- It represents the page so that programs can change the document structure, style, and content.\n- The DOM represents the document as nodes and objects; that way, programming languages can interact with the page.\n\n## Manipulating Web Page Elements with JavaScript\n\n- JavaScript can access and change all the elements of a DOM.\n- Common operations include creating new elements, deleting elements, and changing element styles.\n- Example: `document.getElementById('id').innerHTML = 'New Content';`\n\n## Brief Overview of ECMAScript 6 (ES6) Features\n\n- ES6, released in 2015, is a major update to JavaScript that includes new syntax and features.\n- Key features include `let` and `const` for variable declarations, arrow functions, classes, promises, and template literals.\n- These features make JavaScript more powerful and easier to write in a concise, readable manner.\n\nES6 has been a significant step forward for JavaScript, introducing features that enable developers to write more efficient and readable code.",
      quiz: {
        question: "Which of the following is NOT a feature introduced in ECMAScript 6 (ES6)?",
        options: ["Arrow functions", "The `var` keyword", "Promises", "Template literals"],
        correct_answer: "The `var` keyword",
        explanation:
          "The `var` keyword was already part of JavaScript before ES6. ES6 introduced `let` and `const` as new ways to declare variables, offering block-scope variables and constants, but did not introduce `var`.",
      },
    },
  ],
}

export async function GET() {
  // Simulate a delay to mimic API latency
  await new Promise((resolve) => setTimeout(resolve, 5000))

  return NextResponse.json(mockCourse)
}

