// let and const

const userName = 'John';

// userName = "Max"; // ERROR, cos TS knows const can't be changed

let age = 30;
age = 29;

function add(a: number, b: number){
    var result;
    result = a+b;
    return result;
}

// console.log(result); // ERROR, as let and var have local scope

if(age > 20){
    var isOld = true;
    let isYoung = false;
}

// console.log(isOld) // var isOld would work here in JS, as Js only knows function scope and global scope

// console.log(isYoung) // let isYoung would not work, becasue let brought the concept of block scope, so truly a local variable

// LET and CONST are preferable vs VAR

// Arrow Functions

const arrowFunction = (a: number, b:number) => a + b; // Only works if there is just one expression/line

console.log(arrowFunction(2,5));

const printOutput = (output: number | string) => console.log(output); // Using Types in the parameter of the function

printOutput(arrowFunction(2,5));

const button = document.querySelector('button');

if(button){
    button.addEventListener('click', event => console.log(event)); 
    // Here no need to define the type of 'event' parameter as 
    // TypeScript knows what kind of parameter would addEventListener provide
}


// Default Arguements

const printDefault = (output: string = 'Hello World') => console.log(output);

printDefault(); // This will take default value

printDefault('Defined Value'); // This is have passed value

// Note, default arguements have to be last in the parameter list


 
// Spread operator

const hobbies = ['Sports', 'Travelling'];

console.log(hobbies[0]);

const activeHobbies = ['Hiking'];

// activeHobbies.push(hobbies[0], hobbies[1]); // Traditional Way to add all the values from another array

activeHobbies.push(...hobbies); // Spread operator spreads the whole array into ',' seperated list from array

// Can also be used while creating array like
const newHobbies = ['New',...hobbies,...activeHobbies];

console.log(newHobbies);

// Can work with objects

const person = {
    firstName : ' Prem',
    personAge: 22
};

const copiedPerson = {
    ...person,
    address: "Toronto"
}

console.log(copiedPerson); // It spreads the object and adds the new value as well



// Rest Parameters

const multiply = (...values: number[]) => {
    // Traditionally we would do
    /*
    let result = 1;
    for (let i = 0; i < values.length; i++) {
        result *= values[i];
    }
    return result;
    */

    // But NextGen JS provides reduce function, below is the expanded version
    /*
    return values.reduce((curResult, curValue) => {
        return curResult * curValue;  [Operation with values]
    }, 1 [Starting value i.e. let resulr = 1]);
    */

    // Below is the shorthand version from the same

    return values.reduce((curResult, curValue) => curResult * curValue, 1);
};

// ...values: number[] will accept any number of parameters and store it in array


console.log(multiply(2, 3, 4, 6));


// Arrays and Object Desctructuring

// Traditional way to destructure array

//const hobby1 = hobbies[0];
//const hobby2 = hobbies[1];

// Next get way of destructuring
const [hobby1, hobby2] = hobbies;

// const [hobby1, hobby2, ...remaining] = hobbies // Rest parameters can be also be merged with destructuring

console.log(hobbies, hobby1, hobby2);

const { firstName: retrivedName, personAge: retrivedAge } = person; // Alias with destructuring

console.log(retrivedName, retrivedAge);