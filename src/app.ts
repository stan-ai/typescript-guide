// Options with interface

// Interface with functions

interface addFn{
    (a: number, b:number): number;
}

let add: addFn;

add = (n1: number, n2:number) => {
    return n1 + n2;
}

console.log(add(2,3));




interface Named {
    readonly name: string; // readonly to fields which becomes readonly to all  the implemented classes
    outputName?: string; // ? = optional, so the implemented classes might have might not have the property

    // you can also mark methods as options like > myMethod?(){...}
}

interface Greetable {
    greet(phrase: string): void;
};

/*
interface Named{}
interface Greetable extends Named{}
Person implements Greetable{}

is same as

Person implements Greetable, Named{}
*/

class Person implements Greetable, Named{

    constructor(public name: string){}

    greet(phrase: string): void {
        console.log(phrase + " " + this.name);
    }

}

let user1: Greetable;

user1 = new Person("Prem");

user1.greet("Good Morning!");