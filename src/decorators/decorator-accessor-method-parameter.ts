// Decorator Accessor and Parameters

function LoggerAccessor(target: any, name: string, descriptor: PropertyDescriptor){
    console.log("Access Decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function LoggerMethod(target: any, name: string | Symbol, descriptor: PropertyDescriptor){
    console.log("Method Decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function LoggerParameter(target: any, name: string | Symbol, position: number){
    console.log("Parameter Decorator");
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product{

    title: string;

    @LoggerAccessor
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

    @LoggerMethod
    getPriceWithTax(@LoggerParameter tax: number){
        return this._price * (1 + tax);
    }
}
