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
  Quote
} from "lucide-react";

/**
 * Consistent, clean technical icons mapped to each of the 11 Phase 1 topics.
 */
export function TopicIcon({ topicNumber, size = 18, className = "" }) {
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
