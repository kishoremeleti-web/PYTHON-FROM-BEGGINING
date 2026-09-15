/**
 * In-Browser Python 3 Interpreter for Phase 1
 * Handles print, variables, arithmetic, types, conversions, input, operators, and strings
 * with syntax error diagnostics, stdout capture, and runtime environment inspection.
 */

export class PythonRuntime {
  constructor() {
    this.stdout = [];
    this.stderr = [];
    this.env = {};
  }

  reset() {
    this.stdout = [];
    this.stderr = [];
    this.env = {};
  }

  /**
   * Run Python code asynchronously.
   * If an input() call is encountered, onInputRequested(promptText) is invoked.
   * @param {string} code
   * @param {Function} onInputRequested - async callback returning string input
   * @returns {Promise<{ stdout: string, stderr: string, success: boolean, env: object }>}
   */
  async run(code, onInputRequested = null) {
    this.reset();
    const lines = code.split(/\r?\n/);

    try {
      for (let i = 0; i < lines.length; i++) {
        const lineNum = i + 1;
        let line = lines[i];

        // Strip comments that are not inside quotes
        line = this.stripComment(line).trim();
        if (!line) continue;

        await this.executeLine(line, lineNum, onInputRequested);
      }

      return {
        stdout: this.stdout.join("\n"),
        stderr: this.stderr.join("\n"),
        success: this.stderr.length === 0,
        env: { ...this.env }
      };
    } catch (err) {
      this.stderr.push(err.message || String(err));
      return {
        stdout: this.stdout.join("\n"),
        stderr: this.stderr.join("\n"),
        success: false,
        env: { ...this.env }
      };
    }
  }

