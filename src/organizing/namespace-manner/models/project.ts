//Enum

namespace App {
    export enum PROJECT_STATUS { ACTIVE, FINISHED}

    // Project

    export class Project{
        constructor(public id: string,public title: string, public desc: string, public people: number, public projectStatus: PROJECT_STATUS){}
    }
}