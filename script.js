let risposte = [];

function ricominciaQuiz() {
    risposte = [];

    for(let risposta of risposteDiv) {
        risposta.classList.remove('selezionato');
        risposta.classList.remove('nonSelezionato');
        risposta.addEventListener('click', selezionaRisposta)
        risposta.querySelector('.checkbox').src="images/unchecked.png";
    }

    const divRicomincia = document.querySelector('.risposta');
    divRicomincia.classList.add('hidden');

    document.querySelector('body').scrollTop=0;
    document.querySelector('html').scrollTop = 0;
}

function selezionaRisposta(event){
    const selezionato = event.currentTarget;

    const question = selezionato.dataset.questionId;
    let questionNumber = 0;
    switch(question){
        case 'one':
            questionNumber = 0;
            break;
        case 'two':
            questionNumber = 1;
            break;
        case 'three':
            questionNumber = 2;
            break;
    }

    if(risposte[questionNumber] === undefined){
        for(let risposta of risposteDiv)
            if(risposta.dataset.questionId == question && risposta!== selezionato)
                risposta.classList.add('nonSelezionato');

        selezionato.classList.add('selezionato');
        selezionato.querySelector('.checkbox').src="images/checked.png";
    }
    else{
        for(let risposta of risposteDiv)
            if(risposta.dataset.questionId == question && risposta.dataset.choiceId == risposte[questionNumber]){
                risposta.classList.add('nonSelezionato');
                risposta.classList.remove('selezionato');
                risposta.querySelector('.checkbox').src="images/unchecked.png";
                break;
            }

        selezionato.classList.remove('nonSelezionato');
        selezionato.classList.add('selezionato');
        selezionato.querySelector('.checkbox').src="images/checked.png";
    }

    risposte[questionNumber] = selezionato.dataset.choiceId;

    checkFine();
}

function checkFine(){
    let risposteDate = 0;
    for (let risposta of risposte)
        if(risposta !== undefined)
            risposteDate++;

    if(risposteDate == 3){
        for(let risposta of risposteDiv) {
            risposta.removeEventListener('click', selezionaRisposta);
        }

        let vincitore = risposte[0];
        if(risposte[1] == risposte[2])
            vincitore = risposte[1];

        const divRicomincia = document.querySelector('.risposta');
        divRicomincia.classList.remove('hidden');
        divRicomincia.querySelector('h1').textContent = RESULTS_MAP[vincitore].title;
        divRicomincia.querySelector('p').textContent = RESULTS_MAP[vincitore].contents;
    }
}

const buttonRicomincia = document.querySelector('.risposta button');
buttonRicomincia.addEventListener('click', ricominciaQuiz);

const risposteDiv = document.querySelectorAll(".choice-grid div");
for(let risposta of risposteDiv) {
    risposta.addEventListener('click', selezionaRisposta);
}