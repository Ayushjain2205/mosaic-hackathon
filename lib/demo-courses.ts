// Define the Course interface locally to avoid import issues
interface Quiz {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

interface Slide {
  slide_number: number;
  title: string;
  content: string;
  quiz: Quiz;
}

interface Course {
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  completion: number;
  icon: string;
  creator?: string;
  tags: string[];
  category?:
    | "Technology"
    | "Science"
    | "Business"
    | "Arts"
    | "Health"
    | "Language"
    | "Mathematics"
    | "History"
    | "Lifestyle"
    | "Other";
  slides?: Slide[];
  type?: "slides" | "video" | "audio";
}

export const demoCourses: Course[] = [
  {
    title: "Complete JavaScript Mastery",
    difficulty: "Beginner",
    completion: 82,
    icon: "💻",
    creator: "Prof. Alex Chen",
    tags: ["Programming", "Web", "Frontend"],
    category: "Technology",
    type: "slides",
    slides: [
      {
        slide_number: 1,
        title: "JavaScript Fundamentals",
        content: `## What is JavaScript?

JavaScript is a high-level, interpreted programming language that powers the modern web. Created by Brendan Eich in 1995, it has evolved from a simple scripting language to a powerful, versatile programming language.

### Key Characteristics:
- **Dynamic Typing**: Variables can hold any type of data
- **Prototype-based**: Uses prototypes instead of classes for inheritance
- **First-class Functions**: Functions are treated as first-class citizens
- **Event-driven**: Responds to user interactions and system events

### JavaScript's Role in Web Development:
- **Frontend**: Interactive user interfaces with React, Vue, Angular
- **Backend**: Server-side development with Node.js
- **Mobile**: Cross-platform apps with React Native, Ionic
- **Desktop**: Electron applications
- **IoT**: Programming microcontrollers and embedded systems

### Real-world Applications:
- **Netflix**: Uses JavaScript for their streaming interface
- **Facebook**: Powers their web application
- **Uber**: Real-time tracking and mapping
- **Spotify**: Music streaming and playlist management

### Why JavaScript Matters:
- **Job Market**: Most in-demand programming language
- **Community**: Largest open-source ecosystem (npm)
- **Versatility**: One language for multiple platforms
- **Performance**: Modern engines are incredibly fast`,
        quiz: {
          question:
            "According to the slide, which company uses JavaScript for real-time tracking and mapping?",
          options: ["Netflix", "Facebook", "Uber", "Spotify"],
          correct_answer: "Uber",
          explanation:
            "The slide specifically mentions that Uber uses JavaScript for real-time tracking and mapping, while Netflix uses it for streaming interfaces, Facebook for web applications, and Spotify for music recommendation systems.",
        },
      },
      {
        slide_number: 2,
        title: "Variables and Data Types",
        content: `## Variables and Data Types in JavaScript

Variables are fundamental building blocks that store and manage data in your programs. Understanding how to properly declare and use variables is crucial for writing clean, maintainable JavaScript code.

### Variable Declaration Keywords:

#### **let** - Modern Block Scoping
\`\`\`javascript
let userName = "Alice";
let age = 25;
let isActive = true;

// Can be reassigned
userName = "Bob";
age = 30;
\`\`\`

#### **const** - Immutable References
\`\`\`javascript
const API_URL = "https://api.example.com";
const MAX_USERS = 1000;
const user = { name: "Alice", age: 25 };

// Cannot reassign the variable
// API_URL = "new-url"; // Error!

// But can modify object properties
user.age = 26; // This works!
\`\`\`

#### **var** - Legacy Function Scoping (Avoid in Modern Code)
\`\`\`javascript
var oldStyle = "Don't use this in new code";
\`\`\`

### JavaScript Data Types:

#### **Primitive Types:**
- **String**: \`"Hello World"\`, \`'Single quotes'\`, \`\`Backticks\`\`
- **Number**: \`42\`, \`3.14\`, \`Infinity\`, \`NaN\`
- **Boolean**: \`true\`, \`false\`
- **Undefined**: \`undefined\` (uninitialized variable)
- **Null**: \`null\` (intentional absence of value)
- **Symbol**: \`Symbol('unique')\` (ES6+)
- **BigInt**: \`123n\` (ES2020+)

#### **Reference Types:**
- **Object**: \`{ key: 'value' }\`
- **Array**: \`[1, 2, 3]\`
- **Function**: \`function() {}\`
- **Date**: \`new Date()\`

### Type Coercion and Checking:
\`\`\`javascript
// Type checking
typeof "hello"        // "string"
typeof 42            // "number"
typeof true          // "boolean"
typeof {}            // "object"
typeof []            // "object" (arrays are objects!)
typeof null          // "object" (JavaScript quirk!)

// Type coercion examples
"5" + 3              // "53" (string concatenation)
"5" - 3              // 2 (numeric subtraction)
"5" * 3              // 15 (numeric multiplication)
\`\`\`

### Best Practices:
- Use \`const\` by default, \`let\` when reassignment is needed
- Avoid \`var\` in modern JavaScript
- Use descriptive variable names
- Initialize variables when declaring them
- Be aware of type coercion behavior`,
        quiz: {
          question:
            "According to the slide, what happens when you try to reassign a const variable?",
          options: [
            "It works fine and updates the value",
            "It creates a new variable",
            "It throws an error",
            "It only works with objects",
          ],
          correct_answer: "It throws an error",
          explanation:
            "The slide specifically shows that trying to reassign a const variable (like API_URL = 'new-url') results in an error, as indicated by the comment '// Error!' in the code example.",
        },
      },
      {
        slide_number: 3,
        title: "Functions and Scope",
        content: `## Functions in JavaScript

Functions are the building blocks of JavaScript applications. They encapsulate logic, promote code reuse, and enable powerful programming patterns like callbacks, closures, and higher-order functions.

### Function Declaration (Hoisted):
\`\`\`javascript
function calculateArea(width, height) {
  return width * height;
}

// Can be called before declaration due to hoisting
console.log(calculateArea(5, 3)); // 15
\`\`\`

### Function Expression:
\`\`\`javascript
const calculateArea = function(width, height) {
  return width * height;
};

// Must be called after declaration
console.log(calculateArea(5, 3)); // 15
\`\`\`

### Arrow Functions (ES6+):
\`\`\`javascript
// Basic arrow function
const calculateArea = (width, height) => {
  return width * height;
};

// Implicit return (single expression)
const calculateArea = (width, height) => width * height;

// Single parameter (parentheses optional)
const double = x => x * 2;

// No parameters
const getCurrentTime = () => new Date();
\`\`\`

### Advanced Function Concepts:

#### **Default Parameters:**
\`\`\`javascript
function greet(name = "Guest", greeting = "Hello") {
  return \`\${greeting}, \${name}!\`;
}

greet(); // "Hello, Guest!"
greet("Alice"); // "Hello, Alice!"
greet("Bob", "Hi"); // "Hi, Bob!"
\`\`\`

#### **Rest Parameters:**
\`\`\`javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3, 4, 5); // 15
\`\`\`

#### **Closures:**
\`\`\`javascript
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`

### Scope and Execution Context:

#### **Global Scope:**
\`\`\`javascript
var globalVar = "I'm global";
let globalLet = "I'm also global";

function myFunction() {
  console.log(globalVar); // Accessible
  console.log(globalLet); // Accessible
}
\`\`\`

#### **Function Scope:**
\`\`\`javascript
function myFunction() {
  var functionScoped = "I'm function scoped";
  let blockScoped = "I'm block scoped";
  
  if (true) {
    let blockScoped2 = "I'm block scoped too";
    console.log(blockScoped2); // Accessible
  }
  
  console.log(functionScoped); // Accessible
  console.log(blockScoped); // Accessible
  // console.log(blockScoped2); // Error! Not accessible
}
\`\`\`

### Higher-Order Functions:
\`\`\`javascript
// Functions that take other functions as arguments
const numbers = [1, 2, 3, 4, 5];

// Map - transform each element
const doubled = numbers.map(x => x * 2); // [2, 4, 6, 8, 10]

// Filter - select elements based on condition
const evens = numbers.filter(x => x % 2 === 0); // [2, 4]

// Reduce - accumulate values
const sum = numbers.reduce((acc, x) => acc + x, 0); // 15
\`\`\``,
        quiz: {
          question:
            "In the closure example on this slide, what will the second call to counter() return?",
          options: ["0", "1", "2", "undefined"],
          correct_answer: "2",
          explanation:
            "The slide shows a closure example where createCounter() returns a function that increments a count variable. The first call returns 1, and the second call returns 2, as shown in the console.log examples.",
        },
      },
      {
        slide_number: 4,
        title: "Objects and Arrays",
        content: `## Objects and Arrays

### Objects
Objects store data as key-value pairs and are fundamental to JavaScript:

\`\`\`javascript
const person = {
  name: "Alice",
  age: 25,
  city: "New York",
  greet: function() {
    return "Hello, I'm " + this.name;
  }
};
\`\`\`

### Arrays
Arrays store multiple values in a single variable:

\`\`\`javascript
const fruits = ["apple", "banana", "orange"];
const numbers = [1, 2, 3, 4, 5];
\`\`\`

### Accessing Data:
- **Objects**: \`person.name\` or \`person["name"]\`
- **Arrays**: \`fruits[0]\` (first element)

### Common Methods:
- **Array**: push(), pop(), length, forEach()
- **Object**: Object.keys(), Object.values()`,
        quiz: {
          question:
            "In the array example on this slide, what would fruits[0] return?",
          options: ["apple", "banana", "orange", "undefined"],
          correct_answer: "apple",
          explanation:
            "The slide shows the array const fruits = ['apple', 'banana', 'orange'], so fruits[0] would return 'apple', the first element in the array.",
        },
      },
      {
        slide_number: 5,
        title: "DOM Manipulation",
        content: `## DOM Manipulation

The Document Object Model (DOM) represents the structure of HTML documents. JavaScript can interact with and modify the DOM.

### Selecting Elements:
\`\`\`javascript
// By ID
const element = document.getElementById("myId");

// By class
const elements = document.getElementsByClassName("myClass");

// By tag
const paragraphs = document.getElementsByTagName("p");

// Modern selectors
const element = document.querySelector("#myId");
const elements = document.querySelectorAll(".myClass");
\`\`\`

### Modifying Content:
\`\`\`javascript
element.textContent = "New text";
element.innerHTML = "<strong>Bold text</strong>";
element.style.color = "red";
element.classList.add("newClass");
\`\`\`

### Event Handling:
\`\`\`javascript
element.addEventListener("click", function() {
  console.log("Button clicked!");
});
\`\`\``,
        quiz: {
          question:
            "According to the slide, which method is used to select elements by class name?",
          options: [
            "getElementById",
            "getElementsByClassName",
            "getElementsByTagName",
            "querySelector",
          ],
          correct_answer: "getElementsByClassName",
          explanation:
            "The slide specifically shows getElementsByClassName('myClass') as one of the methods for selecting elements, along with getElementById, getElementsByTagName, and the modern querySelector methods.",
        },
      },
    ],
  },
  {
    title: "Advanced Web Design & UX",
    difficulty: "Intermediate",
    completion: 68,
    icon: "🎨",
    creator: "Emma Rodriguez",
    tags: ["Design", "Web", "UX", "UI"],
    category: "Arts",
    type: "slides",
    slides: [
      {
        slide_number: 1,
        title: "Principles of Good Design",
        content: `## Principles of Good Design

Great web design follows fundamental principles that create visually appealing and functional websites.

### Core Design Principles:

#### 1. **Balance**
- Symmetrical: Equal weight on both sides
- Asymmetrical: Different elements balanced by visual weight
- Radial: Elements arranged around a central point

#### 2. **Contrast**
- Color contrast for readability
- Size contrast for hierarchy
- Typography contrast for emphasis

#### 3. **Emphasis**
- Focal points that draw attention
- Visual hierarchy guides user flow
- Strategic use of color and size

#### 4. **Repetition**
- Consistent patterns and elements
- Brand consistency across pages
- Cohesive visual language`,
        quiz: {
          question:
            "According to the slide, which type of balance arranges elements around a central point?",
          options: [
            "Symmetrical",
            "Asymmetrical",
            "Radial",
            "None of the above",
          ],
          correct_answer: "Radial",
          explanation:
            "The slide specifically defines radial balance as 'Elements arranged around a central point', while symmetrical is 'Equal weight on both sides' and asymmetrical is 'Different elements balanced by visual weight'.",
        },
      },
      {
        slide_number: 2,
        title: "Color Theory",
        content: `## Color Theory in Web Design

Understanding color relationships is crucial for creating effective web designs.

### Color Wheel Basics:
- **Primary Colors**: Red, Blue, Yellow
- **Secondary Colors**: Green, Orange, Purple
- **Tertiary Colors**: Mix of primary and secondary

### Color Schemes:

#### 1. **Monochromatic**
- Different shades of the same color
- Creates harmony and elegance
- Easy to implement

#### 2. **Analogous**
- Colors next to each other on the wheel
- Natural and pleasing combinations
- Good for backgrounds

#### 3. **Complementary**
- Colors opposite on the wheel
- High contrast and energy
- Use sparingly for emphasis

#### 4. **Triadic**
- Three evenly spaced colors
- Vibrant and balanced
- Requires careful balance

### Psychology of Color:
- **Red**: Energy, urgency, passion
- **Blue**: Trust, stability, calm
- **Green**: Growth, nature, harmony
- **Yellow**: Optimism, creativity, warmth`,
        quiz: {
          question:
            "According to the slide, which color represents 'Energy, urgency, passion'?",
          options: ["Blue", "Green", "Red", "Yellow"],
          correct_answer: "Red",
          explanation:
            "The slide specifically states that Red represents 'Energy, urgency, passion', while Blue represents 'Trust, stability, calm', Green represents 'Growth, nature, harmony', and Yellow represents 'Optimism, creativity, warmth'.",
        },
      },
      {
        slide_number: 3,
        title: "Typography",
        content: `## Typography in Web Design

Typography is the art and technique of arranging type to make written language readable and appealing.

### Font Categories:

#### 1. **Serif Fonts**
- Small decorative strokes (serifs)
- Traditional, formal appearance
- Good for body text in print
- Examples: Times New Roman, Georgia

#### 2. **Sans-Serif Fonts**
- Clean, no decorative strokes
- Modern, minimalist appearance
- Excellent for web and digital
- Examples: Arial, Helvetica, Open Sans

#### 3. **Display Fonts**
- Decorative, attention-grabbing
- Used for headlines and branding
- Should be used sparingly
- Examples: Impact, Lobster

### Typography Hierarchy:
- **H1**: Main heading (largest)
- **H2-H6**: Subheadings (decreasing size)
- **Body**: Regular text content
- **Caption**: Small supporting text

### Best Practices:
- Limit to 2-3 font families
- Ensure good contrast ratios
- Use appropriate line spacing
- Test readability on different devices`,
        quiz: {
          question:
            "According to the slide, which font category has 'Small decorative strokes (serifs)'?",
          options: [
            "Serif fonts",
            "Sans-serif fonts",
            "Display fonts",
            "Script fonts",
          ],
          correct_answer: "Serif fonts",
          explanation:
            "The slide specifically defines Serif fonts as having 'Small decorative strokes (serifs)' and gives examples like Times New Roman and Georgia, while Sans-serif fonts are described as 'Clean, no decorative strokes'.",
        },
      },
      {
        slide_number: 4,
        title: "Layout and Grid Systems",
        content: `## Layout and Grid Systems

Grid systems provide structure and consistency to web layouts, making content organized and visually appealing.

### Grid Components:

#### 1. **Columns**
- Vertical divisions of space
- Common: 12-column grid
- Flexible and responsive

#### 2. **Rows**
- Horizontal divisions
- Help organize content vertically
- Maintain consistent spacing

#### 3. **Gutters**
- Space between columns
- Prevents content from touching
- Improves readability

### Layout Types:

#### 1. **Fixed Layout**
- Fixed pixel widths
- Consistent across devices
- May not work on all screens

#### 2. **Fluid Layout**
- Percentage-based widths
- Adapts to screen size
- More flexible than fixed

#### 3. **Responsive Layout**
- Adapts to different screen sizes
- Uses media queries
- Modern standard approach

### Common Layout Patterns:
- **F-Pattern**: Eye-tracking pattern
- **Z-Pattern**: Natural reading flow
- **Card Layout**: Modular content blocks
- **Magazine Layout**: Editorial-style design`,
        quiz: {
          question:
            "According to the slide, what is the most common grid system mentioned?",
          options: [
            "6-column grid",
            "8-column grid",
            "12-column grid",
            "16-column grid",
          ],
          correct_answer: "12-column grid",
          explanation:
            "The slide specifically states that the most common grid system is the '12-column grid' under the Columns section, describing it as 'Vertical divisions of space' that are 'Flexible and responsive'.",
        },
      },
      {
        slide_number: 5,
        title: "User Experience (UX) Principles",
        content: `## User Experience (UX) Principles

Great web design prioritizes user experience, making websites intuitive, accessible, and enjoyable to use.

### Core UX Principles:

#### 1. **Usability**
- Easy to navigate and understand
- Clear call-to-action buttons
- Intuitive user interface
- Minimal learning curve

#### 2. **Accessibility**
- Works for users with disabilities
- Keyboard navigation support
- Screen reader compatibility
- High contrast options

#### 3. **Performance**
- Fast loading times
- Optimized images and code
- Minimal server requests
- Mobile-friendly

#### 4. **Consistency**
- Uniform design patterns
- Predictable interactions
- Brand consistency
- Familiar conventions

### User-Centered Design Process:
1. **Research**: Understand your users
2. **Wireframe**: Plan the structure
3. **Prototype**: Create interactive mockups
4. **Test**: Get user feedback
5. **Iterate**: Improve based on feedback

### Key Metrics:
- **Bounce Rate**: Users leaving quickly
- **Time on Site**: Engagement level
- **Conversion Rate**: Goal completion
- **User Satisfaction**: Feedback scores`,
        quiz: {
          question:
            "According to the slide, which UX principle includes 'Clear call-to-action buttons'?",
          options: ["Accessibility", "Performance", "Usability", "Consistency"],
          correct_answer: "Usability",
          explanation:
            "The slide specifically lists 'Clear call-to-action buttons' under the Usability principle, along with 'Easy to navigate and understand', 'Intuitive user interface', and 'Minimal learning curve'.",
        },
      },
    ],
  },
  {
    title: "Python for Data Science",
    difficulty: "Intermediate",
    completion: 75,
    icon: "🐍",
    creator: "Dr. Sarah Kim",
    tags: ["Python", "Data Science", "Machine Learning"],
    category: "Technology",
    type: "slides",
    slides: [
      {
        slide_number: 1,
        title: "Introduction to Data Science with Python",
        content: `## Python for Data Science

Python has become the de facto language for data science due to its simplicity, powerful libraries, and extensive ecosystem.

### Why Python for Data Science?
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **Matplotlib/Seaborn**: Data visualization
- **Scikit-learn**: Machine learning
- **Jupyter Notebooks**: Interactive development

### Real-world Applications:
- **Netflix**: Recommendation algorithms
- **Google**: Search algorithms and AI
- **Uber**: Dynamic pricing and route optimization
- **Spotify**: Music recommendation systems`,
        quiz: {
          question:
            "According to the slide, which company uses Python for recommendation algorithms?",
          options: ["Google", "Uber", "Netflix", "Spotify"],
          correct_answer: "Netflix",
          explanation:
            "The slide specifically mentions that Netflix uses Python for recommendation algorithms, while Google uses it for search algorithms and AI, Uber for dynamic pricing and route optimization, and Spotify for music recommendation systems.",
        },
      },
      {
        slide_number: 2,
        title: "Data Analysis with Pandas",
        content: `## Working with DataFrames

Pandas DataFrames are the cornerstone of data analysis in Python.

### Creating DataFrames:
\`\`\`python
import pandas as pd

# From dictionary
data = {'Name': ['Alice', 'Bob', 'Charlie'], 'Age': [25, 30, 35]}
df = pd.DataFrame(data)

# From CSV
df = pd.read_csv('data.csv')
\`\`\`

### Essential Operations:
\`\`\`python
# View data
df.head()          # First 5 rows
df.info()          # Data types and info
df.describe()      # Statistical summary

# Filtering
df[df['Age'] > 25]  # Filter rows
df[['Name', 'Age']] # Select columns

# Grouping
df.groupby('Category').mean()  # Group and aggregate
\`\`\``,
        quiz: {
          question:
            "In the slide's DataFrame example, what would df[df['Age'] > 25] return?",
          options: [
            "All rows where Age is greater than 25",
            "Only the first row",
            "An error message",
            "The column names",
          ],
          correct_answer: "All rows where Age is greater than 25",
          explanation:
            "The slide shows df[df['Age'] > 25] as a filtering example, which would return all rows where the Age column value is greater than 25, as explained in the 'Filtering' section.",
        },
      },
      {
        slide_number: 3,
        title: "Data Visualization",
        content: `## Creating Visualizations

Data visualization helps uncover patterns and insights in your data.

### Matplotlib Basics:
\`\`\`python
import matplotlib.pyplot as plt

# Line plot
plt.plot(x, y)
plt.title('My Plot')
plt.xlabel('X Axis')
plt.ylabel('Y Axis')
plt.show()
\`\`\`

### Seaborn for Statistical Plots:
\`\`\`python
import seaborn as sns

# Histogram
sns.histplot(data=df, x='age')

# Scatter plot with regression
sns.scatterplot(data=df, x='height', y='weight')
sns.regplot(data=df, x='height', y='weight')
\`\`\``,
        quiz: {
          question:
            "According to the slide, which Seaborn function creates a scatter plot with regression line?",
          options: ["histplot", "scatterplot", "regplot", "lineplot"],
          correct_answer: "regplot",
          explanation:
            "The slide specifically shows sns.regplot(data=df, x='height', y='weight') as the function that creates a scatter plot with regression line, while sns.scatterplot creates a basic scatter plot and sns.histplot creates a histogram.",
        },
      },
      {
        slide_number: 4,
        title: "Machine Learning with Scikit-learn",
        content: `## Introduction to Machine Learning

Scikit-learn provides simple and efficient tools for machine learning.

### Basic ML Workflow:
\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)

# Evaluate
mse = mean_squared_error(y_test, predictions)
\`\`\``,
        quiz: {
          question:
            "According to the slide's ML workflow, what does train_test_split(X, y, test_size=0.2) do?",
          options: [
            "Trains the model with 20% of the data",
            "Splits the data into 80% training and 20% testing",
            "Creates 20 test models",
            "Evaluates the model performance",
          ],
          correct_answer: "Splits the data into 80% training and 20% testing",
          explanation:
            "The slide shows train_test_split(X, y, test_size=0.2) which splits the data into training and testing sets, with 20% allocated for testing (test_size=0.2) and 80% for training.",
        },
      },
      {
        slide_number: 5,
        title: "Real-world Data Science Project",
        content: `## Complete Data Science Project

Let's build a complete project from data collection to insights.

### Project: Sales Analysis
1. **Data Collection**: Load sales data from CSV
2. **Data Cleaning**: Handle missing values and outliers
3. **Exploratory Analysis**: Visualize trends and patterns
4. **Feature Engineering**: Create new meaningful features
5. **Model Building**: Predict future sales
6. **Deployment**: Create dashboard for stakeholders

### Key Skills Demonstrated:
- Data manipulation with Pandas
- Statistical analysis
- Visualization with Matplotlib/Seaborn
- Machine learning with Scikit-learn
- Business insights and recommendations`,
        quiz: {
          question:
            "According to the slide's project example, what is step 3 in the Sales Analysis project?",
          options: [
            "Data Collection",
            "Data Cleaning",
            "Exploratory Analysis",
            "Feature Engineering",
          ],
          correct_answer: "Exploratory Analysis",
          explanation:
            "The slide lists the Sales Analysis project steps in order: 1. Data Collection, 2. Data Cleaning, 3. Exploratory Analysis (Visualize trends and patterns), 4. Feature Engineering, 5. Model Building, 6. Deployment.",
        },
      },
    ],
  },
  {
    title: "Digital Marketing Strategy",
    difficulty: "Beginner",
    completion: 90,
    icon: "📈",
    creator: "Mike Johnson",
    tags: ["Marketing", "Digital", "Strategy", "Business"],
    category: "Business",
    type: "slides",
    slides: [
      {
        slide_number: 1,
        title: "Digital Marketing Landscape",
        content: `## The Digital Marketing Revolution

Digital marketing has transformed how businesses reach and engage with customers in the 21st century.

### Key Digital Marketing Channels:
- **Search Engine Marketing (SEM)**: Google Ads, Bing Ads
- **Social Media Marketing**: Facebook, Instagram, LinkedIn, TikTok
- **Content Marketing**: Blogs, videos, podcasts, infographics
- **Email Marketing**: Newsletters, automated campaigns
- **Influencer Marketing**: Partnering with content creators

### Why Digital Marketing Matters:
- **Global Reach**: Access to worldwide audience
- **Cost Effective**: Lower cost per acquisition than traditional media
- **Measurable**: Detailed analytics and ROI tracking
- **Targeted**: Precise audience targeting capabilities
- **Real-time**: Immediate feedback and optimization`,
        quiz: {
          question:
            "According to the slide, which digital marketing channel involves 'Partnering with content creators'?",
          options: [
            "Search Engine Marketing",
            "Social Media Marketing",
            "Content Marketing",
            "Influencer Marketing",
          ],
          correct_answer: "Influencer Marketing",
          explanation:
            "The slide specifically defines Influencer Marketing as 'Partnering with content creators', while Search Engine Marketing involves Google Ads and Bing Ads, Social Media Marketing uses platforms like Facebook and Instagram, and Content Marketing focuses on blogs, videos, and podcasts.",
        },
      },
      {
        slide_number: 2,
        title: "Content Marketing Strategy",
        content: `## Creating Valuable Content

Content marketing focuses on creating and distributing valuable, relevant content to attract and retain customers.

### Content Types:
- **Blog Posts**: Educational articles, how-to guides
- **Videos**: Tutorials, product demos, behind-the-scenes
- **Infographics**: Data visualization, process explanations
- **Podcasts**: Industry discussions, expert interviews
- **E-books**: Comprehensive guides, whitepapers

### Content Marketing Funnel:
1. **Awareness**: Educational content that solves problems
2. **Interest**: Product-focused content showing benefits
3. **Consideration**: Comparison guides, case studies
4. **Purchase**: Product demos, testimonials
5. **Retention**: Customer success stories, advanced tips`,
        quiz: {
          question:
            "According to the slide, which content type is described as 'Data visualization, process explanations'?",
          options: ["Blog Posts", "Videos", "Infographics", "Podcasts"],
          correct_answer: "Infographics",
          explanation:
            "The slide specifically describes Infographics as 'Data visualization, process explanations', while Blog Posts are 'Educational articles, how-to guides', Videos are 'Tutorials, product demos, behind-the-scenes', and Podcasts are 'Industry discussions, expert interviews'.",
        },
      },
      {
        slide_number: 3,
        title: "Social Media Marketing",
        content: `## Leveraging Social Platforms

Social media marketing uses platforms to connect with audiences and build brand awareness.

### Platform Strategies:
- **Facebook**: Community building, customer service
- **Instagram**: Visual storytelling, influencer partnerships
- **LinkedIn**: B2B networking, thought leadership
- **TikTok**: Creative short-form content, viral marketing
- **Twitter**: Real-time engagement, customer support

### Best Practices:
- **Consistent Posting**: Regular content schedule
- **Engagement**: Respond to comments and messages
- **Visual Content**: High-quality images and videos
- **Hashtags**: Strategic use for discoverability
- **Analytics**: Track performance and optimize`,
        quiz: {
          question:
            "According to the slide, which platform is used for 'Creative short-form content, viral marketing'?",
          options: ["Facebook", "Instagram", "LinkedIn", "TikTok"],
          correct_answer: "TikTok",
          explanation:
            "The slide specifically describes TikTok as being used for 'Creative short-form content, viral marketing', while Facebook is for 'Community building, customer service', Instagram for 'Visual storytelling, influencer partnerships', and LinkedIn for 'B2B networking, thought leadership'.",
        },
      },
      {
        slide_number: 4,
        title: "Email Marketing Automation",
        content: `## Automated Email Campaigns

Email marketing automation allows you to send targeted messages based on user behavior and preferences.

### Types of Email Campaigns:
- **Welcome Series**: Onboarding new subscribers
- **Drip Campaigns**: Educational content over time
- **Abandoned Cart**: Recover lost sales
- **Re-engagement**: Win back inactive customers
- **Upsell/Cross-sell**: Promote additional products

### Segmentation Strategies:
- **Demographics**: Age, location, gender
- **Behavior**: Purchase history, website activity
- **Preferences**: Product interests, communication frequency
- **Lifecycle Stage**: New, active, at-risk, churned`,
        quiz: {
          question:
            "According to the slide, which email campaign type is described as 'Recover lost sales'?",
          options: [
            "Welcome Series",
            "Drip Campaigns",
            "Abandoned Cart",
            "Re-engagement",
          ],
          correct_answer: "Abandoned Cart",
          explanation:
            "The slide specifically describes 'Abandoned Cart' campaigns as 'Recover lost sales', while Welcome Series is 'Onboarding new subscribers', Drip Campaigns are 'Educational content over time', and Re-engagement is 'Win back inactive customers'.",
        },
      },
      {
        slide_number: 5,
        title: "Measuring Marketing Success",
        content: `## Key Performance Indicators (KPIs)

Measuring marketing success is crucial for optimizing campaigns and proving ROI.

### Essential Metrics:
- **ROI (Return on Investment)**: Revenue generated vs. cost
- **CAC (Customer Acquisition Cost)**: Cost to acquire one customer
- **LTV (Lifetime Value)**: Total value of a customer over time
- **Conversion Rate**: Percentage of visitors who take desired action
- **Engagement Rate**: Level of interaction with content

### Analytics Tools:
- **Google Analytics**: Website traffic and behavior
- **Facebook Insights**: Social media performance
- **Email Platform Analytics**: Open rates, click rates
- **CRM Systems**: Customer relationship tracking
- **Attribution Models**: Multi-touch customer journey analysis`,
        quiz: {
          question:
            "According to the slide, which metric measures 'Percentage of visitors who take desired action'?",
          options: ["ROI", "CAC", "LTV", "Conversion Rate"],
          correct_answer: "Conversion Rate",
          explanation:
            "The slide specifically defines Conversion Rate as 'Percentage of visitors who take desired action', while ROI is 'Revenue generated vs. cost', CAC is 'Cost to acquire one customer', and LTV is 'Total value of a customer over time'.",
        },
      },
    ],
  },
];
