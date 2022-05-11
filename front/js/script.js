fetch("http://localhost:3000/api/products/")
.then(response => response.json())
.catch(function(error) {
  console.log(erreur);
})
.then(function (resultatAPI){
  let articles = resultatAPI;


  for (let article in articles){

 let image = document.createElement("img");
 image.src = resultatAPI[article].imageUrl;
 image.altTxt = resultatAPI[article].altTxt + "," + resultatAPI[article].name;

 console.log(image);

 let titre = document.createElement("h3");
 titre.classList.add("productName");
 titre.innerText = resultatAPI[article].name;

let paragraphe = document.createElement("p");
paragraphe.classList.add("productDescription");
paragraphe.innerText = resultatAPI[article].description;

let articleProduit = document.createElement("article");
articleProduit.appendChild(image);
articleProduit.appendChild(titre);
articleProduit.appendChild(paragraphe);

let lien = document.createElement("a");
lien.href = "./product.html?id=42";
lien.appendChild(articleProduit);

let contain = document.getElementById("items");
let container = contain.appendChild(lien);

console.log(container);
}
})