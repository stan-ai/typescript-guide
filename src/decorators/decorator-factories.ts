// Decorator Factories

function Logger(logString: string){
    return function(constructor: Function){
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string){ // It gets the template and hookid from person and directly goes to index.html and adds the template
    return function(constructor: any){
        const hookElement = document.getElementById(hookId);
        const p = new constructor();
        if(hookElement){
            hookElement.innerHTML = template;
            hookElement.querySelector("h1")!.textContent = p.name; // Meta programming - Dynamic render with decorators based on which class has the decorator applied
        }
    }
}

@Logger("LOGGING - PERSON") // through factory method, we can customize function by passing any number arguememts
class Person{
    name = "Prem";

    constructor(){
        console.log("Creating a person object");
    }
}

@WithTemplate("<h1>My Object</h1>", "any-id") // through factory method, we can customize function by passing any number arguememts
class Person1{
    name = "Prem";

    constructor(){
        console.log("Creating a person2 object");
    }
}
