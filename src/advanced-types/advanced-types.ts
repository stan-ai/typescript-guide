// Advanced Types

// Intersection type
type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

// This incluldes both the type
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: "Prem",
    privileges: ['admin'],
    startDate: new Date()
};

console.log(e1);



// It can also be used with core types
type Combinable = string | number;
type Numeric = number | boolean;
// Universal becomes the union of all the types
type Universal = Combinable & Numeric;



// TypeGuards

function addFn(a: Combinable, b: Combinable){

    // This is TypeGuard typeof of core/primitive types
    if (typeof a === 'string' || typeof b === 'string'){
        return a.toString() + b.toString();
    }
    return a + b;
}

console.log(addFn(5, 2));


type UnknownEmployee = Employee | Admin;

function printEmplpyeeInfo(emp: UnknownEmployee){
    console.log(emp.name);
    
    // Custom Typeguard in TS
    if ('privileges' in emp){
        console.log(emp.privileges);
    }
    if('startDate' in emp){
        console.log(emp.startDate);
    }
}

printEmplpyeeInfo(e1);



class Car{
    drive(){
        console.log("Driving.");
    }
};

class Truck{
    drive(){
        console.log("Driving a Truck");
    }

    loadCargo(amount: number){
        console.log("Loading Cargo " + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle){
    vehicle.drive();

    // Custom Class TypeGuard only works with classes, not Inerfaces
    if(vehicle instanceof Truck){
        vehicle.loadCargo(10);
    }
}

useVehicle(v1);
useVehicle(v2);



// Discriminated Union - adding type propoerty so we can use it in if condition

interface Bird{
    type: 'bird';
    flyingSpeed: number
}

interface Horse{
    type: 'horse';
    runningSpeed: number
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal){
    switch(animal.type){
        case 'bird':
            console.log("Flying speed: " + animal.flyingSpeed);
            break;
        case 'horse':
            console.log("Running speed: " + animal.runningSpeed);
            break;
    }
}

moveAnimal({type: "bird", flyingSpeed: 100});


// Type Casting
// 2 ways to type cast

// 1 add <> and add the type
const userInputElement = <HTMLInputElement>document.getElementById("any-id");

// userInputElement.value = "Hi there!"; // Uncomment to see the error (Error becasue we don't have 'any-id' element)


// 2 MAJORLY FOR REACT (As React has <> for JSX code)

const userInputElement2 = document.getElementById("any-id")! as HTMLInputElement;

// userInputElement2.value = "Hi there!"; // Uncomment to see the error (Error becasue we don't have 'any-id' element)



// Index properties


// we need an object where we know the type but we don't know how many there will be there and what names will be there for properties

interface ErrorContainer {
    id: string;
    //id: number; // ERROR as only one tyle is allowed in index types
    [prop: string]: string // this is called indexing
}

const errorBag: ErrorContainer = {
    id: 'Error-id',
    email: "Not a valid email!",
    username: "Must start with a capital character"
}

console.log(errorBag);



// Function Overloads

function add(a: string, b: string): string
function add(a: number, b:number): number
function add(a: Combinable, b: Combinable): Combinable{
    if (typeof a === 'string' || typeof b === 'string'){
        return a.toString() + b.toString();
    }
    return a + b;
}

// now TypeScript knows that passing number would yield number
const result = add(1,2);



// Optional Chaining

const fetchedUserData = {
    id: '009',
    name: 'Prem',
    job: { // what if this is another async and would take time or we are not sure that if this will exists
        title: 'Software Engineer',
        description: 'STAN AI'
    }
};

console.log(fetchedUserData.job && fetchedUserData.job.title); // JS Way

console.log(fetchedUserData?.job?.title); // TS Way, if job exists then only access title




// Nullish Coalescing

const userInput = ""; // If we are fetching this from API, then TS might not know that it is null or not

const storedData = userInput || 'DEFAULT'; // In this case even if the fetch call was '' empty string, it will consider falsy and take DEFAULT as value


const storedDataTS = userInput ?? 'DEFAULT'; // TS way, it only checks if the userInput is null/undefined not empty string or valid messages

console.log(storedData);
console.log(storedDataTS);



