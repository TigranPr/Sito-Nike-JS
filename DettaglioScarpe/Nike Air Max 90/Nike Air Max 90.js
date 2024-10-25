// Array di testi, immagini e taglie
const testoSopra = [
  "Offerte invernali", "Fino 50% di sconto", "Consegna e resi gratuiti", "Tutti i nuovi arrivi"
];
const testoSotto = [
  'Per i Member Nike, consegna e resi gratuiti entro 30 giorni. <a href="#">Scopri di più. Unisciti a noi</a>', 
  "2 articoli, -25%. Usa MORE25 su una selezione di modelli. * Fino al 1° feb ore 9 CET. Acquista *Termini promo", 
  "Non perderti i saldi invernali. Acquista",
  '<a href="#">Acquista</a>'
];
const immagini = [
  "../../HomePage/FotoScarpe/AIR-MAX90.jpg",
  "../FTScarpe/AIR-MAX90-2.jpg",
  "../FTScarpe/AIR-MAX90-3.jpg",
  "../FTScarpe/AIR-MAX90-4.jpg",
  "../FTScarpe/AIR-MAX90-5.jpg",
  "../FTScarpe/AIR-MAX90-6.jpg",
  "../FTScarpe/AIR-MAX90-7.jpg",
  "../FTScarpe/AIR-MAX90-8.jpg",
  "../FTScarpe/AIR-MAX90-9.jpg"
];
const taglie = [
  'EU 38.5', 'EU 39', 'EU 40', 'EU 40.5', 'EU 41', 'EU 42', 'EU 42.5', 
  'EU 43', 'EU 44', 'EU 44.5', 'EU 45', 'EU 45.5', 'EU 46', 'EU 47', 
  'EU 47.5', 'EU 48'
];

// Variabili di stato
let indiceTesto = 0;
let cont = 0; // Indice corrente delle immagini 
let contatoreMemorizzato = parseInt(sessionStorage.getItem('contatore')) || 0;
let taglieMemorizzate = JSON.parse(sessionStorage.getItem('taglieSelezionate')) || []; // Carica le taglie dal sessionStorage
const prezzo = 149.99;
let quantitaTaglie = JSON.parse(sessionStorage.getItem('quantitaTaglie')) || {}; // Carica le quantità dal sessionStorage

