/**
 * PythonQuest  -  Chapter 2: Making Decisions
 * 10 Topics + 3 Mini Projects  (IDs 12-21)
 */

export const CHAPTER2_METADATA = {
  id: "making-decisions",
  title: "Making Decisions",
  chapter: 2,
  totalTopics: 10,
};

export const CHAPTER2_TOPICS = [

  // ── 12: What are Conditional Statements? ──────────────────────────────────
  {
    id: 12, number: 1, chapterNumber: 2,
    title: "What are Conditional Statements?",
    slug: "what-are-conditional-statements",
    shortDescription: "Making your program choose different paths based on conditions.",
    lesson: {
      easyDefinition: "A conditional statement lets your program make decisions  -  it checks whether something is true or false and then follows the appropriate path.",
      realLifeExample: {
        title: "A Traffic Light",
        analogy: "Think of a traffic light at a junction:",
        steps: ["* GREEN  -  cars move forward.", "* RED  -  cars must stop.", "* YELLOW  -  cars slow down."],
        takeaway: "A conditional checks a condition, and based on the result (True or False), it takes a specific action."
      },
      integratedExplanation: "In real life we make decisions constantly: 'If it is raining, take an umbrella.' Python replicates this using conditional statements  -  the condition evaluates to True or False and the matching code block runs.",
      codeExample: "# Basic decision concept\nraining = True\n\nif raining:\n    print(\"Take an umbrella!\")",
      keyTakeaways: [
        "Conditional statements let programs make decisions.",
        "Every condition evaluates to either True or False (Boolean).",
        "This is what makes programs dynamic and interactive.",
      ]
    },
    questions: [
      { id: "t12_q1", type: "multiple_choice", tag: "Basic Understanding",
        prompt: "What is the primary purpose of a conditional statement in Python?",
        options: ["To allow the program to make decisions based on whether a condition is True or False","To repeat a block of code 10 times automatically","To delete variables from memory","To import external libraries"],
        correctIndex: 0,
        explanationCorrect: "Exactly! Conditional statements give programs the power to make decisions based on True/False conditions.",
        explanationIncorrect: "Think about traffic lights: a conditional decides which path to take based on a True/False condition." },
      { id: "t12_q2", type: "scenario", tag: "Real-Life Application",
        prompt: "A bank ATM should only dispense money if the entered PIN is correct. Which concept handles this?",
        options: ["A loop that repeats forever","A conditional statement that checks if the PIN is correct before allowing access","A print() that always shows the balance","A variable that stores the amount"],
        correctIndex: 1,
        explanationCorrect: "Spot on! The ATM uses a conditional: if PIN correct, allow access, else deny access.",
        explanationIncorrect: "The ATM needs to CHECK a condition and make a decision  -  that is exactly what conditional statements do." },
      { id: "t12_q3", type: "true_false", tag: "Concept Identification",
        prompt: "True or False: A condition in Python always evaluates to one of two values  -  True or False.",
        options: ["True  -  conditions always result in a Boolean: True or False","False  -  conditions can result in many different types of values"],
        correctIndex: 0,
        explanationCorrect: "Correct! Conditions are Boolean expressions  -  they always resolve to exactly True or False.",
        explanationIncorrect: "Conditions are Boolean expressions. No matter how complex, a condition always resolves to True or False." },
      { id: "t12_q4", type: "predict_output", tag: "Code Prediction",
        prompt: "What will this code print?\n\nis_logged_in = True\nif is_logged_in:\n    print(\"Welcome back!\")",
        options: ["Nothing  -  the condition is not written correctly","Welcome back!","is_logged_in","True"],
        correctIndex: 1,
        explanationCorrect: "Correct! is_logged_in is True so the if block runs and prints 'Welcome back!'.",
        explanationIncorrect: "Since is_logged_in = True the condition passes and the indented block executes." },
      { id: "t12_q5", type: "challenging", tag: "Slightly Challenging",
        prompt: "Without conditional statements, what would happen to a program that is supposed to react differently to different inputs?",
        options: ["It would crash immediately on startup","It would behave the same way regardless of input  -  it cannot make any decisions","It would automatically learn from input using AI","It would run much faster"],
        correctIndex: 1,
        explanationCorrect: "Brilliant! Without conditionals, programs always do the same thing regardless of any input or state.",
        explanationIncorrect: "Conditionals are the branching mechanism. Without them every execution follows the exact same path." }
    ],
    codingChallenge: {
      id: "c12", title: "Your First Decision",
      instruction: "Create a variable called is_sunny set to True. Use an if statement to print 'Time to go outside!' if it is sunny.",
      hint: "is_sunny = True\nif is_sunny:\n    print('Time to go outside!')",
      starterCode: "# Make a decision based on the weather\n",
      expectedConcept: "if statement with Boolean",
      validate: (code, stdout) => {
        if (!/\bif\b/.test(code)) return { pass: false, hint: "Use an if statement to make a decision!" };
        if (!/print\s*\(/.test(code) || !stdout || !stdout.trim()) return { pass: false, hint: "Make sure your if block contains a print() statement." };
        return { pass: true, message: "Great start! You wrote your very first conditional statement! 🎉" };
      }
    }
  },

  // ── 13: Comparison Operators ──────────────────────────────────────────────
  {
    id: 13, number: 2, chapterNumber: 2,
    title: "Comparison Operators",
    slug: "comparison-operators",
    shortDescription: "Comparing values using ==, !=, <, >, <=, >= to get True or False.",
    lesson: {
      easyDefinition: "Comparison operators compare two values and return either True or False. They are the building blocks of all conditions.",
      realLifeExample: {
        title: "Exam Results",
        analogy: "When your teacher checks if a student passed the exam:",
        steps: ["* Is the score >= 50? If yes  -  Pass. If no  -  Fail.", "* Is the score == 100? If yes  -  Full marks!"],
        takeaway: "Comparison operators let Python ask questions like 'Is A greater than B?' and get a clear True or False answer."
      },
      integratedExplanation: "Python has six comparison operators:\n* == (equal to)\n* != (not equal to)\n* >  (greater than)\n* <  (less than)\n* >= (greater than or equal to)\n* <= (less than or equal to)\n\nImportant: == checks equality. = assigns a value. Do not confuse them!",
      codeExample: "score = 75\n\nprint(score >= 50)   # True\nprint(score == 100)  # False\nprint(score != 50)   # True\nprint(score < 40)    # False",
      keyTakeaways: [
        "== checks if two values are equal (not the same as =).",
        "!= checks if two values are NOT equal.",
        "> and < check which value is larger or smaller.",
        ">= and <= include the boundary value in the comparison.",
      ]
    },
    questions: [
      { id: "t13_q1", type: "multiple_choice", tag: "Basic Understanding",
        prompt: "What does the == operator do in Python?",
        options: ["Assigns a value to a variable","Checks whether two values are equal and returns True or False","Multiplies two numbers together","Prints a value to the screen"],
        correctIndex: 1,
        explanationCorrect: "Correct! == compares two values and evaluates to True if they are equal, False otherwise.",
        explanationIncorrect: "== is the equality comparison operator. A single = is used for assignment. These are very different!" },
      { id: "t13_q2", type: "predict_output", tag: "Code Prediction",
        prompt: "What does this print?\n\nage = 18\nprint(age >= 18)",
        options: ["False","18","True","age"],
        correctIndex: 2,
        explanationCorrect: "Exactly right! 18 >= 18 is True because >= includes the equal case.",
        explanationIncorrect: ">= means 'greater than OR equal to'. Since age is exactly 18 the result is True." },
      { id: "t13_q3", type: "scenario", tag: "Real-Life Application",
        prompt: "A shop gives a discount if a customer buys more than 5 items. Which operator should be used?",
        options: ["items == 5","items <= 5","items > 5","items != 5"],
        correctIndex: 2,
        explanationCorrect: "Correct! items > 5 checks if the quantity is strictly more than 5.",
        explanationIncorrect: "The condition is 'more than 5'  -  strictly greater than. Use > 5." },
      { id: "t13_q4", type: "concept_id", tag: "Concept Identification",
        prompt: "What is the difference between = and == in Python?",
        options: ["There is no difference","= assigns a value to a variable; == compares two values for equality","== assigns; = compares","Both are used for printing"],
        correctIndex: 1,
        explanationCorrect: "Perfect! = assigns (name = 'Alex'), == compares (name == 'Alex' gives True or False).",
        explanationIncorrect: "= assigns values, == tests equality  -  one of the most important distinctions in Python." },
      { id: "t13_q5", type: "challenging", tag: "Slightly Challenging",
        prompt: "What will print(10 != 10) output?",
        options: ["True","False","10","Error"],
        correctIndex: 1,
        explanationCorrect: "Brilliant! 10 != 10 asks 'Is 10 not equal to 10?'  -  False, since they ARE equal.",
        explanationIncorrect: "!= means 'not equal to'. Since 10 and 10 ARE equal, 10 != 10 is False." }
    ],
    codingChallenge: {
      id: "c13", title: "Comparison Lab",
      instruction: "Create two variables: your_score = 82 and pass_mark = 50. Print whether your_score is greater than or equal to pass_mark.",
      hint: "your_score = 82\npass_mark = 50\nprint(your_score >= pass_mark)",
      starterCode: "# Create two variables and compare them\n",
      expectedConcept: "Comparison operators",
      validate: (code, stdout) => {
        if (!/[><=!]=?/.test(code)) return { pass: false, hint: "Use a comparison operator like >=, >, ==, etc." };
        if (!/print\s*\(/.test(code) || !stdout || !stdout.trim()) return { pass: false, hint: "Print the result of your comparison!" };
        return { pass: true, message: "Excellent! You have mastered comparison operators! 🎯" };
      }
    }
  },

  // ── 14: if Statement ──────────────────────────────────────────────────────
  {
    id: 14, number: 3, chapterNumber: 2,
    title: "if Statement",
    slug: "if-statement",
    shortDescription: "Running a block of code only when a condition is True.",
    lesson: {
      easyDefinition: "The if statement runs a block of code only when its condition is True. If False, Python skips that block entirely.",
      realLifeExample: {
        title: "Hotel Room Door",
        analogy: "Imagine a hotel room with a key-card lock:",
        steps: ["* If the key card is valid  -  the door opens.", "* If the key card is invalid  -  the door stays locked."],
        takeaway: "The if statement works exactly the same way  -  it runs the indented code block only when the condition is True."
      },
      integratedExplanation: "Syntax:\n  if condition:\n      code to run\n\nThe colon (:) after the condition is essential. The code block inside must be indented (4 spaces or 1 Tab).",
      codeExample: "temperature = 38\n\nif temperature > 37:\n    print(\"You have a fever. Rest and drink water.\")\n\nprint(\"This line always runs.\")",
      keyTakeaways: [
        "if checks a condition; only runs its block when True.",
        "The colon : after the condition is mandatory.",
        "The code block inside must be indented (4 spaces).",
        "If False, the if block is completely skipped.",
      ]
    },
    questions: [
      { id: "t14_q1", type: "multiple_choice", tag: "Basic Understanding",
        prompt: "What happens when the condition in an if statement is False?",
        options: ["Python raises an error","The indented code block is skipped entirely","Python runs the block twice","The program crashes"],
        correctIndex: 1,
        explanationCorrect: "Exactly! When the condition is False, Python simply skips the indented block and continues.",
        explanationIncorrect: "When a condition is False, Python skips the if block  -  no error, just continues." },
      { id: "t14_q2", type: "predict_output", tag: "Code Prediction",
        prompt: "What does this code print?\n\nmarks = 45\nif marks >= 50:\n    print('Passed!')\nprint('Done')",
        options: ["Passed!\nDone","Done","Passed!","Nothing"],
        correctIndex: 1,
        explanationCorrect: "Correct! marks = 45 is NOT >= 50 so 'Passed!' is skipped. 'Done' is outside the if so it always prints.",
        explanationIncorrect: "45 >= 50 is False so the if block is skipped. 'Done' is not indented so it always runs." },
      { id: "t14_q3", type: "concept_id", tag: "Concept Identification",
        prompt: "What is the correct syntax for an if statement in Python?",
        options: ["if (condition) { code }","if condition: then indented code","if condition then code end","check condition: code"],
        correctIndex: 1,
        explanationCorrect: "Perfect! Python uses 'if condition:' followed by an indented block  -  no curly braces.",
        explanationIncorrect: "Python syntax: 'if condition:'  -  colon required, code block must be indented." },
      { id: "t14_q4", type: "scenario", tag: "Real-Life Application",
        prompt: "You want to print 'Access Granted' only when is_admin is True. Which is correct?",
        options: ["if is_admin = True: print('Access Granted')","if is_admin: then print('Access Granted')","if is_admin:\\n    print('Access Granted')","is_admin if: print('Access Granted')"],
        correctIndex: 2,
        explanationCorrect: "Spot on! 'if is_admin:' is clean Python  -  you do not need '== True' since is_admin IS a Boolean.",
        explanationIncorrect: "The correct Python way: 'if is_admin:'  -  use = only for assignment and : ends the condition." },
      { id: "t14_q5", type: "challenging", tag: "Slightly Challenging",
        prompt: "Why does Python use indentation instead of curly braces {} to define if blocks?",
        options: ["To make code harder to read","Python uses indentation to enforce readable, consistently formatted code structure","Indentation is optional","It is a bug never fixed"],
        correctIndex: 1,
        explanationCorrect: "Brilliant! Python's creator designed indentation as a core feature to force clean, readable code.",
        explanationIncorrect: "Python enforces indentation on purpose  -  it replaces curly braces and makes code reflect its logical structure." }
    ],
    codingChallenge: {
      id: "c14", title: "Speed Check",
      instruction: "Create a variable speed = 90. Use an if statement to print 'Speeding! Slow down.' if speed is greater than 80.",
      hint: "speed = 90\nif speed > 80:\n    print('Speeding! Slow down.')",
      starterCode: "# Speed limit checker\n",
      expectedConcept: "if statement",
      validate: (code, stdout) => {
        if (!/\bif\b/.test(code)) return { pass: false, hint: "Use an if statement with a condition." };
        if (!/print\s*\(/.test(code) || !stdout || !stdout.trim()) return { pass: false, hint: "Make sure your condition is True so the print() runs!" };
        return { pass: true, message: "Great work! Your if statement is working perfectly! 🚗" };
      }
    }
  },

  // ── 15: else Statement ────────────────────────────────────────────────────
  {
    id: 15, number: 4, chapterNumber: 2,
    title: "else Statement",
    slug: "else-statement",
    shortDescription: "Providing an alternative path when the if condition is False.",
    lesson: {
      easyDefinition: "The else statement provides an alternative block that runs when the if condition is False  -  it is the 'otherwise' option.",
      realLifeExample: {
        title: "Exam Pass or Fail",
        analogy: "After an exam the result system checks:",
        steps: ["* If marks >= 50  -  print 'Congratulations, you passed!'", "* Else (otherwise)  -  print 'You did not pass. Try again next time.'"],
        takeaway: "The else block guarantees something always happens  -  either if (True) or else (False). One ALWAYS executes."
      },
      integratedExplanation: "else always pairs with an if. It has NO condition of its own.\n\nSyntax:\n  if condition:\n      code when True\n  else:\n      code when False\n\nelse must be at the same indentation level as if.",
      codeExample: "password = \"hello123\"\n\nif password == \"secure@456\":\n    print(\"Login successful!\")\nelse:\n    print(\"Incorrect password. Access denied.\")",
      keyTakeaways: [
        "else provides the alternative path when if is False.",
        "else has no condition  -  it catches everything the if missed.",
        "Exactly one of the two blocks always runs.",
        "else must be at the same indentation level as its if.",
      ]
    },
    questions: [
      { id: "t15_q1", type: "multiple_choice", tag: "Basic Understanding",
        prompt: "When does the else block execute?",
        options: ["When the if condition is True","When the if condition is False","Always, regardless of the if condition","Only when the program has a syntax error"],
        correctIndex: 1,
        explanationCorrect: "Correct! The else block runs when the if condition evaluates to False.",
        explanationIncorrect: "else is the 'otherwise' path  -  it runs only when the if condition is False." },
      { id: "t15_q2", type: "predict_output", tag: "Code Prediction",
        prompt: "What does this print?\n\nage = 16\nif age >= 18:\n    print('Adult')\nelse:\n    print('Minor')",
        options: ["Adult","Minor","Adult\nMinor","Nothing"],
        correctIndex: 1,
        explanationCorrect: "Exactly right! age = 16 is NOT >= 18 so the if block skips and else prints 'Minor'.",
        explanationIncorrect: "16 >= 18 is False so the if block skips and else takes over, printing 'Minor'." },
      { id: "t15_q3", type: "true_false", tag: "Concept Identification",
        prompt: "True or False: Both the if block AND the else block can run for the same condition at the same time.",
        options: ["False  -  only one of them runs: if when True, else when False","True  -  both blocks always execute"],
        correctIndex: 0,
        explanationCorrect: "Correct! if and else are mutually exclusive  -  exactly one runs, never both.",
        explanationIncorrect: "if and else are mutually exclusive. A condition is either True OR False  -  never both." },
      { id: "t15_q4", type: "scenario", tag: "Real-Life Application",
        prompt: "A ticket booking system: if seats > 0 print 'Seats available', otherwise print 'Sold out'. Which structure is correct?",
        options: ["Two separate if statements","if seats > 0: indent print 'Seats available', else: indent print 'Sold out'","print('Seats available') or print('Sold out')","if seats: else: print('Sold out')"],
        correctIndex: 1,
        explanationCorrect: "Perfect! if/else is the right structure  -  one prints when True, the other when False.",
        explanationIncorrect: "Use if...else: the if block for seats > 0 and else for when there are no seats." },
      { id: "t15_q5", type: "challenging", tag: "Slightly Challenging",
        prompt: "What does else need as its own condition?",
        options: ["else needs its own condition like else > 10:","else needs no condition  -  it automatically handles all cases the if did not match","else needs a Boolean variable","else requires a comparison operator"],
        correctIndex: 1,
        explanationCorrect: "Brilliant! else has no condition  -  it is a catch-all for everything the if returned False for.",
        explanationIncorrect: "else has NO condition. It simply runs for everything the if condition returned False for." }
    ],
    codingChallenge: {
      id: "c15", title: "Pass or Fail",
      instruction: "Create a variable score = 72. Print 'Passed!' if score >= 50, otherwise print 'Failed  -  keep practising!'",
      hint: "score = 72\nif score >= 50:\n    print('Passed!')\nelse:\n    print('Failed  -  keep practising!')",
      starterCode: "# Pass or fail checker\n",
      expectedConcept: "if...else",
      validate: (code, stdout) => {
        if (!/\bif\b/.test(code)) return { pass: false, hint: "Use an if statement!" };
        if (!/\belse\b/.test(code)) return { pass: false, hint: "Add an else block for when the condition is False." };
        if (!/print\s*\(/.test(code) || !stdout || !stdout.trim()) return { pass: false, hint: "Make sure a print() runs inside one of your blocks." };
        return { pass: true, message: "Superb! You have learned the if...else structure! 🏆" };
      }
    }
  },

  // ── 16: elif Statement ────────────────────────────────────────────────────
  {
    id: 16, number: 5, chapterNumber: 2,
    title: "elif Statement",
    slug: "elif-statement",
    shortDescription: "Checking multiple conditions in sequence with elif chains.",
    lesson: {
      easyDefinition: "elif (short for 'else if') lets you check additional conditions after the first if. Used when there are more than two possible outcomes.",
      realLifeExample: {
        title: "Weather Clothing Guide",
        analogy: "When deciding what to wear based on temperature:",
        steps: ["* If temp > 35  -  Wear light clothes.", "* Elif temp > 20  -  A normal outfit.", "* Elif temp > 10  -  Wear a light jacket.", "* Else  -  Wear a heavy coat!"],
        takeaway: "elif lets you handle multiple specific cases in order, only running the first matching condition."
      },
      integratedExplanation: "elif is placed between if and else. Python checks each condition top-to-bottom and runs only the FIRST matching block.\n\nSyntax:\n  if condition1:\n      ...\n  elif condition2:\n      ...\n  else:\n      ...",
      codeExample: "grade = 78\n\nif grade >= 90:\n    print(\"Grade: A\")\nelif grade >= 75:\n    print(\"Grade: B\")\nelif grade >= 60:\n    print(\"Grade: C\")\nelse:\n    print(\"Grade: F\")",
      keyTakeaways: [
        "elif adds extra conditions between if and else.",
        "Python checks top-to-bottom and stops at the first True match.",
        "Only ONE block runs  -  the first matching condition.",
        "You can have as many elif blocks as needed.",
      ]
    },
    questions: [
      { id: "t16_q1", type: "multiple_choice", tag: "Basic Understanding",
        prompt: "What does 'elif' stand for in Python?",
        options: ["else loop if","else if","end loop if","evaluate if"],
        correctIndex: 1,
        explanationCorrect: "Correct! elif is a contraction of 'else if'.",
        explanationIncorrect: "elif literally means 'else if'  -  an additional check when the previous condition was False." },
      { id: "t16_q2", type: "predict_output", tag: "Code Prediction",
        prompt: "What does this print?\n\nscore = 82\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelif score >= 70:\n    print('C')\nelse:\n    print('F')",
        options: ["A","B","C","B\nC"],
        correctIndex: 1,
        explanationCorrect: "Exactly! score = 82. >= 90 is False. >= 80 is True  -  prints 'B' and skips the rest.",
        explanationIncorrect: "Python stops at the first True condition. 82 >= 80 is True  -  prints 'B' and exits." },
      { id: "t16_q3", type: "true_false", tag: "Concept Identification",
        prompt: "True or False: In an if-elif-else chain, multiple elif blocks can execute simultaneously if their conditions are all True.",
        options: ["False  -  only the FIRST matching condition's block runs; the rest are skipped","True  -  all matching blocks execute"],
        correctIndex: 0,
        explanationCorrect: "Correct! Python executes only the first matching block then exits the entire chain.",
        explanationIncorrect: "Python stops at the FIRST True condition. Even if later conditions would also be True, they are never reached." },
      { id: "t16_q4", type: "scenario", tag: "Real-Life Application",
        prompt: "A streaming service: Basic plan if price < 200, Standard if price < 400, Premium otherwise. Which structure is best?",
        options: ["Three separate if statements","An if-elif-else chain","Three print() statements","A single if with all conditions"],
        correctIndex: 1,
        explanationCorrect: "Perfect! if-elif-else checks each tier in order and only one plan is selected.",
        explanationIncorrect: "if-elif-else: checks tiers in order, picks the first match, guarantees only one plan is selected." },
      { id: "t16_q5", type: "challenging", tag: "Slightly Challenging",
        prompt: "What is the difference between using three separate if statements versus an if-elif-else chain?",
        options: ["There is no difference","Three separate ifs all check independently (multiple can run); elif-else stops at the first True match","elif is faster than if","Three ifs cannot have an else"],
        correctIndex: 1,
        explanationCorrect: "Brilliant! Three separate ifs are independent. elif-else stops at the first True branch.",
        explanationIncorrect: "With three separate ifs each is checked independently. With elif only the first True condition runs." }
    ],
    codingChallenge: {
      id: "c16", title: "Temperature Advisor",
      instruction: "Write a temperature advisor: if temp > 35 print 'Very hot!'. elif temp > 20 print 'Warm and pleasant.'. else print 'It is cold, wear a jacket!'",
      hint: "temp = 28\nif temp > 35:\n    print('Very hot!')\nelif temp > 20:\n    print('Warm and pleasant.')\nelse:\n    print('It is cold, wear a jacket!')",
      starterCode: "# Set a temperature and give clothing advice\ntemp = 28\n",
      expectedConcept: "if-elif-else",
      validate: (code, stdout) => {
        if (!/\bif\b/.test(code)) return { pass: false, hint: "Start with an if statement." };
        if (!/\belif\b/.test(code)) return { pass: false, hint: "Add at least one elif block." };
        if (!/\belse\b/.test(code)) return { pass: false, hint: "Add an else block as the final fallback." };
        if (!stdout || !stdout.trim()) return { pass: false, hint: "Make sure a print() runs." };
        return { pass: true, message: "Excellent! You have mastered the if-elif-else chain! ⛅" };
      }
    }
  },

  // ── 17: Multiple Conditions ───────────────────────────────────────────────
  {
    id: 17, number: 6, chapterNumber: 2,
    title: "Multiple Conditions",
    slug: "multiple-conditions",
    shortDescription: "Combining conditions using and, or, not for powerful decisions.",
    lesson: {
      easyDefinition: "You can combine multiple conditions into one using 'and', 'or', and 'not'  -  check more than one thing at the same time.",
      realLifeExample: {
        title: "School Trip Eligibility",
        analogy: "A student is eligible for the school trip if:",
        steps: ["* Attendance >= 80% AND fees_paid == True  -  Eligible", "* If only one is met  -  Not eligible", "* Or: eligible if sports_captain OR top_student  -  special allowance"],
        takeaway: "'and' requires ALL conditions to be True. 'or' requires at least ONE. 'not' flips a condition."
      },
      integratedExplanation: "Logical operators:\n* and: True only if BOTH sides are True\n* or:  True if AT LEAST ONE side is True\n* not: Reverses the Boolean",
      codeExample: "age = 20\nhas_id = True\n\nif age >= 18 and has_id:\n    print(\"Entry allowed.\")\n\nis_vip = False\nis_staff = True\nif is_vip or is_staff:\n    print(\"VIP area access granted.\")\n\nis_banned = False\nif not is_banned:\n    print(\"Welcome!\")",
      keyTakeaways: [
        "and: all conditions must be True.",
        "or: at least one condition must be True.",
        "not: flips True to False and False to True.",
        "Combine them for powerful, real-world logic.",
      ]
    },
    questions: [
      { id: "t17_q1", type: "multiple_choice", tag: "Basic Understanding",
        prompt: "What does 'and' do when combining two conditions?",
        options: ["The result is True only if BOTH conditions are True","The result is True if at least one condition is True","The result is always True","It reverses the condition"],
        correctIndex: 0,
        explanationCorrect: "Correct! 'and' requires both sides to be True. If either is False the result is False.",
        explanationIncorrect: "With 'and', BOTH conditions must be True. If even one is False the whole expression is False." },
      { id: "t17_q2", type: "predict_output", tag: "Code Prediction",
        prompt: "What does this print?\n\nx = 15\nif x > 10 and x < 20:\n    print('In range')\nelse:\n    print('Out of range')",
        options: ["Out of range","In range","In range\nOut of range","Error"],
        correctIndex: 1,
        explanationCorrect: "Exactly right! 15 > 10 is True AND 15 < 20 is True. Both True so 'In range' prints.",
        explanationIncorrect: "15 > 10 is True AND 15 < 20 is True. Since both sides of 'and' are True the if block runs." },
      { id: "t17_q3", type: "scenario", tag: "Real-Life Application",
        prompt: "A loan is approved if: salary > 30000 OR has_guarantor is True. Which code is correct?",
        options: ["if salary > 30000 and has_guarantor:","if salary > 30000 or has_guarantor:","if salary > 30000 not has_guarantor:","if salary > 30000 == has_guarantor:"],
        correctIndex: 1,
        explanationCorrect: "Correct! 'or' means the loan is approved if either condition is met.",
        explanationIncorrect: "Use 'or' because the loan is approved if EITHER condition is True." },
      { id: "t17_q4", type: "concept_id", tag: "Concept Identification",
        prompt: "What does 'not True' evaluate to?",
        options: ["True","False","None","0"],
        correctIndex: 1,
        explanationCorrect: "Exactly! 'not' reverses the Boolean: not True gives False.",
        explanationIncorrect: "'not' is a logical negation  -  it flips the Boolean value. not True = False." },
      { id: "t17_q5", type: "challenging", tag: "Slightly Challenging",
        prompt: "What is the result of: True and False or True?",
        options: ["False","True","Error","None"],
        correctIndex: 1,
        explanationCorrect: "Brilliant! 'and' before 'or': (True and False) = False, then False or True = True.",
        explanationIncorrect: "Order of precedence: 'and' before 'or'. (True and False) = False. Then False or True = True." }
    ],
    codingChallenge: {
      id: "c17", title: "Login Validator",
      instruction: "Create username = 'admin' and password = 'pass123'. Print 'Login successful!' only if BOTH are correct. Otherwise print 'Invalid credentials.'",
      hint: "username = 'admin'\npassword = 'pass123'\nif username == 'admin' and password == 'pass123':\n    print('Login successful!')\nelse:\n    print('Invalid credentials.')",
      starterCode: "# Login validation with multiple conditions\n",
      expectedConcept: "and / or / not",
      validate: (code, stdout) => {
        if (!/\bif\b/.test(code)) return { pass: false, hint: "Use an if statement!" };
        if (!/\band\b|\bor\b|\bnot\b/.test(code)) return { pass: false, hint: "Combine conditions using 'and', 'or', or 'not'." };
        if (!stdout || !stdout.trim()) return { pass: false, hint: "Make sure a message prints." };
        return { pass: true, message: "Brilliant! You can now combine conditions like a pro! 🔐" };
      }
    }
  },

  // ── 18: Logical Operators with Conditions ─────────────────────────────────
  {
    id: 18, number: 7, chapterNumber: 2,
    title: "Logical Operators with Conditions",
    slug: "logical-operators-with-conditions",
    shortDescription: "Deep dive into and, or, not  -  truth tables and real use cases.",
    lesson: {
      easyDefinition: "Logical operators (and, or, not) combine or modify Boolean conditions. Understanding their truth tables makes you a confident decision-maker in code.",
      realLifeExample: {
        title: "Aeroplane Boarding Gate",
        analogy: "At an airport boarding gate, you can board only if:",
        steps: ["* has_ticket AND has_passport  -  You may board.", "* Missing either  -  You cannot board.", "* is_staff OR has_business_ticket  -  Business lounge access.", "* NOT is_banned  -  You are allowed to fly."],
        takeaway: "Real-world logic almost always combines multiple conditions. Logical operators let you express that cleanly."
      },
      integratedExplanation: "Truth Tables:\n\nAND:\n  True  and True  = True\n  True  and False = False\n  False and True  = False\n  False and False = False\n\nOR:\n  True  or True  = True\n  True  or False = True\n  False or True  = True\n  False or False = False\n\nNOT:\n  not True  = False\n  not False = True",
      codeExample: "has_ticket = True\nhas_passport = True\n\nif has_ticket and has_passport:\n    print(\"Welcome aboard!\")\n\nis_staff = False\nhas_vip = True\nif is_staff or has_vip:\n    print(\"Business lounge access granted.\")\n\nis_sick = False\nif not is_sick:\n    print(\"Cleared for flight.\")",
      keyTakeaways: [
        "AND: both must be True. One False ruins everything.",
        "OR: at least one must be True. One True is enough.",
        "NOT: flips the Boolean value.",
        "Combine all three for powerful, expressive conditions.",
      ]
    },
    questions: [
      { id: "t18_q1", type: "multiple_choice", tag: "Basic Understanding",
        prompt: "What is the result of: False or True?",
        options: ["False","True","None","Error"],
        correctIndex: 1,
        explanationCorrect: "Correct! With 'or', if at least one operand is True the result is True.",
        explanationIncorrect: "'or' returns True if AT LEAST ONE side is True. False or True gives True." },
      { id: "t18_q2", type: "predict_output", tag: "Code Prediction",
        prompt: "What does this print?\n\nprint(not False)",
        options: ["False","not False","True","Error"],
        correctIndex: 2,
        explanationCorrect: "Exactly! 'not False' flips False to True.",
        explanationIncorrect: "'not' reverses the Boolean. not False = True." },
      { id: "t18_q3", type: "concept_id", tag: "Truth Table",
        prompt: "What is the result of: True and False?",
        options: ["True","False","None","TrueFalse"],
        correctIndex: 1,
        explanationCorrect: "Correct! 'and' requires BOTH to be True. Since one is False the result is False.",
        explanationIncorrect: "With 'and', BOTH must be True. True and False gives False." },
      { id: "t18_q4", type: "scenario", tag: "Real-Life Application",
        prompt: "A system grants access if: (role == 'admin') or (role == 'moderator'). What does this check?",
        options: ["Both role and moderator must match exactly","The user can access if they are EITHER an admin OR a moderator","Only admins can access","Neither can access"],
        correctIndex: 1,
        explanationCorrect: "Spot on! 'or' grants access to either admins or moderators  -  one match is enough.",
        explanationIncorrect: "'or' means EITHER condition being True is sufficient." },
      { id: "t18_q5", type: "challenging", tag: "Slightly Challenging",
        prompt: "What is the output of: print(True and True and False)?",
        options: ["True","False","TrueTrueFalse","Error"],
        correctIndex: 1,
        explanationCorrect: "Brilliant! True and True = True, then True and False = False.",
        explanationIncorrect: "For 'and' to return True ALL operands must be True. One False makes the entire chain False." }
    ],
    codingChallenge: {
      id: "c18", title: "Access Control System",
      instruction: "Set has_id = True and age = 21. Print 'Full access!' if age >= 18 AND has_id is True. Print 'Limited access.' if only has_id is True. Otherwise print 'No access.'",
      hint: "has_id = True\nage = 21\nif age >= 18 and has_id:\n    print('Full access!')\nelif has_id:\n    print('Limited access.')\nelse:\n    print('No access.')",
      starterCode: "# Access control with logical operators\n",
      expectedConcept: "and / or / not with if-elif-else",
      validate: (code, stdout) => {
        if (!/\bif\b/.test(code)) return { pass: false, hint: "Use if statements to control access." };
        if (!/\band\b|\bor\b|\bnot\b/.test(code)) return { pass: false, hint: "Use 'and', 'or', or 'not' to combine conditions." };
        if (!stdout || !stdout.trim()) return { pass: false, hint: "Make sure at least one print() executes." };
        return { pass: true, message: "Access granted! You have mastered logical operators! 🛡️" };
      }
    }
  },

  // ── 19: Nested if Statements ──────────────────────────────────────────────
  {
    id: 19, number: 8, chapterNumber: 2,
    title: "Nested if Statements",
    slug: "nested-if-statements",
    shortDescription: "Placing if statements inside other if statements for layered decisions.",
    lesson: {
      easyDefinition: "A nested if is an if statement placed inside another if block. Used when a second decision only needs to be made after the first condition is already True.",
      realLifeExample: {
        title: "Movie Theatre Entry",
        analogy: "To buy a ticket and enter the hall:",
        steps: ["* First check: Is there a seat available?", "  If yes: Check if the person is 18+ for an A-rated film.", "    If yes: Entry allowed.", "    If no: Entry denied.", "  If no: Sorry, show is full."],
        takeaway: "Nested ifs allow layered decision-making  -  decisions that only make sense after another decision has already passed."
      },
      integratedExplanation: "You can place an if statement inside another if block. Each inner if is only reached if the outer condition is True.\n\nWarning: Avoid deeply nested ifs  -  they reduce readability.",
      codeExample: "has_ticket = True\nage = 20\nfilm_rating = \"A\"\n\nif has_ticket:\n    print(\"Ticket verified.\")\n    if film_rating == \"A\":\n        if age >= 18:\n            print(\"Enjoy the film!\")\n        else:\n            print(\"Sorry, adults only.\")\n    else:\n        print(\"Enjoy the film!\")\nelse:\n    print(\"Please buy a ticket first.\")",
      keyTakeaways: [
        "Nested ifs place an if inside another if block.",
        "The inner if only runs when the outer if is True.",
        "Indentation increases with each nesting level.",
        "Avoid nesting too deeply  -  it reduces readability.",
      ]
    },
    questions: [
      { id: "t19_q1", type: "multiple_choice", tag: "Basic Understanding",
        prompt: "What is a nested if statement?",
        options: ["An if that uses 'or' to combine conditions","An if statement placed inside the block of another if statement","An if that runs automatically","An if without a condition"],
        correctIndex: 1,
        explanationCorrect: "Correct! A nested if is an if inside another if  -  it is only checked when the outer if is True.",
        explanationIncorrect: "Nesting means placing one if inside another's block." },
      { id: "t19_q2", type: "predict_output", tag: "Code Prediction",
        prompt: "What does this print?\n\nx = 10\nif x > 5:\n    if x > 8:\n        print('Big')\n    else:\n        print('Medium')\nelse:\n    print('Small')",
        options: ["Small","Medium","Big","Big\nMedium"],
        correctIndex: 2,
        explanationCorrect: "Exactly right! x=10 > 5 enters the outer if. x=10 > 8 enters the inner if. Prints 'Big'.",
        explanationIncorrect: "10 passes both: 10 > 5 (outer, True) and 10 > 8 (inner, True) so prints 'Big'." },
      { id: "t19_q3", type: "true_false", tag: "Concept Identification",
        prompt: "True or False: The inner if in a nested structure will run even if the outer if condition is False.",
        options: ["False  -  the inner if is only reached if the outer if condition is True","True  -  both are always checked independently"],
        correctIndex: 0,
        explanationCorrect: "Correct! The inner if is inside the outer if block  -  only reachable when the outer condition passes.",
        explanationIncorrect: "The inner if is inside the outer if block. If outer is False Python skips the entire block." },
      { id: "t19_q4", type: "scenario", tag: "Real-Life Application",
        prompt: "An ATM: first checks if card is valid, then checks if PIN is correct. Which structure fits?",
        options: ["Two separate if statements at the same level","A nested if  -  check PIN only after card is confirmed valid","An elif statement","A single if with card and PIN in one condition"],
        correctIndex: 1,
        explanationCorrect: "Perfect! Checking PIN only makes sense after the card is valid  -  exactly what nested ifs are for.",
        explanationIncorrect: "Nested ifs: outer checks card validity, inner checks PIN  -  PIN check only happens if card is valid." },
      { id: "t19_q5", type: "challenging", tag: "Slightly Challenging",
        prompt: "What is a potential drawback of deeply nested if statements?",
        options: ["They make the program run faster","They can become very hard to read and maintain as nesting levels increase","They automatically add bugs","Python does not support more than 2 levels"],
        correctIndex: 1,
        explanationCorrect: "Brilliant! Deep nesting creates 'pyramid of doom' code that is hard to follow and debug.",
        explanationIncorrect: "Too many levels create complex 'pyramid' code. Use 'and' conditions to flatten logic." }
    ],
    codingChallenge: {
      id: "c19", title: "Bank Account Access",
      instruction: "Set account_active = True and balance = 5000. Use nested ifs: first check if account is active. If yes, check if balance > 1000 and print 'Withdrawal allowed.' Otherwise print 'Insufficient balance.' If not active, print 'Account suspended.'",
      hint: "account_active = True\nbalance = 5000\nif account_active:\n    if balance > 1000:\n        print('Withdrawal allowed.')\n    else:\n        print('Insufficient balance.')\nelse:\n    print('Account suspended.')",
      starterCode: "# Bank account access with nested ifs\n",
      expectedConcept: "Nested if statements",
      validate: (code, stdout) => {
        const ifCount = (code.match(/\bif\b/g) || []).length;
        if (ifCount < 2) return { pass: false, hint: "Use at least two if statements  -  one nested inside the other." };
        if (!stdout || !stdout.trim()) return { pass: false, hint: "Make sure a print() runs." };
        return { pass: true, message: "Excellent! You can now build layered decisions! 🏦" };
      }
    }
  },

  // ── 20: Ternary Operator ──────────────────────────────────────────────────
  {
    id: 20, number: 9, chapterNumber: 2,
    title: "Ternary Operator",
    slug: "ternary-operator",
    shortDescription: "Writing compact single-line if-else using Python's ternary expression.",
    lesson: {
      easyDefinition: "The ternary operator is a compact, single-line way to write an if-else expression. It evaluates a condition and returns one of two values in just one line.",
      realLifeExample: {
        title: "Quick Status Check",
        analogy: "Instead of saying:",
        steps: ["* 'If the student passed: give them a gold star. Otherwise: give them a try-again badge.'", "* You can say it all in one breath:", "* 'Give a gold star if passed, else give a try-again badge.'"],
        takeaway: "The ternary operator lets you express simple if-else logic in one clean, readable line."
      },
      integratedExplanation: "Python ternary syntax:\n  value_if_true if condition else value_if_false\n\nExample:\n  result = 'Pass' if score >= 50 else 'Fail'\n\nUse ternary for simple logic. For complex decisions use regular if-else.",
      codeExample: "score = 65\nresult = \"Pass\" if score >= 50 else \"Fail\"\nprint(result)   # Pass\n\nage = 20\nstatus = \"Adult\" if age >= 18 else \"Minor\"\nprint(status)   # Adult",
      keyTakeaways: [
        "Ternary syntax: value_if_true if condition else value_if_false",
        "Compresses a simple if-else into a single line.",
        "Ideal for simple conditional assignments.",
        "Avoid ternary for complex logic  -  use regular if-else instead.",
      ]
    },
    questions: [
      { id: "t20_q1", type: "multiple_choice", tag: "Basic Understanding",
        prompt: "What is the Python ternary operator syntax?",
        options: ["condition ? value_if_true : value_if_false","value_if_true if condition else value_if_false","if condition then value_if_true else value_if_false","condition -> value_if_true | value_if_false"],
        correctIndex: 1,
        explanationCorrect: "Correct! Python's ternary puts the true value FIRST, then the condition, then the false value.",
        explanationIncorrect: "Python ternary: 'value_if_true if condition else value_if_false'  -  condition is in the MIDDLE." },
      { id: "t20_q2", type: "predict_output", tag: "Code Prediction",
        prompt: "What does this print?\n\nx = 7\nprint('Odd' if x % 2 != 0 else 'Even')",
        options: ["Even","Odd","7","True"],
        correctIndex: 1,
        explanationCorrect: "Exactly right! 7 % 2 = 1 so 7 % 2 != 0 is True. The ternary returns 'Odd'.",
        explanationIncorrect: "7 % 2 = 1 (not 0), so the condition is True and 'Odd' is returned." },
      { id: "t20_q3", type: "concept_id", tag: "Concept Identification",
        prompt: "What is the ternary operator most suitable for?",
        options: ["Complex multi-step decisions with many conditions","Simple one-line conditional value assignments","Looping through a list of items","Defining functions"],
        correctIndex: 1,
        explanationCorrect: "Perfect! Ternary shines for simple, readable one-line conditional value assignments.",
        explanationIncorrect: "Use ternary for simple conditional assignments. For complex logic stick to full if-elif-else." },
      { id: "t20_q4", type: "scenario", tag: "Real-Life Application",
        prompt: "You want to assign discount = 20 if is_member is True, else discount = 5. Which ternary is correct?",
        options: ["discount = is_member ? 20 : 5","discount = 20 if is_member else 5","discount = if is_member 20 else 5","if is_member: discount = 20 else: discount = 5"],
        correctIndex: 1,
        explanationCorrect: "Spot on! 'discount = 20 if is_member else 5' is the correct Python ternary syntax.",
        explanationIncorrect: "Python ternary: 'value_if_true if condition else value_if_false'. So: discount = 20 if is_member else 5." },
      { id: "t20_q5", type: "challenging", tag: "Slightly Challenging",
        prompt: "What will this print?\n\ntemp = 22\nfeel = 'Warm' if temp > 25 else ('Cool' if temp > 15 else 'Cold')\nprint(feel)",
        options: ["Warm","Cold","Cool","Error"],
        correctIndex: 2,
        explanationCorrect: "Brilliant! temp = 22. 22 > 25 is False. Nested part: 22 > 15 is True so 'Cool'.",
        explanationIncorrect: "Nested ternary: 22 > 25 is False, so check nested: 22 > 15 is True gives 'Cool'." }
    ],
    codingChallenge: {
      id: "c20", title: "Quick Grade Stamp",
      instruction: "Use a ternary expression to assign 'PASS' to result if marks >= 50, otherwise 'FAIL'. Then print the result. (Use marks = 67)",
      hint: "marks = 67\nresult = 'PASS' if marks >= 50 else 'FAIL'\nprint(result)",
      starterCode: "# One-line grade check using ternary operator\nmarks = 67\n",
      expectedConcept: "Ternary operator",
      validate: (code, stdout) => {
        if (!/\bif\b.*\belse\b/.test(code.replace(/\n/g, " "))) return { pass: false, hint: "Use the ternary format: value_if_true if condition else value_if_false" };
        if (!/print\s*\(/.test(code) || !stdout || !stdout.trim()) return { pass: false, hint: "Print the result of your ternary expression." };
        return { pass: true, message: "Slick! You can now write decisions in a single line! ✨" };
      }
    }
  },

  // ── 21: match-case Statement ──────────────────────────────────────────────
  {
    id: 21, number: 10, chapterNumber: 2,
    title: "match-case Statement",
    slug: "match-case-statement",
    shortDescription: "Python 3.10+ structural pattern matching  -  a clean alternative to long elif chains.",
    lesson: {
      easyDefinition: "The match-case statement (Python 3.10+) lets you compare a value against multiple specific patterns. A cleaner alternative to long if-elif chains.",
      realLifeExample: {
        title: "Customer Service Menu",
        analogy: "A call centre menu asks: 'Press 1 for Sales, 2 for Support, 3 for Billing.'",
        steps: ["* Input 1  -  Transfer to Sales.", "* Input 2  -  Transfer to Support.", "* Input 3  -  Transfer to Billing.", "* Anything else  -  Invalid option message."],
        takeaway: "match-case is perfect for menus, command handling, and any situation where one value maps to several fixed outcomes."
      },
      integratedExplanation: "match-case syntax:\n  match variable:\n      case value1:\n          code\n      case value2:\n          code\n      case _:\n          default code\n\nThe underscore _ is the wildcard  -  matches anything not caught by earlier cases. Requires Python 3.10+.",
      codeExample: "day = \"Monday\"\n\nmatch day:\n    case \"Monday\":\n        print(\"Start of the work week!\")\n    case \"Friday\":\n        print(\"Almost the weekend!\")\n    case \"Saturday\" | \"Sunday\":\n        print(\"Weekend  -  time to relax!\")\n    case _:\n        print(\"A regular weekday.\")",
      keyTakeaways: [
        "match-case compares a value against multiple patterns cleanly.",
        "case _: is the default/wildcard  -  matches anything not caught above.",
        "Use | to combine multiple values in a single case.",
        "Requires Python 3.10+.",
      ]
    },
    questions: [
      { id: "t21_q1", type: "multiple_choice", tag: "Basic Understanding",
        prompt: "What Python version introduced the match-case statement?",
        options: ["Python 2.7","Python 3.5","Python 3.10","Python 4.0"],
        correctIndex: 2,
        explanationCorrect: "Correct! match-case (structural pattern matching) was introduced in Python 3.10.",
        explanationIncorrect: "match-case arrived in Python 3.10 as a new structural pattern matching feature." },
      { id: "t21_q2", type: "predict_output", tag: "Code Prediction",
        prompt: "What does this print?\n\ncolor = 'red'\nmatch color:\n    case 'blue':\n        print('Blue')\n    case 'red':\n        print('Red')\n    case _:\n        print('Other')",
        options: ["Blue","Other","Red","Blue\nRed"],
        correctIndex: 2,
        explanationCorrect: "Exactly! color = 'red' matches case 'red', so 'Red' is printed.",
        explanationIncorrect: "match checks each case top to bottom. 'red' matches case 'red' so prints 'Red' and exits." },
      { id: "t21_q3", type: "concept_id", tag: "Concept Identification",
        prompt: "What does 'case _:' represent in a match-case statement?",
        options: ["A syntax error","The wildcard/default case  -  matches anything not caught by earlier cases","A private variable named _","A case that only matches numbers"],
        correctIndex: 1,
        explanationCorrect: "Perfect! case _: is the wildcard  -  like 'else' in if-elif, it catches anything not matched above.",
        explanationIncorrect: "case _: is the wildcard/default  -  matches any value that did not match earlier cases." },
      { id: "t21_q4", type: "scenario", tag: "Real-Life Application",
        prompt: "You have a menu: choice 1 = Order, 2 = Track, 3 = Cancel. Which is the CLEANEST implementation?",
        options: ["Three separate if statements","A match-case statement with case 1, case 2, case 3, case _","Three print() statements","Three variables"],
        correctIndex: 1,
        explanationCorrect: "Spot on! match-case is the cleanest way to map a single value to multiple specific outcomes.",
        explanationIncorrect: "match-case is purpose-built for this: clean, readable, maps each option to its action." },
      { id: "t21_q5", type: "challenging", tag: "Slightly Challenging",
        prompt: "In match-case, what does 'case \"Saturday\" | \"Sunday\":' mean?",
        options: ["Error  -  you cannot combine cases","Matches either 'Saturday' OR 'Sunday'  -  both trigger the same block","Matches only 'Saturday'","Creates two separate case blocks"],
        correctIndex: 1,
        explanationCorrect: "Brilliant! The | operator combines patterns  -  either value triggers that block.",
        explanationIncorrect: "The pipe | in match-case is an OR pattern. Either value triggers the same case block." }
    ],
    codingChallenge: {
      id: "c21", title: "Day Type Classifier",
      instruction: "Set day = 'Wednesday'. Use match-case to print 'Weekend!' for Saturday or Sunday, 'Monday Blues!' for Monday, 'Mid-week hustle!' for Wednesday, and 'Regular weekday.' for everything else.",
      hint: "day = 'Wednesday'\nmatch day:\n    case 'Saturday' | 'Sunday':\n        print('Weekend!')\n    case 'Monday':\n        print('Monday Blues!')\n    case 'Wednesday':\n        print('Mid-week hustle!')\n    case _:\n        print('Regular weekday.')",
      starterCode: "# Classify the day using match-case\nday = \"Wednesday\"\n",
      expectedConcept: "match-case",
      validate: (code, stdout) => {
        if (!/\bmatch\b/.test(code)) return { pass: false, hint: "Use the 'match' keyword to start pattern matching." };
        if (!/\bcase\b/.test(code)) return { pass: false, hint: "Add 'case' blocks inside your match statement." };
        if (!stdout || !stdout.trim()) return { pass: false, hint: "Make sure the matching case's print() runs." };
        return { pass: true, message: "Outstanding! You have unlocked Python pattern matching! 🎯" };
      }
    }
  },
];

// ============================================================================
// CHAPTER 2 MINI PROJECTS
// ============================================================================
export const CHAPTER2_MINI_PROJECTS = [
  {
    id: "mp1", projectNumber: 1, chapterNumber: 2,
    title: "Grade Calculator", emoji: "📊", difficulty: "Beginner",
    description: "Build a grade calculator that takes a student score and determines their letter grade and result status.",
    requiredConcepts: ["if-elif-else", "comparison operators"],
    xpReward: 75,
    instruction: "Build a grade calculator:\n* If score >= 90  -  Grade: A+ Distinction!\n* If score >= 75  -  Grade: A First Class\n* If score >= 60  -  Grade: B Second Class\n* If score >= 50  -  Grade: C Pass\n* Else  -  Grade: F Fail, please retake",
    hint: "score = 82\nif score >= 90:\n    print(\"Grade: A+\")\nelif score >= 75:\n    print(\"Grade: A\")\nelif score >= 60:\n    print(\"Grade: B\")\nelif score >= 50:\n    print(\"Grade: C\")\nelse:\n    print(\"Grade: F\")",
    starterCode: "# Grade Calculator  -  Chapter 2 Mini Project\n# Change the score to test different grades!\nscore = 82\n",
    validate: (code, stdout) => {
      if (!/\belif\b/.test(code)) return { pass: false, hint: "Use elif to handle multiple grade ranges." };
      if (!/\belse\b/.test(code)) return { pass: false, hint: "Add an else block for failing grades." };
      if (!/print\s*\(/.test(code) || !stdout || !stdout.trim()) return { pass: false, hint: "Make sure a grade is printed!" };
      return { pass: true, message: "🎓 Grade Calculator complete! Real-world Python in action!" };
    }
  },
  {
    id: "mp2", projectNumber: 2, chapterNumber: 2,
    title: "Number Checker", emoji: "🔢", difficulty: "Beginner",
    description: "Create a program that analyses a number and reports whether it is positive, negative, or zero, and whether it is odd or even.",
    requiredConcepts: ["if-elif-else", "modulus operator"],
    xpReward: 75,
    instruction: "Analyse the number and print TWO pieces of information:\n1. Positive / Negative / Zero\n2. Odd / Even (only for non-zero numbers)\n\nUse % to check odd/even (number % 2 == 0 means even).",
    hint: "number = -7\nif number > 0:\n    print(\"Positive.\")\nelif number < 0:\n    print(\"Negative.\")\nelse:\n    print(\"Zero.\")\nif number != 0:\n    if number % 2 == 0:\n        print(\"Even.\")\n    else:\n        print(\"Odd.\")",
    starterCode: "# Number Checker  -  Chapter 2 Mini Project\n# Try: 0, -7, 42, 13\nnumber = -7\n",
    validate: (code, stdout) => {
      if (!/\bif\b/.test(code)) return { pass: false, hint: "Use if statements to check the number." };
      if (!/%/.test(code)) return { pass: false, hint: "Use the % (modulus) operator to check odd or even." };
      if (!/print\s*\(/.test(code) || !stdout || !stdout.trim()) return { pass: false, hint: "Print at least one result!" };
      return { pass: true, message: "🔢 Number Checker complete! Great use of conditions and modulus!" };
    }
  },
  {
    id: "mp3", projectNumber: 3, chapterNumber: 2,
    title: "Age Eligibility Checker", emoji: "🎫", difficulty: "Intermediate",
    description: "Build a real-world eligibility system that determines what a person is eligible for based on their age.",
    requiredConcepts: ["if-elif-else", "and", "comparison operators"],
    xpReward: 100,
    instruction: "Check eligibility based on age and print ALL that apply:\n* age >= 18 and age < 60  -  Eligible to vote AND work full-time\n* age >= 16  -  Eligible for a learner driving licence\n* age >= 18  -  Eligible to open a bank account\n* age < 18  -  Not yet eligible to vote!\n* age >= 60  -  Eligible for senior citizen benefits\n\nTry age = 17 then age = 25.",
    hint: "age = 17\nprint(\"=== Eligibility Report ===\")\nif age >= 18 and age < 60:\n    print(\"Eligible to vote\")\n    print(\"Eligible to work full-time\")\nelse:\n    print(\"Not yet eligible to vote!\")\nif age >= 16:\n    print(\"Eligible for learner driving licence\")\nif age >= 18:\n    print(\"Eligible to open a bank account\")\nif age >= 60:\n    print(\"Eligible for senior citizen benefits\")",
    starterCode: "# Age Eligibility Checker  -  Chapter 2 Mini Project\n# Change the age: try 15, 17, 25, 65\nage = 17\n\nprint(\"=== Eligibility Report ===\")\n",
    validate: (code, stdout) => {
      if (!/\bif\b/.test(code)) return { pass: false, hint: "Use if statements to check each eligibility condition." };
      if (!/\band\b/.test(code)) return { pass: false, hint: "Use 'and' to combine conditions like age >= 18 and age < 60." };
      if (!/print\s*\(/.test(code) || !stdout || !stdout.trim()) return { pass: false, hint: "Print the eligibility results!" };
      const lines = stdout.trim().split("\n").length;
      if (lines < 2) return { pass: false, hint: "Print at least 2 lines of eligibility information." };
      return { pass: true, message: "🎫 Age Eligibility Checker complete! You built a real-world decision system!" };
    }
  }
];
