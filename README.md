# TypeScript Guide

A repo in progress, soon available with all the basic guidance and contents to code TypeScript. This repo is highly insipired from the Udemy Course [Understanding TypeScript - 2021 Edition](https://www.udemy.com/course/understanding-typescript/) by [Maximilian Schwarzmüller](https://www.udemy.com/user/maximilian-schwarzmuller/). This Repo is made as my own practice during this course.

## Structure

-   index.html (The HTML which loads app.js from script)
-   src (All `.ts` files)
    -   app.ts (Temp TS which can be replaced by any TS file from directories)
    -   [data-types](/src/data-types/)
        -   [Core-Datatypes](/src/data-types/core-datatypes.ts)
        -   [Obj-Datatypes](/src/data-types/obj-arr-enum.ts)
        -   [Function-Datatypes](/src/data-types/function-types.ts)
        -   [Union-Literal-Datatypes](/src/data-types/union-literal-alias.ts)
        -   [Unknown-Never-Datatypes](/src/data-types/unknown-never.ts)
    -   [next-gen-js](/src/next-gen-js/)
        -   [let-const--arrow-functions--default-arguements--spread-operator--rest-parameters](/src/next-gen-js/new-features.ts)
    -   [classes-objects](/src/classes-objects)
        -   [class-basic](/src/classes-objects/class-basic.ts)
        -   [inheritance](/src/classes-objects/inheritance.ts)
        -   [overriding-getter-setter](/src/classes-objects/overriding-getter-setter.ts)
        -   [static](/src/classes-objects/static.ts)
        -   [abstract](/src/classes-objects/abstract.ts)
        -   [interface-basic](/src/classes-objects/interface-basic.ts)
        -   [interface-class](/src/classes-objects/interface-class.ts)
        -   [interface-options](/src/classes-objects/interface-options.ts)
    -   [advanced-types](/src/advanced-types)
        -   [intersection--typeguards--typecasting--indexing](/src/advanced-types/advanced-types.ts)
        -   [overloading--optional-chaining--nullish-coalescing](/src/advanced-types/advanced-types.ts)
    -   [generics](/src/generics)
        -   [inbuilt-generics](/src/generics/inbuilt-generics.ts)
        -   [custom-generics](/src/generics/custom-generics.ts)
        -   [constraints](/src/generics/constraints.ts)
        -   [functional-constraints](/src/generics/functional-constraints.ts)
-   dist (All compiled `.js` comes here)
    -   Though this directory looks empty, it is becasue all js files are ignored in the .gitignore file, but if you fork/clone the repo and execute it. all the js files will go to this folder.
-   using-ts.ts (Sample TS)

## Understanding Compilation

Traditionally, we create a `.ts` file and then execute `tsc filename.js` to create a filename.js file which can be used in the script tags or wherever required in the project. But that is so much tedious, hence better solutions are listed below:

1. If you are dealing with onlt 1 ts file then you can use the --watch option with tsc command to instruct the compiler to have a continuous look at the file and recompile it to `.js` every time you hit ctrl+s.

```
tsc filename.ts --watch
or
tsc filename.ts -w
```

2. If you are working on a big project and you have multiple files and you need the compiler to have a constant look on all the files, then you need to initialize a TypeScript project in the root folder of your project, it will create a `tsconfig.json` file which will point to all the .ts files from the root folder to any number of sub-folders thereafter. And then you can run the tsc command without pointing it to any file with --watch option, so on ctrl+s it can recompile all the .ts files to js.

```
tsc --init // On the root folder to creare tsconfig.json

tsc --watch
or
tsc -w
```

## Understanding tsconfig.json

tsconfig.json is the file created when we initialize a TypeScript project and it can be used to view all the `.ts` files in the project. But there might be cases where we want to exclude some files and don't want to compile or only include some files. In tscongif.json we can do the following to achieve that.

```
tsconfig.json
-------------

{
    "compilerOptions": {
        ...
    },
    "exclude": [
        "./data-types",
        ... [any other TypeScript Directories]
        "./node_modules",
        "./using-ts.ts"
    ]
}
```

This is what is done in this project to make sure that the directories only has `.ts` files and is not recreating `.js` every time you edit something. Alternatively we can also do something like:

```
tsconfig.json
-------------

{
    "compilerOptions": {
        ...
    },
    "include": [
        "app.ts"
    ]
}
```

which will only recompile app.ts and no other file. Exclude has been done in this project to make a smooth and easy project setup so, if you want to use the project by cloning or even by forking it in your organization for reference on basics, you can easily just code in `app.ts` and it will only create `app.js` which is already added in index.html < script > tag and you can go deeper in the directories for conceptual references.

## compilerOptions

Though by default the tsconfig.js has a very clean explanation of the compilerOptions commented out for developers but still, the below snippet has some important and common options explained;

```
tsconfig.js
-----------

{
    "compilerOptions":{
        "target": "es5"             // Can be set to multiple versions of js like 'es6', 'es3', etc. The older the version, the more browser compatibility.
        "lib": [
            "dom",
            "es5",
            "dom.iterable",
            "scripthost"
        ]                           // By default it is commented out, but commented out has defaults added, the basis js functionalities. Although you can add specific libraries as done above. These 4 are the exact libraries that you get if it is commented and added by default.
        "allowJs": true             // Compiles JS files as well
        "checkJS": true             // Doesn't compile but still checks and reports errors in js files (like syntax)
        "jsx": "preserve"           // Could be set to preserve/react/react-native. Is helpful when working with TypeScript in React projects
        "sourceMap": true           // If set to true we get the .ts option in Browser Dev Tools like console and sources and we can debug the code from the browser itself i.e. put breakpoints in .ts files, etc
        "outDir": "./"              // Specifies the location where you want to place the compiled js files. Makes the project organized.
        "rootDir": "./"             // Specifies the root folder for all the .ts files i.e. src (commonly). Makes the project organized.
        "removeComments": true      // Removes the comments after compilation of .ts files and no comments are added in .js files
        "noEmit": true              // If you only want to check the .ts error reports and not generate .js files. Fast for devlopment process.
        "downlevelIteration": true  // Provided iterative support for very old compability browsers/versions, hence if you have loops and are facing some issue after compiling, you may want to think about turning this option on.

        /* IMP and not menioned in the tsconfig.json by default */
        "noEmitOnError": true       // If you set it to true, then it won't create .js files if there are any errors in .ts files, which is super helpful

        /* Strict Type-Checking Options */
        "strict": true              // By default makes all the below options true, so if you need to enable only certain options, make this false.
        "noImplicitsAny": true      // Checks that you have to be clear on the TYPE of a parameters/function etc.
        "strictNullChecks": true    // It checks for strict Nulls, something has to have a value/element. For variables that might be null.
        "strictFunctionTypes": true // It checks the type of functions very strictly. It comes with classes and interfaces
        "strictBindCallApply": true // It checks the method parameters with bind(), call(), and apply() method.
        "alwaysStrict": true        // Makes sure that all the compiled .js files uses ('use strict') mode.

        /* Code Quality Parameters */
        "noUsedLocals": true        // Reports errors on unused Locals
        "noUsedParameteres": true   // Reports errors on unused parameters
        "noImplicitReturns": true   // Reports errors when a function sometimes returns something and sometimes it doesn't return
    }
}
```

```
const devQuote = 'Developers are never far from a new "Hello World!"';
const quoteAuthor = "Prem Raval";
```
