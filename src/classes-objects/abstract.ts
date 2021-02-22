// Method Overiding Getter Setter

abstract class Department{
    private employees: string[] = [] 
    constructor(protected readonly id: string, public name: string){} // protected to allow id to be used by inheriting classes

    abstract describe(this: Department): void; // abstract method declaration

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

    // Method overiding

    addEmployee(employee: string){
        if(employee == 'John') return
        super.addEmployee(employee);
    }


    // Abstract method implementation
    describe() {
        console.log("IT Department: " + this.id);
    }
}

const itDept = new ITDepartment('17', ['Prem']);
itDept.addEmployee("John");
itDept.addEmployee("Doe");
itDept.describe();


class AccDepartment extends Department{
    private lastReport: string;

    // Getter of the value lastReport
    get recentReport(){
        if(this.lastReport){
            return this.lastReport;
        }
        throw new Error("No Report Found");
    }

    set recentReport(value: string){
        this.addReport(value);
    }
    constructor(id: string, private reports: string[]){
        super(id, "Accounting.");
        this.lastReport = reports[0];    
    }

    addReport(this: AccDepartment,report: string){
        this.reports.push(report);
        this.lastReport = report;
    }

    printReports(this: AccDepartment){
        console.log(this.reports);
    }

    describe(){
        console.log("Accounting Department id: " + this.id);
    }
}

const accDept = new AccDepartment('10', ['Report 1']);
accDept.describe();