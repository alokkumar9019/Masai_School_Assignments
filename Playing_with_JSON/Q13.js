function manageStudents(students) {

    // Add "David" at index 1
    let idx=1;
    let newStudent="David"
    students.splice(idx, 0, newStudent);
    console.log(students);
    // Check if "Eve" is in the list
    let isPresent="Eve";
    console.log(students.includes(isPresent));

    // Convert the array to a string with names separated by commas
    console.log(students.join(","));
}
let students = ["Alice", "Bob", "Charlie"];
manageStudents(students);

