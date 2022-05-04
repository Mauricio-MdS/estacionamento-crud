import EstacionamentoController from "./controllers/estacionamento-controller.js";

const controller = new EstacionamentoController();
const botaoRegistrar = document.querySelector(".registrar") as HTMLButtonElement;
const formulario = document.querySelector(".formulario") as HTMLFormElement;
const inputNome = document.querySelector(".formulario__nome") as HTMLInputElement;
const inputPlaca = document.querySelector(".formulario__placa") as HTMLInputElement;
const inputEntrada = document.querySelector(".formulario__horario") as HTMLInputElement;
const botaoCancelar = document.querySelector(".cancelar") as HTMLButtonElement;


function visibilidadeFormulario(): void{
    botaoRegistrar.classList.toggle("invisible");
    formulario.classList.toggle("invisible");
}

function registrarVeiculo(): void{
    visibilidadeFormulario();
    inputEntrada.value= `${new Date().getHours()}:${new Date().getMinutes()}`;
}

function cancelarRegistro(): void{
    inputNome.value="";
    inputPlaca.value="";
    inputEntrada.value="";
    visibilidadeFormulario();
}

botaoRegistrar.onclick = registrarVeiculo;
botaoCancelar.onclick = cancelarRegistro;