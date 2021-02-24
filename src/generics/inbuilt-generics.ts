// Generics 

const names: Array<string> = []; // Arrat<T>, where T is generic it could be any type i.e. string, number, Some CLASS etc

// names.push(2); // ERROR, because TS knows that names is Array of type string

names.push('Prem') // Works Fine
console.log(names);


const promise: Promise<number> = new Promise((resolve, reject) => { // Promise<T> to Promise<number>
    setTimeout(() => {
        resolve(10);
    }, 2000)
});

promise.then(data => {
    // data.split(); // ERROR because now TS knows that the promise will eventually be a number and not string
    console.log(data);
});
