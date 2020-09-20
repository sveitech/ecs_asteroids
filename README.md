# A Study in Entity-Component-System Architectures, using Asteroids

## TODO

- Læs op på javascript generator functions.
- Læs op på typescript constructor interfaces.

## Notes

### 14-09-2020

Slå strictNullChecks fra i tsconfig.json. Det gør det nemmere at kode, da
alle variable dermed gerne må være null, uden at man explicit har sagt at
de må have typen null.

---

For at `height=100%` virker, skal både `html` og `body` tagget have en height
sat til 100% også, da de ellers defaulter til `auto`.

---

### 15-09-2020

Absolute paths i imports. Slå følgende til i `tsconfig.json`:

    "baseUrl": "./src",

Tilføj følgende i `webpack.config.js`:

    resolve: {
        modules: ['./src'],

---

Unit tests: Installer jest:

    npm install --save-dev jest

Tilføj jest som et script i `package.json`:

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack",
        "test": "jest"
    },

Tilføj typescript symboler:

    npm install --save-dev @types/jest

Opret jest config:

    npx jest --init

Installer `ts-jest`:

    npm install --save-dev ts-jest

Konfigurer `jest.config.js` til at bruge ts-jest:

    transform: {
        '^.+\\.ts$': 'ts-jest'
    },

Yderligere setup af jest:

moduleDirectories: [
"node_modules",
"src"
],

// An array of file extensions your modules use
moduleFileExtensions: [
"js",
"ts",
"tsx",
"json",
"jsx",
"ts",
"tsx",
"node"
],

Man skal selv tilføje "ts" og "tsx" typer i file extensions, og det er vigtigt
at moduleDirectories indeholder både node_modules og ens egne sources.

---

## Typescript

```ts
/**
   * Unlike deleteComponent, we need to add the constructor interface as a
   * type here, because we are returning an instance of T, and not "typeof T".
   * Typescript cannot see that we are returning an already existing instance
   * from somewhere else, it assumes we need to use "new T()", so the constructor
   * layout must be supplied.
   *
   * Consider this case:
   *
   *   getComponent<T extends IComponent>(
        entity: Entity,
        component: T ) : T

   * and we use it like this:

       getComponent(someEntity, FooComponent);

     typescript expands this to:

       getComponent(someEntity, typeof FooComponent);

     giving us this method signature:

     getComponent<typeof FooComponent extends IComponent>(
        entity: Entity,
        component: typeof FooComponent) : typeof FooComponent

    so, we end up returning a type instead of an instance.
   */
  getComponent<T extends IComponent>(
    entity: Entity,
    component: IComponentConstructor<T>
    //component: { id: number; new (...arg: any): T }
  ): T | null {
    if (this.entities.has(entity.id)) {
      if (this.entities.get(entity.id).has(component.id)) {
        return this.entities.get(entity.id).get(component.id) as T;
      } else {
        return null;
      }
    }
  }

 /**
   * Why does this work? How is component passed as a type? It works because
   * plain javascript does not know anything about classes.
   *
   * We need to look at how the raw javascript looks for the Position class
   * for example:
   *
   * ES5:

    var position_Position = (function () {
    function Position(x, y) {
      if (x === void 0) { x = 0; }
      if (y === void 0) { y = 0; }
      this.x = x;
      this.y = y;
    }
    Object.defineProperty(Position.prototype, "id", {
        get: function () {
            return Position.id;
        },
        enumerable: false,
        configurable: true
    });
    Position.id = createComponentId();
    return Position;
  }());

  ES2020:
        class Position {
          constructor(x = 0, y = 0) {
              this.x = x;
              this.y = y;
          }
          get id() {
              return Position.id;
          }
      }
      Position.id = createComponentId();

  In both cases, what we end up with, is a constructor function object. The
  new class syntax in later JS versions is still handled like a contructor
  function internally. So, in effect, what we are passing is not a "Class", its
  a constructor function, with properties! That's why it matches our object
  type declaration:
       { id: number; new (...arg: any): T }
  and why we have direct access to the id property, and we can invoke new()
  on the object as well.
   */
  // deleteComponent<T extends IComponent>(
  //   entity: Entity,
  //   component: { id: number; new (...arg: any): T }
  // ) {
  //   this.deleteComponentById(entity, component.id);
  // }
  deleteComponent<T extends IComponent>(entity: Entity, component: T) {
    this.deleteComponentById(entity, component.id);
  }

/**
   * Generator function.
   * Returns a tuple, matching the requested components.
   * For example:
   *    for(let e of getEntities(A, B, C))
   * will yield:
   *    [A, B, C]
   *
   * Instead of creating a new tuple, reuse the components tuple memory.
   *
   * "Rest Parameters" are handled in an Array instance.
   *
   * The two signatures for getEntities are interchangeable. The generics
   * substitution system will generate the same code.
   *
   * The <T extends IComponent> is a "constraint". Allow T to be any and all types
   * which has the same properties as IComponent.
   */
  //*getEntities<T extends IComponent[]>(...components: T): Generator<T, void> {
  *getEntities<T extends IComponent>(...components: T[]): Generator<T[], void> {
    for (let [key, value] of this.entities) {
      //let result: any = [];

      let hits: number = 0;

      // If the entity has every component, return those components, grouped
      for (let [c_key, c_value] of components.entries()) {
        if (value.has(c_value.id)) {
          hits += 1;
          //result.push(value.get(c.id));
          components[c_key] = value.get(c_value.id) as typeof c_value;
        }
      }

      if (hits == components.length) {
        yield components;
      }
      // if (result.length == components.length) {
      //   // All components found!
      //   yield result;
      // }
    }
  }
```

### 20-09-2020

Undgå default exports! De ødelægger directory imports. Hvis man har en index.js
fil i en undermappe, hvor man exporter hele undermappen:

  export * from "./foo";

Dette virker ikke med default exports. Man skal manuelt hen og re-exporte
default exporten.
