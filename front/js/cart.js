// Récupération du local storage
let panier = JSON.parse(localStorage.getItem("product"));
console.table(panier);

// Déclaration d'une fonction pour l'affichage du panier


const displayCart = () => {
  if (panier.length === 0) {
    alert("Panier vide");
  } else {
    document.getElementById("cart__items").innerHTML = "";

    // Insertion des éléments relatifs aux produits sur la page panier
    for (let produit of panier) {
      const produitPanier = `
    <article class="cart__item" id="${produit.productId}" data-id="${produit.productId}" data-color="${produit.productColor}">
    <div class="cart__item__img">
      <img src="${produit.productImg}" alt="${produit.productImgAltTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${produit.productName}</h2>
        <p>${produit.productColor}</p>
        <p class="prix"></p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.productQuantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;

      document
        .getElementById("cart__items")
        .insertAdjacentHTML("beforeend", produitPanier);

      addDeleteProduct(produit.productId);
    }
  }
};


//Modif quantité

let input = document.querySelector("#cart__items");
input.addEventListener("input", (event) => {
  const id = event.target.closest(".cart__item").getAttribute("data-id");
  const color = event.target.closest(".cart__item").getAttribute("data-color");
  const newQuantity = event.target.value;

  for (let i = 0; i < panier.length; i++) {
    if (panier[i].productId === id && panier[i].productColor === color) {
      panier[i].productQuantity = newQuantity;
      localStorage.setItem("product", JSON.stringify(panier));
      console.log(panier[i]);
    }
  }
});




//Suppression article
const addDeleteProduct = (id) => {
  const deleteItem = document.getElementById(id).querySelector(".deleteItem");
  deleteItem.addEventListener("click", function(e) {
    let elementSuppr = e.target.closest(".cart__item");
    elementSuppr.remove();

    let id = elementSuppr.getAttribute("data-id");
    let color = elementSuppr.getAttribute("data-color");

    for (let i = 0; i < panier.length; i++) {
      if (panier[i].productId === id && panier[i].productColor === color) {
        localStorage.removeItem("product");
      }
    }
    displayCart();
  })

  // Reload le DOM
  //    displayCart();
};




//Affichage prix
fetch ("http://localhost:3000/api/products/")
.then ((response) => response.json())
.catch (function(error) {
  console.log(error);
})
.then (function(resultatAPI) {

  let affichagePrix = document.querySelector(".cart__item").getAttribute("data-id");

  for (let i = 0; i < resultatAPI.length; i++) {
    if (affichagePrix === resultatAPI[i]._id) {
      document.querySelector(".prix").innerHTML = resultatAPI[i].price + " €";
    } else {
      console.log("coucou");
    }
  }



  // let prix = 0;
  // for (let i = 0; i < panier.length; i++) {
  //   const produit = panier[i];

  // prix += resultatAPI.price * produit.productQuantity;
  // document.getElementById("totalPrice").innerHTML = prix;
  // }
  
})


//Total quantité
let quantity = 0;

for (let i = 0; i < panier.length; i++) {
  const produit = panier[i];

  quantity += Number(produit.productQuantity);
  document.getElementById("totalQuantity").innerHTML = quantity;
}


displayCart();



//Validation formulaire
