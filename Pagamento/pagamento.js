document.addEventListener("DOMContentLoaded", () => {
    // Recupera i valori dal sessionStorage
    const totale = JSON.parse(sessionStorage.getItem('totale')) || 0; // Usa 0 come fallback
    const subtotale = JSON.parse(sessionStorage.getItem('subtotale')) || 0; // Usa 0 come fallback
    const quantitaTotale = JSON.parse(sessionStorage.getItem('quantitaTaglie')) || {}; // Recupera la quantità totale

    const taglieSelezionate = JSON.parse(sessionStorage.getItem('taglieSelezionate')) || []; // Carica le taglie dal sessionStorage

    // Seleziona gli elementi HTML dove visualizzare i valori
    const totaleElement = document.getElementById('totale');
    const subtotaleElement = document.getElementById('subtotale');
    const result = document.getElementById('result');
    const result2 = document.getElementById('result2');
    const prezzo = 149.99;
    let totalPrezzo = 0;

    // Aggiorna l'HTML
    totaleElement.textContent = `${totale.toFixed(2)}€`;
    subtotaleElement.textContent = `${subtotale.toFixed(2)}€`;

    if (taglieSelezionate.length > 0) {
        taglieSelezionate.forEach((taglia) => {
            // Crea un nuovo elemento <li> per l'articolo
            const li = document.createElement('li');
            totalPrezzo = prezzo

            li.innerHTML = `
                <strong>Nike Air Max 90</strong><br>
                Scarpa - Donna<br>
                <span>Colore: Nero/Bianco</span><br>
                <span>Taglia/misura: ${taglia}</span><br>
                Quantità: ${quantitaTotale[taglia]}<br>
                <span>${prezzo}</span>
            `;

            // Crea un nuovo elemento <img> per l'immagine
            const img = document.createElement('img');
            img.src = `../HomePage/FotoScarpe/AIR-MAX90.jpg`;
            img.alt = "Nike Air Max 90"; 
            // Crea un nuovo <ul> e aggiungi l'elemento <li>
            const ul = document.createElement('ul');
            ul.className = 'Ul';

            // Aggiungi l'immagine e il testo all'elemento <ul>
            ul.appendChild(img);
            ul.appendChild(li);

            // Aggiungi l'elemento <ul> al risultato finale
            result.appendChild(ul);

        });
    }

    if (taglieSelezionate.length > 0) {
        taglieSelezionate.forEach((taglia) => {
            // Crea un nuovo elemento <li> per l'articolo
            const li = document.createElement('li');
            totalPrezzo = prezzo

            li.innerHTML = `
                <strong>Nike Air Max 90</strong><br>
                Scarpa - Donna<br>
                <span>Colore: Nero/Bianco</span><br>
                <span>Taglia/misura: ${taglia}</span><br>
                Quantità: ${quantitaTotale[taglia]}<br>
                <span>${prezzo}€</span>
            `;

            // Crea un nuovo elemento <img> per l'immagine
            const img = document.createElement('img');
            img.src = `../HomePage/FotoScarpe/AIR-MAX90.jpg`;
            img.alt = "Nike Air Max 90"; 
            // Crea un nuovo <ul> e aggiungi l'elemento <li>
            const ul = document.createElement('ul');
            ul.className = 'Ul';

            // Aggiungi l'immagine e il testo all'elemento <ul>
            ul.appendChild(img);
            ul.appendChild(li);

            // Aggiungi l'elemento <ul> al risultato finale
            result2.appendChild(ul);

        });
    }
    
    const campi = [
        { campo: document.getElementById('nome'), placeholder: 'Inserisci il nome' },
        { campo: document.getElementById('cognome'), placeholder: 'Inserisci il cognome' },
        { campo: document.getElementById('email'), placeholder: 'Inserisci l\'email' },
        { campo: document.getElementById('indirizzo'), placeholder: 'Inserisci l\'indirizzo' },
        { campo: document.getElementById('cap'), placeholder: 'Inserisci il CAP' },
        { campo: document.getElementById('citta'), placeholder: 'Inserisci la città' },
        { campo: document.getElementById('paese'), placeholder: 'Inserisci il paese' },
        { campo: document.getElementById('telefono'), placeholder: 'Inserisci il numero di telefono' }
    ];

    const campi2 = [
        { campo: document.getElementById('carta')},
        { campo: document.getElementById('paypal')},
        { campo: document.getElementById('google')},
        { campo: document.getElementById('numeroCarta'), placeholder: 'Inserisci numero di carta' },
        { campo: document.getElementById('scadenza'), placeholder: 'Inserisci la data di scadenza' },
        { campo: document.getElementById('cvv'), placeholder: 'Inserisci CVV' }
       
    ];

    // Aggiungi l'evento 'blur' a ogni campo
    for (let i = 0; i < campi.length; i++) {
        const item = campi[i];
        item.campo.addEventListener('blur', function() {
            if (item.campo.value === '') {
                item.campo.placeholder = item.placeholder;
                item.campo.classList.add('error');
                item.campo.style.border = '1px solid red';
            } else {
                item.campo.classList.remove('error');
                item.campo.style.border = 'solid 1px gainsboro';
            }
        });
    }

    // Aggiungi l'evento 'blur' a ogni campo
    for (let i = 0; i < campi2.length; i++) {
        const item = campi2[i];
        item.campo.addEventListener('blur', function() {
            if (item.campo.value === '') {
                item.campo.placeholder = item.placeholder;
                item.campo.classList.add('error');
                item.campo.style.border = '1px solid red';
            } else {
                item.campo.classList.remove('error');
                item.campo.style.border = 'solid 1px gainsboro';
            }
        });
    }

    // Gestione del submit del form
    const form = document.getElementById('form');
    const main = document.getElementById('main');
    const pagamento = document.getElementById('pagamento');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Previene l'invio del modulo

        let error = false;
        var paeseSelezionato = document.getElementById('paese').value;
        // Controllo errori su tutti i campi
        for (let i = 0; i < campi.length; i++) {
            const item = campi[i];
            if (item.campo.value === '') {
                error = true;
                item.campo.placeholder = item.placeholder;
                item.campo.classList.add('error');
                item.campo.style.border = '1px solid red';
            }
             else if (paeseSelezionato !== "") {
                // Aggiorna il testo nella sezione pagamento con il paese selezionato
                document.getElementById('paese-fatturazione').textContent = paeseSelezionato.charAt(0).toUpperCase() + paeseSelezionato.slice(1);
            }
        }

        if (!error) {
            setTimeout(() => {
                main.style.display = 'none'; // Nascondi il main
                pagamento.style.display = 'grid'; // Mostra la sezione di pagamento
                form.submit(); // Invia il modulo se non ci sono errori  
            }, 1000);
        }
    });

    const form2 = document.getElementById('form2');

    form2.addEventListener('submit', (event) => {
        event.preventDefault(); // Previene l'invio del modulo

        let error = false;

        // Controllo errori su tutti i campi
        for (let i = 0; i < campi2.length; i++) {
            const item = campi2[i];
            if (item.campo.value === '') {
                error = true;
                item.campo.placeholder = item.placeholder;
                item.campo.classList.add('error');
                item.campo.style.border = '1px solid red';
            }
        }

        if (!error) {
            form2.submit();
            window.location.href = "../ThankYouPage/thank-you-page.html";
        }
    });

// Quando clicchi su "Modifica", torni alla form con i dati precompilati
document.getElementById('modifica-dati').addEventListener('click', function(e) {
    e.preventDefault(); // Evita il comportamento predefinito del link
    document.getElementById('pagamento').style.display = 'none'; // Nasconde la sezione pagamento
    document.getElementById('main').style.display = 'block'; // Mostra di nuovo il form
    main.style.display = 'grid';
    });
});
