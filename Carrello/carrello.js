document.addEventListener("DOMContentLoaded", () => {
    const result = document.getElementById('result');

    // Recupera tutte le taglie selezionate e le quantità dal sessionStorage
    const taglieSelezionate = JSON.parse(sessionStorage.getItem('taglieSelezionate')) || [];
    const quantitaTaglie = JSON.parse(sessionStorage.getItem('quantitaTaglie')) || {};

     // Aggiungi il contatore al sessionStorage se non esiste
     let contatore = JSON.parse(sessionStorage.getItem('contatore')) || 0;

    const prezzo = 149.99;
    const totale = document.getElementById('totale');
    const subtotale = document.getElementById('subtotale');
    let totalPrezzo = 0;

    if (taglieSelezionate.length > 0) {
        // Crea un elemento <ul> per ogni taglia selezionata
        taglieSelezionate.forEach((taglia, index) => {
            let quantita = quantitaTaglie[taglia] || 1;
            totalPrezzo += prezzo * quantita;

            const ul = document.createElement('ul');
            ul.className = 'Ul';
            ul.style.listStyleType = 'none';
            ul.style.display = 'flex'; 
            ul.style.alignItems = 'center';

            ul.innerHTML = `
                <img src = "../HomePage/FotoScarpe/AIR-MAX90.jpg" alt="Nike Air Max 90" style="width: 100px; height: 120px; margin-right: 10px;">
                <li>
                     <strong>Nike Air Max 90</strong><br>
                     Scarpa - Donna<br>
                     <span>Taglia/misura: ${taglia}</span><br>
                     <span>Prezzo: ${prezzo}€</span><br>
                     <span>Quantità: <span id="quantita-${index}">${quantita}</span></span><br>
                     <button id="decrementa-${index}">-</button>
                     <button id="incrementa-${index}">+</button>
                     <a href="#" onclick="rimuoviTaglia(${index}); return false;" style="color: black;text-decoration: none"><i class="fa-solid fa-trash"></i></a>
                </li>
            `;
            result.appendChild(ul);

            // Gestisci incremento e decremento quantità
            document.getElementById(`incrementa-${index}`).addEventListener('click', () => {
                quantita++;
                quantitaTaglie[taglia] = quantita;
                sessionStorage.setItem('quantitaTaglie', JSON.stringify(quantitaTaglie));
                contatore++; // Incrementa il contatore
                sessionStorage.setItem('contatore', contatore); // Salva il contatore nel sessionStorage
                aggiornaPagina();
            });

            document.getElementById(`decrementa-${index}`).addEventListener('click', () => {
                if (quantita > 1) {
                    quantita--;
                    quantitaTaglie[taglia] = quantita;
                    sessionStorage.setItem('quantitaTaglie', JSON.stringify(quantitaTaglie));
                    contatore--; // Decrementa il contatore
                    sessionStorage.setItem('contatore', contatore); // Salva il contatore nel sessionStorage
                    aggiornaPagina();
                }
            });
        });

        totale.textContent = `${totalPrezzo.toFixed(2)}€`;
        subtotale.textContent = `${totalPrezzo.toFixed(2)}€`;

        // Salva il totale e il subtotale nel sessionStorage
        sessionStorage.setItem('totale', JSON.stringify(totalPrezzo));
        sessionStorage.setItem('subtotale', JSON.stringify(totalPrezzo));

    } else {
        const li = document.createElement('li');
        li.innerHTML = "Nel tuo carrello non sono presenti articoli.";
        li.style.listStyleType = 'none';
        li.style.marginTop = '5px';
        li.style.marginLeft = '10px';
        result.appendChild(li);
    }

    // Gestisci lo stato dei bottoni di pagamento
    const pagamento = document.getElementById('pagamento');
    const paypal = document.getElementById('paypal');

    pagamento.disabled = true;
    paypal.disabled = true;

    if (taglieSelezionate.length > 0) {
        pagamento.style.backgroundColor = 'black';
        pagamento.style.color = 'white';
        pagamento.disabled = false;

        paypal.style.backgroundColor = 'gainsboro';
        paypal.style.color = 'gray';
        paypal.disabled = false;
    } else {
        pagamento.style.backgroundColor = 'gainsboro';
        pagamento.style.color = 'gray';
        pagamento.disabled = true;
        paypal.style.backgroundColor = 'gainsboro';
        paypal.style.color = 'gray';
        paypal.disabled = true;
    }

    pagamento.addEventListener('click', () => {
        window.location.href = "../Pagamento/pagamento.html";
    });

    paypal.addEventListener('click', () => {
        alert("Procedi al PayPal!");
    });
});

// Funzione per rimuovere una taglia e aggiornare la pagina
function rimuoviTaglia(index) {
    let taglieSalvate = JSON.parse(sessionStorage.getItem('taglieSelezionate')) || [];
    let quantitaTaglie = JSON.parse(sessionStorage.getItem('quantitaTaglie')) || {};
    let contatore = JSON.parse(sessionStorage.getItem('contatore')) || 0;

    const taglia = taglieSalvate[index];

    // Ottieni la quantità della taglia da rimuovere
    const quantitaDaRimuovere = quantitaTaglie[taglia] || 1;

    // Decrementa il contatore della quantità della taglia
    contatore -= quantitaDaRimuovere;

    // Rimuovi la taglia dall'array e dall'oggetto delle quantità
    taglieSalvate.splice(index, 1); // Elimina solo quella specifica taglia
    delete quantitaTaglie[taglia];  // Elimina la quantità associata

    // Assicurati che il contatore non vada sotto zero
    contatore = Math.max(0, contatore);

    // Aggiorna il sessionStorage
    sessionStorage.setItem('taglieSelezionate', JSON.stringify(taglieSalvate));
    sessionStorage.setItem('quantitaTaglie', JSON.stringify(quantitaTaglie));
    sessionStorage.setItem('contatore', contatore); // Aggiorna il contatore

    // Ricarica la pagina per aggiornare il carrello
    aggiornaPagina();
}

// Funzione per aggiornare la pagina senza duplicare codice
function aggiornaPagina() {
    window.location.reload();
}



