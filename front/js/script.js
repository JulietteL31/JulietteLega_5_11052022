/*

RECUPERATION DES DONNEES VIA L'API

*/

fetch("http://localhost:3000/api/products/")
    .then(response => response.json())
    .catch(function(error) {
        console.log("L'erreur est la suivante : " + error);
    })
    .then(function(resultatAPI) {
        let articles = resultatAPI;

        // Pour chaque article de la liste "resultatAPI"/"articles"
        for (let article in articles) {

          console.log(resultatAPI[article])

            // Affichage des éléments dans le DOM
            let lien = document.createElement("a");
            document.querySelector('.items').appendChild(lien);
            // lien.href = `./product.html?id=${resultatAPI[article]._id}`;
            lien.href = './product.html?id=' + resultatAPI[article]._id;

            let articleProduit = document.createElement("article")
            lien.appendChild(articleProduit);

            let image = document.createElement("img");
            articleProduit.appendChild(image);
            image.src = resultatAPI[article].imageUrl;
            image.altTxt = resultatAPI[article].altTxt;

            let titre = document.createElement("h3");
            articleProduit.appendChild(titre);
            titre.classList.add("productName");
            titre.innerText = resultatAPI[article].name;
        
            let paragraphe = document.createElement("p");
            articleProduit.appendChild(paragraphe);
            paragraphe.classList.add("productDescription");
            paragraphe.innerText = resultatAPI[article].description;
        }
    })