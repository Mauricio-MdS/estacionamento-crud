import EstacionamentoController from "./controllers/estacionamento-controller.js";
const controller = new EstacionamentoController();
const botaoRegistrar = document.querySelector(".registrar");
const formulario = document.querySelector(".formulario");
const inputEntrada = document.querySelector(".formulario__horario");
function registrarVeiculo() {
    botaoRegistrar.classList.toggle("invisible");
    formulario.classList.toggle("invisible");
    inputEntrada.value = `${new Date().getHours()}:${new Date().getMinutes()}`;
}
botaoRegistrar.onclick = registrarVeiculo;
