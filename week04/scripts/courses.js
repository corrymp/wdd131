const aCourse = {
    code: "CSE121b",
    name: "Javascript Language",
    sections: [
        { sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro T' },
        { sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'TTh', instructor: 'Sis A' }
    ],
    changeStudentCount: function (sectionNum, changeType) {
        const sectionIndex = this.sections.findIndex((section) => section.sectionNum == sectionNum);
        if (sectionIndex >= 0) {
            if (changeType == 'enroll') {
                this.sections[sectionIndex].enrolled++;
            }
            else if (changeType == 'drop') {
                this.sections[sectionIndex].enrolled--;
            }
            renderSections(this.sections);
        }
    }
};

function setCourseInfo(course) {
    document.querySelector("#courseName").textContent = course.name;
    document.querySelector("#courseCode").textContent = course.code;
}

function sectionTemplate(section) { return `<tr><td>${section.sectionNum}</td><td>${section.roomNum}</td><td>${section.enrolled}</td><td>${section.days}</td><td>${section.instructor}</td></tr>` }
function renderSections(sections) { document.querySelector('#sections').innerHTML = sections.map(sectionTemplate).join(''); }

document.querySelector("#enrollStudent").addEventListener('click', () => {
    const sectionNum = document.querySelector("#sectionNumber").value;
    aCourse.changeStudentCount(sectionNum, 'enroll');
})
document.querySelector("#dropStudent").addEventListener('click', () => {
    const sectionNum = document.querySelector("#sectionNumber").value;
    aCourse.changeStudentCount(sectionNum, 'drop');
})

setCourseInfo(aCourse);
renderSections(aCourse.sections);