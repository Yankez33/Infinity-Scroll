const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API

let count = 5;
const apiKey = 'G7PT-kD3oJIv5a1HbRI9sCS71K6bsuEX8Q4hUL9qo2I';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//  Check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    console.log('images loaded')
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        console.log('ready', ready);
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links 7 photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    //  Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create  anchor to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // Create image for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        //  Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)


        // Put image inside anchor, then put both inside imgcontainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //    Catch error here
    }
}

// Check to see if scroll is near the bottom of the page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight = window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On Load 
getPhotos()