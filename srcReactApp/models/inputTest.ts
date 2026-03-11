import { Locator } from "playwright";

export interface InputTest {
  formLocator: Locator;
  inputName: string;
}

export interface GenericInputTest {
  setup: InputTest[];
  expectedError: string;
}