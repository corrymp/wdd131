// task 1
const steps = ["one", "two", "three"];
const listTemplate = (step) => { return `<li>${step}</li>` }
const stepsHtml = steps.map(listTemplate);
document.querySelector("#myList").innerHTML = stepsHtml.join('');

// task 2
const grades = ['A', 'B', 'A']
const getGpa = (letter) => {
    switch (letter) {
        case ('A'): return 4;
        case ('B'): return 3;
        case ('C'): return 2;
        default: return 0;
    }
}
const gpaPoints = grades.map(getGpa);

// task 3
const calcGpa = gpaPoints.reduce((sum, value) => sum + value) / gpaPoints.length;
console.log(grades)
console.log(gpaPoints)
console.log(calcGpa)

// task 4
const fruit = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
const fruitMoreSixLetters = fruit.filter((fruit) => fruit.length > 6);
console.log(fruitMoreSixLetters)

// task 5
const numbers = [12, 34, 21, 54];
const luckyNumber = 21;
function luckyNumberInList(numbers, luckyNumber) {
    if (numbers.indexOf(luckyNumber) > -1) {
        return true
    }
    return false
}
console.log("Lucky Number in Number List: " + luckyNumberInList(numbers, luckyNumber))


/*********************\
|And now for something|
|completely different!|
\*********************/

// Given the following object definition:
let object1 = { 'key1': 'value1', 'key2': 'value2' }
// Which of the following JavaScript statements accesses the value associated with the key2 key for this variable and stores it in a variable named var#?
// (The variable var# may or may not already exist.)

// 1. let var1 = object1['key2']
// 2. let var2 = object1.key2
// 3. var3.object1.key2
// 4. const var4 = object1[0].key2[1]

// Let's have a look, shall we?

let var1 = object1.key2 // option 1: The clearly correct one
console.log(var1)

let var2 = object1['key2'] // option 2: Also correct
console.log(var2)

let var3 = { object1 }
console.log(var3.object1.key2) // option 3: Rather insane but I guess it works

let key2 = [object1.key1, object1.key2]
object1 = [{ key2 }]
const var4 = object1[0].key2[1] // option 4: You are completely out of your mind
console.log(var4)

// Now let's check it by changing the value of key2
object1.key2 = 'still value2'

var1 = object1.key2 // Still good
console.log(var1)

var2 = object1['key2'] // Also good
console.log(var2)

var3 = { object1 }
console.log(var3.object1.key2) // The insanity lends to its robustness

key2 = [object1.key1, object1.key2]
object1 = [{ key2 }]
const var4v2 = object1[0].key2[1] // Can't reassign this one, but the method still works fine
console.log(var4v2)

// Conclusion: I am insane