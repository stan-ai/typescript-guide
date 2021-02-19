// Core Datatypes: number, boolean, string

function add(n1: number, n2: number, showResult: boolean,phrase: string){
    if(showResult) console.log(phrase + (n1 + n2));
    else return n1 + n2 ;
}

const number1 = 9;
const number2 = 4.5;
const printResult = true;
const resultPhrase = 'Result is: ';

add(number1, number2, printResult, resultPhrase); 