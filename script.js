// ============================================================
//  script.js  –  Orijinal zarf & kalp açma animasyonu (birebir)
// ============================================================

const envoltura = document.querySelector(".envoltura-sobre");
const carta     = document.querySelector(".carta");
const hayirBtn  = document.getElementById("hayir-btn");
const hayirError= document.getElementById("hayir-error");
const butonlar  = document.getElementById("butonlar");

// ---- Zarf / kalp açma-kapama (orijinal) ----
document.addEventListener("click", (e) => {
    if (e.target.matches("#hayir-btn")) return;

    if (
        e.target.matches(".sobre") ||
        e.target.matches(".solapa-derecha") ||
        e.target.matches(".solapa-izquierda") ||
        e.target.matches(".corazon")
    ) {
        envoltura.classList.toggle("abierto");

    } else if (e.target.matches(".sobre *")) {
        if (!carta.classList.contains("abierta")) {
            carta.classList.add("mostrar-carta");
            setTimeout(() => {
                carta.classList.remove("mostrar-carta");
                carta.classList.add("abierta");
            }, 500);
            envoltura.classList.add("desactivar-sobre");
        } else {
            carta.classList.add("cerrando-carta");
            envoltura.classList.remove("desactivar-sobre");
            setTimeout(() => {
                carta.classList.remove("cerrando-carta");
                carta.classList.remove("abierta");
            }, 500);
        }
    }
});

// ---- Hayır butonu: orijinal hata mesajı efekti (buton YERİNDEN OYNAMIYOR) ----
hayirBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Firebase hayır olayını bildir (index.html module'ü dinler)
    window.dispatchEvent(new CustomEvent("hayir-clicked"));

    // Orijinal animasyon: butonları gizle → hata mesajı → geri göster
    butonlar.style.opacity = "0";
    setTimeout(() => {
        butonlar.style.display = "none";

        hayirError.style.display = "block";
        hayirError.classList.remove("hayir-error");
        void hayirError.offsetWidth; // reflow
        hayirError.classList.add("hayir-error");
        hayirError.style.opacity = "1";

        setTimeout(() => {
            hayirError.style.opacity = "0";
            setTimeout(() => {
                hayirError.style.display = "none";
                butonlar.style.display = "flex";
                setTimeout(() => { butonlar.style.opacity = "1"; }, 10);
            }, 350);
        }, 2100);
    }, 200);
});
