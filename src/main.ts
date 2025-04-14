/* TypeSript moment 1, Rosali Johansson 2025-04-11
Application to save courses */

//load courses at website start
window.onload = loadCourses;

//declare variables from HTML elements
let savebuttonEl = document.getElementById("submit") as HTMLButtonElement;
let coursenameEl = document.getElementById("coursename") as HTMLInputElement;
let coursecodeEl = document.getElementById("coursecode") as HTMLInputElement;
let syllabusEl = document.getElementById("syllabus") as HTMLInputElement;
let progressionEl = document.getElementById("progression") as HTMLInputElement;
let courselistEl = document.getElementById("courselist") as HTMLUListElement;


//typescript interface for course object
interface courseInfo {
  coursename: string,
  coursecode: string,
  syllabus: string,
  progression: string,
}

//object of course input
const courses: courseInfo[] = [];


//eventlistener for save button, taking the value of the input fields into courseInfo interface.
savebuttonEl.addEventListener("click", (event) => {
  event.preventDefault(); //prevent the website to reload
  const newCourse: courseInfo = {
      coursename: coursenameEl.value,
      coursecode: coursecodeEl.value,
      syllabus: syllabusEl.value,
      progression: progressionEl.value
    }; 
    //save into saveInput function
  saveInput(newCourse)});

//function for input controls
function saveInput(newCourse: courseInfo){
//if-statement for verifying the coursecode so the new coursecode input is not the same as in "courses" object.
if (courses.some(course => course.coursecode === newCourse.coursecode)) {
  alert("Coursecode is not unique! Maybe you have already added this course? Please fill in a new course.");
return;
};
//if-statement for verifying that the progression input is nothing else than "a", "b", or "c".
if (!["A", "B", "C", "a", "b", "c"].includes(newCourse.progression)) {
  alert("Course progression must be A, B or C")
  return;
};

//If input is correct, run function saveCourse with parameter newCourse
saveCourse(newCourse) 

//clear input fields
   coursenameEl.value ="";
    coursecodeEl.value ="";
    syllabusEl.value ="";
    progressionEl.value ="";
};

//function for saving the course using DOM-manipulation and saving the course object into localstorage
function saveCourse(course: courseInfo): void {

  //save course input into courses object
  courses.push(course)
  //save to local storage
  localStorage.setItem("courses", JSON.stringify(courses));

  //create delete button to delete course
  let deletebutton = document.createElement("button") as HTMLButtonElement;
  deletebutton.textContent = "remove";
  deletebutton.addEventListener("click", () => deleteCourse(course, newItem));

  //create li element, add course info into li element
  let newItem = document.createElement("li") as HTMLLIElement;
  newItem.innerHTML = `<p id="fat">Coursename:</p><p>
   ${course.coursename}</p> <p id="fat">Coursecode:</p> 
   <p>${course.coursecode}</p> <p id="fat">Syllabus:</p> 
   <a href="${course.syllabus}">${course.syllabus}</a> 
   <p id="fat">Progression:</p> <p>${course.progression}</p>`
//DOM-manipulation to include li element with delete button into ul-list courselist
  newItem.appendChild(deletebutton);
  courselistEl.appendChild(newItem);
}; 

// Function to load courses from localStorage
function loadLocalStorage(): courseInfo[] {
  //get courses from localstorage
  const storedCourses = localStorage.getItem("courses");
  if (storedCourses) {
    return JSON.parse(storedCourses);  //return courses to js object
  }
  return [];  //empty array if no courses are stored
};

// Function to load and display courses from localStorage when the page loads
function loadCourses(): void {
  const storedCourses = loadLocalStorage();
courses.push(...storedCourses); //load localstorage into courses object

//create HTML list element and delete button for each added course
  storedCourses.forEach((course) => {
    let newItem = document.createElement("li") as HTMLLIElement;
    let deletebutton = document.createElement("button") as HTMLButtonElement;
    deletebutton.textContent = "Remove";
    deletebutton.addEventListener("click", () => deleteCourse(course, newItem));
    newItem.innerHTML = `
      <p id="fat">Coursename:</p> <p>${course.coursename}</p> 
      <p id="fat">Coursecode:</p> <p>${course.coursecode}</p> 
      <p id="fat">Syllabus:</p> <a href="${course.syllabus}">${course.syllabus}</a> 
      <p id="fat">Progression:</p> <p>${course.progression}</p>
    `;
    newItem.appendChild(deletebutton);
    courselistEl.appendChild(newItem);
  });
};

//function for saving the local storage after deleting a course
function saveLocalStorage(courses: courseInfo[]): void {
  localStorage.setItem("courses", JSON.stringify(courses));
 }

 //function for deleting a course when clicking the remove course button
function deleteCourse(course: courseInfo, listItem: HTMLLIElement): void{
//remove listItem from DOM
listItem.remove();
//update courses with filtering out the course that needs to be removed
const updatedCourses = courses.filter(courseToRemove => course.coursecode !== courseToRemove.coursecode);
//save updated courses in saveLocalStorage function
saveLocalStorage(updatedCourses);
}

