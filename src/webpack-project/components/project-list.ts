import { Autobind } from "../decorators/autobind";
import { DragTarget } from "../models/drag-drop";
import { Project, PROJECT_STATUS } from "../models/project";
import { Component } from "./base-component";
import { globalState } from "../state/project-state";
import { ProjectItem } from "./project-item";

export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedProjects: Project[] = [];

    constructor(private type: "active" | "finished") {
        super("project-list", "app", false, `${type}-projects`);
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }

    @Autobind
    dragOverHandler(e: DragEvent) {
        if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
            e.preventDefault();
            const listEl = this.element.querySelector("ul")!;
            listEl.classList.add("droppable");
        }
    }

    @Autobind
    dropHandler(e: DragEvent) {
        const projectId = e.dataTransfer!.getData("text/plain");
        globalState.moveProject(
            projectId,
            this.type === "active"
                ? PROJECT_STATUS.ACTIVE
                : PROJECT_STATUS.FINISHED
        );
    }

    @Autobind
    dragLeaveHandler(e: DragEvent) {
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.remove("droppable");
    }

    renderContent() {
        const listId = `${this.type}-projects-lists`;
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector("h2")!.textContent =
            this.type.toUpperCase() + " PROJECTS";
    }

    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
        globalState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter((project) => {
                if (this.type === "active") {
                    return project.projectStatus === PROJECT_STATUS.ACTIVE;
                }
                return project.projectStatus === PROJECT_STATUS.FINISHED;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    private renderProjects() {
        const listElement = document.getElementById(
            `${this.type}-projects-lists`
        )! as HTMLUListElement;
        listElement.innerHTML = "";
        for (const project of this.assignedProjects) {
            new ProjectItem(this.element.querySelector("ul")!.id, project);
        }
    }
}
