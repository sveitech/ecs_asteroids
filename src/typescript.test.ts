/**
 * Testing typescript functionality.
 */

/**
 * Iterations takes two forms:
 *
 * 1. (for ... in). This iterates over the properties of an object, returning
 *    the key names.
 * 2. (for ... of). Iterates over the values of an iterable, like an Array.
 */

function* custom_generator(max: number) {
  for (let i = 0; i < max; i++) {
    yield i;
  }
}

test("generators", () => {
  // Note the use of for-of here, to iterate values.
  //   for (let i of custom_generator(10)) {
  //     console.log(i);
  //   }
});

class A {}
class B {}

// This is the same as below.
// function variadic<T extends any[]>(...args: T) : T {
//     console.log(args);
//     return args;
// }

function variadic<T>(...args: T[]): T[] {
  console.log(args);
  //return args;
  let manip: any = [];

  for (let x of args) {
    manip.push(x);
  }

  return manip;
}

test("custom iterators", () => {
  let [a, b] = variadic(A, B);

  console.log("----");
  console.log(a);
  console.log(b);
});

/**
 * For generics, T is already a type.
 * For example, if we do:
 * 
 *    let a = 100;
 *    Foo(a);
 * 
 * Typescript implicitly calls "typeof a" to determine the type of a,
 * so T refers to the type in the generic function.
 * When we pass something that is already a type (Class, Interface)
 * we get "typeof Type". This makes no sense. We cannot take the type
 * of something that is already a type. So, when passing in types as
 * parameters, we need to pass a constructor function signature instead.
 * We are not passing the class per se, we are passing something that adheres
 * to a constructor function signature. This allows the generic function
 * to deduce T to an actual type.
 * 
 * For example:
 *  
 *  function Foo<T>(arg: { new (): T}): T {}
 * 
 * When we do:
 * 
 *  class A {}
 *  Foo(A);
 * 
 *  T is correctly deduced to be A inside, instead of typeof A.
 *  We need to remember how javascript treats classes. They are nothing more
 * than a function which creates an object. A is just a constructor function.
 * So, we are passing a constructor function to Foo. This constructor function
 * returns and instance of T.
 */
function Foo<T>(arg: T): T {
  return arg;
}

class Box {
  public width: number = 100;
  public height: number = 200;

  constructor() {}
}

test("templated function", () => {
  let a = 100;
  let b: number = Foo(a);

  // Does not work. (Box) is converted to (typeof Box), but we templated it
  // to be just Box.
  //let c: Box = Foo<Box>(Box);
});
