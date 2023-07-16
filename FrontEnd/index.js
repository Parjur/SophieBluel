let works = await fetch('http://localhost:5678/api/works').then(works => works.json());

// Fonction de génération des projets
function generateGallery(works){
    
    for (let i = 0; i < works.length ; i++){
        const loop = works[i];
        const divGallery = document.querySelector(".gallery");
        const workElement = document.createElement("figure");
        const imgElement = document.createElement("img");
        imgElement.src = loop.imageUrl;
        imgElement.alt = loop.title;
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = loop.title;

        divGallery.appendChild(workElement);
        workElement.appendChild(imgElement);
        workElement.appendChild(captionElement);
    }
}



// Génération de la liste de projets à l'ouverture de la page
generateGallery(works);

// Fonction de génération des projets en mode édition
function generateGalleryEditor(works){
    const divGallery = document.querySelector(".modale_gallery");
    divGallery.innerText = "";
    for (let i = 0; i < works.length ; i++){
        const loop = works[i];
        const workElement = document.createElement("figure");
        const imgElement = document.createElement("img");
        imgElement.src = loop.imageUrl;
        imgElement.alt = loop.title;
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = "éditer";
        const deleteElement = document.createElement("button");
        deleteElement.className = "btn_delete"
        deleteElement.id = `delete_${loop.id}`
        const logoDelete = document.createElement("i");
        logoDelete.className = "fa-solid fa-trash"
        divGallery.appendChild(workElement);
        workElement.appendChild(imgElement);
        workElement.appendChild(captionElement);
        workElement.appendChild(deleteElement);
        deleteElement.appendChild(logoDelete);
    };
};

// Filtres
// Bouton Tous
const boutonTous = document.querySelector(".btn-tous");
boutonTous.addEventListener("click", function() {
    document.querySelector(".gallery").innerText = "";
    generateGallery(works);
    document.querySelectorAll("#filtres button").forEach(function(btn) {
        btn.classList.remove("active");
    });
    boutonTous.classList.add("active");
    
});

// Bouton Objets
const boutonObjets = document.querySelector(".btn-objets");
boutonObjets.addEventListener("click", function() {
    const worksObjets = works.filter(function(works) {
        return works.category.id === 1;
    });
    document.querySelector(".gallery").innerText = "";
    generateGallery(worksObjets);
    document.querySelectorAll("#filtres button").forEach(function(btn) {
        btn.classList.remove("active");
    });
    boutonObjets.classList.add("active");
    
    
});


// Bouton Appartements
const boutonAppartements = document.querySelector(".btn-appartements");
boutonAppartements.addEventListener("click", function() {
    const worksAppartements = works.filter(function(works) {
        return works.category.id === 2;
    });
    document.querySelector(".gallery").innerText = "";
    generateGallery(worksAppartements);
    document.querySelectorAll("#filtres button").forEach(function(btn) {
        btn.classList.remove("active");
    });
    boutonAppartements.classList.add("active");
    
});


// Bouton Hôtels & restaurants
const boutonHotels = document.querySelector(".btn-hotels-restaurants");
boutonHotels.addEventListener("click", function() {
    const worksHotels = works.filter(function(works) {
        return works.category.id === 3;
    });
    document.querySelector(".gallery").innerText = "";
    generateGallery(worksHotels);
    document.querySelectorAll("#filtres button").forEach(function(btn) {
        btn.classList.remove("active");
    });
    boutonHotels.classList.add("active");
    
})

