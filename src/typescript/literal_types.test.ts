/**
 * Literal types behave a bit like enums or named constants. A value can
 * only take on a very narrow subset of values.
 */

// NARROWING

// Typescript sets the type of greeting to be "Hi there", NOT string.
// greeting does not change, so the type is narrowed as much as possible down
// to the actual value.
const greeting = "Hi there";

// This variable can change, so its type is string.
let otherGreeting = "Hi there";

// STRING LITERALS

type Option = "small" | "big" | "huge";

// Narrow down the option to just three values.
function doStuff(option: Option) {
  console.log("Selected option was: ", option);
}

// String literals can be used for overload resolution.
function someOverload(value: "one"): void;
function someOverload(value: "two"): void;
function someOverload(value: any) {}

// NUMERIC LITERALS

type Bitsize = 8 | 16 | 24 | 32;

// BOOLEAN LITERALS

interface ValidationSuccess {
  isValid: true;
  reason: null;
}

interface ValidationFailure {
  isValid: false;
  reason: string;
}

type ValidationResult = ValidationSuccess | ValidationFailure;

test("", () => {});
