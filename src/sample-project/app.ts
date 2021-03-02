// Sample Drag and Drop Project

// Drag and Drop Interfaces

interface Draggable{
    dragStartHandler(e: DragEvent): void;
    dragEndHandler(e: DragEvent): void;
}

interface DragTarget{
    dragOverHandler(e: DragEvent): void;
    dropHandler(e: DragEvent): void;
    dragLeaveHandler(e: DragEvent): void;
}

//Enum

enum PROJECT_STATUS { ACTIVE, FINISHED}

// Project

class Project{
    constructor(public id: string,public title: string, public desc: string, public people: number, public projectStatus: PROJECT_STATUS){}
}

// custom type

type Listener<T> = (items: T[]) => void;
// State Management

class State<T>{
    protected listeners : Listener<T>[] = [];

    addListener(listenerFn: Listener<T>){
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;
    
    private constructor(){
        super();
    }
    
    static getInstance(){
        if(!this.instance) this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, desc: string, people: number){
        const newProject = new Project(
            Math.random().toString(),
            title,
            desc,
            people,
            PROJECT_STATUS.ACTIVE
        )
        this.projects.push(newProject);
        this.updateListeners();
    };

    moveProject(projectId: string, newStatus: PROJECT_STATUS){
        const foundProject = this.projects.find(project => project.id === projectId);
        if(foundProject && foundProject.projectStatus !== newStatus){
            console.log(foundProject, newStatus);
            
            foundProject.projectStatus = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners(){
        for(const listenerFn of this.listeners){
            listenerFn(this.projects.slice());
        }
    }
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
        isValid = isValid && validatable.value >= validatable.min;
    }
    if(validatable.max != null && typeof validatable.value === 'number') {
        isValid = isValid && validatable.value <= validatable.max;
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

// Component Base class

abstract class Component<T extends HTMLElement, U extends HTMLElement>{
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostelementId: string,insertAtStart: boolean ,newElementId?: string){
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostelementId)! as T;
    
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if(newElementId){
            this.element.id = newElementId;
        }

        this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean){
        this.hostElement.insertAdjacentElement( insertAtStart? 'afterbegin' : 'beforeend', this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
    private project: Project;

    get persons(){
        if(this.project.people === 1){
            return '1 person';
        }
        else{
            return `${this.project.people} persons`
        }
    }

    constructor(hostId: string, project: Project){
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }

    configure(){
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent(){
        this.element.querySelector("h2")!.textContent = this.project.title;
        this.element.querySelector("h3")!.textContent = this.persons + ' assigned.';
        this.element.querySelector("p")!.textContent = this.project.desc;
    }

    @Autobind
    dragStartHandler(e: DragEvent){
        e.dataTransfer!.setData("text/plain", this.project.id.toString());
        e.dataTransfer!.effectAllowed = 'move';
    }

    @Autobind
    dragEndHandler(_: DragEvent){
        console.log('Drag End!');
        
    }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
    
    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished'){
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }

    @Autobind
    dragOverHandler(e: DragEvent){
        if(e.dataTransfer && e.dataTransfer.types[0] === 'text/plain'){
            e.preventDefault();
            const listEl = this.element.querySelector("ul")!;
            listEl.classList.add('droppable');
        }
        
    }

    @Autobind
    dropHandler(e: DragEvent){
        const projectId = e.dataTransfer!.getData('text/plain');
        globalState.moveProject(projectId, this.type === 'active' ? PROJECT_STATUS.ACTIVE : PROJECT_STATUS.FINISHED);
    }

    @Autobind
    dragLeaveHandler(e: DragEvent){
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.remove('droppable');
    }

    renderContent(){
        const listId = `${this.type}-projects-lists`;
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector("h2")!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        globalState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === 'active'){
                    return project.projectStatus === PROJECT_STATUS.ACTIVE
                }
                return project.projectStatus === PROJECT_STATUS.FINISHED
            })
            this.assignedProjects = relevantProjects;
            this.renderProjects(); 
        });
    }

    private renderProjects(){
        const listElement = document.getElementById(`${this.type}-projects-lists`)! as HTMLUListElement;
        listElement.innerHTML = '';
        for(const project of this.assignedProjects){
            new ProjectItem(this.element.querySelector('ul')!.id, project);
        }
    }
  
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInput: HTMLInputElement;
    descInput: HTMLInputElement;
    peopleInput: HTMLInputElement;

    constructor(){
        super('project-input','app',true,'user-input');
        this.titleInput = this.element.querySelector('#title') as HTMLInputElement;
        this.descInput = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInput = this.element.querySelector('#people') as HTMLInputElement;
        
        this.configure();
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

    configure(){
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent(){}

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

}

const project = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishProjectList = new ProjectList("finished");
