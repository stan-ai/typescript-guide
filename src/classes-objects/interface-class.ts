// Interfaces with Classes

interface Greetable{
    name: string;

    greet(phrase: string): void;
};


class Person implements Greetable{

    constructor(public name: string){}
    greet(phrase: string): void {
        console.log(phrase + " " + this.name);
    }

}
let user1: Greetable;

user1 = new Person("Prem");

user1.greet("Good Morning!");