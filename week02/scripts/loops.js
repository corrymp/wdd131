myInfo = {
    name: "Brother T",
    photo: "images/photo.jpg",
    favoriteFoods: ["Fettucini", "Steak", "Chicken", "Shrimp", "Baked Potato"],
    hobbies: ["Reading", "Fishing", "Camping"],
    placesLived: [
        {
            place: "Rexburg, ID",
            length: "5 years",
        },
        {
            place: "Ammon, ID",
            length: "3 years",
        },
        {
            place: "Sandy, UT",
            length: "1 year",
        },
    ],
};

function generateListMarkup(list, template) {
    const htmlList = list.map(template);
    return htmlList.join('');
}

function foodTemplate(food) {
    return `<li>${food}</li>`;
}

function placeTemplate(place) {
    return `<li><dt>${place.place}</dt><dd>${place.length}</dd></li>`;
}

document.querySelector("#favorite-foods").innerHTML = generateListMarkup(myInfo.favoriteFoods, foodTemplate);
document.querySelector("#places-lived").innerHTML = generateListMarkup(myInfo.placesLived, placeTemplate);

/* Check Understanding */
/*
Given the following variable declarations:

const DAYS = 6;
const LIMIT = 30;
let studentReport = [11, 42, 33, 64, 29, 37, 44];

- Write a for loop that will iterate through the studentReport array and print to the console the current array value if it is below 30.
- Write a while loop that will iterate through the studentReport array and print to the console the current array value if it is below 30.
- Write a forEach loop that will iterate through the studentReport array and print to the console the current array value if it is below 30.
- Write a for...in loop that will iterate through the studentReport array and print to the console the current array value if it is below 30.
- Use any type of repetition (looping) statement to dynamically produce the day names (Monday, Tuesday, Wednesday, etc.) of the next number of DAYS from today's date.
*/

const DAYS = 6;
const LIMIT = 30;
let studentReport = [11, 42, 33, 64, 29, 37, 44];
let j = studentReport.length;

console.log("for loop:");
for (i = 0; i < j; i++) {
    if (studentReport[i] < LIMIT) console.log(studentReport[i])
}

console.log("while loop:");
i = 0;
while (i < j) {
    if (studentReport[i] < LIMIT) console.log(studentReport[i]);
    i++;
}

console.log("forEach loop:");
function inList(item) {
    if (item < LIMIT) console.log(item);
}
studentReport.forEach(inList);

console.log("for..in loop");
for (i in studentReport) {
    if (studentReport[i] < LIMIT) console.log(studentReport[i]);
}

console.log("Days of the Week:");
let dayName = "";
let days = new Date().getDay();
i = 0;
while (i < LIMIT) {
    switch (days) {
        case 0:
            dayName = "Sunday"
            break;
        case 1:
            dayName = "Monday"
            break;
        case 2:
            dayName = "Tuesday"
            break;
        case 3:
            dayName = "Wednesday"
            break;
        case 4:
            dayName = "Thursday"
            break;
        case 5:
            dayName = "Friday"
            break;
        case 6:
            dayName = "Saturday"
            break;
        default:
            dayName = "invalid";
    };
    i++;
    days++;
    if (days >= DAYS) days = 0;
    console.log(dayName);
}
