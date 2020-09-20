class House {
  name: string;
  age: number;
}

// Mapped type. Convert House members.
// When T is an object, the resulting type will also be an object, with the
// same parameters. Here we add a readonly to each property.
type ReadonlyHouse<T> = {
  readonly [K in keyof T]: T[K];
};

class Foo<T> {
  value: T;
}

type stuff = [number, number, string];

// When T is an array/tuple, the mapping does not create an object, but another
// tuple/array type! only the numeric properties are converted (the actual
// members of the array, not the properties of the Array type like push, pop, e.t.c.)
type Double<T> = {
  [K in keyof T]: Foo<T[K]>;
};

type otherStuff = Double<stuff>; // -> [Foo<number>, Foo<number>, Foo<string>]

test("", () => {});
