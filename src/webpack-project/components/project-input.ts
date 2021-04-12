import { Autobind } from "../decorators/autobind";
import { Component } from "./base-component";
import { globalState } from "../state/project-state";
import { Validatable, validate } from "../util/validation";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInput: HTMLInputElement;
    descInput: HTMLInputElement;
    peopleInput: HTMLInputElement;

    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInput = this.element.querySelector(
            "#title"
        ) as HTMLInputElement;
        this.descInput = this.element.querySelector(
            "#description"
        ) as HTMLInputElement;
        this.peopleInput = this.element.querySelector(
            "#people"
        ) as HTMLInputElement;

        this.configure();
    }

    private gatherUserInput(): [string, string, number] | void {
        const inputTitle = this.titleInput.value;
        const inputDesc = this.descInput.value;
        const inputPeople = this.peopleInput.value;

        const titleValidatable: Validatable = {
            value: inputTitle,
            required: true,
        };
        const descValidatable: Validatable = {
            value: inputDesc,
            required: true,
            minLength: 5,
        };
        const peopleValidatable: Validatable = {
            value: +inputPeople,
            required: true,
            min: 1,
            max: 5,
        };

        if (
            !validate(titleValidatable) ||
            !validate(descValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert("Invalid Input, Please Try Again");
            return;
        } else {
            return [inputTitle, inputDesc, +inputPeople];
        }
    }

    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent() {}

    private clearInputs() {
        this.titleInput.value = "";
        this.descInput.value = "";
        this.peopleInput.value = "";
    }

    @Autobind
    private submitHandler(e: Event) {
        e.preventDefault();
        const userInputs = this.gatherUserInput();
        if (Array.isArray(userInputs)) {
            const [title, desc, people] = userInputs;
            console.log(title, desc, people);
            globalState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
}
