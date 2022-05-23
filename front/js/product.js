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




    
    // Récupérer les informations saisie par l'utilisateurs ( Couleurs / Qty )

    let quantity = document.querySelector("#quantity");
    quantity.addEventListener("change", function(event){
        console.log(event.target.value);
    });
    
    let color = document.querySelector("#colors");
    color.addEventListener("change", function(event){
        console.log(event.target.value);
    })


    // Ajout d'une alerte au clic sur le bouton "Ajouter au panier"
    function clicBtnPanier(e) {
        if (quantity.value <= 0) {
            alert("Veuillez sélectionner une quantité");
        } else if (color.value = ""){
            alert("Veuillez choisir un colori")
        } else {
            alert("Le produit a été ajouté au panier !");
            localStorage.setItem("quantity", quantity);
            localStorage.setItem("color", color);
        }
    }
    
    let ajoutPanier = document.getElementById("addToCart");
    ajoutPanier.addEventListener("click", clicBtnPanier);


    // Gestion du Localstorage ( regarder comment cela fonctionne )



    // localStorage.setItem("quantity", quantity);
    // localStorage.setItem("color", color);

    // for( let i = 0; i < localStorage.length; i++){
    //     let liste = localStorage.key(i);
    //     console.log(liste);
    // }



    // Ajouter ou créer un localstorage 

    // Vérifier si le produit existe ou non 
    // Condition si j'existe ou pas



});
