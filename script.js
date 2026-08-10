
/* =========================================
   VARIÁVEIS
========================================= */

let nomeAluno = "";
let energia = "";
let preciso = "";


/* =========================================
   ELEMENTOS
========================================= */

const telas =
    document.querySelectorAll(".screen");

const carregamentoProgresso =
    document.getElementById(
        "carregamento-progresso"
    );

const carregamentoPorcentagem =
    document.getElementById(
        "carregamento-porcentagem"
    );

const proxSecao =
    document.getElementById(
        "prox-secao"
    );

const mostrarResultado =
    document.getElementById(
        "mostrar-resultado"
    );

const textoResultado =
    document.getElementById(
        "texto-resultado"
    );

const biscoitoSorte =
    document.getElementById(
        "biscoito-sorte"
    );

const biscoitoHint =
    document.getElementById(
        "biscoito-hint"
    );

const sorteResultado =
    document.getElementById(
        "sorte-resultado"
    );

const continuarSorte =
    document.getElementById(
        "continuar-sorte"
    );

const reiniciar =
    document.getElementById(
        "reiniciar"
    );


/* =========================================
   PEGAR NOME DO ALUNO
========================================= */

function pedirNome() {

    while (!nomeAluno) {

        nomeAluno = prompt(
            "Antes de começar... qual é o seu nome? ♥"
        );

        if (nomeAluno) {
            nomeAluno = nomeAluno.trim();
        }
    }


    /*
     * Procura "null" no HTML e substitui
     * pelo nome digitado pelo aluno.
     */

    document
        .querySelectorAll(
            "p, h1, h2, h3, strong"
        )
        .forEach((elemento) => {

            elemento.innerHTML =
                elemento.innerHTML.replaceAll(
                    "null",
                    nomeAluno
                );

        });
}


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
        return;
    }


    telaEscolhida.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   BOTÕES data-next
========================================= */

document
    .querySelectorAll("[data-next]")
    .forEach((botao) => {

        botao.addEventListener(
            "click",
            () => {

                let proximaTela =
                    botao.dataset.next;


                /*
                 * Caso o HTML ainda esteja usando:
                 *
                 * data-next="sorte"
                 *
                 * mas a seção se chame:
                 *
                 * id="biscoito"
                 */

                if (proximaTela === "sorte") {
                    proximaTela = "biscoito";
                }


                mostrarTela(proximaTela);

            }
        );

    });


/* =========================================
   RADIO — ENERGIA
========================================= */

document
    .querySelectorAll(
        'input[name="energia"]'
    )
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
   IR PARA PERGUNTA 02
========================================= */

proxSecao.addEventListener(
    "click",
    () => {

        mostrarTela("pergunta");

    }
);


/* =========================================
   RADIO — O QUE PRECISA
========================================= */

document
    .querySelectorAll(
        'input[name="preciso"]'
    )
    .forEach((radio) => {

        radio.addEventListener(
            "change",
            () => {

                preciso = radio.value;

                mostrarResultado
                    .classList
                    .remove("hidden");

            }
        );

    });


/* =========================================
   RESULTADO
========================================= */

mostrarResultado.addEventListener(
    "click",
    () => {

        gerarResultado();

        mostrarTela("resultado");

    }
);


function gerarResultado() {

    const tituloResultado =
        document.querySelector(
            "#resultado h2"
        );


    if (energia === "baixa") {

        tituloResultado.innerHTML =
            `${nomeAluno}, você <em>precisa</em> de uma pausa. 🫠`;

        textoResultado.innerHTML =
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

    "Hoje você está oficialmente autorizado a não ser produtivo por alguns minutos. 😌",

    "Tome uma coisa que você goste e beba devagar. ☕",

    "Coloque uma música que você ama e não faça absolutamente nada até ela acabar. 🎧",

    "Mande uma mensagem para alguém que faz você sorrir. 💜",

    "Você merece descansar antes de chegar ao seu limite. 🌱",

    "Faça alguma coisa hoje só porque você gosta dela. Sem transformar em tarefa. 🎮",

    "Saia um pouco da frente da tela. Seu corpo também precisa de um refresh. 🔄",

    "Coma alguma coisa gostosa. Sim, essa é sua missão. 🍫",

    "Hoje você não precisa dar conta de tudo. Escolha apenas o que realmente importa. ✨",

    "Feche o notebook por alguns minutos. O código continuará lá quando você voltar. 💻",

    "Respire fundo três vezes. Parece simples, mas agora é exatamente o que você precisa. 🌿",

    "Você está fazendo melhor do que imagina. Continue, mas não esqueça de você. 💜"

];


let biscoitoAberto = false;


/* =========================================
   ABRIR BISCOITO
========================================= */

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
                Math.random() *
                sortes.length
            );


        const sorte =
            sortes[numeroAleatorio];


        setTimeout(() => {

            sorteResultado.textContent =
                `${nomeAluno}, ${sorte}`;

            sorteResultado.classList.add(
                "visivel"
            );


            continuarSorte
                .classList
                .remove("hidden");


            biscoitoHint.textContent =
                "✨ Sua sorte foi revelada.";

        }, 650);

    }
);


/* =========================================
   REINICIAR EXPERIÊNCIA
========================================= */

reiniciar.addEventListener(
    "click",
    () => {

        location.reload();

    }
);


/* =========================================
   INICIAR EXPERIÊNCIA
========================================= */

window.addEventListener(
    "load",
    () => {

        pedirNome();

        iniciarCarregamento();

    }
);

