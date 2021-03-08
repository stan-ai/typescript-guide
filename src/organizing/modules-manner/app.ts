// The line below is not a normal comment, it is a special way to add the namespaces from other files, which start's from / / /
import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
