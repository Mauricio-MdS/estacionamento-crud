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

/*Funções */
function limpaFormulario(): void{
    inputNome.value="";
    inputPlaca.value="";
    inputEntrada.value="";
    visibilidadeFormulario();
}

function registrarVeiculo(): void{
    visibilidadeFormulario();
    inputEntrada.value= `${new Date().getHours()}:${new Date().getMinutes()}`;
}

function salva(): void{
    const veiculo = new Veiculo(inputNome.value, inputPlaca.value, inputEntrada.value);
    veiculosNoPatio.adiciona(veiculo);
    view.atualiza();
    limpaFormulario();
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