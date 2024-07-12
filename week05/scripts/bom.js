const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");
let chaptersArray = getChapterList() || [];

function getChapterList() {

}

chaptersArray.forEach(chapter => {
    displayList(chapter);
});
/*


*/
function displayList(item) {
    const chapter = document.createElement("li");
    list.appendChild(chapter);

    const span = document.createElement("span");
    chapter.appendChild(span);
    span.textContent = item;

    const del = document.createElement("button");
    chapter.appendChild(del);
    del.textContent = "❌";
    del.classList.add('delete')

    del.addEventListener("click", () => {
        del.parentNode.remove();
        deleteChapter(chapter.textContent);
        input.focus();
    });

}

function setChapterList() {
    localStorage.setItem('chaptersArray', JSON.stringify(chaptersArray));
}

function getChapterList() {
    return JSON.parse(localStorage.getItem('chaptersArray'))
}

function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter((item) => item !== chapter);
    setChapterList();
}


button.addEventListener("click", () => {
    if (input.value.trim() == "") {
        console.log("input blank");
    }

    else {
        displayList(input.value);
        chaptersArray.push(input.value);
        setChapterList();
    };

    input.value = "";
    input.focus();
});