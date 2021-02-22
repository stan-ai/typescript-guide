// Static methods and properties

class Department{
    private employees: string[] = [] 
    constructor(private readonly id: string, public name: string){}

    static fiscalYear = 2020; // Static property create

    // Static method create
    static createEmployee(name: string){
        return {name: name};
    }
};


// Static method use
const emp1 = Department.createEmployee('Prem');
console.log(emp1);
// Static property use
console.log(Department.fiscalYear);