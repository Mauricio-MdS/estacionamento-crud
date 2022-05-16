import Veiculo from './models/veiculo.js';
import VeiculosNoPatio from './models/veiculos-no-patio.js';
import PatioView from './views/patio-view.js';
const botaoRegistrar = document.querySelector('.registrar');
const formulario = document.querySelector('.formulario');
const inputNome = document.querySelector('.formulario__nome');
const inputPlaca = document.querySelector('.formulario__placa');
const inputEntrada = document.querySelector('.formulario__horario');
const botaoCancelar = document.querySelector('.cancelar');
const view = new PatioView();
const veiculosNoPatio = new VeiculosNoPatio();
function atualizaView() {
    view.atualiza(veiculosNoPatio);
    vinculaBotoes();
}
function buscaLocalStorage() {
    if (!localStorage.patio)
        return;
    const arquivado = JSON.parse(localStorage.patio);
    arquivado['veiculos'].forEach((veiculo) => {
        veiculosNoPatio.adiciona(new Veiculo(veiculo._nome, veiculo._placa, veiculo._entrada));
    });
    atualizaView();
}
function calculaTempo(placa) {
    const veiculoQueEstaSaindo = veiculosNoPatio.
        lista().find((veiculo) => veiculo.placa === placa);
    if (!veiculoQueEstaSaindo) {
        throw new Error('veículo não encontrado na base de dados');
    }
    let horaAtual = new Date().getHours();
    let minutoAtual = new Date().getMinutes();
    const horarioEntrada = veiculoQueEstaSaindo.entrada.split(':');
    const horaEntrada = parseInt(horarioEntrada[0]);
    const minutoEntrada = parseInt(horarioEntrada[1]);
    if (minutoAtual < minutoEntrada) {
        minutoAtual += 60;
        horaAtual -= 1;
    }
    const horas = horaAtual - horaEntrada;
    const minutos = minutoAtual - minutoEntrada;
    if (horas < 0 || minutos < 0) {
        return confirm('Dados de entrada inconsistentes. Deseja remover o veículo do sistema?');
    }
    return confirm(`O veículo ficou estacionado por ${horas} horas 
      e ${minutos} minutos. Confirma a saída?`);
}
function formatoPlaca(placa) {
    const regex = /[A-Z0-9]{7}/;
    return regex.test(placa);
}
function horarioAtual() {
    const horas = String(new Date().getHours()).padStart(2, '0');
    const minutos = String(new Date().getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
}
function limpaFormulario() {
    inputNome.value = '';
    inputPlaca.value = '';
    inputEntrada.value = '';
    visibilidadeFormulario();
}
function registrarSaida(placa) {
    if (calculaTempo(placa)) {
        veiculosNoPatio.remove(placa);
        localStorage.setItem('patio', JSON.stringify(veiculosNoPatio));
        atualizaView();
    }
}
function registrarVeiculo() {
    visibilidadeFormulario();
    inputEntrada.value = horarioAtual();
}
function salva() {
    const veiculo = new Veiculo(inputNome.value, inputPlaca.value, inputEntrada.value);
    veiculosNoPatio.adiciona(veiculo);
    localStorage.setItem('patio', JSON.stringify(veiculosNoPatio));
    atualizaView();
    limpaFormulario();
}
function validaPlaca(campoPlaca) {
    campoPlaca.value = campoPlaca.value.toUpperCase();
    campoPlaca.value = campoPlaca.value.replace('-', '');
    campoPlaca.setCustomValidity('');
    if (veiculosNoPatio.pesquisaPlaca(campoPlaca.value)) {
        campoPlaca.setCustomValidity('O veículo já foi cadastrado no pátio.');
    }
    if (!formatoPlaca(campoPlaca.value)) {
        campoPlaca.setCustomValidity('Erro no preenchimento da placa');
    }
}
function vinculaBotoes() {
    const botoesDeSaida = document.querySelectorAll('.saida');
    botoesDeSaida.forEach(function (botao) {
        botao.addEventListener('click', function () {
            registrarSaida(botao.dataset.placa);
        });
    });
}
function visibilidadeFormulario() {
    botaoRegistrar.classList.toggle('invisible');
    formulario.classList.toggle('invisible');
}
buscaLocalStorage();
botaoRegistrar.onclick = registrarVeiculo;
inputPlaca.addEventListener('blur', (e) => {
    validaPlaca(e.target);
});
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    salva();
});
botaoCancelar.onclick = limpaFormulario;
