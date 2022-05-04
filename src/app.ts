import Veiculo from "./models/veiculo.js";
import VeiculosNoPatio from "./models/veiculos-no-patio.js";
import PatioView from "./views/patio-view.js";

/* Variáveis */
const botaoRegistrar = document.querySelector(".registrar") as HTMLButtonElement;
const formulario = document.querySelector(".formulario") as HTMLFormElement;
const inputNome = document.querySelector(".formulario__nome") as HTMLInputElement;
const inputPlaca = document.querySelector(".formulario__placa") as HTMLInputElement;
const inputEntrada = document.querySelector(".formulario__horario") as HTMLInputElement;
const botaoCancelar = document.querySelector(".cancelar") as HTMLButtonElement;
const view = new PatioView();
const veiculosNoPatio = new VeiculosNoPatio();

interface VeiculoArquivado{
    "_nome": string,
    "_placa": string,
    "_entrada": string,
}

/*Funções */
function atualizaView(): void{
    view.atualiza(veiculosNoPatio);
    vinculaBotoes();
}

function buscaLocalStorage(): void{
    if(!localStorage.patio) return;
    const arquivado = JSON.parse(localStorage.patio);
    arquivado["veiculos"].forEach((veiculo: VeiculoArquivado) => {
        veiculosNoPatio.adiciona(new Veiculo(veiculo._nome, veiculo._placa, veiculo._entrada))
    });
    atualizaView();
}

function calculaTempo(placa: string):boolean{
    const veiculoQueEstaSaindo = veiculosNoPatio.lista().find(veiculo => veiculo.placa === placa);
    if (!veiculoQueEstaSaindo) throw new Error("veículo não encontrado na base de dados");
    let horaAtual = new Date().getHours();
    let minutoAtual = new Date().getMinutes();
    const horarioEntrada = veiculoQueEstaSaindo.entrada.split(":");
    const horaEntrada = parseInt(horarioEntrada[0]);
    const minutoEntrada = parseInt(horarioEntrada[1]);

    if (minutoAtual < minutoEntrada){
        minutoAtual += 60;
        horaAtual -= 1;
    }

    const horas = horaAtual - horaEntrada;
    const minutos = minutoAtual - minutoEntrada;

    return confirm(`O veículo ficou estacionado por ${horas} horas e ${minutos} minutos. Confirma a saída?`);
}

function limpaFormulario(): void{
    inputNome.value="";
    inputPlaca.value="";
    inputEntrada.value="";
    visibilidadeFormulario();
}

function registrarSaida(placa: string): void{
    if (calculaTempo(placa)){
        veiculosNoPatio.remove(placa);
        localStorage.setItem("patio", JSON.stringify(veiculosNoPatio));
        atualizaView();
    }
}

function registrarVeiculo(): void{
    visibilidadeFormulario();
    inputEntrada.value= `${new Date().getHours()}:${new Date().getMinutes()}`;
}

function salva(): void{
    const veiculo = new Veiculo(inputNome.value, inputPlaca.value, inputEntrada.value);
    veiculosNoPatio.adiciona(veiculo);
    localStorage.setItem("patio", JSON.stringify(veiculosNoPatio));
    atualizaView();
    limpaFormulario();
}

function vinculaBotoes(): void{
    const botoesDeSaida = document.querySelectorAll<HTMLButtonElement>(".saida");
    botoesDeSaida.forEach(function(botao){
        botao.addEventListener("click", function(){
            registrarSaida(botao.dataset.placa as string)
        })
    });
}

function visibilidadeFormulario(): void{
    botaoRegistrar.classList.toggle("invisible");
    formulario.classList.toggle("invisible");
}



/* Listeners */
botaoRegistrar.onclick = registrarVeiculo;

formulario.addEventListener("submit", e => {
    e.preventDefault();
    salva();
});
botaoCancelar.onclick = limpaFormulario;

buscaLocalStorage()
