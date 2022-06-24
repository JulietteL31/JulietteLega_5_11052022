let str = document.URL;
let url = new URL(str);
let params = new URLSearchParams(url.search);
let order = params.get("orderId");

console.log(order)

document.getElementById('orderId').innerText = order;