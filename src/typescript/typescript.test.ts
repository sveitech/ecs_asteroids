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
// function Foo<T>(arg: T): T {
//   return arg;
// }

// test("templated function", () => {
//   let a = 100;
//   let b: number = Foo(a);

//   // Does not work. (Box) is converted to (typeof Box), but we templated it
//   // to be just Box.
//   //let c: Box = Foo<Box>(Box);
// });

// SPREADS

/**
 * The spread operator (...) works two ways: Either it explodes an array,
 * like ...args, or it converts an explosion to an array.
 * ...args always refers to an explosion and args is the unexploded values.
 */
function spread(args: any) {
  console.log(...args);
  console.log(args);
}

test("spreads", () => {
  spread([1, 2, 3, 4]);
});

/**
 * Attempt at using spreads in a function which constructs something based
 * on one or more types.
 *
 * Reuse class Box
 */

// function creator<T extends BoxConstructor>(
//   ...someType: [{ new (...arg: any): T }]
// ): [...T] {
//   console.log(someType);
//   let a: any = [];

//   for (let s of someType) {
//     a.push(new s());
//   }

//   return a;
// }
//function creator<T extends IDable[]>(...boxes: [...T]) {
// function creator<X extends IDable, T extends IDable[]>(
//   ...boxes: { id: number; new (...args: any): X }[]
// ): [X, ...T] {
// function creator<T extends IDable[]>(
//   ...boxes: [...{ new (...args: any): T }[]]
// ): [...T] {
// function creator<T extends { id: number; new (...args: any): any }[]>(
//   ...boxes: [...T]
// ): [...T] {
//   console.log(boxes);

//   let a = [];

//   for (let b of boxes) {
//     a.push(new b());
//   }

//   return a as [...T];
// }
// function creator<T extends any[]>() {

// }
type Ctor<U> = new (...args: any[]) => U;

// interface IDable {
//   id: number;
//   new <T>(): T;
// }

// function creator<T extends { id: number; new <U>(...args: any[]): U }[]>(
//   ...objects: T
// ) {}
// function creator<T extends any[]>() : [...T] {
//   let a: [...T];
//   for(let k of keyof T) {

//   }
//   console.log(a);
//   return a;
// }

// test("spreads2", () => {
//   let args: [FooBar, Box, Box, Box];
//   //creator(FooBar, Box, Box, Box);
//   console.log("==============");
//   creator<[FooBar, Box]>();
//   console.log(args);
// });

// function creator2<T>(...args: T[]): void {

// }

interface IDable {
  id: number;
}

interface IDableConstructor<T> extends IDable {
  new (...arg: any): T;
}

class Box {
  static id: number = 2;
  public width: number = 100;
  public height: number = 200;

  get id() {
    return Box.id;
  }

  constructor() {}
}

class FooBar {
  static id: number = 1;

  constructor() {}
}

// function factory<T extends IDable>(object: IDableConstructor<T>): T {
//   return new object();
// }

// function factory2<T extends IDable[]>(...objects: [...T]) {

// }

function factory<T extends any[]>(
  ...objects: { [K in keyof T]: new () => T[K] }
): [...T] {
  return objects.map((x) => new x()) as [...T];
}

// function factory2<T, U>(object1: new () => T, object2: new () => U): [T, U] {
//   return [new object1(), new object2()];
// }

// function factory3<T extends IDable[]>(...objects: {new(): any}[]): [...T] {
//   // BODY
//   let result = [];

//   for(let o of objects) {
//     result.push(new o());
//   }

//   return result as [...T];
// }

test("object factory", () => {
  //let a: Box = factory(Box);
  let [a, b] = factory(Box, FooBar);
  // let [d, e] : [Box, FooBar] = factory3(Box, FooBar);
});

let globalId = 0;

function createGlobalId() {
  globalId += 1;
  return globalId;
}

class Base<T> {
  static id: number = createGlobalId();
}

class ParentA extends Base<ParentA> {

}

class ParentB extends Base<ParentB> {

}

test("Curiously recurring template pattern", () => {
  let a1 = new ParentA();
  let a2 = new ParentA();
  let b1 = new ParentB();
  let b2 = new ParentB();

  console.log(a1);
  console.log(a2);
  console.log(ParentA.id);
  console.log(ParentB.id);
});