import { menu } from './db.js';
import { calculatePrice } from './helpers.js';

// htmlde arayüzü göndereceğimiz yer
const outlet = document.getElementById('outlet');

/* 
* URL deki parametreleri yönetebilmek için 
* URLSearchParams class'ında bir örnek oluşturduk.
* örneği oluştururken kendi url'imizdeki parametreleri gönderdik.
*/
const searchParams = new URLSearchParams(window.location.search);

// get metodu aracılığıyla urldeki id parametresine eriştik.
const paramid = searchParams.get('id');

//! menü içerisinden id'sini bildiğimiz elemana erişme
const product = menu.find((item) => item.id === Number(paramid));

console.log(product);

//! Bulduğumuz ürüne göre arayüzü ekrana basma
outlet.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <a href="/">
               <i class="bi bi-house fs-1"></i>
            </a>
            <div>
               anaSayfa / ${product.category} / ${product.title}
            </div>   
        </div>       
        <h1 class="text-center my-3 shadow p-2 text-dark">${product.title}</h1>
        <div class="d-flex align-items-center justify-content-center">
            <img class="img-fluid rounded shadow-lg"
            src="${product.img}"
            style="max-width: 500px"/>
        </div>
        <div>
            <h3 class="my-5"> Ürünün Kategorisi: 
            <span class="text-success">${product.category}</span>
            </h3>     
            <h3 class="my-5">Ürünün Fiyatı: 
                <span class="text-success"> ${calculatePrice(product.price)} &#8378;</span> 
            </h3>
        </div>
        <p class="lead fs-3">${product.desc}</p>
`;
