// Decorator Properties

function Logger(target: any, propertyName: string | Symbol){
    console.log("Property Decorator");
    console.log(propertyName);
    console.log(target);
    
}

class Product{

    @Logger
    title: string;

    set setPrice(value: number){ 
        if(value>0){
            this._price = value
        }
        else {
            throw new Error("Price must be positive!");
        }
    }

    constructor(title: string, private _price: number){
        this.title = title;
    }

    getPriceWithTax(tax: number){
        return this._price * (1 + tax);
    }
}
