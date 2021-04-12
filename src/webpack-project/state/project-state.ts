import { Project, PROJECT_STATUS } from "../models/project";

type Listener<T> = (items: T[]) => void;
// State Management

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (!this.instance) this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, desc: string, people: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            desc,
            people,
            PROJECT_STATUS.ACTIVE
        );
        this.projects.push(newProject);
        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: PROJECT_STATUS) {
        const foundProject = this.projects.find(
            (project) => project.id === projectId
        );
        if (foundProject && foundProject.projectStatus !== newStatus) {
            console.log(foundProject, newStatus);

            foundProject.projectStatus = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

export const globalState = ProjectState.getInstance();
