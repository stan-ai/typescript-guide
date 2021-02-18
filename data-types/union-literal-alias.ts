// Union type, a variable where we can accept secific types can be done by '|'
// Literal type, when you provide a specific value that can be accepted or a group of one

function combine(n1: number | string, n2: 'literal-1' | 'literal-2'){
    return typeof n1;
}

console.log(combine(30, "literal-1"));
console.log(combine("String", "literal-2"));

// console.log(combine("String", "literal2")); // ERROR, Not in the accepting literals

/// Custom type that stores union type

type numORstring = number | string | boolean;

// Now rather then

let n1: number | string | boolean

// we can

let n2: numORstring;

// Custom type are type aliases which makes complex types easier to maintain
