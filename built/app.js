import Veiculo from "./models/veiculo.js";
import VeiculosNoPatio from "./models/veiculos-no-patio.js";
import PatioView from "./views/patio-view.js";
/* Variáveis */
const botaoRegistrar = document.querySelector(".registrar");
const formulario = document.querySelector(".formulario");
const inputNome = document.querySelector(".formulario__nome");
const inputPlaca = document.querySelector(".formulario__placa");
const inputEntrada = document.querySelector(".formulario__horario");
const botaoCancelar = document.querySelector(".cancelar");
const view = new PatioView();
const veiculosNoPatio = new VeiculosNoPatio();
/*Funções */
function limpaFormulario() {
    inputNome.value = "";
    inputPlaca.value = "";
    inputEntrada.value = "";
    visibilidadeFormulario();
}
function registrarVeiculo() {
    visibilidadeFormulario();
    inputEntrada.value = `${new Date().getHours()}:${new Date().getMinutes()}`;
}
function salva() {
    const veiculo = new Veiculo(inputNome.value, inputPlaca.value, inputEntrada.value);
    veiculosNoPatio.adiciona(veiculo);
    view.atualiza();
    limpaFormulario();
}
function visibilidadeFormulario() {
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
