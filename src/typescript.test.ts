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

function variadic<T>(...args: T[]) : T[] {
    console.log(args);
    //return args;
    let manip: any = [];

    for(let x of args) {
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
