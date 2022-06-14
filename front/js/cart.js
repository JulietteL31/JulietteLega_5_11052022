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
    let id = elementSuppr.dataset.id;
    let color = elementSuppr.dataset.color;

    for (let i = 0; i < panier.length; i++) {
      if (panier[i].productId === id && panier[i].productColor === color) {
        localStorage.removeItem(panier[i]);
      }
    }

    // elementSuppr.remove();

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

  let affichagePrix = document.querySelector(".cart__item").dataset.id;
  console.log(affichagePrix);

  let panier = JSON.parse(localStorage.getItem("product"));

  for (let i = 0; i < panier.length; i++) {
    const resultAPI = resultatAPI[i];
      if (affichagePrix === resultAPI._id) {
        document.querySelector(".prix").innerHTML = resultAPI.price * Number(panier[i].productQuantity) + " €";
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



//Récupération des infos saisies
let prenom = document.getElementById('firstName');
prenom.addEventListener('change', function(e) {
  console.log(prenom.value);
})

let nom = document.getElementById('lastName');
nom.addEventListener("change", function(e) {
  console.log(nom.value);
})

let adresse = document.getElementById('address');
adresse.addEventListener('change', function(e) {
  console.log(adresse.value);
})

let ville = document.getElementById('city');
ville.addEventListener('change', function(e) {
  console.log(ville.value);
})

let mail = document.getElementById('email');
mail.addEventListener('change', function(e) {
  console.log(mail.value);
})

let commande = document.getElementById('order');
commande.addEventListener('click', function(e) {
  let contact = {
    firstName: prenom.value,
    lastName: nom.value,
    address: adresse.value,
    city: ville.value,
    email: mail.value
  };

  let contactLocalStorage = JSON.parse(localStorage.getItem("contact"));
  contactLocalStorage = [];
  contactLocalStorage.push(contact);
  localStorage.setItem("contact", JSON.stringify(contactLocalStorage));

  console.table(contactLocalStorage);


  fetch("http://localhost:3000/api/order", {
    method: "POST",
    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contact)
  })
  .then(response => response.json())
  .catch(function(err) {
    console.log("La requête API a échoué");
  })

  alert("Votre commande a bien été validée !");
});
