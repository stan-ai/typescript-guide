//Both the ways are the same, the latter is preferred

// Role in the below example is a tuple with strict length and types and if you have tuples in object you have to go with the first type (one with description of types)

const person: {name: string, age: number, hobbies: string[], role: [number, string]} = {
    name: "Prem",
    age: 22,
    hobbies: ['Sports', 'Travel'],
    role: [1, "ADMIN"]
};


enum Role { ADMIN, READ_ONLY, AUTHOR};

//This is a better code
const person2 = {
    name: "John",
    age: 30,
    hobbies: ['Cooking', 'Typing'],
    role: Role.ADMIN
}

//Declaring a var with a type
let favActivities: string[];

//Further down the road if we set the value
// favActivities = "Sports" //This throws error in TS
// favActivities = ["Sports", 1] // Only String values required
favActivities = ["Sports"] // Works fine

console.log(person.name);
console.log(person2);
if(person2.role == Role.ADMIN){
    console.log(person2.name + " is an Admin");
}

//JS style loop
for(const hobby of person.hobbies){
    console.log(hobby.toUpperCase()); // Here TS helps to do the string functions as it understands hobby as a string var Very helpful white development
    // hobby.map(); //ERROR as it knows that hobby is String and doesn't have a map function
}


// If you need something like JS, where you don't know the type beforehand, there is also a type called any

let var_name: any;
var_name = 5;
var_name = "String";

/*
Of course object types can also be created for nested objects.

Let's say you have this JavaScript object:

const product = {
  id: 'abc1',
  price: 12.99,
  tags: ['great-offer', 'hot-and-new'],
  details: {
    title: 'Red Carpet',
    description: 'A great carpet - almost brand-new!'
  }
}
This would be the type of such an object:

{
  id: string;
  price: number;
  tags: string[],
  details: {
    title: string;
    description: string;
  }
}
So you have an object type in an object type so to say.
*/