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
    let colors = document.querySelector("#colors");
    let clicBtnPanier = document.querySelector('#addToCart');

   // Ajout d'une alerte au clic sur le bouton "Ajouter au panier"
    clicBtnPanier.addEventListener('click', (event) => {
        const selectColor = colors.value;
        const selectQuantity = quantity.value;
     
        if (quantity.value == 0) {
            alert("Veuillez sélectionner une quantité");
        } else if (selectColor == ""){
            alert("Veuillez choisir un colori")
        } else {
            alert("Le produit a été ajouté au panier !");
            let articleInCart = {
                productName:  resultatAPI.name,
                productId: resultatAPI._id, 
                productColor: selectColor,
                productQuantity: selectQuantity                    
            }
            console.table(articleInCart);

            let productLocalStorage = JSON.parse(localStorage.getItem('product'));

    
           let newProduct = null;
           // Vérifier si le panier n'est pas vide

                     
           if (productLocalStorage != null){
               newProduct = productLocalStorage.find( 
                (element) =>
             element.productColor === selectColor &&  element.productId === resultatAPI._id
              
             );
            }

             if (newProduct){
                 console.log('ici')
                let addNumberOfProduct = Number(quantity.value);
                let currentQuantityOfProducts = Number(newProduct.productQuantity);
                newProduct.productQuantity = currentQuantityOfProducts + addNumberOfProduct
                localStorage.setItem('product', JSON.stringify(productLocalStorage));
            }else{
                console.log('la')
                productLocalStorage = [];
                productLocalStorage.push(articleInCart);
                localStorage.setItem('product', JSON.stringify(productLocalStorage));
            }


            localStorage.setItem('product', JSON.stringify(articleInCart));
       
        

    }}
        
    )});