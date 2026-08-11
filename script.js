/* =========================================
   Variáveis
========================================= */

let nomeAluno = "";
let energia = "";
let preciso = "";

let biscoitoAberto = false;


/* =========================================
   Elementos
========================================= */

const telas = document.querySelectorAll(".screen");

const nomeInput = document.getElementById("nome");

const confirmarNome = document.getElementById("confirmar-nome");

const entradaNome = document.getElementById("entrada-nome");

const areaCarregamento = document.getElementById("area-carregamento");

const carregamentoProgresso = document.getElementById("carregamento-progresso");

const carregamentoPorcentagem = document.getElementById("carregamento-porcentagem");

const proxSecao = document.getElementById("prox-secao");

const mostrarResultado = document.getElementById("mostrar-resultado");

const textoResultado = document.getElementById("texto-resultado");

const biscoitoSorte = document.getElementById("biscoito-sorte");

const biscoitoHint = document.getElementById("biscoito-hint");

const sorteResultado = document.getElementById("sorte-resultado");

const continuarSorte = document.getElementById("continuar-sorte");

const reiniciar = document.getElementById("reiniciar");


/* BTN Claro e Escuro */

const alternarTema = document.getElementById("alternar-tema");

/* =========================================
   Confirmando nome
========================================= */

function confirmarNomeAluno() {

    nomeAluno = nomeInput.value.trim();

    if (!nomeAluno) {

        nomeInput.focus();

        return;
    }

    document.querySelectorAll("p, h1, h2, h3, strong")
        .forEach((elemento) => {

            elemento.innerHTML =
                elemento.innerHTML.replaceAll(
                    "null",
                    nomeAluno
                );
        });

    entradaNome.classList.add("hidden");

    areaCarregamento.classList.remove("hidden");

    iniciarCarregamento();
}

/* =========================================
   BTN nome
========================================= */

confirmarNome.addEventListener(
    "click",
    confirmarNomeAluno
);

/* =========================================
   Enter no input
========================================= */

nomeInput.addEventListener("keydown",(evento) => {

        if (evento.key === "Enter") {

            confirmarNomeAluno();
        }

    }
);

/* =========================================
   Carregamento
========================================= */

function iniciarCarregamento() {

    let progresso = 0;

    const intervalo =
        setInterval(() => {

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
   Trocar tela
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
   BTN data-next
========================================= */

document.querySelectorAll("[data-next]").forEach((botao) => {

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
   Check-in
========================================= */

document.querySelectorAll('input[name="energia"]')
    .forEach((radio) => {radio.addEventListener("change",() => {

                energia =
                    radio.value;

                proxSecao.classList.remove(
                    "hidden"
                );
            }
        );
    });

/* =========================================
   IR PARA PERGUNTA 2
========================================= */

proxSecao.addEventListener("click",() => {

        mostrarTela("pergunta");

    }
);

/* =========================================
   Nencessidade
========================================= */

document.querySelectorAll('input[name="preciso"]').forEach((radio) => {

        radio.addEventListener("change",() => {

                preciso =
                    radio.value;

                mostrarResultado.classList.remove(
                    "hidden"
                );
            }
        );
    });

/* =========================================
   MOSTRAR RESULTADO
========================================= */

mostrarResultado.addEventListener("click",() => {

        gerarResultado();

        mostrarTela("resultado");
    }
);

/* =========================================
   Gendando o resultado
========================================= */

function gerarResultado() {

    const tituloResultado = document.querySelector("#resultado h2");

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
   Biscoito da sorte
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

biscoitoSorte.addEventListener("click",() => {

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
   Reiniciar
========================================= */

reiniciar.addEventListener("click",() => {

        location.reload();

    }
);

/* =========================================
   Modo claro e escuro
========================================= */

if (alternarTema) {

    alternarTema.addEventListener("click",() => {

            const modoEscuro =
                document.body.classList.toggle(
                    "tema-escuro"
                );

            alternarTema.setAttribute(
                "aria-pressed",
                String(modoEscuro)
            );

            if (modoEscuro) {

                alternarTema.textContent =
                    "☀️ Modo claro";

            } else {

                alternarTema.textContent =
                    "🌙 Modo escuro";

            }

            localStorage.setItem(
                "pausa-tema",
                modoEscuro
                    ? "escuro"
                    : "claro"
            );

        }
    );

}

/* =========================================
   Iniciando
========================================= */

window.addEventListener("load",() => {

        const temaSalvo =
            localStorage.getItem("pausa-tema");

        if (
            temaSalvo === "escuro" &&
            alternarTema
        ) {

            document.body.classList.add(
                "tema-escuro"
            );

            alternarTema.setAttribute(
                "aria-pressed",
                "true"
            );

            alternarTema.textContent =
                "☀️ Modo claro";

        }

        if (nomeInput) {

            nomeInput.focus();

        }

    }
);