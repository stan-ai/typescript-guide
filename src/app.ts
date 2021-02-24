// Generics with Constraints 

function merge<T extends object, U extends object>(objA: T, objB: U){
    return Object.assign(objA, objB);
}

console.log(merge({name: "Prem"}, {age: 22}));

// const mergedObj = merge({name: "Prem"}, 30); // ERROR as now TS nows that Generic T and Generic U has to be an object
const mergedObj = merge({name: "Prem"}, {age: 22});

console.log(mergedObj.name);


// Functions

interface Lengthy{
    length: number;
}

// This can dynamically chech that the type T what is sent has a 'length' property as it extends Lengthy interface

function countAndDescribe<T extends Lengthy>(element: T): [T, string]{
    let descriptionText = "Got no Value.";
    if(element.length === 1){
        descriptionText = "Got 1 element."
    }
    else if (element.length > 1){
        descriptionText = "Got " + element.length + " elements.";
    }
    return [element, descriptionText];
}

console.log(countAndDescribe('Hi There!'));
console.log(countAndDescribe([1, 2, 3]));
console.log(countAndDescribe([]));
 