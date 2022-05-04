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
function calculaTempo(placa) {
    const veiculoQueEstaSaindo = veiculosNoPatio.lista().find(veiculo => veiculo.placa === placa);
    if (!veiculoQueEstaSaindo)
        throw new Error("veículo não encontrado na base de dados");
    let horaAtual = new Date().getHours();
    let minutoAtual = new Date().getMinutes();
    const horarioEntrada = veiculoQueEstaSaindo.entrada.split(":");
    const horaEntrada = parseInt(horarioEntrada[0]);
    const minutoEntrada = parseInt(horarioEntrada[1]);
    if (minutoAtual < minutoEntrada) {
        minutoAtual += 60;
        horaAtual -= 1;
    }
    const horas = horaAtual - horaEntrada;
    const minutos = minutoAtual - minutoEntrada;
    return confirm(`O veículo ficou estacionado por ${horas} horas e ${minutos} minutos. Confirma a saída?`);
}
function limpaFormulario() {
    inputNome.value = "";
    inputPlaca.value = "";
    inputEntrada.value = "";
    visibilidadeFormulario();
}
function registrarSaida(placa) {
    if (calculaTempo(placa)) {
        veiculosNoPatio.remove(placa);
        view.atualiza(veiculosNoPatio);
        vinculaBotoes();
    }
}
function registrarVeiculo() {
    visibilidadeFormulario();
    inputEntrada.value = `${new Date().getHours()}:${new Date().getMinutes()}`;
}
function salva() {
    const veiculo = new Veiculo(inputNome.value, inputPlaca.value, inputEntrada.value);
    veiculosNoPatio.adiciona(veiculo);
    view.atualiza(veiculosNoPatio);
    vinculaBotoes();
    limpaFormulario();
}
function vinculaBotoes() {
    const botoesDeSaida = document.querySelectorAll(".saida");
    botoesDeSaida.forEach(function (botao) {
        botao.addEventListener("click", function () {
            registrarSaida(botao.dataset.placa);
        });
    });
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