// Affichage du mode éditeur
if (window.sessionStorage.getItem("token") !== null) {
    // Changement du bouton "login" en "logout"
    const loginHeader = document.querySelector("#loginHeader");
    loginHeader.innerText = "logout"
    loginHeader.addEventListener("click", function(event) {
        event.preventDefault();
        window.sessionStorage.removeItem("token");
        window.location.replace("./index.html");
    })
    // Création du bandeau d'édition en haut de la page
    const bandeau = document.querySelector(".bandeau");
    const zoneEdition = document.createElement("div");
    zoneEdition.className = "editor";
    const logoEdition = document.createElement("i");
    logoEdition.className = "fa-regular fa-pen-to-square";
    const modeEdition = document.createElement("p");
    modeEdition.innerText = "Mode Édition";
    const boutonPublier = document.createElement("button");
    boutonPublier.innerText = "publier les changements";
    bandeau.appendChild(zoneEdition);
    zoneEdition.appendChild(logoEdition);
    zoneEdition.appendChild(modeEdition);
    zoneEdition.appendChild(boutonPublier);

    // Création du bouton modifier sous la photo principale
    const modPhoto = document.querySelector("#main_photo");
    const logoModPhoto = document.createElement("i");
    logoModPhoto.className = "fa-regular fa-pen-to-square";
    const pPhoto = document.createElement("p");
    pPhoto.innerText = "modifier"
    const boutonModPhoto = document.createElement("button");
    boutonModPhoto.appendChild(logoModPhoto);
    boutonModPhoto.appendChild(pPhoto);
    modPhoto.appendChild(boutonModPhoto);

    // Création du bouton modifier de la bio
    const modBio = document.querySelector("#bio");
    const logoModBio = document.createElement("i");
    logoModBio.className = "fa-regular fa-pen-to-square";
    const pBio = document.createElement("p");
    pBio.innerText = "modifier"
    const boutonModBio = document.createElement("button");
    boutonModBio.appendChild(logoModBio);
    boutonModBio.appendChild(pBio);
    modBio.appendChild(boutonModBio);
    
    // Création du bouton modifier de la galerie
    const modGalerie = document.querySelector("#mod_gallery");
    const logoModGalerie = document.createElement("i");
    logoModGalerie.className = "fa-regular fa-pen-to-square";
    const pGalerie = document.createElement("p");
    pGalerie.innerText = "modifier";
    const boutonModGalerie = document.createElement("button");
    boutonModGalerie.className = "btn-gallery"
    boutonModGalerie.appendChild(logoModGalerie);
    boutonModGalerie.appendChild(pGalerie);
    modGalerie.appendChild(boutonModGalerie);

    // Masquage des filtres
    const hidingFilters = document.querySelector("#filtres");
    hidingFilters.setAttribute("style", "visibility: hidden");
    

    // Bouton d'ouverture de la modale
    boutonModGalerie.addEventListener("click", function (event) {
        event.preventDefault();
        const target = document.querySelector("#modale1")
        target.style.display = null
    });

    // Génération de la galerie en mode édition
    generateGalleryEditor(works);
    deleteWork();

    // Boutons de d'ajout de photo dans la galerie
    const addPhoto = document.querySelector("#add_photo");
    addPhoto.addEventListener("click", function(event){
        event.preventDefault();
        const modale2 = document.querySelector("#modale2");
        modale2.style.display = null;
        const modale1 = document.querySelector("#modale1");
        modale1.style.display = "none"
    })
    
    //Affichage modale d'ajout de photo
    const retour = document.querySelector("#retour");
    retour.addEventListener("click", function(event){
        event.preventDefault();
        const modale2 = document.querySelector("#modale2");
        modale2.style.display = "none";
        const modale1 = document.querySelector("#modale1");
        modale1.style.display = null;
        photo_form.value = "";
        const cache = document.querySelector("#apercuPhotoDiv");
        cache.setAttribute("style", "display: none");
        titre_form.value = "";
        
    });
    
    

    // Aperçu photo
    const preview = document.querySelector("#photo_form");
    preview.addEventListener("change", function(e){
        if(e.target.files.length == 0 || e.target.files[0].size > 4194304){
            return;
        }
        let file = e.target.files[0];
        let url = URL.createObjectURL(file);
        document.querySelector("#apercuPhoto").src = url;
        const cache = document.querySelector("#apercuPhotoDiv");
        cache.style.display = null;
    });
    


    // Bouton Ajouter photo
    document.querySelector("#form_photo").addEventListener("submit", async function(e){
        e.preventDefault();
        let infosPhoto = new FormData();
        infosPhoto.append('image', photo_form.files[0]);
        infosPhoto.append('title', titre_form.value);
        infosPhoto.append('category', categorie_form.value);
        const token = window.sessionStorage.getItem("token");
        const options = {
            method: 'POST',
            body: infosPhoto,
            headers: {
              "Accept": "aplication/json",
              "Authorization": `Bearer ${token}`
            }
          };
          delete options.headers['Content-Type'];
          await fetch('http://localhost:5678/api/works', options);
          titre_form.value = ""
          const cache = document.querySelector("#apercuPhotoDiv");
          cache.setAttribute("style", "display: none");
          const cache2 = document.querySelector("#apercuPhoto");
          cache2.src = "";
          const target = document.querySelector("#modale2");
          target.style.display = "none";
          const target2 = document.querySelector(".gallery")
          target2.innerText = "";
          works = await fetch('http://localhost:5678/api/works').then(works => works.json());
          generateGallery(works);
          const target3 = document.querySelector(".modale_gallery");
          target3.innerText = "";
          generateGalleryEditor(works);
          deleteWork();

         
    });

    // Supprimer photo
    function resetDeleteListeners() {
        const deleteButtons = document.getElementsByClassName("btn_delete");
        for (let i = 0; i < deleteButtons.length; i++) {
            const deleteButton = deleteButtons[i];
            const newDeleteButton = deleteButton.cloneNode(true);
            deleteButton.parentNode.replaceChild(newDeleteButton, deleteButton);
            newDeleteButton.addEventListener("click", async function(e) {
                e.preventDefault();
                const id = newDeleteButton.id.split("_")[1];
                const token = window.sessionStorage.getItem("token");
                await fetch(`http://localhost:5678/api/works/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-type": "application/json"
                    }
                });
                const works = await fetch("http://localhost:5678/api/works").then((works) => works.json());
                generateGalleryEditor(works);
                resetDeleteListeners(); // Réinitialise les écouteurs d'événements pour les boutons de suppression
                const target = document.querySelector(".gallery");
                target.innerText = "";
                generateGallery(works);
                
            });
        }
    }


function deleteWork() {
    const deleteWorks = document.getElementsByClassName("btn_delete");
    for (let i = 0; i < deleteWorks.length; i++) {
        deleteWorks[i].addEventListener("click", async function(e) {
            e.preventDefault();
            const id = deleteWorks[i].id.split("_")[1];
            const token = window.sessionStorage.getItem("token");
            await fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            });
            const works = await fetch("http://localhost:5678/api/works").then((works) => works.json());
            generateGalleryEditor(works);
            resetDeleteListeners(); // Réinitialise les écouteurs d'événements pour les boutons de suppression
            const target = document.querySelector(".gallery");
            target.innerText = "";
            generateGallery(works);
            
        });
    }
}
        

    

    // Check de la limite de 4mo de l'image
    let uploadLimit = document.querySelector("#photo_form")
    uploadLimit.onchange = function (){
        if(photo_form.files[0].size > 4194304) {
            alert("Fichier trop volumineux");
            photo_form.value = "";
        }
    }
    


    // Fermeture de la modale
    document.querySelector("#modale1").addEventListener("click", function(event){
        const modale = document.querySelector("#modale1");
        if(!event.target.closest("#outsideModale1") || event.target.closest("#close")){
            modale.style.display = "none";
        }
    });
    document.querySelector("#modale2").addEventListener("click", function(event){
        const modale = document.querySelector("#modale2");
        if(!event.target.closest("#outsideModale2")|| event.target.closest("#close2")){
            modale.style.display = "none";
            photo_form.value = "";
            const cache = document.querySelector("#apercuPhotoDiv");
            cache.setAttribute("style", "display: none");
            titre_form.value = "";
        }
    })
};

