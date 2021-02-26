// Multiple Decorator

function Logger(logString: string){
    console.log("Logger Factory"); // FUNCTION FLOW: This runs first
    
    return function(constructor: Function){ // DECORATOR FLOW: This runs second
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string){ 
    console.log("Template Factory"); // FUNCTION FLOW: This runs second
    
    return function(constructor: any){
        console.log("Redering Template"); // DECORATOR FLOW: This runs first
        const hookElement = document.getElementById(hookId);
        const p = new constructor();
        if(hookElement){
            hookElement.innerHTML = template;
            hookElement.querySelector("h1")!.textContent = p.name;
        }
    }
}

/*
Multiple Decorators can be added to same class

The Actual Function runs in the call sequence i.e. Logger() first and then WithTemplate()

But the decorator part (return function()) runs in bottom up approach i.e. WithTemplate return() first and then Logger return()

Run this and look at the console
*/
@Logger("LOGGING - PERSON")
@WithTemplate("<h1>My Object</h1>", "any-id")   
class Person{
    name = "Prem";

    constructor(){
        console.log("Creating a person object");
    }
}
