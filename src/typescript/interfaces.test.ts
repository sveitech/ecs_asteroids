/**
 * Inline interface. Passed object must contain at least one parameter, named
 * "description".
 */
function printObject(object: { description: string }) {
  console.log(object.description);
}

/**
 * Explicit interface declaration
 */
interface Describable {
  description: string;
}

function printObject2(object: Describable) {}

// OPTIONAL PROPERTIES

// Objects need not have these properties, but they may.
interface Shape {
  color?: string;
  edges?: number;
}

// READONLY PROPERTIES

interface Person {
  readonly name: string;
  readonly age: number;
}

// OBJECT LITERALS EXCESS PROPERTY CHECKING

// This does not work. An object literal must match the interface exactly.
// We cannot have excess properties.
//let p: Person = { name: "john", age: 20, address: "??" };

// This is legal. We force the type assertion.
let p: Person = { name: "john", age: 20, address: "??" } as Person;

// FUNCTION TYPES

/**
 * Interfaces can describe the shape of an object, but also the shape of a
 * function.
 */

/**
 * Describes a function with a call signature.
 */
interface someFunction {
  (name: string, age: number): Person;
}

function callFunction(f: someFunction) {}

// INDEXABLE TYPES

/**
 * Interfaces can also describe something that can be indexed into, like an
 * array.
 */


 test("", () => {
   
 })