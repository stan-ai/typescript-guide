namespace App{
    // Autobind Decorator

    export function Autobind(_: any, _2: string, descriptor: PropertyDescriptor){
        const originalMethod = descriptor.value;
        const ajustedDescriptor: PropertyDescriptor = {
            configurable: true,
            get(){
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }
        };
        return ajustedDescriptor;
    }
}