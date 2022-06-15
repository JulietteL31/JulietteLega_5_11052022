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


/*
function validation(){
  let prenom = document.getElementById('firstName').value;
  let nom = document.getElementById('lastName').value;
  let adresse = document.getElementById('address').value;
  let ville = document.getElementById('city').value;
  let mail = document.getElementById('email').value;

  const nameCityRegex = /^[A-Z]{1}[a-z]+$|^[A-Z]{1}[a-z]+-[A-Z]{1}[a-z]+$|^[A-Z]+$|^[A-Z]+-[A-Z]+$|^[a-z]+$|^[a-z]+-[a-z]+$/;
  const addressRegex = /^\d{1,4}[a-zA-Z]+\s[a-zA-Z]+$|^\d{1,4}[a-zA-Z]+\s[a-zA-Z]+\s[a-zA-Z]+$/;
  const emailRegex = /^.+@[a-z]+\.[a-z]{2,3}$/;

  let verifPrenom = nameCityRegex.test(prenom);
  let verifNom = nameCityRegex.test(nom);
  let verifVille = nameCityRegex.test(ville);
  let verifAdresse = addressRegex.test(adresse);
  let verifEmail = emailRegex.test(mail);

  if (verifPrenom == false) {
    alert('Veuillez saisir un prénom valide');
    return false;
  } else if (verifNom == false) {
    alert('Veuillez saisir un nom valide');
    return false;
  } else if (verifVille == false) {
    alert('Veuillez saisir une ville valide');
    return false;
  } else if (verifAdresse == false) {
    alert('Veuillez saisir une adresse valide');
    return false;
  } else if (verifEmail == false) {
    alert('Veuillez saisir un email valide');
    return false;
  } else {
    return true;
  }
}
*/

// Vérif email :
// ^.+@[a-z]+\.[a-z]{2,3}$

// Vérif nom, prénom, ville :
// ^[A-Z]{1}[a-z]+$|^[A-Z]{1}[a-z]+-[A-Z]{1}[a-z]+$|^[A-Z]+$|^[A-Z]+-[A-Z]+$|^[a-z]+$|^[a-z]+-[a-z]+$

// Vérif adresse :
//^\d{1,4}[a-zA-Z]+\s[a-zA-Z]+$|^\d{1,4}[a-zA-Z]+\s[a-zA-Z]+\s[a-zA-Z]+$


let commande = document.getElementById('order');
commande.addEventListener('click', function(e) {
  e.preventDefault();

  // Regex
  let first = document.getElementById('firstName').value;
  let last = document.getElementById('lastName').value;
  let address = document.getElementById('address').value;
  let city = document.getElementById('city').value;
  let email = document.getElementById('email').value;

  const nameCityRegex = /^[A-Z]{1}[a-z]+$|^[A-Z]{1}[a-z]+-[A-Z]{1}[a-z]+$|^[A-Z]+$|^[A-Z]+-[A-Z]+$|^[a-z]+$|^[a-z]+-[a-z]+$/;
  const addressRegex = /^\d{1,4} [a-zA-Z]+ [a-zA-Z]+$|^\d{1,4} [a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$|^\d{1,4} [a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+-[a-zA-Z]+$/;
  const emailRegex = /^.+@[a-z]+\.[a-z]{2,3}$/;

  let verifPrenom = nameCityRegex.test(first);
  let verifNom = nameCityRegex.test(last);
  let verifVille = nameCityRegex.test(city);
  let verifAdresse = addressRegex.test(address);
  let verifEmail = emailRegex.test(email);


  let products = JSON.parse(localStorage.getItem('product'));

  if(products === null || products.length < 1){
    alert('panier vide');
  } else if (verifPrenom === false) {
    alert('Veuillez saisir un prénom valide');
    return false;
  } else if (verifNom === false) {
    alert('Veuillez saisir un nom valide');
    return false;
  } else if (verifVille === false) {
    alert('Veuillez saisir une ville valide');
    return false;
  } else if (verifAdresse === false) {
    alert('Veuillez saisir une adresse valide');
    return false;
  } else if (verifEmail === false) {
    alert('Veuillez saisir un email valide');
    return false;
  } else {
    return true;
  }


  const productsId = [];

  products.forEach((product) => {
    console.log(product.productId)
    productsId.push(product.productId);
  });


 const order = {
    contact: {
      firstName: prenom.value,
      lastName: nom.value,
      address: adresse.value,
      city: ville.value,
      email: mail.value
    },
    products: productsId,
  };

  alert(order);
  console.log(order);
//}


  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order)
  })
  .then (function (res){
    if(res.ok){
      return res.json();
  }
  })
  .then(function(value){
    console.log(value.orderId);
    window.location = `./confirmation.html?orderId=${value.orderId}`;
    // vider le localstorage
    localStorage.clear();
  })
  .catch(function(err) {
    console.log("La requête API a échoué");
  })
 });
