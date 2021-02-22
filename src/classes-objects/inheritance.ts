// Inheritance

class Department{
    private employees: string[] = [] 
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


// extends is used for inheritance

class ITDepartment extends Department{
    constructor(id: string, public admins: string[]){
        super(id, "I.T.");    
    }
}

const itDept = new ITDepartment('17', ['Prem', 'John']);

console.log(itDept);



class AccDepartment extends Department{
    constructor(id: string, private reports: string[]){
        super(id, "Accounting.");    
    }

    addReport(this: AccDepartment,report: string){
        this.reports.push(report);
    }

    printReports(this: AccDepartment){
        console.log(this.reports);
    }
}

const accDept = new AccDepartment('10', ['Report 1']);

accDept.addReport("Report 2");
console.log(accDept);
accDept.printReports();