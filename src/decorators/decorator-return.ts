// return in Decorator

// Here we can add a custom feature where the decorators don't run while initializing class
// but it can run while instantiating the class

function WithTemplate(template: string, hookId: string){
    return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T){
        return class extends originalConstructor { // Here we are returning a custom instance which calls super() and then adds some functionality to it
            constructor(...args: any[]) {
                super();
                const hookElement = document.getElementById(hookId);
                if(hookElement){
                    hookElement.innerHTML = template;
                    hookElement.querySelector("h1")!.textContent = this.name; 
                }
            }
        }
    }
}

@WithTemplate("<h1>My Object</h1>", "any-id") // through factory method, we can customize function by passing any number arguememts
class Person{
    name = "Prem";

    constructor(){
        console.log("Creating a person2 object");
    }
}

const person = new Person(); // Now commenting/removing this line won't set the <h1> tag to Prem, it only runs when we create an object