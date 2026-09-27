import React from "react";
import {
  Terminal,
  Code2,
  Tv,
  Hash,
  Box,
  Layers,
  Search,
  ArrowLeftRight,
  Keyboard,
  Calculator,
  Quote,
  GitBranch,
  Scale,
  GitCommit,
  GitFork,
  Split,
  Workflow,
  Cpu,
  Sliders,
  LayoutGrid,
  ShieldCheck,
  Zap
} from "lucide-react";

/**
 * Consistent, clean technical icons mapped to Chapter 1 and Chapter 2 topics.
 */
export function TopicIcon({ topicNumber, chapterNumber = 1, size = 18, className = "" }) {
  if (chapterNumber === 2) {
    switch (topicNumber) {
      case 1:
        // What are Conditional Statements?
        return <GitBranch size={size} className={className} />;
      case 2:
        // Comparison Operators
        return <Scale size={size} className={className} />;
      case 3:
        // if Statement
        return <GitCommit size={size} className={className} />;
      case 4:
        // else Statement
        return <ShieldCheck size={size} className={className} />;
      case 5:
        // elif Statement
        return <Split size={size} className={className} />;
      case 6:
        // Multiple Conditions
        return <Workflow size={size} className={className} />;
      case 7:
        // Logical Operators with Conditions
        return <Cpu size={size} className={className} />;
      case 8:
        // Nested if Statements
        return <GitFork size={size} className={className} />;
      case 9:
        // Ternary Operator
        return <Sliders size={size} className={className} />;
      case 10:
        // match-case Statement
        return <LayoutGrid size={size} className={className} />;
      default:
        return <GitBranch size={size} className={className} />;
    }
  }

  // Chapter 1
  switch (topicNumber) {
    case 1:
      // What is Programming? -> Terminal prompt
      return <Terminal size={size} className={className} />;
    case 2:
      // What is Python? -> Code / Pythonic mark
      return <Code2 size={size} className={className} />;
    case 3:
      // print() -> Display / output
      return <Tv size={size} className={className} />;
    case 4:
      // Comments -> # Hash annotation
      return <Hash size={size} className={className} />;
    case 5:
      // Variables -> Storage container
      return <Box size={size} className={className} />;
    case 6:
      // Data Types -> Stacked layers
      return <Layers size={size} className={className} />;
    case 7:
      // type() -> Inspector lens
      return <Search size={size} className={className} />;
    case 8:
      // Type Conversion -> Transform arrows
      return <ArrowLeftRight size={size} className={className} />;
    case 9:
      // User Input -> Keyboard prompt
      return <Keyboard size={size} className={className} />;
    case 10:
      // Operators -> Calculator math glyphs
      return <Calculator size={size} className={className} />;
    case 11:
      // Strings -> Quotation marks
      return <Quote size={size} className={className} />;
    default:
      return <Terminal size={size} className={className} />;
  }
}
