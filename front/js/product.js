/*

RECUPERATION DE L'URL DU PRODUIT

*/
let str = document.URL;
let url = new URL(str);
let params = new URLSearchParams(url.search);
let productId = params.get("id");


/*

RECUPERATION DES INFOS DU PRODUIT VIA L'API ET AFFICHAGE DANS LE DOM

*/
fetch("http://localhost:3000/api/products/" + productId)
  .then((response) => response.json())
  .catch(function (error) {
    console.log(error + ' Je suis une erreur ');
  })
  .then(function (resultatAPI) {
    // Ajout du titre
    let titre = document.getElementById("title");
    titre.innerHTML = resultatAPI.name;

    // Ajout de l'image
    let image = document.createElement("img");
    image.src = resultatAPI.imageUrl;
    document.querySelector(".item__img").appendChild(image);
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
    let colors = document.querySelector("#colors");
    let clicBtnPanier = document.querySelector("#addToCart");


    /*
    
    FONCTION AU CLIC SUR "AJOUTER AU PANIER"
    
    */
    clicBtnPanier.addEventListener("click", (event) => {
      const selectColor = colors.value;
      const selectQuantity = quantity.value;

      //Vérifications couleur et quantité sélectionnées (avec des alertes) avant création d'un local storage et ajout au panier
      if (selectQuantity == 0) {
        alert("Veuillez sélectionner une quantité");
      } else if (selectColor == "") {
        alert("Veuillez choisir un colori");
      } else {
        let articleInCart = {
          productName: resultatAPI.name,
          productId: resultatAPI._id,
          productColor: selectColor,
          productQuantity: selectQuantity,
          productImg: resultatAPI.imageUrl,
          productImgAltTxt: resultatAPI.altTxt,
        };

        console.table(articleInCart);

        let productLocalStorage = JSON.parse(localStorage.getItem("product"));

        let newProduct = null;

        // Vérifier si le panier n'est pas vide : si le panier n'est pas vide alors chercher si l'article existe déjà (en comparant l'id et la couleur)
        if (productLocalStorage != null) {
          newProduct = productLocalStorage.find(
            (element) =>
              element.productColor === selectColor &&
              element.productId === resultatAPI._id
          );
        }

        // Si l'article existe déjà: remplacer la quantité présente par la quantité sélectionnée + affichage d'une alerte
        if (newProduct) {
          let addNumberOfProduct = Number(selectQuantity);
          let currentQuantityOfProducts = Number(newProduct.productQuantity);
          newProduct.productQuantity = currentQuantityOfProducts + addNumberOfProduct;
          localStorage.setItem("product", JSON.stringify(productLocalStorage));
          alert(
           // `Vous avez maintenant ${newProduct.productQuantity} articles dans votre panier.; `
            "Vous avez maintenant " +
              newProduct.productQuantity +
              " articles dans votre panier."
          );

        // Si le panier existe mais que l'article n'y est pas: ajout du produit et affichage d'une alerte
        } else if (productLocalStorage) {
          productLocalStorage.push(articleInCart);
          localStorage.setItem("product", JSON.stringify(productLocalStorage));
          console.table(productLocalStorage);
          alert(
            "Votre commande d'un nombre de " + selectQuantity + " " + resultatAPI.name + " de couleur " + selectColor + " a bien été ajoutée au panier!"
          );

        // Si le panier n'existe pas: création du panier, ajout du produit et affichage d'une alerte
        } else {
          productLocalStorage = [];
          productLocalStorage.push(articleInCart);
          localStorage.setItem("product", JSON.stringify(productLocalStorage));
          alert(
            "Votre commande d'un nombre de " + selectQuantity + " " + resultatAPI.name + " en couleur " + selectColor + " a bien été ajoutée au panier!"
          );
        }
      }
    });
  });
