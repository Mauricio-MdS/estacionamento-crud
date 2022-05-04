import EstacionamentoController from "./controllers/estacionamento-controller.js";

const controller = new EstacionamentoController();
const botaoRegistrar = document.querySelector(".registrar") as HTMLButtonElement;
const formulario = document.querySelector(".formulario") as HTMLFormElement;
const inputEntrada = document.querySelector(".formulario__horario") as HTMLInputElement;

function registrarVeiculo(): void{
    botaoRegistrar.classList.toggle("invisible");
    formulario.classList.toggle("invisible");
    inputEntrada.value= `${new Date().getHours()}:${new Date().getMinutes()}`;
}


botaoRegistrar.onclick = registrarVeiculo;