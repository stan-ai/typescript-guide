// Decorator for validatuon

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[] // ['required', 'positive]    
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string){
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required']
    }
}

function PositiveNumber(target: any, propName: string){
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive']
    }
}

function validate(obj: any){
    const objectValidatorConfig = registeredValidators[obj.constructor.name];
    if(!objectValidatorConfig){
        return true;
    }
    let isValid = true;
    for(const prop in objectValidatorConfig){
        for(const validator of objectValidatorConfig[prop]){
            switch(validator){
                case 'required':
                    isValid = isValid && !!obj[prop]; // !! makes the obj[prop] truly boolean
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course{
    @Required
    title: string;

    @PositiveNumber
    price: number;

    constructor(title: string, price: number){
        this.title = title;
        this.price = price;
    }


}

let inputTitleData = "Value"  // Change this values to see te validations
let inputPriceData = 10;

const createdCourse = new Course(inputTitleData, inputPriceData);

if(!validate(createdCourse)){
    throw new Error("Invalid Data. Try again");
}

console.log(createdCourse);
