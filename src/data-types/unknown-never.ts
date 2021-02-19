// The unknown type

let userInput: unknown;
let userName: string;

userInput = 2;
userInput = "Max";


// userName = userInput // ERROR, as userName once a string always a string AND userInput is unknown though string in this case, so better type error handling than any

// to do the above we will need to

if(typeof userInput === 'string'){
    userName = userInput;
}

// The Never type, it doesnt return void, but it never returns anything. Good Code Quality

function generateError(message: string, code: number): never{
    throw { message: message, errorCode: code};
}

// This below line won't even print 'undefined', it just won't print anything

console.log(generateError("ERROR", 500));