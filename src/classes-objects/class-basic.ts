// Classes and Objects

class Department{
    private employees: string[] = [] // private can be used in TypeScript as access modifiers

    // readonly can be added after access modifier to make a property readonly

    /*
    private readonly id: string;
    private name: string;

    constructor(id: string, name: string){
        this.id = id;
        this.name = name;
    }*/
    // this code block above can also be written in shothand manner as below
    constructor(private readonly id: string, public name: string){}

    describe(this: Department){
        console.log(`Department(${this.id}): ` + this.name);
    }

    addEmployee(employee: string){
        this.employees.push(employee);
    }

    printEmployeeInfo(){
        console.log(this.employees.length);
        console.log(this.employees);
    }
};

const itDept = new Department('17','I.T.');

itDept.describe();
itDept.addEmployee("Prem");
itDept.addEmployee("John");
itDept.printEmployeeInfo();


// Below line copies the describe method and add it to object itDeptCopy and not the name from itDept
// Hence the method describe() for itDeptCopy will print undefined
// To check this we can add describe(this: Department) to the function like self in python
// And after adding this the line "itDeptCopy.describe()" will throw compiler error

const itDeptCopy = { describe: itDept.describe };

// itDeptCopy.describe(); // Uncomment to see the error

