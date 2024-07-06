const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.nav');
const album = document.querySelector('#temple-album')
const homeButton = document.querySelector(".home");
const oldButton = document.querySelector(".old");
const newButton = document.querySelector(".new");
const largeButton = document.querySelector(".large");
const smallButton = document.querySelector(".small");
const pageTitle = document.querySelector('#title');

const temples = [
	{
		templeName: "Aba Nigeria",
		location: "Aba, Nigeria",
		dedicated: "2005, August, 7",
		area: 11500,
		imgWidth: 399,
		imgHieght: 250,
		imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
	},
	{
		templeName: "Manti Utah",
		location: "Manti, Utah, United States",
		dedicated: "1888, May, 21",
		area: 74792,
		imgWidth: 399,
		imgHieght: 250,
		imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
	},
	{
		templeName: "Payson Utah",
		location: "Payson, Utah, United States",
		dedicated: "2015, June, 7",
		area: 96630,
		imgWidth: 400,
		imgHieght: 250,
		imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
	},
	{
		templeName: "Yigo Guam",
		location: "Yigo, Guam",
		dedicated: "2020, May, 2",
		area: 6861,
		imgWidth: 400,
		imgHieght: 225,
		imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
	},
	{
		templeName: "Washington D.C.",
		location: "Kensington, Maryland, United States",
		dedicated: "1974, November, 19",
		area: 156558,
		imgWidth: 400,
		imgHieght: 250,
		imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
	},
	{
		templeName: "Lima Perú",
		location: "Lima, Perú",
		dedicated: "1986, January, 10",
		area: 9600,
		imgWidth: 400,
		imgHieght: 250,
		imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
	},
	{
		templeName: "Mexico City Mexico",
		location: "Mexico City, Mexico",
		dedicated: "1983, December, 2",
		area: 116642,
		imgWidth: 400,
		imgHieght: 250,
		imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
	},
	{
		templeName: "San Diego California",
		location: "San Diego, California",
		dedicated: "1993, April, 25",
		area: 72000,
		imgWidth: 399,
		imgHieght: 250,
		imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/san-diego-california/400x250/san-diego-temple-765109-wallpaper.jpg"
	},
	{
		templeName: "St. George Utah",
		location: "St George, Utah",
		dedicated: "1877, April, 6",
		area: 143969,
		imgWidth: 400,
		imgHieght: 250,
		imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/st-george-utah/400x250/st-george-utah-temple-clouds-922212-wallpaper.jpg"
	},
	{
		templeName: "Preston England",
		location: "Chorley, Lancashire, England",
		dedicated: "1998, June, 7",
		area: 69630,
		imgWidth: 399,
		imgHieght: 250,
		imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/preston-england/400x250/preston-temple-762730-wallpaper.jpg"
	},
	{
		templeName: "Los Angeles California",
		location: "Los Angeles, California",
		dedicated: "1956, March, 11",
		area: 190614,
		imgWidth: 400,
		imgHieght: 250,
		imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/los-angeles-california/400x250/los-angeles-california-temple-1079458-wallpaper.jpg"
	},
	{
		templeName: "Fukuoka Japan",
		location: "Fukuoka, Japan",
		dedicated: "2000, June, 11",
		area: 10700,
		imgWidth: 399,
		imgHieght: 250,
		imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/fukuoka-japan/400x250/fukuoka-japan-temple-lds-306863-wallpaper.jpg"
	}
];

function buildTempleAlbum(filter = temples) {
	album.innerHTML = ""

	filter.forEach(temple => {
		const name = temple.templeName;
		const location = temple.location;
		const dedicated = temple.dedicated;
		const area = temple.area;
		const image = temple.imageUrl;
		const imgWidth = temple.imgWidth;
		const imgHieght = temple.imgHieght;
		const card = document.createElement('figure')

		album.appendChild(card).innerHTML = `<h3>${name}</h3><figcaption>Location:<span> ${location}</span></figcaption><figcaption>Dedicated:<span> ${dedicated}</span></figcaption><figcaption>Area:<span> ${area} sq ft</span></figcaption><img src="${image}" alt="the ${name} Temple" width="${imgWidth}" height="${imgHieght}" loading="lazy">`;
	});
}

buildTempleAlbum();

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

homeButton.addEventListener('click', () => {
	document.querySelector('.active').classList.toggle('active');
	pageTitle.textContent = 'Home';
	homeButton.classList.toggle('active');

	buildTempleAlbum(temples);
})

oldButton.addEventListener('click', () => {
	document.querySelector('.active').classList.toggle('active');
	pageTitle.textContent = 'Old';
	oldButton.classList.toggle('active');

	buildTempleAlbum(temples.filter(temple => temple.dedicated.split(',')[0] < 1900));
})

newButton.addEventListener('click', () => {
	document.querySelector('.active').classList.toggle('active');
	pageTitle.textContent = 'New';
	newButton.classList.toggle('active');

	buildTempleAlbum(temples.filter(temple => temple.dedicated.split(',')[0] > 2000));
})

largeButton.addEventListener('click', () => {
	document.querySelector('.active').classList.toggle('active');
	pageTitle.textContent = 'Large';
	largeButton.classList.toggle('active');

	buildTempleAlbum(temples.filter(temple => temple.area > 90000));
})

smallButton.addEventListener('click', () => {
	document.querySelector('.active').classList.toggle('active');
	pageTitle.textContent = 'Small';
	smallButton.classList.toggle('active');

	buildTempleAlbum(temples.filter(temple => temple.area < 10000));
})