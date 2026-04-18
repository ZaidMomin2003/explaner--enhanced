export interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

/**
 * Strip markdown code fences from a string.
 * Handles ```tsx, ```ts, ```jsx, ```js and plain ``` fences.
 */
export function stripMarkdownFences(code: string): string {
  let result = code;
  result = result.replace(/^```(?:tsx?|jsx?)?\n?/, "");
  result = result.replace(/\n?```\s*$/, "");
  return result.trim();
}

/**
 * Lightweight validation to check if GPT response contains JSX content.
 * This is a fallback check after the LLM pre-validation.
 */
export function validateGptResponse(response: string): ValidationResult {
  const trimmed = response.trim();

  // Check for JSX-like content (at least one opening tag)
  // Matches: <ComponentName, <div, <span, etc.
  const hasJsx = /<[A-Z][a-zA-Z]*|<[a-z]+[^>]*>/.test(trimmed);
  if (!hasJsx) {
    return {
      isValid: false,
      error:
        "The response was not a valid motion graphics component. Please try a different prompt.",
    };
  }

  return {
    isValid: true,
    error: null,
  };
}

/**
 * Extract only the component code, removing any trailing text/commentary.
 * Uses brace counting to find the end of the component.
 */
export function extractComponentCode(code: string): string {
  // Find the component declaration start
  const exportMatch = code.match(
    /export\s+const\s+\w+\s*=\s*\(\s*\)\s*=>\s*\{/,
  );

  if (exportMatch && exportMatch.index !== undefined) {
    const declarationStart = exportMatch.index;
    const bodyStart = declarationStart + exportMatch[0].length;

    // Count braces to find the matching closing brace
    let braceCount = 1;
    let endIndex = bodyStart;

    for (let i = bodyStart; i < code.length; i++) {
      const char = code[i];
      if (char === "{") {
        braceCount++;
      } else if (char === "}") {
        braceCount--;
        if (braceCount === 0) {
          endIndex = i;
          break;
        }
      }
    }

    if (braceCount === 0) {
      // Return everything from start of code to end of component (including closing brace and semicolon)
      let result = code.slice(0, endIndex + 1);
      // Add semicolon if not present
      if (!result.trim().endsWith(";")) {
        result = result.trimEnd() + ";";
      }
      return result.trim();
    }
  }

  // Fallback: return as-is
  return code;
}


/**
 * Detect the required duration (in frames) from generated code by scanning
 * for numeric literals used in frame-related patterns like interpolate ranges,
 * Sequence from/durationInFrames, and section visibility helpers.
 * Returns a sensible durationInFrames with a small buffer, or a default if
 * no frame references are found.
 */
export function detectDurationFromCode(
  code: string,
  defaultDuration = 150,
): number {
  let maxFrame = 0;

  // Match interpolate(frame, [start, ..., end], ...)
  const interpolateRegex =
    /interpolate\s*\(\s*(?:frame|f)\s*,\s*\[([^\]]+)\]/g;
  let match;
  while ((match = interpolateRegex.exec(code)) !== null) {
    const nums = match[1].match(/\d+/g);
    if (nums) {
      for (const n of nums) {
        maxFrame = Math.max(maxFrame, parseInt(n, 10));
      }
    }
  }

  // Match sectionVisible(start, end) or similar two-arg helpers with numeric literals
  const sectionRegex = /sectionVisible\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/g;
  while ((match = sectionRegex.exec(code)) !== null) {
    maxFrame = Math.max(maxFrame, parseInt(match[2], 10));
  }

  // Match Sequence from={number} or durationInFrames={number}
  const seqFromRegex = /from\s*=\s*\{?\s*(\d+)\s*\}?/g;
  while ((match = seqFromRegex.exec(code)) !== null) {
    maxFrame = Math.max(maxFrame, parseInt(match[1], 10));
  }
  const seqDurRegex = /durationInFrames\s*=\s*\{?\s*(\d+)\s*\}?/g;
  while ((match = seqDurRegex.exec(code)) !== null) {
    maxFrame = Math.max(maxFrame, parseInt(match[1], 10));
  }

  // Match spring/enter calls with frame delay: enter(number) or spring({ frame: t(number)
  const enterRegex = /enter\s*\(\s*(\d+)/g;
  while ((match = enterRegex.exec(code)) !== null) {
    maxFrame = Math.max(maxFrame, parseInt(match[1], 10));
  }

  // Match t(number) helper pattern
  const tHelperRegex = /\bt\s*\(\s*(\d+)\s*\)/g;
  while ((match = tHelperRegex.exec(code)) !== null) {
    maxFrame = Math.max(maxFrame, parseInt(match[1], 10));
  }

  if (maxFrame > 0) {
    // Add a 10% buffer so the last animation has time to complete
    return Math.ceil(maxFrame * 1.1);
  }

  return defaultDuration;
}
