const root = document.querySelector(':root');
const navigation = document.querySelector('.nav');
const hamButton = document.querySelector('#menu');
const darkmodeButton = document.querySelector('#darkmode-button');
const darkmodeNav = document.querySelector('#darkmode-nav')

let darkmode = localStorage.getItem('darkmode') || 'off';


// hamburger
hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});


// darkmode
darkmodeButton.addEventListener('click', () => { toggleDarkmode(); });
darkmodeNav.addEventListener('click', () => { toggleDarkmode(); });

function toggleDarkmode(load = false) {
    root.classList.toggle('dark');
    darkmodeButton.classList.toggle('dark');
    darkmodeNav.classList.toggle('dark');
    if (load == false) {
        if (darkmode == 'off') { darkmode = 'on'; }
        else { darkmode = 'off'; }
    }
    localStorage.setItem('darkmode', darkmode);
}

if (darkmode == 'on') toggleDarkmode(true);
