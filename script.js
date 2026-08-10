/* =========================================
   VARIÁVEIS
========================================= */

let nomeAluno = "";
let energia = "";
let preciso = "";

let biscoitoAberto = false;


/* =========================================
   ELEMENTOS
========================================= */

const telas = document.querySelectorAll(".screen");

const nomeInput = document.getElementById("nome");

const confirmarNome = document.getElementById("confirmar-nome");

const entradaNome = document.getElementById("entrada-nome");

const areaCarregamento = document.getElementById("area-carregamento");

const carregamentoProgresso =
    document.getElementById("carregamento-progresso");

const carregamentoPorcentagem =
    document.getElementById("carregamento-porcentagem");

const proxSecao =
    document.getElementById("prox-secao");

const mostrarResultado =
    document.getElementById("mostrar-resultado");

const textoResultado =
    document.getElementById("texto-resultado");

const biscoitoSorte =
    document.getElementById("biscoito-sorte");

const biscoitoHint =
    document.getElementById("biscoito-hint");

const sorteResultado =
    document.getElementById("sorte-resultado");

const continuarSorte =
    document.getElementById("continuar-sorte");

const reiniciar =
    document.getElementById("reiniciar");


/* =========================================
   CONFIRMAR NOME
========================================= */

function confirmarNomeAluno() {

    nomeAluno = nomeInput.value.trim();

    if (!nomeAluno) {
        nomeInput.focus();
        return;
    }

    /*
    Substitui todos os "null"
    pelo nome digitado.
    */

    document
        .querySelectorAll("p, h1, h2, h3, strong")
        .forEach((elemento) => {

            elemento.innerHTML =
                elemento.innerHTML.replaceAll(
                    "null",
                    nomeAluno
                );

        });


    /*
    Esconde o campo de nome
    */

    entradaNome.classList.add("hidden");


    /*
    Mostra o loading
    */

    areaCarregamento.classList.remove("hidden");


    iniciarCarregamento();
}


/* =========================================
   BOTÃO DO NOME
========================================= */

confirmarNome.addEventListener(
    "click",
    confirmarNomeAluno
);


/* =========================================
   ENTER NO INPUT
========================================= */

nomeInput.addEventListener(
    "keydown",
    (evento) => {

        if (evento.key === "Enter") {
            confirmarNomeAluno();
        }

    }
);


/* =========================================
   CARREGAMENTO
========================================= */

function iniciarCarregamento() {

    let progresso = 0;

    const intervalo = setInterval(() => {

        progresso++;

        carregamentoProgresso.style.width =
            `${progresso}%`;

        carregamentoPorcentagem.textContent =
            `${progresso}%`;


        if (progresso >= 100) {

            clearInterval(intervalo);

            setTimeout(() => {

                mostrarTela("bemvindos");

            }, 700);

        }

    }, 30);
}


/* =========================================
   TROCAR DE TELA
========================================= */

