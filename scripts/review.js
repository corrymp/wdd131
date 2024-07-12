const products = [
    {
        id: 'fc-1888',
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: 'fc-2050',
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: 'fs-1987',
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: 'ac-2000',
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: 'jj-1969',
        name: "warp equalizer",
        averagerating: 5.0
    }
];
const productID = document.querySelector('#revProductName');
const rating = document.querySelector('#revRating');
const installDate = document.querySelector('#revInstallDate');
const features = document.querySelector('#revUsefulFeatures');
const written = document.querySelector('#revWrittenReview');
const userName = document.querySelector('#revYourName');

// Get the review content from the URL
let url = window.location.href.split('?');
if (url[1]) {
    let urlData = [];
    url = url[1].split('&');
    url.forEach(data => {
        data = data.split('=');
        urlData.push(data);
    });
    urlData = urlData.map((data) => data[1]);

    // Get the product name from the url data
    let productName = '';
    products.forEach(product => {
        if (product.id == urlData[0]) {
            productName = product.name.toUpperCase();
        }
    });

    // set star count
    let stars = '';
    while (urlData[1] > 0) {
        urlData[1]--;
        stars = `${stars} &star;`;
    }

    // Get the list of Useful Features from the url data
    let featuresList;
    urlData.forEach(data => {
        if (data !== urlData[0] && data !== urlData[1] && data !== urlData[2] && data !== urlData[urlData.length - 2] && data !== urlData[urlData.length - 1]) {
            if (featuresList == undefined) {
                featuresList = `${data},`;
            }
            else {
                featuresList = `${featuresList}<br>${data},`
            }
            features.innerHTML = `Noted for:<br>${featuresList}`;
        }
    });

    // name
    if (urlData[urlData.length - 1] !== '') {
        urlData[urlData.length - 1] = `${urlData[urlData.length - 1]}`;
    }
    else {
        urlData[urlData.length - 1] = 'You';
    }

    // written review
    if (urlData[urlData.length - 2] !== '') {
        urlData[urlData.length - 2] = urlData[urlData.length - 2].split('+');
        let writtenReview = '';
        urlData[urlData.length - 2].forEach(word => {
            writtenReview = `${writtenReview} ${word}`;
        });
        written.innerHTML = `${urlData[urlData.length - 1]} also had this to say:<br>${writtenReview}`;
    }
    else {
        userName.innerHTML = `Reviewed by ${urlData[urlData.length - 1]}`;
    }

    // set required display info
    productID.innerHTML = productName;
    rating.innerHTML = stars;
    installDate.innerHTML = `Installed: ${urlData[2]}`;

    // add 1 to review count
    const reviewCount = document.querySelector('.review-count');
    const totalReviews = parseInt(localStorage.getItem('totalReviews')) + 1 || 1;
    localStorage.setItem('totalReviews', totalReviews);
    reviewCount.innerHTML = totalReviews;
}
else {
    document.querySelector('main').innerHTML = '<section id="review"><h2>How did you get here?</h2><p>You didn\'t submit a review, so...</p><p>To submit a review, go to <a href="form.html" >the form</a>!</p></section>';
};