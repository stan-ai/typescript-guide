import { Autobind } from "../decorators/autobind.js";
import { Draggable } from "../models/drag-drop.js";
import { Project } from "../models/project.js";
import { Component } from "./base-component.js";

export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {
    private project: Project;

    get persons() {
        if (this.project.people === 1) {
            return "1 person";
        } else {
            return `${this.project.people} persons`;
        }
    }

    constructor(hostId: string, project: Project) {
        super("single-project", hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }

    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }

    renderContent() {
        this.element.querySelector("h2")!.textContent = this.project.title;
        this.element.querySelector("h3")!.textContent =
            this.persons + " assigned.";
        this.element.querySelector("p")!.textContent = this.project.desc;
    }

    @Autobind
    dragStartHandler(e: DragEvent) {
        e.dataTransfer!.setData("text/plain", this.project.id.toString());
        e.dataTransfer!.effectAllowed = "move";
    }

    @Autobind
    dragEndHandler(_: DragEvent) {
        console.log("Drag End!");
    }
}
