// The Key constraint

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U){
    return obj[key];
}

// console.log(extractAndConvert({}, "name")); // ERROR becasue TS knows that the passed object doesn't have a key 'name'

console.log(extractAndConvert({name: "Prem"}, 'name')) ;