  stripComment(line) {
    let inSingle = false;
    let inDouble = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (ch === '#' && !inSingle && !inDouble) {
        return line.substring(0, i);
      }
    }
    return line;
  }

  async executeLine(line, lineNum, onInputRequested) {
    // 1. Augmented Assignment (e.g. x += 5, x -= 2)
    const augAssignMatch = line.match(/^([a-zA-Z_]\w*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);
    if (augAssignMatch) {
      const varName = augAssignMatch[1];
      const op = augAssignMatch[2];
      const expr = augAssignMatch[3];
      if (!(varName in this.env)) {
        throw new Error(`NameError: name '${varName}' is not defined on line ${lineNum}`);
      }
      const val = await this.evaluateExpr(expr, lineNum, onInputRequested);
      const current = this.env[varName];
      if (op === "+=") this.env[varName] = current + val;
      else if (op === "-=") this.env[varName] = current - val;
      else if (op === "*=") this.env[varName] = current * val;
      else if (op === "/=") this.env[varName] = current / val;
      else if (op === "%=") this.env[varName] = current % val;
      return;
    }

    // 2. Standard Variable Assignment (e.g. name = "Kishore", age = 17)
    // Avoid matching == inside statements
    const assignMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*([^=].*)$/);
    if (assignMatch) {
      const varName = assignMatch[1];
      const expr = assignMatch[2].trim();
      const val = await this.evaluateExpr(expr, lineNum, onInputRequested);
      this.env[varName] = val;
      return;
    }

    // 3. Standalone print(...) statement
    if (/^print\s*\(/.test(line)) {
      await this.handlePrint(line, lineNum, onInputRequested);
      return;
    }

    // 4. Standalone input(...) call
    if (/^input\s*\(/.test(line)) {
      await this.evaluateInput(line, lineNum, onInputRequested);
      return;
    }

    // 5. Standalone expression (e.g. type(x) or 5 + 5)
    await this.evaluateExpr(line, lineNum, onInputRequested);
  }

  async handlePrint(line, lineNum, onInputRequested) {
    const inner = this.extractParenthesesContent(line, "print", lineNum);
    if (!inner.trim()) {
      this.stdout.push("");
      return;
    }

    const args = this.splitArguments(inner);
    const evaluatedParts = [];

    for (const arg of args) {
      const val = await this.evaluateExpr(arg.trim(), lineNum, onInputRequested);
      evaluatedParts.push(this.formatOutput(val));
    }

    this.stdout.push(evaluatedParts.join(" "));
  }

  extractParenthesesContent(str, fnName, lineNum) {
    const idx = str.indexOf(fnName);
    if (idx === -1) return "";
    const openIdx = str.indexOf("(", idx);
    if (openIdx === -1) {
      throw new Error(`SyntaxError: missing parentheses for '${fnName}' on line ${lineNum}`);
    }

    let depth = 0;
    let inSingle = false;
    let inDouble = false;

    for (let i = openIdx; i < str.length; i++) {
      const ch = str[i];
      if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (!inSingle && !inDouble) {
        if (ch === "(") depth++;
        else if (ch === ")") {
          depth--;
          if (depth === 0) {
            return str.substring(openIdx + 1, i);
          }
        }
      }
    }
    throw new Error(`SyntaxError: closing parenthesis ')' missing on line ${lineNum}`);
  }

  splitArguments(content) {
    const args = [];
    let cur = "";
    let depth = 0;
    let inSingle = false;
    let inDouble = false;

    for (let i = 0; i < content.length; i++) {
      const ch = content[i];
      if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (!inSingle && !inDouble) {
        if (ch === "(" || ch === "[" || ch === "{") depth++;
        else if (ch === ")" || ch === "]" || ch === "}") depth--;
        else if (ch === "," && depth === 0) {
          args.push(cur);
          cur = "";
          continue;
        }
      }
      cur += ch;
    }
    if (cur.trim()) args.push(cur);
    return args;
  }

  formatOutput(val) {
    if (val === undefined || val === null) return "None";
    if (typeof val === "boolean") return val ? "True" : "False";
    if (typeof val === "object" && val.__isType) {
      return `<class '${val.name}'>`;
    }
    return String(val);
  }

  async evaluateExpr(expr, lineNum, onInputRequested) {
    expr = expr.trim();
    if (!expr) return "";

    // String Literal "..." or '...'
    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
      return expr.slice(1, -1);
    }

    // Number literals
    if (/^-?\d+\.\d+$/.test(expr)) return parseFloat(expr);
    if (/^-?\d+$/.test(expr)) return parseInt(expr, 10);

    // Booleans
    if (expr === "True") return true;
    if (expr === "False") return false;

    // input(...)
    if (/^input\s*\(/.test(expr)) {
      return await this.evaluateInput(expr, lineNum, onInputRequested);
    }

    // type(...)
    if (/^type\s*\(/.test(expr)) {
      const inner = this.extractParenthesesContent(expr, "type", lineNum);
      const val = await this.evaluateExpr(inner, lineNum, onInputRequested);
      let typeName = "unknown";
      if (typeof val === "string") typeName = "str";
      else if (Number.isInteger(val)) typeName = "int";
      else if (typeof val === "number") typeName = "float";
      else if (typeof val === "boolean") typeName = "bool";
      return { __isType: true, name: typeName };
    }

    // Type Conversions
    if (/^int\s*\(/.test(expr)) {
      const inner = this.extractParenthesesContent(expr, "int", lineNum);
      const val = await this.evaluateExpr(inner, lineNum, onInputRequested);
      const res = parseInt(val, 10);
      if (isNaN(res)) {
        throw new Error(`ValueError: invalid literal for int() with base 10: '${val}' on line ${lineNum}`);
      }
      return res;
    }

    if (/^float\s*\(/.test(expr)) {
      const inner = this.extractParenthesesContent(expr, "float", lineNum);
      const val = await this.evaluateExpr(inner, lineNum, onInputRequested);
      const res = parseFloat(val);
      if (isNaN(res)) {
        throw new Error(`ValueError: could not convert string to float: '${val}' on line ${lineNum}`);
      }
      return res;
    }

    if (/^str\s*\(/.test(expr)) {
      const inner = this.extractParenthesesContent(expr, "str", lineNum);
      const val = await this.evaluateExpr(inner, lineNum, onInputRequested);
      return this.formatOutput(val);
    }

    if (/^bool\s*\(/.test(expr)) {
      const inner = this.extractParenthesesContent(expr, "bool", lineNum);
      const val = await this.evaluateExpr(inner, lineNum, onInputRequested);
      return Boolean(val);
    }

    // len(...)
    if (/^len\s*\(/.test(expr)) {
      const inner = this.extractParenthesesContent(expr, "len", lineNum);
      const val = await this.evaluateExpr(inner, lineNum, onInputRequested);
      if (typeof val !== "string" && !Array.isArray(val)) {
        throw new Error(`TypeError: object of type '${typeof val}' has no len() on line ${lineNum}`);
      }
      return val.length;
    }

    // String methods: .upper(), .lower(), .strip()
    const methodMatch = expr.match(/^(.+)\.(upper|lower|strip)\s*\(\s*\)$/);
    if (methodMatch) {
      const target = await this.evaluateExpr(methodMatch[1], lineNum, onInputRequested);
      const method = methodMatch[2];
      if (typeof target !== "string") {
        throw new Error(`AttributeError: '${typeof target}' object has no attribute '${method}'`);
      }
      if (method === "upper") return target.toUpperCase();
      if (method === "lower") return target.toLowerCase();
      if (method === "strip") return target.trim();
    }

    // Indexing / Slicing: name[0], name[0:3]
    const sliceMatch = expr.match(/^([a-zA-Z_]\w*)\[(.*)\]$/);
    if (sliceMatch) {
      const targetName = sliceMatch[1];
      const sliceInner = sliceMatch[2].trim();
      if (!(targetName in this.env)) {
        throw new Error(`NameError: name '${targetName}' is not defined on line ${lineNum}`);
      }
      const targetVal = this.env[targetName];
      if (typeof targetVal !== "string") {
        throw new Error(`TypeError: '${typeof targetVal}' object is not subscriptable`);
      }

      if (sliceInner.includes(":")) {
        const [startStr, endStr] = sliceInner.split(":");
        const start = startStr.trim() ? parseInt(startStr, 10) : 0;
        const end = endStr.trim() ? parseInt(endStr, 10) : targetVal.length;
        return targetVal.slice(start, end);
      } else {
        const index = parseInt(sliceInner, 10);
        if (index >= targetVal.length || index < -targetVal.length) {
          throw new Error(`IndexError: string index out of range on line ${lineNum}`);
        }
        return index < 0 ? targetVal[targetVal.length + index] : targetVal[index];
      }
    }

    // Compound logic / arithmetic parsing
    return await this.evaluateCompoundExpr(expr, lineNum, onInputRequested);
  }

  async evaluateInput(expr, lineNum, onInputRequested) {
    const promptArg = this.extractParenthesesContent(expr, "input", lineNum);
    let promptText = "";
    if (promptArg.trim()) {
      promptText = await this.evaluateExpr(promptArg.trim(), lineNum, onInputRequested);
      this.stdout.push(promptText);
    }

    if (onInputRequested) {
      const userVal = await onInputRequested(promptText);
      return String(userVal || "");
    }
    return "Student"; // sensible fallback if input callback not passed
  }

  async evaluateCompoundExpr(expr, lineNum, onInputRequested) {
    // Check if it's a simple variable identifier
    if (/^[a-zA-Z_]\w*$/.test(expr)) {
      if (expr in this.env) {
        return this.env[expr];
      }
      throw new Error(`NameError: name '${expr}' is not defined on line ${lineNum}`);
    }

    // Binary operations: comparisons, logicals, arithmetic
    // Tokenize while respecting quotes and parentheses
    const tokens = this.tokenizeExpr(expr);
    if (tokens.length === 1 && tokens[0] !== expr) {
      return await this.evaluateExpr(tokens[0], lineNum, onInputRequested);
    }

    // Evaluate basic binary operations
    return await this.resolveTokens(tokens, lineNum, onInputRequested);
  }

  tokenizeExpr(expr) {
    const regex = /(".*?"|'.*?'|\b(?:and|or|not)\b|==|!=|<=|>=|\*\*|\/\/|[+\-*/%<>=()]|[a-zA-Z_]\w*|\d+\.\d+|\d+)/g;
    const tokens = [];
    let match;
    while ((match = regex.exec(expr)) !== null) {
      tokens.push(match[0]);
    }
    return tokens.length > 0 ? tokens : [expr];
  }

  async resolveTokens(tokens, lineNum, onInputRequested) {
    // If only one token
    if (tokens.length === 1) {
      const t = tokens[0];
      if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
        return t.slice(1, -1);
      }
      if (/^-?\d+\.\d+$/.test(t)) return parseFloat(t);
      if (/^-?\d+$/.test(t)) return parseInt(t, 10);
      if (t === "True") return true;
      if (t === "False") return false;
      if (t in this.env) return this.env[t];
      throw new Error(`NameError: name '${t}' is not defined on line ${lineNum}`);
    }

    // Evaluate standard 3-token binary expressions (left OP right)
    // Operators order of precedence
    const binaryOps = ["**", "*", "/", "//", "%", "+", "-", "==", "!=", "<=", ">=", "<", ">", "and", "or"];

    for (const op of ["or", "and", "==", "!=", "<=", ">=", "<", ">", "+", "-", "*", "/", "//", "%", "**"]) {
      const opIdx = tokens.lastIndexOf(op);
      if (opIdx > 0 && opIdx < tokens.length - 1) {
        const leftTokens = tokens.slice(0, opIdx);
        const rightTokens = tokens.slice(opIdx + 1);

        const leftVal = await this.resolveTokens(leftTokens, lineNum, onInputRequested);
        const rightVal = await this.resolveTokens(rightTokens, lineNum, onInputRequested);

        switch (op) {
          case "+":
            if (typeof leftVal === "string" && typeof rightVal !== "string") {
              throw new Error(`TypeError: can only concatenate str (not "${typeof rightVal}") to str on line ${lineNum}`);
            }
            if (typeof rightVal === "string" && typeof leftVal !== "string") {
              throw new Error(`TypeError: unsupported operand type(s) for +: "${typeof leftVal}" and "str" on line ${lineNum}`);
            }
            return leftVal + rightVal;
          case "-": return leftVal - rightVal;
          case "*":
            if (typeof leftVal === "string" && typeof rightVal === "number") {
              return leftVal.repeat(rightVal);
            }
            return leftVal * rightVal;
          case "/": return leftVal / rightVal;
          case "//": return Math.floor(leftVal / rightVal);
          case "%": return leftVal % rightVal;
          case "**": return Math.pow(leftVal, rightVal);
          case "==": return leftVal === rightVal;
          case "!=": return leftVal !== rightVal;
          case "<": return leftVal < rightVal;
          case ">": return leftVal > rightVal;
          case "<=": return leftVal <= rightVal;
          case ">=": return leftVal >= rightVal;
          case "and": return leftVal && rightVal;
          case "or": return leftVal || rightVal;
        }
      }
    }

    // Fallback: try parsing as simple identifier or literal
    const joined = tokens.join(" ");
    return this.env[joined] ?? joined;
  }
}
