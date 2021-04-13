// By default import _ from "lodash" throws an error as it is an JS library just made for JavaScript
// But we can search for lodash types and get a package called @types/lodash
// As soon as we npm install that package the error goes and it works completely fine.
// We can find types for probably every popular 3rd party library out there.

import _ from "lodash";
import "reflect-metadata";
import "es6-shim";
import { plainToClass } from "class-transformer";

console.log(_.shuffle([1, 4, 5, 2, 3]));

// But what if there isn't a types for some specific JS package/code
// here we can declare variables and we can say this to TS that don't worry about this code
// Like there is some JS Script which has a global Variable named "GLOBAL_VAR" if we write

// console.log(GLOBAL_VAR) // here, it will throw error. uncomment and see

// hence we can declare a variable with it's type and say that don't worry, it will exist

// declare var GLOBAL_VAR: string;
// console.log(GLOBAL_VAR);

// The above code works fine

import { Product } from "./product.model";
import { validate } from "class-validator";

const p1 = new Product("A Book", 12.99);
console.log(p1.getInfo());
// this works fine

const products = [
    { title: "A Carpet", price: 29.99 },
    { title: "A Book", price: 19.99 },
];

// console.log(products[0].getInfo()); // This doesn't work as the products array is same but it is not the actual object of Products class

// Traditional way would be

const loadedProducts = products.map(
    (product) => new Product(product.title, product.price)
);

console.log(loadedProducts[0].getInfo());
// This works fine, but is an extra step

// New way

const loadedProductsNew = plainToClass(Product, products);

console.log(loadedProductsNew);
console.log(loadedProductsNew[0].getInfo()); // This does work

// After adding Class-Validator

const newProd = new Product("", -12.99);
validate(newProd).then((errors) => {
    if (errors.length > 0) {
        console.log("VALIDATION ERROR");
        console.log(errors);
        return;
    }
    console.log(newProd);
});
