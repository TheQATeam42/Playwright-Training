import dotenv from "dotenv";
import path from "path";

/**
 * Load environment variables from .env file located in the project root directory
 */
dotenv.config({ path: path.join(process.cwd(), ".env") });

/**
 * Reads a string environment variable
 * @param key - The environment variable key
 * @returns The environment variable value as a string
 * @throws Error if the environment variable is not set
 */
function readStringEnv(key: keyof NodeJS.ProcessEnv): string {
  const value: string | undefined = process.env[key];

  if (!value) {
    throw new Error(
      `Environment variable ${key} is not set in the '{projectDir}/.env' file`
    );
  }

  return value;
}

/**
 * Reads a boolean environment variable
 * @param key - The environment variable key
 * @returns The environment variable value as a boolean
 * @throws Error if the environment variable is not set or is not a valid boolean ('true' or 'false')
 */
function readBooleanEnv(key: keyof NodeJS.ProcessEnv): boolean {
  const value: string = readStringEnv(key).toLowerCase();

  switch (value) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      throw new Error(
        `Environment variable ${key} must be either 'true' or 'false', but is '${value}'`
      );
  }
}

/**
 * Reads a number environment variable
 * @param key - The environment variable key
 * @returns The environment variable value as a number
 * @throws Error if the environment variable is not set or is not a valid number
 */
function readNumberEnv(key: keyof NodeJS.ProcessEnv): number {
  const value = Number(readStringEnv(key).toLowerCase());

  if (isNaN(value)) {
    throw new Error(
      `Environment variable ${key} must be a number, but is '${value}'`
    );
  }

  return value;
}

/**
 * Provides configuration for browser settings loaded from environment variables
 */
class BrowserConfig {
  /**
   * Gets the headless mode setting for the browser
   * @returns The headless mode value as a boolean from the HEADLESS environment variable
   */
  static get headless(): boolean {
    return readBooleanEnv("HEADLESS");
  }
}

export { BrowserConfig };
