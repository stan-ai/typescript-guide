/// <reference path="base-component.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../models/drag-drop.ts"/>
/// <reference path="../models/project.ts"/>


namespace App{
    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
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
}