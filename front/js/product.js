let str = document.URL;
let url = new URL(str);
let params = new URLSearchParams(url.search);
let productId = params.get("id");

fetch("http://localhost:3000/api/products/" + productId)
  .then((response) => response.json())
  .catch(function(error) {
      console.log("Erreur");
  })
  .then(function (resultatAPI) {
    
    // Ajout du titre
    let titre = document.getElementById("title");
    titre.innerHTML = resultatAPI.name;

    // document.querySelector('#title').innerHTML = resultatAPI.name;

    // Ajout de l'image
    let image = document.createElement("img");
    image.src = resultatAPI.imageUrl;
    document.querySelector('.item__img').appendChild(image);
    image.altTxt = resultatAPI.altTxt;
    
    console.log(image);

    // Ajout du prix
    document.querySelector("#price").innerHTML = resultatAPI.price;

    // Ajout de la description
    document.querySelector("#description").innerHTML = resultatAPI.description;

    // Ajout des choix de couleur
    for (let color of resultatAPI.colors) {
      const productColor = document.createElement("option");
      document.querySelector("#colors").appendChild(productColor);
      productColor.value = color;
      productColor.innerHTML = color;
    }

    // Ajout d'une alerte au clic sur le bouton "Ajouter au panier"
    function clicBtnPanier(e) {
        alert("Le produit a été ajouté au panier !");
    }
    
    let ajoutPanier = document.getElementById("addToCart");
    ajoutPanier.addEventListener("click", clicBtnPanier);
  

    // Récupérer les informations saisie par l'utilisateurs ( Couleurs / Qty )

    document.querySelector("#quantity").addEventListener("change", function(event){
        console.log(event.target.value);
    });

    document.querySelector("#colors").addEventListener("change", function(event){
        console.log(event.target.value);
    })


    // Gestion du Localstorage ( regarder comment cela fonctionne )





    // Ajouter ou créer un localstorage 

    // Vérifier si le produit existe ou non 
    // Condition si j'existe ou pas



});
