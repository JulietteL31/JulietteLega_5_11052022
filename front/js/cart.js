// Récupération du local storage
let panier = JSON.parse(localStorage.getItem("product"));
console.table(panier);

/* 

  RECUPERATION DES PRODUITS DEPUIS L'API + APPEL DE TOUTES LES FONCTIONS D'AFFICHAGE DEFINIES PLUS BAS

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
      }
    }
  }
}


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

function totalQty(){
  let products = JSON.parse(localStorage.getItem("product"));

  let qty = 0;

  for (let produit of products) {
    console.log(produit);
    qty += Number(produit.productQuantity);

    let affiche = document.getElementById('totalQuantity');
    
    console.log(qty);
    affiche.innerHTML = qty;
  }
}



/* 

  MODIFICATION DES QUANTITES 

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
    }
  }
  let products = JSON.parse(localStorage.getItem("product"));
  totalQty();
  totalPrice(api, products)
});
}

/* 

  SUPPRESION DES PRODUITS 

*/
function deleteItem(api, products) {
  const itemDelete = document.querySelectorAll('.deleteItem');
  itemDelete.forEach((item) => {
      item.addEventListener('click', function () {
          const product = item.closest("article");
          const idItem = product.dataset.id;
          const colorItem = product.dataset.color;

          let produitLocalStorage = products.filter(
              (p) => p.productId !== idItem || p.productColor !== colorItem
          );
          localStorage.setItem("product", JSON.stringify(produitLocalStorage));
          location.reload();
          totalQty(products);
          totalPrice(api, products);
      })
  })

};




/* 

 VALIDATION DES INPUTS (EN DIRECT) ET AFFICHAGE MESSAGES D'ERREUR

*/
//Validation Prénom
let prenom = document.getElementById('firstName');
prenom.addEventListener("input", function() {
  validPrenom(this);
});

const validPrenom = function(inputPrenom) {
  let prenomRegex = new RegExp("^[A-Z]{1}[a-z]+$|^[A-Z]{1}[a-z]+-[A-Z]{1}[a-z]+$|^[A-Z]+$|^[A-Z]+-[A-Z]+$|^[a-z]+$|^[a-z]+-[a-z]+$");

  if (!prenomRegex.test(inputPrenom.value)) {
    document.getElementById("firstNameErrorMsg").innerText = "Veuillez saisir un prénom valide (exemple : François)";
    return false;
  } else {
    document.getElementById("firstNameErrorMsg").innerText = "";
    return true;
  }
};


//Validation Nom
let nom = document.getElementById('lastName');
nom.addEventListener("input", function() {
  validNom(this);
});

const validNom = function(inputNom) {
  let nomRegex = new RegExp("^[A-Z]{1}[a-z]+$|^[A-Z]{1}[a-z]+-[A-Z]{1}[a-z]+$|^[A-Z]+$|^[A-Z]+-[A-Z]+$|^[a-z]+$|^[a-z]+-[a-z]+$");

  if (!nomRegex.test(inputNom.value)) {
    document.getElementById("lastNameErrorMsg").innerText = "Veuillez saisir un nom valide (exemple : Dupont)";
    return false;
  } else {
    document.getElementById("lastNameErrorMsg").innerText = "";
    return true;
  }
};


//Validation addresse
let adresse = document.getElementById('address');
adresse.addEventListener("input", function() {
  validAdresse(this);
});

const validAdresse = function(inputAdresse) {
  let adresseRegex = new RegExp("^[0-9]{1,5} [A-Za-z -]+$");

  if (!adresseRegex.test(inputAdresse.value)) {
    document.getElementById("addressErrorMsg").innerText = "Veuillez saisir une adresse valide (exemple : 33 rue des Oliviers)";
    console.log(inputAdresse.value);
    return false;
  } else {
    document.getElementById("addressErrorMsg").innerText = "";
    return true;
  }
};



//Validation ville
let ville = document.getElementById('city');
ville.addEventListener("input", function() {
  validVille(this);
});

const validVille = function(inputVille) {
  let villeRegex = new RegExp("^[A-Z]{1}[a-z]+$|^[A-Z]{1}[a-z]+-[A-Z]{1}[a-z]+$|^[A-Z]+$|^[A-Z]+-[A-Z]+$|^[a-z]+$|^[a-z]+-[a-z]+$");

  if (!villeRegex.test(inputVille.value)) {
    document.getElementById("cityErrorMsg").innerText = "Veuillez saisir une ville valide (exemple : Paris)";
    return false;
  } else {
    document.getElementById("cityErrorMsg").innerText = "";
    return true;
  }
};



//Validation email
let email = document.getElementById("email");
email.addEventListener("input", function () {
  validEmail(this);
});

const validEmail = function (inputEmail) {
  let emailRegex = new RegExp("^.+@[a-z]+\.[a-z]{2,3}$");

  if (!emailRegex.test(inputEmail.value)) {
    document.getElementById("emailErrorMsg").innerText =
      "Veuillez saisir un email valide (exemple : contact@kanap.fr)";
    return false;
  } else {
    document.getElementById("emailErrorMsg").innerText = "";
    return true;
  }
};



/* 

  VALIDATION DE LA COMMANDE AVEC VERIFICATION DES INPUTS LORS DU CLICK SUR COMMANDER

*/

let commande = document.getElementById("order");
commande.addEventListener("click", function (e) {
  e.preventDefault();

  let products = JSON.parse(localStorage.getItem("product"));

  if (products === null || products.length < 1) {
    alert("Le panier est vide");
  } else if (validPrenom(prenom) && validNom(nom) && validAdresse(adresse) && validVille(ville) && validEmail(email)) {
    const productsId = [];

    products.forEach((product) => {
      console.log(product.productId);
      productsId.push(product.productId);
    });

    const order = {
      contact: {
        firstName: prenom.value,
        lastName: nom.value,
        address: adresse.value,
        city: ville.value,
        email: email.value,
      },
      products: productsId,
    };

    orderProduct(order);
    console.log(order)
  } else {
    alert("Champs invalides");
  }


    
  // FONCTION QUI ENVOIE LES DONNEES UTILISATEURS A L'API ET VIDE LE LOCAL STORAGE APRES COMMANDE
  

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
        console.log(err + "La requête API a échoué");
      });
  }
});
