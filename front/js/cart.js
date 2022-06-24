// Récupération du local storage
let panier = JSON.parse(localStorage.getItem("product"));
console.table(panier);

/* 

  RECUPERATION DES PRODUITS DEPUIS L'API

*/
fetch("http://localhost:3000/api/products/")
  .then((response) => response.json())
  .catch(function (error) {
    console.log(error);
  })
  .then(function (resultatAPI) {
    let products = JSON.parse(localStorage.getItem("product"));

    displayCart(resultatAPI, products);
    deleteItem(resultatAPI, products);
    totalQty(resultatAPI, products);
    totalPrice(resultatAPI, products);
    updateQty(resultatAPI, products);

  });


/* 

  AFFICHAGE DU PANIER + PRIX QUI PROVIENT DE L'API

*/
function displayCart(api, products) {
  for (let produit of products) {
    for (let data of api) {
      if (produit.productId === data._id) {
        const produitPanier = `
      <article class="cart__item" id="${produit.productId}" data-id="${produit.productId}" data-color="${produit.productColor}">
      <div class="cart__item__img">
        <img src="${produit.productImg}" alt="${produit.productImgAltTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${produit.productName}</h2>
          <p>${produit.productColor}</p>
          <p class="prix">${data.price} €</p>
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
        // addDeleteProduct(produit.productId);
      }
    }
  }
}

function deleteItem(api, products){
  const itemDelete = document.querySelectorAll('.deleteItem');
  itemDelete.forEach((item) => {

    item.addEventListener('click', function (){
      console.log('ici')
      const product = item.closest("article")
      product.remove();
      const id = product.dataset.id;
      const color = product.dataset.color;

     
      if(products.some((e) => e.productId === id && e.productColor === color)){
        let obj = products.findIndex((product) => product.id === productId && product.color === productColor);
        products.splice(obj, 1);
         let productJson = JSON.stringify(products);
        localStorage.setItem('product', productJson)

        totalQty(products);
        totalPrice(resultatAPI, products)
      }
    })
  })
};


/* 

  CALCULER LE PRIX TOTAL DU PANIER

*/

function totalPrice(api, products){
console.log(api);
console.log(products);
let prixTotal = 0;

for (let produit of products) {
  for (let data of api) {
    if (produit.productId === data._id) {
      console.log(data.price);
      prixTotal += Number(produit.productQuantity)*data.price;

      let affiche = document.getElementById('totalPrice');
      console.log(prixTotal);
      affiche.innerHTML = prixTotal;
    }
  }
}


}

/*

  CALCULER LA QUANTITE TOTALE DU PANIER

*/

function totalQty(api, products){
  console.log(api);
  console.log(products);

  let qty = 0;

  for (let produit of products) {

    qty += Number(produit.productQuantity);

    let affiche = document.getElementById('totalQuantity');
    
    console.log(qty);
    affiche.innerHTML = qty;
  }
}



/* 

  MODIFICATION DES QUANTITES = OK 

*/
function updateQty(api, products){
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
      totalQty(api, products);
      totalPrice(api, products)
    }
  }
});
}

/* 

  SUPPRESION DES PRODUITS 

*/
const addDeleteProduct = (id) => {
  const deleteItem = document.getElementById(id).querySelector(".deleteItem");
  deleteItem.addEventListener("click", function (e) {
    let elementSuppr = e.target.closest(".cart__item");
    let id = elementSuppr.dataset.id;
    let color = elementSuppr.dataset.color;

    for (let i = 0; i < panier.length; i++) {
      if (panier[i].productId === id && panier[i].productColor === color) {
        localStorage.removeItem(panier[i]);
      }
    }

  });


};


/* 

 VALIDATION DES INPUTS : 

 TODO :: Faire le reste des inputs.

*/

let email = document.getElementById("email");
email.addEventListener("input", function () {
  validEmail(this);
});

const validEmail = function (inputEmail) {
  let emailRegex = new RegExp("^[A-Za-z-_]+@[A-Za-z]+.[A-Za-z]+$");

  if (!emailRegex.test(inputEmail.value)) {
    document.getElementById("emailErrorMsg").innerText =
      "Exemple : contact@kanap.fr";
    return false;
  } else {
    document.getElementById("emailErrorMsg").innerText = "";
    return true;
  }
};

/* 
 
 FIN DE LA VALIDATION DES INPUTS 

*/

/* 

  VALIDATION DE LA COMMANDE  / AVEC VERIFICATION DES INPUTS LORS DU CLICK SUR COMMANDER

*/

let commande = document.getElementById("order");
commande.addEventListener("click", function (e) {
  e.preventDefault();

  let products = JSON.parse(localStorage.getItem("product"));

  if (products === null || products.length < 1) {
    alert("Le panier est vide");
  } else if (validEmail(email)) {
    const productsId = [];

    products.forEach((product) => {
      console.log(product.productId);
      productsId.push(product.productId);
    });

    const order = {
      contact: {
        firstName: "prenom",
        lastName: "nom",
        address: "adresse",
        city: "ville",
        email: email.value,
      },
      products: productsId,
    };

    orderProduct(order);
  }

  function orderProduct(order) {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (value) {
        console.log(value.orderId);
        window.location = `./confirmation.html?orderId=${value.orderId}`;
        //vider le localstorage
        localStorage.clear();
      })
      .catch(function (err) {
        console.log("La requête API a échoué");
      });
  }
});
