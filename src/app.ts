// Sample Drag and Drop Project

// State Management

class ProjectState {
    private projects: any[] = [];
    private static instance: ProjectState;
    private listeners : any[] = [];

    private constructor(){
    }
    
    static getInstance(){
        if(!this.instance) this.instance = new ProjectState();
        return this.instance;
    }

    addListener(listenerFn: Function){
        this.listeners.push(listenerFn);
    }

    addProject(title: string, desc: string, people: number){
        const newProject = {
            id: Math.random().toString(),
            title: title,
            desc: desc,
            people: people
        }
        this.projects.push(newProject);
        for(const listenerFn of this.listeners){
            listenerFn(this.projects.slice());
        }
    };
}

const globalState = ProjectState.getInstance();

// Validation

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
};

function validate(validatable: Validatable){
    let isValid = true;
    if(validatable.required){
        isValid = isValid && validatable.value.toString().trim().length !== 0;
    }
    if(validatable.minLength != null && typeof validatable.value === 'string') {
        isValid = isValid && validatable.value.toString().trim().length > validatable.minLength;
    }
    if(validatable.maxLength != null && typeof validatable.value === 'string') {
        isValid = isValid && validatable.value.toString().trim().length < validatable.maxLength;
    }
    if(validatable.min != null && typeof validatable.value === 'number') {
        isValid = isValid && validatable.value > validatable.min;
    }
    if(validatable.max != null && typeof validatable.value === 'number') {
        isValid = isValid && validatable.value < validatable.max;
    }
    return isValid;
}

// Autobind Decorator

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor){
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

// Render Lists

class ProjectList{
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: any[] = [];

    constructor(private type: 'active' | 'finished'){
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
    
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;

        globalState.addListener((projects: any[]) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }

    private renderProjects(){
        const listElement = document.getElementById(`${this.type}-projects-lists`)! as HTMLUListElement;
        for(const project of this.assignedProjects){
            const listItem = document.createElement('li');
            listItem.textContent = project.title;
            listElement.appendChild(listItem);
        }
    }

    private renderContent(){
        const listId = `${this.type}-projects-lists`;
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector("h2")!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private attach(){
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInput: HTMLInputElement;
    descInput: HTMLInputElement;
    peopleInput: HTMLInputElement;

    constructor(){
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement; // Casting required becasue TS doen't scan HTML elements
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInput = this.element.querySelector('#title') as HTMLInputElement;
        this.descInput = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInput = this.element.querySelector('#people') as HTMLInputElement;
        
        this.configure();
        this.attach();
    }

    private gatherUserInput(): [string, string, number] | void{
        const inputTitle = this.titleInput.value;
        const inputDesc = this.descInput.value;
        const inputPeople = this.peopleInput.value;

        const titleValidatable: Validatable = {
            value: inputTitle,
            required: true
        };
        const descValidatable: Validatable = {
            value: inputDesc,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validatable = {
            value: +inputPeople,
            required: true,
            min: 1,
            max: 5
        };

        if(!validate(titleValidatable) || !validate(descValidatable) || !validate(peopleValidatable)){
            alert('Invalid Input, Please Try Again');
            return;
        }
        else{
            return [inputTitle, inputDesc, +inputPeople];
        }
    }

    private clearInputs(){
        this.titleInput.value = "";
        this.descInput.value = "";
        this.peopleInput.value = "";
    }

    @Autobind
    private submitHandler(e: Event){
        e.preventDefault();
        const userInputs = this.gatherUserInput();
        if (Array.isArray(userInputs)){
            const [title, desc, people] = userInputs;
            console.log(title, desc, people);
            globalState.addProject(title, desc, people);
            this.clearInputs();
        }
    }

    private configure(){
        this.element.addEventListener('submit', this.submitHandler);
    }

    private attach(){
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const project = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishProjectList = new ProjectList("finished");