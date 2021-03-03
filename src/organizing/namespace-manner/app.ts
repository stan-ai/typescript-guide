// The line below is not a normal comment, it is a special way to add the namespaces from other files, which start's from / / /

/// <reference path="components/project-input.ts"/>
/// <reference path="components/project-list.ts"/>


namespace App{
    const project = new ProjectInput();
    const activeProjectList = new ProjectList("active");
    const finishProjectList = new ProjectList("finished");

}

