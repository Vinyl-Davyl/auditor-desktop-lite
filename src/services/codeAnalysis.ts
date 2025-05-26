import * as fs from "fs";
import * as path from "path";

export interface CodeAnalysisResult {
  filePath: string;
  metrics: {
    complexity: number;
    maintainability: number;
    linesOfCode: number;
    issues: CodeIssue[];
  };
}

export interface CodeIssue {
  type: "error" | "warning" | "suggestion";
  message: string;
  line: number;
  column: number;
}

export async function analyzeFile(filePath: string): Promise<CodeAnalysisResult> {
  try {
    let content: string;

    // Check if we're in a browser environment (renderer process)
    if (typeof window !== "undefined") {
      try {
        // In renderer process, we need to use IPC to read files
        // For now, we'll handle the error gracefully and return a placeholder result
        // with a more informative error message
        return {
          filePath,
          metrics: {
            complexity: 0,
            maintainability: 0,
            linesOfCode: 0,
            issues: [
              {
                type: "error",
                message:
                  "File system access is not available in the renderer process. Please implement proper IPC communication.",
                line: 1,
                column: 1,
              },
            ],
          },
        };
      } catch (error) {
        return {
          filePath,
          metrics: {
            complexity: 0,
            maintainability: 0,
            linesOfCode: 0,
            issues: [
              {
                type: "error",
                message: `Failed to analyze file: ${error instanceof Error ? error.message : "Unknown error"}`,
                line: 1,
                column: 1,
              },
            ],
          },
        };
      }
    } else {
      content = await fs.promises.readFile(filePath, "utf-8");
    }

    const lines = content.split("\n");

    // Calculate basic metrics
    const linesOfCode = lines.length;
    const complexity = calculateComplexity(content);
    const maintainability = calculateMaintainability(content);

    // Find potential issues
    const issues = findIssues(content, filePath);

    return {
      filePath,
      metrics: {
        complexity,
        maintainability,
        linesOfCode,
        issues,
      },
    };
  } catch (error) {
    console.error("Error analyzing file:", error);
    // Return a placeholder result with error information
    return {
      filePath,
      metrics: {
        complexity: 0,
        maintainability: 0,
        linesOfCode: 0,
        issues: [
          {
            type: "error",
            message: `Failed to analyze file: ${error instanceof Error ? error.message : "Unknown error"}`,
            line: 1,
            column: 1,
          },
        ],
      },
    };
  }
}

function calculateComplexity(content: string): number {
  // Simple cyclomatic complexity calculation
  const complexityKeywords = ["if", "else", "for", "while", "do", "switch", "case", "catch", "&&", "||", "?", "??"];

  return complexityKeywords.reduce((count, keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "g");
    return count + (content.match(regex) || []).length;
  }, 1);
}

function calculateMaintainability(content: string): number {
  // Simple maintainability index calculation
  const lines = content.split("\n");
  const commentLines = lines.filter((line) => line.trim().startsWith("//") || line.trim().startsWith("/*")).length;
  const codeLines = lines.length - commentLines;

  // Basic maintainability score (0-100)
  const score = Math.max(0, Math.min(100, 100 - codeLines * 0.5 - calculateComplexity(content) * 2));

  return Math.round(score);
}

function findIssues(content: string, filePath: string): CodeIssue[] {
  const issues: CodeIssue[] = [];
  const lines = content.split("\n");

  // Check for common issues
  lines.forEach((line, index) => {
    // Check for long lines
    if (line.length > 100) {
      issues.push({
        type: "warning",
        message: "Line is too long (over 100 characters)",
        line: index + 1,
        column: 101,
      });
    }

    // Check for console.log statements
    if (line.includes("console.log")) {
      issues.push({
        type: "suggestion",
        message: "Consider removing console.log statements in production code",
        line: index + 1,
        column: line.indexOf("console.log") + 1,
      });
    }

    // Check for TODO comments
    if (line.includes("TODO")) {
      issues.push({
        type: "suggestion",
        message: "TODO comment found",
        line: index + 1,
        column: line.indexOf("TODO") + 1,
      });
    }
  });

  return issues;
}
