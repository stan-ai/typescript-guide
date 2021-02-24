// Generics with Constraints 

function merge<T extends object, U extends object>(objA: T, objB: U){
    return Object.assign(objA, objB);
}

console.log(merge({name: "Prem"}, {age: 22}));

// const mergedObj = merge({name: "Prem"}, 30); // ERROR as now TS nows that Generic T and Generic U has to be an object
const mergedObj = merge({name: "Prem"}, {age: 22});

console.log(mergedObj.name);

