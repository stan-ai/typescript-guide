// Built-In Generic Utilities

interface CourseGoal{
    title: string;
    description: string;
    completeUntil: Date;
};

function createCourseGoal(title: string, description: string, date: Date): CourseGoal{
    let courseGoal: Partial<CourseGoal> = {};  // Partial Utility temporarily switch an object to optional and then eventually cast it to the Type
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ['Prem', 'John'];

// names.push('') // ERROR as Readonly utility knows that it can't be modified

console.log(names);
