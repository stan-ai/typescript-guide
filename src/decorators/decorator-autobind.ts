// Autobind in Decorator

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    };
    return adjustedDescriptor;
}

class Printer {
    message = 'This works';

    @Autobind   // Adding this and this is a TS solution
    showMessage(){
        console.log(this.message);
    }
};

const button = document.querySelector('button')!;
const p = new Printer();
button.addEventListener('click', p.showMessage) // This will print 'undefined' as the 'p' doesn't have the same context inside event listener
// To actually see it print 'undefined', remove the @Autobind Decorator aboove the showMessage() method.

button.addEventListener('click', p.showMessage.bind(p)); // Basic JS Solution

