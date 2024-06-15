const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

button.addEventListener("click", () => {
    if (input.value.trim() == "") {
        console.log("input blank");
    }

    else {
        const chapter = document.createElement("li");
        list.appendChild(chapter);

        const span = document.createElement("span");
        chapter.appendChild(span);
        span.textContent = input.value;

        const del = document.createElement("button");
        chapter.appendChild(del);
        del.textContent = "❌";

        del.addEventListener("click", () => {
            del.parentNode.remove();
            input.focus();
        });
    };

    input.value = "";
    input.focus();
});