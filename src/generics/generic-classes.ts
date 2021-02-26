// Generic Classes

class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T){
        this.data.push(item);
    }

    removeItem(item: T){
        this.data.splice(this.data.indexOf(item),1);
    }

    getItems(){
        return [...this.data];
    }
}


const textStorage = new DataStorage<string>();
// textStorage.addItem(1); // ERROR as TS knows that <string> can't have number

textStorage.addItem("Prem");
textStorage.addItem("John");

console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
// numberStorage.addItem("Text") // ERROR
console.log(numberStorage.getItems());


