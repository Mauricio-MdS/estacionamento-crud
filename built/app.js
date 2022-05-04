import EstacionamentoController from "./controllers/estacionamento-controller.js";
const controller = new EstacionamentoController();
const botaoRegistrar = document.querySelector(".registrar");
const formulario = document.querySelector(".formulario");
const inputNome = document.querySelector(".formulario__nome");
const inputPlaca = document.querySelector(".formulario__placa");
const inputEntrada = document.querySelector(".formulario__horario");
const botaoCancelar = document.querySelector(".cancelar");
function visibilidadeFormulario() {
    botaoRegistrar.classList.toggle("invisible");
    formulario.classList.toggle("invisible");
}
function registrarVeiculo() {
    visibilidadeFormulario();
    inputEntrada.value = `${new Date().getHours()}:${new Date().getMinutes()}`;
}
function cancelarRegistro() {
    inputNome.value = "";
    inputPlaca.value = "";
    inputEntrada.value = "";
    visibilidadeFormulario();
}
botaoRegistrar.onclick = registrarVeiculo;
botaoCancelar.onclick = cancelarRegistro;
