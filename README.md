# A Study in Entity-Component-System Architectures, using Asteroids

## TODO

* Læs op på javascript generator functions.
* Læs op på typescript constructor interfaces.

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

