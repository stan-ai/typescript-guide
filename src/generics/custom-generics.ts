// Custom Generics 

function merge<T, U>(objA: T, objB: U){
    return Object.assign(objA, objB);
}

console.log(merge({name: "Prem"}, {age: 22}));


const mergedObj = merge({name: "Prem"}, {age: 22});

console.log(mergedObj.name); // ERROR Can't access without Generic added i.e. <T, U> above, try removing that and see the error