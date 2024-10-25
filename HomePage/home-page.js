// Array di testo sopra
const testoSopra = [
  "Offerte invernali", 
  "Fino 50% di sconto", 
  "Consegna e resi gratuiti", 
  "Tutti i nuovi arrivi"
];

// Array di testo sotto
const testoSotto = [
  'Per i Member Nike, consegna e resi gratuiti entro 30 giorni. <a href="#">Scopri di più. Unisciti a noi</a>', 
  "2 articoli, -25%. Usa MORE25 su una selezione di modelli. * Fino al 1° feb ore 9 CET. Acquista *Termini promo", 
  "Non perderti i saldi invernali. Acquista",
  '<a href="#">Acquista</a>'
];

document.addEventListener("DOMContentLoaded", () => {

  ///////////////////////////////////////////////////////////////////////////
  ////////////////////////////// TESTO ROTANTE //////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  // Seleziona gli elementi HTML per i testi sopra e sotto
  const sopra = document.getElementById("sopra");
  const sotto = document.getElementById("sotto");

  // Imposta l'indice per scorrere tra i testi
  let indice = 0;

  // Funzione per aggiornare il testo visualizzato
  function mostraTesto() {
      sopra.innerHTML = testoSopra[indice];  // Mostra il testo sopra
      sotto.innerHTML = testoSotto[indice];  // Mostra il testo sotto
      indice = (indice + 1) % testoSopra.length;  // Cicla i testi
  }

  // Cambia i testi ogni 3 secondi
  setInterval(mostraTesto, 3000);

  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////// CAROSELLO /////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  // Funzione generica per gestire un carosello con movimento avanti e indietro
  function gestisciCarosello(avantiBtn, indietroBtn, resultElem, numMax, numElemVisibili) {
      let cont = 0;  // Contatore per la posizione del carosello

      // Funzione per aggiornare la posizione del carosello
      function aggiornaPosizione() {
          let position = cont * -((444 + 17) * numElemVisibili);  // Calcola lo spostamento
          resultElem.style.transform = `translateX(${position}px)`;  // Applica la trasformazione
      }

      // Evento al click sul pulsante "avanti"
      avantiBtn.addEventListener('click', () => {
          if (cont < numMax) {  // Verifica che il contatore non superi il massimo
              cont++;
              avantiBtn.disabled = cont >= numMax;  // Disabilita il pulsante "avanti" se raggiunto il limite
              indietroBtn.disabled = cont <= 0;     // Disabilita "indietro" se il contatore è a 0
          }
          console.log(cont);  // Stampa la posizione corrente del contatore
          aggiornaPosizione();  // Aggiorna la posizione del carosello
      });

      // Evento al click sul pulsante "indietro"
      indietroBtn.addEventListener('click', () => {
          if (cont > 0) {  // Verifica che il contatore non vada sotto 0
              cont--;
              indietroBtn.disabled = cont <= 0;    // Disabilita "indietro" se il contatore è a 0
              avantiBtn.disabled = cont >= numMax; // Disabilita "avanti" se il contatore raggiunge il massimo
          }
          console.log(cont);  // Stampa la posizione corrente del contatore
          aggiornaPosizione();  // Aggiorna la posizione del carosello
      });
  }

  // Primo carosello
  const avanti = document.getElementById('avanti');         
  const indietro = document.getElementById('indietro');     
  const result = document.getElementById('result');         
  const numMax1 = 7;                                        
  const numElemVisibili1 = 1;                               
  gestisciCarosello(avanti, indietro, result, numMax1, numElemVisibili1);

  // Secondo carosello
  const avanti2 = document.getElementById('avanti2');       
  const indietro2 = document.getElementById('indietro2');   
  const result2 = document.getElementById('SportResult');   
  const numMax2 = 3;                                        
  const numElemVisibili2 = 1;                               
  gestisciCarosello(avanti2, indietro2, result2, numMax2, numElemVisibili2);

  // Terzo carosello
  const avanti3 = document.getElementById('avanti3');       
  const indietro3 = document.getElementById('indietro3');   
  const result3 = document.getElementById('MemberResult');  
  const numMax3 = 3;                                        
  const numElemVisibili3 = 1;                               
  gestisciCarosello(avanti3, indietro3, result3, numMax3, numElemVisibili3);

  ///////////////////////////////////////////////////////////////////////////
  //////////////////////// CREAZIONE DINAMICA DI DIV ////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  for (let i = 1; i <= 10; i++) {
      const div = document.createElement('div');  // Crea un nuovo div
      div.className = 'Div';                      // Aggiunge la classe al div

      // Inserisce il contenuto HTML nel div
      div.innerHTML = `
          <a href="../DettaglioScarpe/Nike Air Max 90/Nike Air Max 90.html">
          <img src="../HomePage/FotoScarpe/AIR-MAX90.jpg" alt="Nike Air Zoom Pegasus 36">
          <h3 style="font-size: 20px;">Nike Air Max 90</h3>
          <p style="color: #707072;font-size: 18px;margin-top: -8px;">Scarpa - Donna</p>
          <h3 style="margin-top: -10px;font-size: 20px;">149,99 €</h3>
          </a>
      `;
      result.appendChild(div);  // Aggiunge il div creato al contenitore
  }

  ///////////////////////////////////////////////////////////////////////////
  /////////////////////// GESTIONE DEL CONTATORE ////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  // Recupera il valore del contatore dal sessionStorage (se esiste), altrimenti lo inizializza a 0
  let contatore = parseInt(sessionStorage.getItem('contatore')) || 0;

  // Mostra o nasconde il contatore a seconda del suo valore
  if (contatore > 0) {
      document.getElementById('contatore').style.visibility = 'visible';  // Mostra il contatore se > 0
      document.getElementById('contatore').textContent = contatore;       // Aggiorna il testo del contatore
  } else {
      document.getElementById('contatore').style.visibility = 'hidden';   // Nasconde il contatore se 0
  }

});