function mostrarTela(idTela) {

    telas.forEach((tela) => {
        tela.classList.remove("active");
    });


    const telaEscolhida =
        document.getElementById(idTela);


    if (!telaEscolhida) {
        console.error(
            `A tela "${idTela}" não existe.`
        );

        return;
    }


    telaEscolhida.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   BOTÕES DATA-NEXT
========================================= */

document
    .querySelectorAll("[data-next]")
    .forEach((botao) => {

        botao.addEventListener(
            "click",
            () => {

                const proximaTela =
                    botao.dataset.next;

                mostrarTela(proximaTela);

            }
        );

    });


/* =========================================
   CHECK-IN DE ENERGIA
========================================= */

document
    .querySelectorAll('input[name="energia"]')
    .forEach((radio) => {

        radio.addEventListener(
            "change",
            () => {

                energia = radio.value;

                proxSecao.classList.remove(
                    "hidden"
                );

            }
        );

    });


/* =========================================
   IR PARA PERGUNTA 2
========================================= */

proxSecao.addEventListener(
    "click",
    () => {

        mostrarTela("pergunta");

    }
);


/* =========================================
   NECESSIDADE
========================================= */

document
    .querySelectorAll('input[name="preciso"]')
    .forEach((radio) => {

        radio.addEventListener(
            "change",
            () => {

                preciso = radio.value;

                mostrarResultado.classList.remove(
                    "hidden"
                );

            }
        );

    });


/* =========================================
   MOSTRAR RESULTADO
========================================= */

mostrarResultado.addEventListener(
    "click",
    () => {

        gerarResultado();

        mostrarTela("resultado");

    }
);


/* =========================================
   GERAR RESULTADO
========================================= */

function gerarResultado() {

    const tituloResultado =
        document.querySelector("#resultado h2");


    if (energia === "baixa") {

        tituloResultado.innerHTML =
            `${nomeAluno}, você <em>precisa</em> de uma pausa. 🫠`;

        textoResultado.textContent =
            "Hoje não precisa ser sobre produtividade. " +
            "Faça o necessário e permita-se desacelerar.";

        return;
    }


    if (preciso === "diversao") {

        tituloResultado.innerHTML =
            `${nomeAluno}, você está precisando se divertir. 🎮`;

        textoResultado.textContent =
            "Nem tudo precisa virar tarefa, projeto ou entrega. " +
            "Faça alguma coisa simplesmente porque é legal.";

        return;
    }


    if (preciso === "comida") {

        tituloResultado.innerHTML =
            `${nomeAluno}, primeiro: vá comer alguma coisa. 🍔`;

        textoResultado.textContent =
            "Seu código pode esperar alguns minutos. " +
            "Seu corpo não deveria.";

        return;
    }


    if (preciso === "descanso") {

        tituloResultado.innerHTML =
            `${nomeAluno}, seu corpo está pedindo descanso. 😴`;

        textoResultado.textContent =
            "Descansar também faz parte do processo. " +
            "Você não precisa merecer o descanso.";

        return;
    }


    if (preciso === "paz") {

        tituloResultado.innerHTML =
            `${nomeAluno}, sua mente está pedindo tranquilidade. 🧘`;

        textoResultado.textContent =
            "Respire fundo, desacelere e permita que " +
            "alguns minutos sejam apenas seus.";

        return;
    }


    tituloResultado.innerHTML =
        `${nomeAluno}, você <em>merece</em> um momento para você! 💜`;

    textoResultado.textContent =
        "Respire. Diminua o ritmo por alguns minutos " +
        "e lembre que você é mais do que aquilo que produz.";
}


/* =========================================
   BISCOITO DA SORTE
========================================= */

const sortes = [

    "Hoje você está oficialmente pode se permitir não produzir por alguns minutos. 😌",

    "Tome uma coisa que você goste e beba devagar. ☕",

    "Coloque uma música que você ama e não faça absolutamente nada até ela acabar. 🎧",

    "Mande uma mensagem para alguém que faz você sorrir. 💜",

    "Você merece descansar antes de chegar ao seu limite. 🌱",

    "Faça alguma coisa hoje só porque você gosta dela. Sem transformar em tarefa. 🎮",

    "Saia um pouco da frente da tela. Seu corpo também precisa de um refresh. 🔄",

    "Coma alguma coisa gostosa. Sim, essa é sua missão. 🍫",

    "Hoje você não precisa dar conta de tudo. Escolha apenas o que realmente importa. ✨",

    "Deligue o monitor por alguns minutos. O código continuará lá quando você voltar. 💻",

    "Respire fundo três vezes. Parece simples, mas agora é exatamente o que você precisa. 🌿",

    "Você está fazendo melhor do que imagina. Continue, mas não esqueça de você. 💜"

];


biscoitoSorte.addEventListener(
    "click",
    () => {

        if (biscoitoAberto) {
            return;
        }


        biscoitoAberto = true;


        biscoitoSorte.classList.add(
            "aberto"
        );


        biscoitoHint.textContent =
            "Seu biscoito revelou uma mensagem...";


        const numeroAleatorio =
            Math.floor(
                Math.random() * sortes.length
            );


        const sorte =
            sortes[numeroAleatorio];


        setTimeout(() => {

            sorteResultado.textContent =
                `${nomeAluno}, ${sorte}`;


            sorteResultado.classList.add(
                "visivel"
            );


            continuarSorte.classList.remove(
                "hidden"
            );


            biscoitoHint.textContent =
                "✨ Sua sorte foi revelada.";

        }, 650);

    }
);


/* =========================================
   REINICIAR
========================================= */

reiniciar.addEventListener(
    "click",
    () => {

        location.reload();

    }
);


/* =========================================
   INICIALIZAÇÃO
========================================= */

window.addEventListener(
    "load",
    () => {

        nomeInput.focus();

    }
);