import { menu, buttonsData } from './db.js';
import { calculatePrice } from './helpers.js';

// HTML'den gelenler
const menuArea = document.getElementById('menu-area');
const buttonsArea = document.getElementById('buttons-area');


// sayfanın yüklenme olayını izleme
// yüklendiği anda ekrana menü elemanlarını basma fonksiyonunu çalıştır
document.addEventListener('DOMContentLoaded', () => {
  renderButtons('all');
  renderMenuItems(menu);
});

// butonlar için tıklanma olaylarını izler
buttonsArea.addEventListener('click',searchCategory);


//! ekrana menü elemanlarını basar
function renderMenuItems(menuItems){
    // dizideki her bir obje için 
    // bir elemanını temsil eden html oluştur
    // bu html'i bir diziye aktar
    // string'e çevir

    let menuHtml = menuItems.map(
        (item) => { 
        return `
           <a href="/productDetail.html?id=${item.id}" id="card" class="d-flex flex-column flex-md-row text-decoration-none text-dark gap-3"  href="">
            <img class="rounded shadow" src="${item.img}"/>
            <div>
                <div class="d-flex justify-content-between">
                    <h5>${item.title}</h5>
                    <p class="text-success">&#8378; ${calculatePrice(item.price)} </p>
                </div>
                <p class="lead">${item.desc}</p>
            </div>            
            </a>
        `;
    });

    // diziyi string'e çevir
    menuHtml = menuHtml.join(' ');

   // oluşturduğumuz html'i ekrana bas
   menuArea.innerHTML = menuHtml;
}

//! Filtreleme
// tıklanılan butona göre ekrana o kategoriye ait
// ürünleri listeler
function searchCategory(e) {
    const category = (e.target.dataset.category);

    // tüm dizi elemanlarından yalnızca kategori değeri
    // butonun kategori değeriyle eşleşenleri getir
    const filteredMenu = menu.filter(
        (item) => item.category === category
    );
    // hepsi seçilirse bütün menüyü ekrana bas
    if(category === 'all') {
        renderMenuItems(menu);
    } else {
        // filtrelenmiş diziyi ekrana basma
        renderMenuItems(filteredMenu);
    }   

    // butonları güncelle
    renderButtons(category);
}

/* Filtrelemede ve ekranda göstermede kullanılabilecek kısa kod:
renderMenuItems(filteredMenu ?? menu);
*/

//! ekrana butonları basacak fonksiyon
function renderButtons(active) {
    // eski butonları kaldırma, tekrarı önleme
    buttonsArea.innerHTML = ' ';

    // yeni butonlar oluşturma
    buttonsData.forEach((btn) => {
        // html butonu oluştur
        const buttonEle = document.createElement('button');

        // butona gerekli class'ları verme
        buttonEle.className = 'btn btn-outline-dark filter-btn';

        // içerisindeki yazıyı değiştirme
        buttonEle.innerText = btn.text;

        // hangi kategori olduğu bilgisini buton elementine ekleme
        buttonEle.dataset.category = btn.value;

        // eğerki aktif kategoriyle buton eşleşirse ona farklı class ver
        if(btn.value === active) {
            buttonEle.classList.add('bg-dark', 'text-light');
        }

        // html'e gönderme
        buttonsArea.appendChild(buttonEle);
    });
}

