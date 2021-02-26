// Decorators

function Logger(constructor: Function){
    console.log("Logging..");
    console.log(constructor);
}

// @ is a special TS identifier, after which it is a function/Decorator

@Logger
class Person{
    name = 'Prem';

    constructor(){
        console.log("Creating person object...");
    }

}

// Decorators execute when the class is defined and not executed or instantiate

// You can remove the below lines and stll it will log stuff


const person = new Person();

console.log(person);
