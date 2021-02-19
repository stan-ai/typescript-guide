# TypeScript Guide

A repo in progress, soon available with all the basic guidance and contents to code TypeScript

## Structure

-   app.ts (Temp TS which can be replaced by any TS file from directories)
-   index.html (The HTML which loads app.js from script)
-   [data-types](/data-types/)
    -   [Core-Datatypes](/data-types/core-datatypes.ts)
    -   [Obj-Datatypes](/data-types/obj-arr-enum.ts)
    -   [Function-Datatypes](/data-types/function-types.ts)
    -   [Union-Literal-Datatypes](/data-types/union-literal-alias.ts)
    -   [Unknown-Never-Datatypes](/data-types/unknown-never.ts)
-   using-ts.ts (Sample TS)

## Understanding Compilation

Traditionally, we create a `.ts` file and then execute `tsc filename.js` to create a filename.js file which can be used in the script tags or wherever required in the project. But that is so much tedious, hence better solutions are listed below:

1. If you are dealing with onlt 1 ts file then you can use the --watch option with tsc command to instruct the compiler to have a continuous look at the file and recompile it to `.js` every time you hit ctrl+s.

```
tsc filename.ts --watch
or
tsc filename.ts -w
```

2. If you are working on a bit project and you'll have multiple files and you need the compiler to have a constant look on all the files, then you need to initialize a TypeScript project in the root folder of your project, it will create a `tsconfig.json` file which will point to all the .ts files from the root folder to any number of sub-folders thereafter. And then you can run the tsc command without pointing it to any file with --watch option, so on ctrl+s it can recompile all the .ts files to js.

```
tsc --init // On the root folder to creare tsconfig.json

tsc --watch
or
tsc -w
```

```
const devQuote = 'Developers are never far from a new "Hello World!"';
const quoteAuthor = "Prem Raval";
```
