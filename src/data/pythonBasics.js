/**
 * PythonQuest Phase 1 Curriculum Data
 * Exactly 11 topics with beginner-friendly lessons, 5 diverse questions each (55 total),
 * and coding challenges with flexible validation rules.
 */

export const COURSE_METADATA = {
  id: "python-basics",
  title: "Python Basics",
  phase: 1,
  totalTopics: 11,
  xpPerLesson: 10,
  xpPerQuestion: 10,
  xpPerChallenge: 25,
  xpTopicBonus: 25,
  // Total XP possible per topic: 10 + (5 * 10) + 25 + 25 = 110 XP
  // Total Phase 1 XP: 11 * 110 = 1,210 XP
};

export const TOPICS = [
  // --------------------------------------------------------------------------
  // TOPIC 1: What is Programming?
  // --------------------------------------------------------------------------
  {
    id: 1,
    number: 1,
    title: "What is Programming?",
    slug: "what-is-programming",
    shortDescription: "Giving step-by-step instructions to a computer to solve problems.",
    lesson: {
      easyDefinition: "Programming is the process of giving instructions to a computer so it can perform a task or solve a problem.",
      realLifeExample: {
        title: "Making a Cup of Tea",
        analogy: "Imagine telling your friend how to make tea:",
        steps: [
          "1. Boil water.",
          "2. Add tea powder.",
          "3. Add milk.",
          "4. Add sugar.",
          "5. Serve the tea."
        ],
        takeaway: "You are giving clear step-by-step instructions. If you skip a step (like boiling water), the tea won't turn out right! Programming works in the exact same way."
      },
      integratedExplanation: "Programming means giving clear instructions to a computer to make it perform a task or solve a problem. Computers don't think like humans—they do exactly what we tell them, step by step. Those instructions are written using a programming language such as Python.",
      codeExample: `# Instructing the computer step by step
print("Step 1: Boil water")
print("Step 2: Add tea powder and milk")
print("Step 3: Serve the tea! ☕")`,
      keyTakeaways: [
        "A program is a set of ordered instructions for a computer.",
        "Computers execute instructions sequentially from top to bottom.",
        "Precision matters: computers follow what you write, not what you intended."
      ]
    },
    questions: [
      {
        id: "t1_q1",
        type: "multiple_choice",
        tag: "Basic Understanding",
        prompt: "What is the simplest definition of programming?",
        options: [
          "Giving step-by-step instructions to a computer to perform a task",
          "Memorizing complex mathematical formulas",
          "Building physical computer chips with hardware tools",
          "Searching for websites on the internet"
        ],
        correctIndex: 0,
        explanationCorrect: "Exactly! Programming is simply writing clear instructions that a computer can follow to accomplish a task.",
        explanationIncorrect: "Think about the tea analogy: programming is about giving a sequence of instructions to get a job done."
      },
      {
        id: "t1_q2",
        type: "scenario",
        tag: "Real-Life Application",
        prompt: "If you instruct a robot: '1. Pour milk, 2. Add cereal, 3. Put bowl on table', what problem occurs?",
        options: [
          "The robot will get tired and turn off",
          "The milk pours onto the empty table because the bowl isn't there yet!",
          "The computer automatically fixes your instructions",
          "Nothing, computers know what you meant"
        ],
        correctIndex: 1,
        explanationCorrect: "Spot on! Computers execute instructions strictly in the order given. Without the bowl placed first, milk spills!",
        explanationIncorrect: "Remember: computers do not guess your intentions. They follow steps in the exact sequence provided."
      },
      {
        id: "t1_q3",
        type: "predict_output",
        tag: "Code Prediction",
        prompt: "In what order will the computer execute these lines?\nLine 1: print('Start')\nLine 2: print('Middle')\nLine 3: print('End')",
        options: [
          "Line 3, then Line 2, then Line 1",
          "All three lines execute at the exact same millisecond randomly",
          "Line 1 ('Start'), then Line 2 ('Middle'), then Line 3 ('End')",
          "Only the line with the longest word"
        ],
        correctIndex: 2,
        explanationCorrect: "Great job! By default, Python programs execute instructions sequentially from top to bottom.",
        explanationIncorrect: "Standard programs execute sequentially from the first line down to the last line."
      },
      {
        id: "t1_q4",
        type: "concept_id",
        tag: "Concept Identification",
        prompt: "What do we call the language used to write instructions for a computer?",
        options: [
          "A spoken dialect",
          "A markup document",
          "A programming language (such as Python)",
          "An operating network"
        ],
        correctIndex: 2,
        explanationCorrect: "Correct! We use programming languages like Python to bridge human ideas into instructions a computer can understand.",
        explanationIncorrect: "Just as humans speak English or Hindi, computers receive instructions through a programming language."
      },
      {
        id: "t1_q5",
        type: "challenging",
        tag: "Slightly Challenging",
        prompt: "Which of the following statements about computers is TRUE?",
        options: [
          "Computers can magically fix your logic errors if you make a mistake",
          "Computers execute instructions literally, exactly as written",
          "Computers only understand instructions written in plain conversational English",
          "You must have a master's degree in math to write your first program"
        ],
        correctIndex: 1,
        explanationCorrect: "Brilliant! Computers are completely literal: they do exactly what is specified in the code, no more and no less.",
        explanationIncorrect: "Computers lack common sense; they don't 'guess' what you meant. They execute instructions literally."
      }
    ],
    codingChallenge: {
      id: "c1",
      title: "Your First Computer Instruction",
      instruction: "Write a program that uses print() to give the computer an instruction to display: Hello, World!",
      hint: "Use print(\"Hello, World!\") with quotes around the message.",
      starterCode: `# Write your first instruction below:
`,
      expectedConcept: "print()",
      validate: (code, stdout) => {
        const hasPrint = /print\s*\(/.test(code);
        if (!hasPrint) {
          return { pass: false, hint: "Make sure you are using the print() function to give your instruction." };
        }
        if (!stdout || stdout.trim().length === 0) {
          return { pass: false, hint: "Your program didn't print any text to the console. Check your print statement." };
        }
        return { pass: true, message: "Awesome! You just gave your very first instruction to the computer! 🎉" };
      }
    }
  },

  // --------------------------------------------------------------------------
  // TOPIC 2: What is Python?
  // --------------------------------------------------------------------------
  {
    id: 2,
    number: 2,
    title: "What is Python?",
    slug: "what-is-python",
    shortDescription: "A friendly, readable programming language loved by beginners and pros.",
    lesson: {
      easyDefinition: "Python is a programming language that allows us to give instructions to a computer in a relatively simple and readable way.",
      realLifeExample: {
        title: "Languages of the World",
        analogy: "Think of Python as a language that lets you communicate instructions to a computer.",
        steps: [
          "• Humans communicate using English, Spanish, Telugu, Tamil, or Hindi.",
          "• Computers process raw electrical 1s and 0s (binary code).",
          "• Python is like a clean, elegant bridge between human thoughts and computer binary."
        ],
        takeaway: "Just as people use different languages to communicate with each other, programmers use programming languages such as Python to communicate instructions to computers."
      },
      integratedExplanation: "Python is one of the most popular programming languages we can use to tell a computer what to do. It was created with a strong focus on readability—Python code often reads almost like plain English sentences!",
      codeExample: `# Python reads like plain English:
student_name = "Kishore"
print("Welcome to Python,", student_name)`,
      keyTakeaways: [
        "Python was designed for readability and simplicity.",
        "It is widely used in web development, data science, AI, and automation.",
        "It is beginner-friendly because it avoids clutter and complex punctuation."
      ]
    },
    questions: [
      {
        id: "t2_q1",
        type: "multiple_choice",
        tag: "Basic Understanding",
        prompt: "Why is Python especially popular among beginners?",
        options: [
          "It reads almost like plain English and has clean, simple syntax",
          "It only works on expensive supercomputers",
          "It forces you to write 50 lines of code just to print a greeting",
          "It was made exclusively for gaming hardware"
        ],
        correctIndex: 0,
        explanationCorrect: "Exactly! Python was purposefully crafted to be clean, readable, and intuitive for newcomers and experts alike.",
        explanationIncorrect: "Python is famous for its clean syntax that reads very closely to standard English sentences."
      },
      {
        id: "t2_q2",
        type: "scenario",
        tag: "Real-Life Application",
        prompt: "If computers ultimately process binary (0s and 1s), what role does Python play?",
        options: [
          "It replaces the computer's CPU entirely",
          "It acts as a translator so you can write human-readable code that the computer converts to actions",
          "It turns off the computer when an error occurs",
          "It deletes all hardware files"
        ],
        correctIndex: 1,
        explanationCorrect: "Spot on! Python lets you express your logic in readable code, and Python's interpreter translates it for the computer.",
        explanationIncorrect: "Python acts as a bridge or translator between human thoughts and computer hardware."
      },
      {
        id: "t2_q3",
        type: "true_false",
        tag: "Concept Identification",
        prompt: "True or False: Python is only used in schools and cannot be used to build real-world software like YouTube, Instagram, or AI models.",
        options: [
          "True — it's only a toy language for children",
          "False — Python powers major platforms like Instagram, Netflix, NASA projects, and modern AI"
        ],
        correctIndex: 1,
        explanationCorrect: "Correct! Python is one of the most powerful and widely used languages in modern tech, AI, and science.",
        explanationIncorrect: "False! Massive companies like Instagram, Spotify, Google, and OpenAI rely heavily on Python."
      },
      {
        id: "t2_q4",
        type: "code_choice",
        tag: "Code Prediction",
        prompt: "Which line demonstrates Python's clean readability for displaying text?",
        options: [
          "System.out.println(\"Hello\");",
          "Console.WriteLine(\"Hello\");",
          "print(\"Hello\")",
          "#include <stdio.h> printf(\"Hello\");"
        ],
        correctIndex: 2,
        explanationCorrect: "Perfect! In Python, printing text is as clean and direct as `print(\"Hello\")`.",
        explanationIncorrect: "Look for the simplest and most readable line: `print(\"Hello\")`."
      },
      {
        id: "t2_q5",
        type: "challenging",
        tag: "Slightly Challenging",
        prompt: "What is an 'interpreter' in Python?",
        options: [
          "A microphone plugged into the computer",
          "A program that reads and runs your Python instructions line-by-line",
          "A person who types code for you",
          "A spell-checker inside web browsers"
        ],
        correctIndex: 1,
        explanationCorrect: "Excellent! The Python interpreter takes your written code and translates/executes it step-by-step on the machine.",
        explanationIncorrect: "An interpreter is the software engine that reads your Python code and carries out the instructions."
      }
    ],
    codingChallenge: {
      id: "c2",
      title: "Greet with Python",
      instruction: "Write a program that uses print() to display: I am learning Python!",
      hint: "Use print(\"I am learning Python!\")",
      starterCode: `# Display that you are learning Python
`,
      expectedConcept: "print()",
      validate: (code, stdout) => {
        const hasPrint = /print\s*\(/.test(code);
        if (!hasPrint) {
          return { pass: false, hint: "Remember to use print() to output your sentence." };
        }
        const text = stdout.toLowerCase();
        if (!text.includes("python")) {
          return { pass: false, hint: "Your output should mention Python! E.g. print(\"I am learning Python!\")" };
        }
        return { pass: true, message: "Fantastic! You've written and run real Python code! 🎉" };
      }
    }
  },

  // --------------------------------------------------------------------------
  // TOPIC 3: print()
  // --------------------------------------------------------------------------
  {
    id: 3,
    number: 3,
    title: "print()",
    slug: "print-function",
    shortDescription: "Displaying text, numbers, and messages on the screen.",
    lesson: {
      easyDefinition: "The print() function is used to display information, text, or calculation results onto your screen.",
      realLifeExample: {
        title: "A Store Cash Register & Receipt Printer",
        analogy: "When you buy items at a shop, the cashier scans the goods and presses a button.",
        steps: [
          "• The register prints a receipt so you can see what happened.",
          "• In Python, the screen is your receipt printer, and `print()` is the button that prints onto it."
        ],
        takeaway: "Without print(), the computer might do calculations in its head, but you won't see any of the results!"
      },
      integratedExplanation: "To display words, wrap them in quotation marks like `print(\"Hello\")`. To display numbers, you can print them directly without quotes like `print(42)`. You can even print multiple items separated by commas!",
      codeExample: `# Printing text (in quotation marks)
print("Hello, student!")

# Printing numbers (no quotation marks needed)
print(100)

# Printing multiple items together
print("Your score is:", 95)`,
      keyTakeaways: [
        "Words (strings) must be wrapped in quotes: \"text\" or 'text'.",
        "Numbers do not need quotes: print(25).",
        "Separate multiple items with commas: print(\"Age:\", 18)."
      ]
    },
    questions: [
      {
        id: "t3_q1",
        type: "multiple_choice",
        tag: "Basic Understanding",
        prompt: "Why do we enclose words inside quotes in print(\"Welcome\")?",
        options: [
          "To tell Python that this is literal text, not a variable or command name",
          "Because Python requires every sentence to look like dialogue",
          "Quotes make the computer read the text out loud through speakers",
          "Quotes double the speed of the computer"
        ],
        correctIndex: 0,
        explanationCorrect: "Exactly! Quotes tell Python: 'treat this as raw text words (a string), not as a command or variable name'.",
        explanationIncorrect: "Quotes distinguish human text from Python's own built-in keywords and variable names."
      },
      {
        id: "t3_q2",
        type: "predict_output",
        tag: "Code Prediction",
        prompt: "What will this code display?\nprint(5 + 5)",
        options: [
          "5 + 5",
          "10",
          "55",
          "An error because there are no quotes"
        ],
        correctIndex: 1,
        explanationCorrect: "Great! Because there are no quotes around 5 + 5, Python calculates the math and prints 10!",
        explanationIncorrect: "Without quotes, Python calculates the math expression `5 + 5` before displaying the result."
      },
      {
        id: "t3_q3",
        type: "predict_output",
        tag: "Output Prediction",
        prompt: "What will this code display?\nprint(\"5 + 5\")",
        options: [
          "10",
          "5 + 5",
          "55",
          "Error"
        ],
        correctIndex: 1,
        explanationCorrect: "Spot on! Because quotes were used, Python prints the literal characters: 5 + 5!",
        explanationIncorrect: "Notice the quotation marks! Any characters inside quotes are printed literally as-is."
      },
      {
        id: "t3_q4",
        type: "concept_id",
        tag: "Concept Identification",
        prompt: "Which option correctly prints both text and a number in a single print call?",
        options: [
          "print(\"Items:\", 3)",
          "print \"Items:\" + 3",
          "echo(\"Items:\" 3)",
          "display[\"Items:\", 3]"
        ],
        correctIndex: 0,
        explanationCorrect: "Correct! Using commas inside `print(\"Items:\", 3)` neatly prints items with a space in between.",
        explanationIncorrect: "In Python 3, `print()` uses parentheses and items are separated with commas."
      },
      {
        id: "t3_q5",
        type: "challenging",
        tag: "Slightly Challenging",
        prompt: "What happens if you run: print(\"Hello)",
        options: [
          "Python adds the closing quote for you automatically",
          "SyntaxError: EOL while scanning string literal (missing closing quote)",
          "The computer prints 'Hello)'",
          "It prints nothing and ignores the line"
        ],
        correctIndex: 1,
        explanationCorrect: "Spot on! Quotes must always be closed in pairs. Leaving one out causes a SyntaxError.",
        explanationIncorrect: "Quotation marks must always come in balanced pairs. Missing one triggers a SyntaxError."
      }
    ],
    codingChallenge: {
      id: "c3",
      title: "Print Your Name",
      instruction: "Write a Python program that prints your name using the print() function.",
      hint: "Use print(\"Your Name\") — you can put your real name or nickname inside the quotes.",
      starterCode: `# Write a program that prints your name:
`,
      expectedConcept: "print()",
      validate: (code, stdout) => {
        const hasPrint = /print\s*\(/.test(code);
        if (!hasPrint) {
          return { pass: false, hint: "You must use the print() function to display your name." };
        }
        if (!stdout || stdout.trim().length === 0) {
          return { pass: false, hint: "Nothing was printed. Make sure you placed text inside print(...)." };
        }
        return { pass: true, message: "Perfect! You used print() to display your name! 🎉" };
      }
    }
  },

  // --------------------------------------------------------------------------
  // TOPIC 4: Comments
  // --------------------------------------------------------------------------
  {
    id: 4,
    number: 4,
    title: "Comments",
    slug: "comments",
    shortDescription: "Notes in your code that Python completely ignores.",
    lesson: {
      easyDefinition: "Comments are notes written inside code for human readers. Python completely ignores them when running the program.",
      realLifeExample: {
        title: "Sticky Notes on a Recipe Book",
        analogy: "When following a cooking recipe, you might write a note in pencil in the margin:",
        steps: [
          "• 'Use low heat so the milk doesn't burn!'",
          "• The pencil note isn't an ingredient you eat—it's a helpful guide for whoever is cooking."
        ],
        takeaway: "In code, comments are your pencil notes in the margin for yourself and your teammates."
      },
      integratedExplanation: "In Python, any line starting with `#` is a single-line comment. You can use comments to explain tricky code, leave reminders, or temporarily disable a line of code during testing.",
      codeExample: `# This is a single-line comment
# Python ignores this completely!
print("Hello, World!")  # You can also add comments at the end of a line`,
      keyTakeaways: [
        "Start a comment with the # symbol.",
        "Python skips comments during execution; they have zero effect on program speed.",
        "Good programmers write comments to explain 'why' a piece of code exists."
      ]
    },
    questions: [
      {
        id: "t4_q1",
        type: "multiple_choice",
        tag: "Basic Understanding",
        prompt: "Which symbol is used to create a single-line comment in Python?",
        options: [
          "// (two slashes)",
          "# (hash or pound sign)",
          "/* (slash asterisk)",
          "-- (two hyphens)"
        ],
        correctIndex: 1,
        explanationCorrect: "Exactly! The hash symbol `#` tells Python to treat the rest of that line as a comment.",
        explanationIncorrect: "Python uses the `#` character for single-line comments (unlike Java/C++ which use `//`)."
      },
      {
        id: "t4_q2",
        type: "predict_output",
        tag: "Code Prediction",
        prompt: "What will be printed by this code?\n# print(\"Apple\")\nprint(\"Banana\")",
        options: [
          "Apple\nBanana",
          "Apple",
          "Banana",
          "Nothing at all"
        ],
        correctIndex: 2,
        explanationCorrect: "Correct! The line with `Apple` starts with `#`, so Python ignored it and only ran `print(\"Banana\")`.",
        explanationIncorrect: "Notice the `#` in front of Apple! That line is commented out and will not execute."
      },
      {
        id: "t4_q3",
        type: "scenario",
        tag: "Real-Life Application",
        prompt: "Why do professional software engineers write comments in their code?",
        options: [
          "To explain why complex logic was written so future developers can understand it",
          "Because code won't run unless every line has a comment",
          "To make the code file size artificially larger",
          "To translate the code into Latin"
        ],
        correctIndex: 0,
        explanationCorrect: "Spot on! Comments make code readable, maintainable, and understandable to other developers (and your future self!).",
        explanationIncorrect: "Comments exist to help humans understand the purpose and thought process behind the code."
      },
      {
        id: "t4_q4",
        type: "code_choice",
        tag: "Concept Identification",
        prompt: "Which line contains a valid inline comment in Python?",
        options: [
          "print(\"Score:\") // prints score",
          "print(\"Score:\") -- prints score",
          "print(\"Score:\") # prints score",
          "print(\"Score:\") /* prints score */"
        ],
        correctIndex: 2,
        explanationCorrect: "Great! `# prints score` placed after the statement is a valid inline comment.",
        explanationIncorrect: "Look for the `#` symbol: Python only recognizes `#` for single-line comments."
      },
      {
        id: "t4_q5",
        type: "challenging",
        tag: "Slightly Challenging",
        prompt: "What will this print?\nprint(\"# This is great\")",
        options: [
          "Nothing, because it starts with a hash",
          "# This is great",
          "Error",
          "This is great (without hash)"
        ],
        correctIndex: 1,
        explanationCorrect: "Aha! When `#` is inside quotation marks, it's just part of the text, not a comment!",
        explanationIncorrect: "Careful: the `#` is inside quotes `\"...\"`! That makes it regular text, so Python prints it."
      }
    ],
    codingChallenge: {
      id: "c4",
      title: "Write a Comment & Print Your Name",
      instruction: "Write a Python program that contains a comment starting with # and then prints your name.",
      hint: "Add a line like `# My name program` and then `print(\"Kishore\")`.",
      starterCode: `# Add your own comment and print your name below:
`,
      expectedConcept: "Comments (#) and print()",
      validate: (code, stdout) => {
        const hasComment = /#[^\n\r]+/.test(code);
        const hasPrint = /print\s*\(/.test(code);
        if (!hasComment) {
          return { pass: false, hint: "Make sure you include at least one comment starting with # in your code." };
        }
        if (!hasPrint || !stdout || stdout.trim().length === 0) {
          return { pass: false, hint: "Don't forget to print your name using print()." };
        }
        return { pass: true, message: "Awesome! You wrote a helpful comment and printed your name! 🎉" };
      }
    }
  },

  // --------------------------------------------------------------------------
  // TOPIC 5: Variables
  // --------------------------------------------------------------------------
  {
    id: 5,
    number: 5,
    title: "Variables",
    slug: "variables",
    shortDescription: "Labeled containers that store data for your program.",
    lesson: {
      easyDefinition: "A variable is like a labeled storage box that holds a piece of information so you can use or change it later.",
      realLifeExample: {
        title: "Labeled Jars in the Kitchen",
        analogy: "In your pantry, you have jars with labels on them: 'Sugar', 'Salt', 'Coffee'.",
        steps: [
          "• The label is the variable name (e.g. `spice_box`).",
          "• The content inside the jar is the value (e.g. `\"Pepper\"`).",
          "• Whenever you need pepper, you just look for the label `spice_box`."
        ],
        takeaway: "In Python, you give a box a name, put a value inside using `=`, and retrieve it anytime by referencing the name."
      },
      integratedExplanation: "To create a variable, type the name, followed by `=`, followed by the value: `name = \"Kishore\"`. Variable names should be descriptive, must not start with numbers, and usually use lowercase words separated by underscores (snake_case).",
      codeExample: `# Creating variables
name = "Kishore"
age = 17

# Using variables
print("Student name:", name)
print("Student age:", age)`,
      keyTakeaways: [
        "The = sign is the assignment operator (puts the value into the variable box).",
        "Variable names cannot start with numbers and cannot contain spaces.",
        "Variables can be reused and updated whenever needed."
      ]
    },
    questions: [
      {
        id: "t5_q1",
        type: "multiple_choice",
        tag: "Basic Understanding",
        prompt: "What does the '=' symbol mean when creating a variable like x = 10?",
        options: [
          "It tests whether x is mathematically equal to 10",
          "It assigns (stores) the value 10 into the variable named x",
          "It prints 10 onto the screen",
          "It creates an empty list"
        ],
        correctIndex: 1,
        explanationCorrect: "Exactly! In programming, `=` is the assignment operator. It places the value on the right into the variable on the left.",
        explanationIncorrect: "In Python, `=` assigns a value. (Checking mathematical equality uses `==`)."
      },
      {
        id: "t5_q2",
        type: "concept_id",
        tag: "Concept Identification",
        prompt: "Which of the following is a VALID Python variable name?",
        options: [
          "2nd_student (starts with a number)",
          "student name (contains a space)",
          "student_name (letters with underscore)",
          "class (reserved Python keyword)"
        ],
        correctIndex: 2,
        explanationCorrect: "Spot on! `student_name` uses lowercase letters and underscores, which is the standard Python snake_case convention.",
        explanationIncorrect: "Variable names cannot start with numbers, cannot have spaces, and cannot be reserved Python keywords."
      },
      {
        id: "t5_q3",
        type: "predict_output",
        tag: "Code Prediction",
        prompt: "What will this code print?\nscore = 10\nscore = 25\nprint(score)",
        options: [
          "10",
          "25",
          "10 25",
          "Error: cannot change variable"
        ],
        correctIndex: 1,
        explanationCorrect: "Great! Variables can vary! When you assign 25, it overwrites the previous value of 10.",
        explanationIncorrect: "Variables hold the most recent value assigned to them. Assigning 25 replaced the 10."
      },
      {
        id: "t5_q4",
        type: "scenario",
        tag: "Real-Life Application",
        prompt: "If a player collects a gold coin in a video game, how should the game update their coins?",
        options: [
          "coins = coins + 1",
          "print(coins)",
          "# coins + 1",
          "delete coins"
        ],
        correctIndex: 0,
        explanationCorrect: "Yes! `coins = coins + 1` takes the current count, adds 1, and stores the new total back into `coins`.",
        explanationIncorrect: "To update a variable, calculate the new value and assign it back to the variable with `=`."
      },
      {
        id: "t5_q5",
        type: "challenging",
        tag: "Slightly Challenging",
        prompt: "What is printed here?\nx = 5\ny = x\nx = 99\nprint(y)",
        options: [
          "99",
          "5",
          "Error",
          "x"
        ],
        correctIndex: 1,
        explanationCorrect: "Brilliant! When `y = x` ran, y received the value 5. Changing x to 99 later does not affect y!",
        explanationIncorrect: "When `y = x` was executed, y copied the value 5. Changing x afterwards does not change y."
      }
    ],
    codingChallenge: {
      id: "c5",
      title: "Store and Print a Variable",
      instruction: "Create a variable called name, store your name in it, and print the variable.",
      hint: "Write: name = \"Your Name\" and on the next line: print(name)",
      starterCode: `# Create variable 'name' and print it:
`,
      expectedConcept: "Variable assignment and print()",
      validate: (code, stdout, env) => {
        const hasAssign = /name\s*=/.test(code);
        const hasPrint = /print\s*\(\s*name\s*\)/.test(code) || /print\s*\(/.test(code);
        if (!hasAssign) {
          return { pass: false, hint: "Make sure you create a variable called `name` using the = operator (e.g. name = \"Alex\")." };
        }
        if (!hasPrint || !stdout || stdout.trim().length === 0) {
          return { pass: false, hint: "Print your variable using print(name)." };
        }
        return { pass: true, message: "Excellent! You created a variable and printed its stored value! 🎉" };
      }
    }
  },

  // --------------------------------------------------------------------------
  // TOPIC 6: Data Types
  // --------------------------------------------------------------------------
  {
    id: 6,
    number: 6,
    title: "Data Types",
    slug: "data-types",
    shortDescription: "Strings, Integers, Floats, and Booleans — the 4 fundamental types.",
    lesson: {
      easyDefinition: "Data types tell Python what kind of value a variable holds, so it knows what you can and cannot do with it.",
      realLifeExample: {
        title: "Sorting Items in Your Backpack",
        analogy: "You have different kinds of items in your student backpack:",
        steps: [
          "• Notebook with words → String (text)",
          "• Number of pens (3 pens) → Integer (whole number)",
          "• Price of a snack ($2.50) → Float (decimal number)",
          "• ID Card valid? (Yes/No) → Boolean (True/False)"
        ],
        takeaway: "You don't do math with words, and you don't read pens! Python similarly handles different types with different rules."
      },
      integratedExplanation: "The 4 beginner data types are:\n1. **str (String)**: Text inside quotes, e.g. \"Kishore\"\n2. **int (Integer)**: Whole numbers without decimals, e.g. 17 or -5\n3. **float (Floating point)**: Numbers with decimals, e.g. 5.8 or 3.14\n4. **bool (Boolean)**: Only two possible values: True or False (capitalized!)",
      codeExample: `# The 4 fundamental data types in Python:
name = "Kishore"        # str (String)
age = 17                # int (Integer)
height = 5.8            # float (Decimal)
is_student = True       # bool (Boolean: True or False)

print(name, age, height, is_student)`,
      keyTakeaways: [
        "String (str) represents text enclosed in quotes.",
        "Integer (int) is any positive or negative whole number.",
        "Float (float) is any number with a decimal point.",
        "Boolean (bool) is either True or False (must start with a capital letter)."
      ]
    },
    questions: [
      {
        id: "t6_q1",
        type: "multiple_choice",
        tag: "Basic Understanding",
        prompt: "What data type is the value 42 in Python?",
        options: [
          "int (Integer)",
          "float (Decimal)",
          "str (String)",
          "bool (Boolean)"
        ],
        correctIndex: 0,
        explanationCorrect: "Exactly! 42 is a whole number without decimals, so it is an integer (int).",
        explanationIncorrect: "Since 42 has no decimal point and is a whole number, it is an int."
      },
      {
        id: "t6_q2",
        type: "concept_id",
        tag: "Concept Identification",
        prompt: "Which of the following is a float data type?",
        options: [
          "\"99.5\"",
          "99.5",
          "99",
          "True"
        ],
        correctIndex: 1,
        explanationCorrect: "Spot on! 99.5 is a number with a decimal point, making it a float.",
        explanationIncorrect: "\"99.5\" is inside quotes (so it's a string). The actual decimal number 99.5 is the float."
      },
      {
        id: "t6_q3",
        type: "code_choice",
        tag: "Code Identification",
        prompt: "Which is a valid Boolean value in Python?",
        options: [
          "true (lowercase)",
          "\"True\" (in quotes)",
          "True (capital T, no quotes)",
          "YES"
        ],
        correctIndex: 2,
        explanationCorrect: "Correct! Python booleans must be capitalized: `True` or `False` without quotes.",
        explanationIncorrect: "In Python, booleans must have a capital first letter: `True` or `False`."
      },
      {
        id: "t6_q4",
        type: "predict_output",
        tag: "Code Prediction",
        prompt: "What data type is x in: x = \"100\"?",
        options: [
          "int (Integer)",
          "str (String)",
          "float",
          "bool"
        ],
        correctIndex: 1,
        explanationCorrect: "Spot on! Because 100 is wrapped in quotation marks, Python treats it as text (a String), not a number!",
        explanationIncorrect: "Notice the quotation marks! Anything inside `\"...\"` is always a string."
      },
      {
        id: "t6_q5",
        type: "challenging",
        tag: "Slightly Challenging",
        prompt: "What happens if you do: print(\"5\" + \"5\") versus print(5 + 5)?",
        options: [
          "Both print 10",
          "\"5\" + \"5\" prints \"55\" (combines text), while 5 + 5 prints 10 (adds numbers)",
          "Both print \"55\"",
          "An error occurs on both"
        ],
        correctIndex: 1,
        explanationCorrect: "Brilliant! Adding strings glues the letters together (\"55\"), whereas adding numbers does arithmetic (10)!",
        explanationIncorrect: "With strings, `+` joins text together (concatenation). With integers, `+` performs addition."
      }
    ],
    codingChallenge: {
      id: "c6",
      title: "Create the 4 Basic Data Types",
      instruction: "Create one variable for each of the four basic data types (string, integer, float, boolean) and print them.",
      hint: "Example:\ntext = \"Hello\"\ncount = 5\nprice = 9.99\nis_ready = True\nprint(text, count, price, is_ready)",
      starterCode: `# Create a string, integer, float, and boolean variable, then print them:
`,
      expectedConcept: "str, int, float, bool variables and print()",
      validate: (code, stdout, env) => {
        const hasString = /["'][^"']+["']/.test(code);
        const hasInt = /\b\d+\b/.test(code);
        const hasFloat = /\b\d+\.\d+\b/.test(code);
        const hasBool = /\b(True|False)\b/.test(code);
        const hasPrint = /print\s*\(/.test(code);

        if (!hasString) return { pass: false, hint: "Include a String variable wrapped in quotes (e.g. name = \"Python\")." };
        if (!hasFloat) return { pass: false, hint: "Include a Float variable with a decimal point (e.g. gpa = 3.8)." };
        if (!hasBool) return { pass: false, hint: "Include a Boolean variable: True or False (capitalized)." };
        if (!hasPrint || !stdout || stdout.trim().length === 0) {
          return { pass: false, hint: "Remember to print your variables so we can see them!" };
        }
        return { pass: true, message: "Superb! You demonstrated all 4 basic Python data types! 🎉" };
      }
    }
  },

  // --------------------------------------------------------------------------
  // TOPIC 7: type()
  // --------------------------------------------------------------------------
  {
    id: 7,
    number: 7,
    title: "type()",
    slug: "type-function",
    shortDescription: "Inspect the exact data type of any variable or value.",
    lesson: {
      easyDefinition: "The type() function checks and reveals what kind of data is stored inside a variable or value.",
      realLifeExample: {
        title: "Looking at the Nutrition / Fabric Label",
        analogy: "When you pick up a shirt, you look at the tag to see if it's 100% Cotton, Wool, or Polyester.",
        steps: [
          "• You can't always guess the material just by glancing at it.",
          "• Checking the label tells you the exact material so you know how to wash it."
        ],
        takeaway: "In Python, `type(variable)` checks the label on your data so you know what operations are safe to perform."
      },
      integratedExplanation: "To inspect a type, pass the variable inside `type()`. To see it on screen, wrap it in `print()`: `print(type(age))`. Python will display `<class 'int'>`, `<class 'str'>`, `<class 'float'>`, or `<class 'bool'>`.",
      codeExample: `# Inspecting data types using type()
age = 17
print(type(age))        # Displays: <class 'int'>

name = "Kishore"
print(type(name))       # Displays: <class 'str'>

gpa = 3.9
print(type(gpa))        # Displays: <class 'float'>`,
      keyTakeaways: [
        "Use type(data) to check what kind of value you have.",
        "Combine with print(): print(type(x)) to see the result on your screen.",
        "Python outputs <class 'int'>, <class 'str'>, etc."
      ]
    },
    questions: [
      {
        id: "t7_q1",
        type: "multiple_choice",
        tag: "Basic Understanding",
        prompt: "What does the type() function do in Python?",
        options: [
          "It writes words on a keyboard automatically",
          "It returns the data type of a given value or variable",
          "It converts numbers into letters",
          "It prints text in bold font"
        ],
        correctIndex: 1,
        explanationCorrect: "Exactly! type() inspects a value or variable and identifies its data type (like int, str, float).",
        explanationIncorrect: "The type() function is for inspecting the data type of whatever you pass inside its parentheses."
      },
      {
        id: "t7_q2",
        type: "predict_output",
        tag: "Code Prediction",
        prompt: "What will print(type(3.14)) display?",
        options: [
          "<class 'int'>",
          "<class 'float'>",
          "<class 'str'>",
          "3.14"
        ],
        correctIndex: 1,
        explanationCorrect: "Spot on! 3.14 has a decimal point, so its type is float.",
        explanationIncorrect: "3.14 has decimal digits, which corresponds to the float class in Python."
      },
      {
        id: "t7_q3",
        type: "predict_output",
        tag: "Output Prediction",
        prompt: "What will print(type(\"True\")) output?",
        options: [
          "<class 'bool'>",
          "<class 'str'>",
          "True",
          "Error"
        ],
        correctIndex: 1,
        explanationCorrect: "Clever catch! Because \"True\" is in quotation marks, it's a string (`str`), not a boolean!",
        explanationIncorrect: "Notice the quotation marks around \"True\"! Quotes make anything a `<class 'str'>`."
      },
      {
        id: "t7_q4",
        type: "scenario",
        tag: "Real-Life Application",
        prompt: "When is type() most helpful to a programmer?",
        options: [
          "When debugging an error where a variable holds unexpected text instead of a number",
          "When you want to shut down your computer",
          "When calculating compound interest",
          "When naming a new file"
        ],
        correctIndex: 0,
        explanationCorrect: "Great! Bugs frequently happen when we expect a number but have a string. type() helps diagnose this quickly.",
        explanationIncorrect: "type() is a debugging superpower for uncovering why an operation failed due to mismatched types."
      },
      {
        id: "t7_q5",
        type: "challenging",
        tag: "Slightly Challenging",
        prompt: "If you just write `type(50)` on a line without `print()`, what happens?",
        options: [
          "The computer crashes",
          "Python determines the type in memory, but nothing is displayed on the screen",
          "It prints 50 automatically",
          "SyntaxError"
        ],
        correctIndex: 1,
        explanationCorrect: "Spot on! `type()` returns the type value, but unless you use `print(type(50))`, it won't show on the console!",
        explanationIncorrect: "In a Python script, you must wrap `print(type(...))` to see the output on screen."
      }
    ],
    codingChallenge: {
      id: "c7",
      title: "Check Age Data Type",
      instruction: "Create a variable containing your age and use type() to check its data type.",
      hint: "Example:\nage = 17\nprint(type(age))",
      starterCode: `# Create a variable with your age and print its type:
`,
      expectedConcept: "type() and print()",
      validate: (code, stdout, env) => {
        const hasType = /type\s*\(/.test(code);
        const hasPrint = /print\s*\(/.test(code);
        if (!hasType) {
          return { pass: false, hint: "Make sure you call the type() function (e.g. type(age))." };
        }
        if (!hasPrint) {
          return { pass: false, hint: "Wrap your type() call in print() so the result displays on screen: print(type(age))." };
        }
        if (!stdout || !stdout.includes("class")) {
          return { pass: false, hint: "Make sure the output displays the class type, e.g. <class 'int'>." };
        }
        return { pass: true, message: "Great work! You inspected a variable's data type using type()! 🎉" };
      }
    }
  },

  // --------------------------------------------------------------------------
  // TOPIC 8: Type Conversion
  // --------------------------------------------------------------------------
  {
    id: 8,
    number: 8,
    title: "Type Conversion",
    slug: "type-conversion",
    shortDescription: "Converting values between int(), float(), str(), and bool().",
    lesson: {
      easyDefinition: "Type conversion (also called type casting) means changing a piece of data from one data type into another.",
      realLifeExample: {
        title: "Currency Exchange or Paper Ticket to Digital Pass",
        analogy: "You have a paper token that says '$20'.",
        steps: [
          "• You cannot swipe a paper token on a digital card reader.",
          "• You take it to the booth, and they convert your paper note into $20 digital credit.",
          "• It represents the same value, but now in a form the machine can process!"
        ],
        takeaway: "In Python, a string like \"20\" cannot be added to a number until you convert it with `int(\"20\")`."
      },
      integratedExplanation: "Python provides handy conversion functions:\n• `int()`: converts text or floats to integers, e.g. `int(\"17\")` → `17`\n• `float()`: converts integers or text to decimals, e.g. `float(20)` → `20.0`\n• `str()`: converts numbers to text, e.g. `str(100)` → `\"100\"`\n• `bool()`: converts values to `True` or `False`",
      codeExample: `# Converting text string to integer
age_text = "17"
age_num = int(age_text)
print(age_num + 1)      # Outputs 18!

# Converting integer to float
price = 20
price_float = float(price)
print(price_float)      # Outputs 20.0`,
      keyTakeaways: [
        "int() converts to whole numbers.",
        "float() converts to decimals.",
        "str() converts any value to a string of text.",
        "Conversion is essential when working with user input or formatted text."
      ]
    },
    questions: [
      {
        id: "t8_q1",
        type: "multiple_choice",
        tag: "Basic Understanding",
        prompt: "Why would you convert the string \"25\" into an integer using int(\"25\")?",
        options: [
          "So you can perform mathematical calculations like addition or multiplication with it",
          "To change the color of the text on screen",
          "To make the computer save the file to disk",
          "Because strings are deleted after 5 seconds"
        ],
        correctIndex: 0,
        explanationCorrect: "Exactly! You cannot do math with a string. Converting it to an `int` unlocks math operations.",
        explanationIncorrect: "Strings cannot be used in arithmetic operations like `+ 10`. Converting to `int` allows math."
      },
      {
        id: "t8_q2",
        type: "predict_output",
        tag: "Code Prediction",
        prompt: "What is the result of:\nprint(float(5))",
        options: [
          "5",
          "5.0",
          "\"5.0\"",
          "Error: cannot float an integer"
        ],
        correctIndex: 1,
        explanationCorrect: "Spot on! float(5) converts the integer 5 into a floating point decimal: 5.0.",
        explanationIncorrect: "float() adds a decimal place to whole numbers, turning 5 into 5.0."
      },
      {
        id: "t8_q3",
        type: "predict_output",
        tag: "Output Prediction",
        prompt: "What will this code print?\nx = int(3.9)\nprint(x)",
        options: [
          "4 (rounded up)",
          "3 (decimals cut off / truncated)",
          "3.9",
          "Error"
        ],
        correctIndex: 1,
        explanationCorrect: "Great observation! int() doesn't round; it simply cuts off (truncates) the decimal part, leaving 3.",
        explanationIncorrect: "In Python, int() simply drops the decimal fraction without rounding. 3.9 becomes 3."
      },
      {
        id: "t8_q4",
        type: "scenario",
        tag: "Real-Life Application",
        prompt: "You want to print: 'I scored ' + 100. Why does Python give a TypeError, and how do you fix it?",
        options: [
          "Python cannot add text and integers directly; fix with 'I scored ' + str(100)",
          "Python requires subtraction instead of addition",
          "You must rename your computer",
          "No error occurs"
        ],
        correctIndex: 0,
        explanationCorrect: "Brilliant! You cannot concatenate a string and an int. Converting with `str(100)` solves it perfectly!",
        explanationIncorrect: "Python doesn't allow `+` between strings and numbers directly. You must convert the number with `str()`."
      },
      {
        id: "t8_q5",
        type: "challenging",
        tag: "Slightly Challenging",
        prompt: "What happens if you run int(\"hello\")?",
        options: [
          "It converts the letters into zero (0)",
          "ValueError: invalid literal for int() with base 10",
          "It prints 'hello'",
          "It converts each letter to its alphabetical index"
        ],
        correctIndex: 1,
        explanationCorrect: "Spot on! Words containing non-numeric characters cannot be converted to integers, raising a ValueError.",
        explanationIncorrect: "Python cannot turn alphabetical words like 'hello' into numbers, so it throws a ValueError."
      }
    ],
    codingChallenge: {
      id: "c8",
      title: "Convert String to Integer",
      instruction: "Create a number stored as a string, convert it into an integer, and print the result.",
      hint: "Example:\nage_str = \"18\"\nage_int = int(age_str)\nprint(age_int)",
      starterCode: `# Store a number as a string, convert it with int(), and print it:
`,
      expectedConcept: "int() type conversion",
      validate: (code, stdout, env) => {
        const hasIntCall = /int\s*\(/.test(code);
        const hasPrint = /print\s*\(/.test(code);
        if (!hasIntCall) {
          return { pass: false, hint: "Make sure you use the int() function to convert your string value." };
        }
        if (!hasPrint || !stdout || stdout.trim().length === 0) {
          return { pass: false, hint: "Make sure you print the converted integer result." };
        }
        return { pass: true, message: "Awesome! You successfully performed type conversion using int()! 🎉" };
      }
    }
  },

  // --------------------------------------------------------------------------
  // TOPIC 9: User Input
  // --------------------------------------------------------------------------
  {
    id: 9,
    number: 9,
    title: "User Input",
    slug: "user-input",
    shortDescription: "Receiving information interactively from the user with input().",
    lesson: {
      easyDefinition: "The input() function pauses your program and waits for the user to type something on the keyboard and press Enter.",
      realLifeExample: {
        title: "Ordering Food at a Restaurant Counter",
        analogy: "When you walk up to a counter, the server asks: 'What would you like to order?'",
        steps: [
          "• The server pauses and listens.",
          "• You speak your order: 'A vegetable sandwich, please.'",
          "• The server notes your order down so the kitchen can prepare it."
        ],
        takeaway: "In Python, `input(\"What is your name?\")` asks a question, waits for you to type, and stores your answer in a variable."
      },
      integratedExplanation: "Crucial rule: `input()` ALWAYS returns whatever the user typed as a **String (text)**. If you need the user to enter a number (like their age or price), you must convert it using `int(input(...))` or `float(input(...))`!",
      codeExample: `# Asking for user's name
name = input("Enter your name: ")
print("Hello,", name)

# Asking for a number (requires type conversion!)
age_str = input("Enter your age: ")
age = int(age_str)
print("Next year you will be:", age + 1)`,
      keyTakeaways: [
        "input(\"prompt\") displays a prompt and waits for the user.",
        "input() ALWAYS returns a string (text).",
        "If you need numbers from user input, wrap it with int() or float()."
      ]
    },
    questions: [
      {
        id: "t9_q1",
        type: "multiple_choice",
        tag: "Basic Understanding",
        prompt: "What does input() do when Python reaches that line?",
        options: [
          "It prints an error and skips the program",
          "It pauses execution and waits for the user to type input and press Enter",
          "It saves the file automatically",
          "It opens a random website"
        ],
        correctIndex: 1,
        explanationCorrect: "Exactly! input() pauses the program until the user types something and presses Enter.",
        explanationIncorrect: "input() pauses execution and captures keyboard input from the user."
      },
      {
        id: "t9_q2",
        type: "concept_id",
        tag: "Concept Identification",
        prompt: "What data type does input() ALWAYS return by default?",
        options: [
          "Integer (int)",
          "Boolean (bool)",
          "String (str)",
          "Float (float)"
        ],
        correctIndex: 2,
        explanationCorrect: "Spot on! Even if the user types 42, input() gives you the string \"42\".",
        explanationIncorrect: "Remember this golden rule: input() always returns text (str), even if numbers are typed!"
      },
      {
        id: "t9_q3",
        type: "scenario",
        tag: "Real-Life Application",
        prompt: "A student writes: `age = input('Age: ')` and then `print(age + 5)`. What happens?",
        options: [
          "It adds 5 to the age smoothly",
          "TypeError: cannot concatenate 'str' and 'int'",
          "It subtracts 5",
          "It multiplies by 5"
        ],
        correctIndex: 1,
        explanationCorrect: "Correct! Because `age` is a string, Python cannot do `+ 5` arithmetic without converting with `int(age)` first.",
        explanationIncorrect: "input() returns a string! Trying to add an int (5) to a string triggers a TypeError."
      },
      {
        id: "t9_q4",
        type: "code_choice",
        tag: "Code Identification",
        prompt: "How do you ask for a number and immediately store it as an integer in one clean line?",
        options: [
          "age = int(input(\"Enter age: \"))",
          "age = input(int(\"Enter age: \"))",
          "age = str(input(\"Enter age: \"))",
          "age = input() -> int"
        ],
        correctIndex: 0,
        explanationCorrect: "Perfect! Wrapping `input(...)` inside `int(...)` immediately converts the user's text into an integer.",
        explanationIncorrect: "You wrap the whole `input()` call inside `int()`: `age = int(input(\"...\"))`."
      },
      {
        id: "t9_q5",
        type: "challenging",
        tag: "Slightly Challenging",
        prompt: "If a user enters 10 and 20 into:\na = input()\nb = input()\nprint(a + b)\nWhat is displayed?",
        options: [
          "30",
          "1020",
          "Error",
          "10 20"
        ],
        correctIndex: 1,
        explanationCorrect: "Aha! Because both are strings, \"10\" + \"20\" joins them into \"1020\"!",
        explanationIncorrect: "Since input() produces strings, `+` performs string concatenation: \"10\" + \"20\" = \"1020\"."
      }
    ],
    codingChallenge: {
      id: "c9",
      title: "Interactive Name Greeting",
      instruction: "Ask the user for their name using input() and then print their name.",
      hint: "Example:\nuser_name = input(\"Enter your name: \")\nprint(user_name)",
      starterCode: `# Ask for the user's name with input() and print it:
`,
      expectedConcept: "input() and print()",
      validate: (code, stdout, env) => {
        const hasInput = /input\s*\(/.test(code);
        const hasPrint = /print\s*\(/.test(code);
        if (!hasInput) {
          return { pass: false, hint: "You need to use input() to receive information from the user." };
        }
        if (!hasPrint || !stdout || stdout.trim().length === 0) {
          return { pass: false, hint: "Make sure you print the name you received from input()." };
        }
        return { pass: true, message: "Brilliant! You built an interactive program using input()! 🎉" };
      }
    }
  },

  // --------------------------------------------------------------------------
  // TOPIC 10: Operators
  // --------------------------------------------------------------------------
  {
    id: 10,
    number: 10,
    title: "Operators",
    slug: "operators",
    shortDescription: "Arithmetic, Assignment, Comparison, and Logical operators.",
    lesson: {
      easyDefinition: "Operators are special symbols in Python used to perform calculations, compare values, and make decisions.",
      realLifeExample: {
        title: "Calculator Buttons and Balance Checks",
        analogy: "Think of your desk calculator and bank account app:",
        steps: [
          "• Calculator symbols (+, -, *, /) do math calculations (Arithmetic).",
          "• Checking if account balance >= item price does a comparison (Comparison).",
          "• Card is active AND balance is enough does logic checking (Logical)."
        ],
        takeaway: "Operators are the building blocks of every calculation and decision in software."
      },
      integratedExplanation: "Beginner operator groups:\n1. **Arithmetic**: `+` (add), `-` (subtract), `*` (multiply), `/` (divide), `%` (remainder/modulus), `**` (exponent/power)\n2. **Assignment**: `=` (assign), `+=` (add and assign), `-=` (subtract and assign)\n3. **Comparison**: `==` (equal to), `!=` (not equal), `>`, `<`, `>=`, `<=`\n4. **Logical**: `and` (both true), `or` (at least one true), `not` (inverts true/false)",
      codeExample: `# 1. Arithmetic
print(10 + 3)    # 13
print(10 % 3)    # 1 (remainder)

# 2. Comparison (results in True or False)
score = 85
print(score >= 50)  # True

# 3. Logical
is_logged_in = True
has_permission = True
print(is_logged_in and has_permission)  # True`,
      keyTakeaways: [
        "Arithmetic operators (+, -, *, /, %, **) calculate numbers.",
        "Comparison operators (==, !=, >, <, >=, <=) always return True or False.",
        "Logical operators (and, or, not) combine multiple conditions."
      ]
    },
    questions: [
      {
        id: "t10_q1",
        type: "multiple_choice",
        tag: "Basic Understanding",
        prompt: "What is the difference between '=' and '==' in Python?",
        options: [
          "'=' assigns a value to a variable, while '==' checks if two values are equal",
          "They are identical and can be used interchangeably",
          "'==' is used for strings only",
          "'=' deletes a variable"
        ],
        correctIndex: 0,
        explanationCorrect: "Crucial concept! Single `=` stores a value; double `==` asks 'are these two things equal?'.",
        explanationIncorrect: "Single `=` assigns a value. Double `==` compares whether two expressions are equal."
      },
      {
        id: "t10_q2",
        type: "predict_output",
        tag: "Code Prediction",
        prompt: "What will this code print?\nprint(10 % 3)",
        options: [
          "3.33",
          "1",
          "3",
          "0"
        ],
        correctIndex: 1,
        explanationCorrect: "Great! % is the modulus operator. 10 divided by 3 is 3 with a remainder of 1.",
        explanationIncorrect: "% calculates the remainder: 10 divided by 3 leaves a remainder of 1."
      },
      {
        id: "t10_q3",
        type: "predict_output",
        tag: "Output Prediction",
        prompt: "What will this comparison print?\nprint(15 != 15)",
        options: [
          "True",
          "False",
          "None",
          "15"
        ],
        correctIndex: 1,
        explanationCorrect: "Spot on! `!=` means 'not equal'. Since 15 is equal to 15, asking if they are not equal returns False.",
        explanationIncorrect: "`!=` tests for inequality. Since 15 IS equal to 15, 15 != 15 evaluates to False."
      },
      {
        id: "t10_q4",
        type: "concept_id",
        tag: "Concept Identification",
        prompt: "What is the result of: True and False?",
        options: [
          "True",
          "False",
          "None",
          "SyntaxError"
        ],
        correctIndex: 1,
        explanationCorrect: "Correct! The `and` operator requires BOTH sides to be True. Since one side is False, the result is False.",
        explanationIncorrect: "With `and`, both conditions must be True. If either is False, the result is False."
      },
      {
        id: "t10_q5",
        type: "challenging",
        tag: "Slightly Challenging",
        prompt: "What does x += 5 do to a variable x?",
        options: [
          "It is shorthand for x = x + 5",
          "It compares x with 5",
          "It multiplies x by 5",
          "It resets x to 5"
        ],
        correctIndex: 0,
        explanationCorrect: "Spot on! `+=` is an augmented assignment operator: it adds 5 to x and stores the new sum back into x.",
        explanationIncorrect: "`+=` is a handy shortcut for `x = x + 5`."
      }
    ],
    codingChallenge: {
      id: "c10",
      title: "Perform Arithmetic Calculations",
      instruction: "Create two numbers and use arithmetic operators (such as +, -, *, /, or %) to perform calculations with them, then print the results.",
      hint: "Example:\na = 10\nb = 4\nprint(a + b)\nprint(a * b)",
      starterCode: `# Create two numbers and perform calculations:
`,
      expectedConcept: "Arithmetic operators (+, -, *, /, %, **)",
      validate: (code, stdout, env) => {
        const hasOperator = /[+\-*/%]/.test(code);
        const hasPrint = /print\s*\(/.test(code);
        if (!hasOperator) {
          return { pass: false, hint: "Make sure you use arithmetic operators like +, -, *, /, or % with your numbers." };
        }
        if (!hasPrint || !stdout || stdout.trim().length === 0) {
          return { pass: false, hint: "Print the results of your arithmetic calculations." };
        }
        return { pass: true, message: "Outstanding! You performed arithmetic calculations using Python operators! 🎉" };
      }
    }
  },

  // --------------------------------------------------------------------------
  // TOPIC 11: Strings
  // --------------------------------------------------------------------------
  {
    id: 11,
    number: 11,
    title: "Strings",
    slug: "strings",
    shortDescription: "Working with text, combining strings, indexing, and slicing.",
    lesson: {
      easyDefinition: "A string is an ordered sequence of characters (letters, numbers, spaces, symbols) enclosed inside quotation marks.",
      realLifeExample: {
        title: "Beads on a Named Necklace",
        analogy: "Imagine a necklace with letter beads spelling 'K I S H O R E':",
        steps: [
          "• The entire necklace is the String.",
          "• Each bead has a position number (index), starting from 0: bead 0 is 'K', bead 1 is 'I'.",
          "• You can snap two necklaces together with a clasp (combining text with `+`)."
        ],
        takeaway: "In Python, strings are ordered character sequences you can join, slice, and transform."
      },
      integratedExplanation: "You can create strings with single `'` or double `\"` quotes. You can combine them using `+` (concatenation). Python indices start at **0**: in `name = \"Python\"`, `name[0]` is `'P'`. You can slice portions using `[start:end]` and check the length using `len()`!",
      codeExample: `# Creating and combining strings
name = "Kishore"
greeting = "Hello, " + name
print(greeting)

# Basic Indexing (starts at 0!)
word = "Python"
print(word[0])       # Displays 'P'

# String length
print(len(word))     # Displays 6`,
      keyTakeaways: [
        "Strings are created with quotes: 'text' or \"text\".",
        "Use + to combine (concatenate) strings.",
        "Indexing starts at 0: word[0] is the first character.",
        "len(text) gives the total count of characters in a string."
      ]
    },
    questions: [
      {
        id: "t11_q1",
        type: "multiple_choice",
        tag: "Basic Understanding",
        prompt: "What is 'string concatenation' in Python?",
        options: [
          "Joining two or more strings together end-to-end using the + operator",
          "Deleting spaces from text",
          "Translating text to uppercase",
          "Converting letters to numbers"
        ],
        correctIndex: 0,
        explanationCorrect: "Exactly! Concatenation means chaining strings together with `+`, like `\"Py\" + \"thon\"` -> `\"Python\"`.",
        explanationIncorrect: "Concatenation is the process of joining strings together using `+`."
      },
      {
        id: "t11_q2",
        type: "predict_output",
        tag: "Code Prediction",
        prompt: "What is the index of the very first character in a Python string?",
        options: [
          "1",
          "0",
          "-1",
          "Any number you choose"
        ],
        correctIndex: 1,
        explanationCorrect: "Spot on! In Python (and most programming languages), zero-based indexing is used, so the first item is at index 0.",
        explanationIncorrect: "Python uses 0-based indexing: the first character is always at index 0."
      },
      {
        id: "t11_q3",
        type: "predict_output",
        tag: "Output Prediction",
        prompt: "What will this code print?\nmsg = \"Code\"\nprint(msg[1])",
        options: [
          "C",
          "o",
          "d",
          "e"
        ],
        correctIndex: 1,
        explanationCorrect: "Great! Index 0 is 'C', index 1 is 'o', index 2 is 'd', index 3 is 'e'.",
        explanationIncorrect: "Remember index 0 is 'C'! So index 1 is the second letter: 'o'."
      },
      {
        id: "t11_q4",
        type: "concept_id",
        tag: "Concept Identification",
        prompt: "What does len(\"Python\") return?",
        options: [
          "5",
          "6",
          "7",
          "\"Python\""
        ],
        correctIndex: 1,
        explanationCorrect: "Correct! The word \"Python\" contains 6 characters (P-y-t-h-o-n), so len() returns 6.",
        explanationIncorrect: "Count the letters: P, y, t, h, o, n. There are 6 characters."
      },
      {
        id: "t11_q5",
        type: "challenging",
        tag: "Slightly Challenging",
        prompt: "What will print(\"Python\"[0:3]) display?",
        options: [
          "Pyt (index 0, 1, and 2 up to but not including 3)",
          "Pyth",
          "Python",
          "ytho"
        ],
        correctIndex: 0,
        explanationCorrect: "Brilliant! Slicing [0:3] starts at index 0 and stops just before index 3, yielding 'Pyt'!",
        explanationIncorrect: "Python slices `[start:stop]` include the start index but exclude the stop index. [0:3] gives 'Pyt'."
      }
    ],
    codingChallenge: {
      id: "c11",
      title: "Name Sentence with Strings",
      instruction: "Create a variable containing your name and use it to print a short sentence.",
      hint: "Example:\nname = \"Kishore\"\nprint(name + \" is learning Python!\")",
      starterCode: `# Create a variable with your name and print a short sentence:
`,
      expectedConcept: "Strings, variables, and concatenation (+)",
      validate: (code, stdout, env) => {
        const hasQuotes = /["'][^"']+["']/.test(code);
        const hasPrint = /print\s*\(/.test(code);
        if (!hasQuotes) {
          return { pass: false, hint: "Make sure you store your name in quotes as a string." };
        }
        if (!hasPrint || !stdout || stdout.trim().length === 0) {
          return { pass: false, hint: "Print your short sentence containing your name!" };
        }
        return { pass: true, message: "Incredible! You mastered Strings and completed Phase 1! 🎉🎓" };
      }
    }
  }
];
