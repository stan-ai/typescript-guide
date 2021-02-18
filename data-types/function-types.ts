// The :number in the last after parameters is a return type

function add (n1: number, n2: number): number{
    return n1 + n2;
}

function printResult(num: number): void{
    console.log("Result: " + num);

    // return 1; // ERROR, the return type is void, so you can't return stuff. Good Check
}

printResult(add(2,5));

// Function Type: A type for a function

let addResult: (a: number, b: number) => number;

addResult = add;
// addResult = printResult; // ERROR, only Function with defined type accepted
// addResult = 5 // ERROR, only functions accepted

console.log(addResult(8, 8));

// Function type callback

function addHandle(n1: number, n2: number, cb: (num: number) => void){
    cb(n1+n2);
}

addHandle(10, 20, (result) => {
    console.log(result)
});

// Belowc code throws ERROR, as it knows the type, in which the callback function only have 1 arguement and not 2

/*
addHandle(10, 20, (result, otherArguement) => {
    console.log(result)
});
*/
