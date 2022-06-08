// Récupération du local storage
let panier = JSON.parse(localStorage.getItem('product'));
console.table(panier);


// Insertion des éléments relatifs aux produits sur la page panier
for (let produit of panier) {

    let container = document.getElementById("cart__items");

    let articleProduit = document.createElement("article");
    articleProduit.classList.add("cart__item");
    container.appendChild(articleProduit);

    let divImage = document.createElement("div");
    divImage.classList.add("cart__item__img");
    articleProduit.appendChild(divImage);

    let image = document.createElement("img");
    image.src = produit.productImg;
    image.altTxt = "Photographie d'un canapé";
    divImage.appendChild(image);

    let divProduit = document.createElement("div");
    divProduit.classList.add("cart__item__content");
    articleProduit.appendChild(divProduit);

    let divDescription = document.createElement("div");
    divDescription.classList.add("cart__item__content__description");
    divProduit.appendChild(divDescription);

    let nom = document.createElement("h2");
    nom.innerHTML = produit.productName;
    divDescription.appendChild(nom);

    let couleur = document.createElement("p");
    couleur.innerHTML = produit.productColor;
    divDescription.appendChild(couleur);

    let prix = document.createElement("p");
    prix.innerHTML = produit.productPrice * produit.productQuantity + "€";
    divDescription.appendChild(prix);

    let divSetting = document.createElement("div");
    divSetting.classList.add("cart__item__content__settings");
    divProduit.appendChild(divSetting);

    let divQty = document.createElement("div");
    divQty.classList.add("cart__item__content__settings__quantity");
    divSetting.appendChild(divQty);

    let pQty = document.createElement("p");
    pQty.innerHTML = "Qté : ";
    divQty.appendChild(pQty);

    let choixQty = document.createElement("input");
    choixQty.type = "number";
    choixQty.classList.add("itemQuantity");
    choixQty.name = "itemQuantity";
    choixQty.min = "1";
    choixQty.max = "100";
    choixQty.value = produit.productQuantity;
    divQty.appendChild(choixQty);

    let divSuppr = document.createElement("div");
    divSuppr.classList.add("cart__item__content__settings__delete");
    divSetting.appendChild(divSuppr);

    let pSuppr = document.createElement("p");
    pSuppr.classList.add("deleteItem");
    pSuppr.innerHTML = "Supprimer";
    divSuppr.appendChild(pSuppr);
}

//Suppression article


//Modification quantité
// let inputQty = document.querySelector('.itemQuantity');

// function changeQuantity(e) {
//     const valeurQty = inputQty.value;
//     Number(product.productQuantity) = valeurQty;
// }

// inputQty.addEventListener("change", changeQuantity());



//Totaux : prix et quantité
let prix = 0;
let quantity = 0;

for (let i = 0; i < panier.length; i++) {

    const produit = panier[i];

    prix += produit.productPrice * produit.productQuantity;
    document.getElementById("totalPrice").innerHTML = prix;

    quantity += Number(produit.productQuantity);
    document.getElementById("totalQuantity").innerHTML = quantity;
}


//Validation formulaire