// Aspetta che il DOM sia caricato
document.addEventListener("DOMContentLoaded", () => {
  // Seleziona gli elementi dal DOM
  const sopra = document.getElementById("sopra");
  const sotto = document.getElementById("sotto");
  const result = document.getElementById('result');
  const Img = document.getElementById('img');
  const indietro = document.getElementById('btn');
  const avanti = document.getElementById('btn2');
  const btnIncrementa = document.getElementById('incrementa');
  const contatore = document.getElementById('contatore');
  const btnShop = document.getElementById('btnShop');
  const ulElement = document.querySelector('.ulShop3');
  const ulShop2 = document.querySelector('.ulShop2 li');
  const span = document.querySelector('.spanTaglia');
  const tagliaSpan = document.getElementById('taglia');
  const spanTesto = document.querySelector('.spanTesto');
  const content = document.getElementById('content');

  // Aggiorna il contatore visualizzato
  contatore.innerHTML = contatoreMemorizzato;

  // Funzione per cambiare i testi sopra e sotto le immagini
  function mostraTesto() {
    sopra.innerHTML = testoSopra[indiceTesto];
    sotto.innerHTML = testoSotto[indiceTesto];
    indiceTesto = (indiceTesto + 1) % testoSopra.length; // Cicla tra i testi
  }
  setInterval(mostraTesto, 3000); // Cambia testo ogni 3 secondi

  // Funzione per aggiornare l'immagine principale
  function aggiornaMedia() {
    cont = (cont + immagini.length) % immagini.length; // Cicla tra le immagini
    Img.src = immagini[cont]; // Imposta la nuova immagine
    Img.style.display = 'block';
    // Applica l'effetto solo all'immagine corrente
    const currentImg = resultImg[cont];
    currentImg.style.transform = 'scale(1.1)';
    currentImg.style.filter = 'brightness(0.5)';
    currentImg.style.transition = 'transform 0.3s ease, filter 0.3s ease'; 
    resultImg.forEach((el, index) => {
      if (index !== cont) {
        el.style.transform = 'scale(1)';
        el.style.filter = 'brightness(1)';
      }
    });
  }

  // Funzione per aggiornare e salvare il contatore
  function aggiornaContatore() {
    contatoreMemorizzato++;
    sessionStorage.setItem('contatore', contatoreMemorizzato);  // Salva il nuovo valore nel sessionStorage
    contatore.innerHTML = contatoreMemorizzato;  // Aggiorna il contatore visualizzato
  }

  // Creazione dinamica della lista di immagini
  for (let i = 0; i < immagini.length; i += 2) {
    const ul = document.createElement('ul');
    ul.className = 'Ul';
    ul.innerHTML = `<li><img src="${immagini[i]}" alt=""></li>`;
    if (immagini[i + 1]) {
      ul.innerHTML += `<li><img src="${immagini[i + 1]}" alt=""></li>`;
    }
    result.appendChild(ul);
  }

  const resultImg = document.querySelectorAll('#result ul li img');
  aggiornaMedia(); // Aggiorna il media all'inizio

  // Gestione del mouseover sulle immagini
  resultImg.forEach((img, i) => {
    img.addEventListener('mouseover', () => {
      Img.src = img.src; // Aggiorna l'immagine principale
      Img.style.display = 'block';  // Mostra l'immagine
      img.style.transform = 'scale(1.1)';
      img.style.filter = 'brightness(0.5)';
      img.style.transition = 'transform 0.3s ease, filter 0.3s ease'; // Effetti di transizione
      cont = i; // Aggiorna il contatore alla posizione corrente
      aggiornaMedia(); // Chiama aggiornaMedia per applicare effetti
    });
  });

  // Gestione del click sui bottoni avanti e indietro
  avanti.addEventListener('click', () => {
    cont++;
    aggiornaMedia(); // Aggiorna l'immagine
  });
  indietro.addEventListener('click', () => {
    cont--;
    aggiornaMedia(); // Aggiorna l'immagine
  });

  // Gestione del click sul bottone "Aumenta Contatore"
  if (btnIncrementa) {
    btnIncrementa.addEventListener('click', aggiornaContatore);
  }

  // Variabile per memorizzare la taglia selezionata
  let tagliaSelezionata = '';

  // Creazione dinamica delle taglie
  taglie.forEach(t => {
    const li = document.createElement('li');
    li.innerHTML = t;

    // Aggiungi il listener per memorizzare la taglia quando cliccata
    li.addEventListener('click', () => {
      if (!taglieMemorizzate.includes(t)) {
        taglieMemorizzate.push(t);  // Aggiungi la taglia se non è già presente
      }

      // Aggiorna la taglia selezionata
      tagliaSelezionata = t;  
      tagliaSpan.innerHTML = tagliaSelezionata; // Mostra la taglia attualmente selezionata

      // Evidenzia la taglia selezionata
      const selectedLi = document.querySelector('.selected');
      if (selectedLi) {
        selectedLi.classList.remove('selected'); // Rimuovi evidenziazione precedente
      }
      li.classList.add('selected'); // Evidenzia la nuova taglia selezionata

      ulElement.style.border = '';
      ulShop2.style.color = '';
      span.style.display = 'none'; // Nascondi il messaggio di errore
    });

    ulElement.appendChild(li); // Aggiungi la taglia alla lista
  });

  // Funzione per aggiornare la quantità di una taglia
  function aggiornaQuantitaTaglia(taglia) {
    if (quantitaTaglie[taglia]) {
      quantitaTaglie[taglia] += 1;  // Incrementa la quantità
    } else {
      quantitaTaglie[taglia] = 1;  // Inizia con una quantità di 1
    }
  }
 // Gestione del click sul bottone "Shop"
btnShop.addEventListener('click', () => {
  if (taglieMemorizzate.length > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scrolla in alto
    aggiornaContatore(); // Incrementa il contatore al click
    
    // Aggiorna la quantità della taglia selezionata
    aggiornaQuantitaTaglia(tagliaSelezionata);
    // Memorizza le taglie selezionate
    sessionStorage.setItem('taglieSelezionate', JSON.stringify(taglieMemorizzate));
    sessionStorage.setItem('quantitaTaglie', JSON.stringify(quantitaTaglie));
    
    // Mostra solo la taglia attualmente selezionata
    contatore.style.display = 'block';
    
    // Disabilita il bottone btnShop
    btnShop.disabled = true;

    // Mostra il messaggio di successo
    setTimeout(() => {
      spanTesto.style.display = 'grid'; // Mostra l'elemento con display grid
      content.style.filter = 'blur(2px)';
      content.style.opacity = '0.5';
      content.style.transition = 'filter 0.3s ease, opacity 0.3s ease';
    }, 1000); // Dopo 1 secondo
    
    setTimeout(() => {
      spanTesto.style.display = 'none'; // Nascondi dopo 2 secondi
      content.style.filter = ''; // Rimuove il filtro di sfumato
      content.style.opacity = '1';
      content.style.transition = '';

      // Riabilita il bottone btnShop
      btnShop.disabled = false;
    }, 5000); // Mostra per 2 secondi

    if (taglieMemorizzate.length === 0) {
      span.style.display = 'block'; // Mostra il messaggio di errore
      ulElement.style.border = '1px solid red'; // Evidenzia il confine della lista
      ulShop2.style.color = '#D30005'; // Cambia il colore della lista
    }
  } else {
    span.style.display = 'block'; // Mostra il messaggio di errore
    ulElement.style.border = '1px solid red'; // Evidenzia il confine della lista
    ulShop2.style.color = '#D30005'; // Cambia il colore della lista
  }
});


});
