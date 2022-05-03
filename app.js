const numPhotos = 10;
const apiURL = `https://dog.ceo/api/breeds/image/random/${numPhotos}`;
const photoContainer = document.querySelector(".photo-container");
const loaderContainer = document.querySelector(".loader");
const photoViewerTemplate = document.getElementById("photoViewer");

class PhotoHandler {

    photoArray = [];

    photoViewer() {   
        
        loaderContainer.classList.remove("loader-custom-height");
        loaderContainer.classList.add("loader-auto-height");

        this.photoArray.map((photo) => {

            const imgElement = photoViewerTemplate.content.firstElementChild.cloneNode(true);

            imgElement.setAttribute("src", photo);
            imgElement.setAttribute("alt", "preview");

            photoContainer.append(imgElement);

        });

    }

    async getPhotos() {

        const response = await fetch(apiURL);
        const jsonResponse = await response.json();
        this.photoArray = jsonResponse.message;

        this.photoViewer();

    }

}

function intersectionCallback(entries, observer) {

    entries.forEach((entry) => { 

        if ( entry.isIntersecting ) {

            const photoHandler = new PhotoHandler(); 
            photoHandler.getPhotos();

        }

     });

}

class IntersectionHandler {

    static observer() {

        let options = {
            root: null,
            rootMargin: '0px',
            threshold: .5
        };
          
        let observer = new IntersectionObserver(intersectionCallback, options);

        observer.observe(loaderContainer);  

    }

}

class Main {

    static run() {

        IntersectionHandler.observer();

    }

}

Main.run();