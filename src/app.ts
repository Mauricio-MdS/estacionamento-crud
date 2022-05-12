import Veiculo from './models/veiculo.js';
import VeiculosNoPatio from './models/veiculos-no-patio.js';
import PatioView from './views/patio-view.js';

const botaoRegistrar =
    document.querySelector('.registrar') as HTMLButtonElement;
const formulario = document.querySelector('.formulario') as HTMLFormElement;
const inputNome =
    document.querySelector('.formulario__nome') as HTMLInputElement;
const inputPlaca =
    document.querySelector('.formulario__placa') as HTMLInputElement;
const inputEntrada =
    document.querySelector('.formulario__horario') as HTMLInputElement;
const botaoCancelar = document.querySelector('.cancelar') as HTMLButtonElement;
const view = new PatioView();
const veiculosNoPatio = new VeiculosNoPatio();

interface VeiculoArquivado{
    '_nome': string,
    '_placa': string,
    '_entrada': string,
}

/**
 * Atualiza a tabela com a lista de veículos e com botão de registrar saída.
 */
function atualizaView(): void {
  view.atualiza(veiculosNoPatio);
  vinculaBotoes();
}

/**
 * Faz a busca no local storage ao iniciar o aplicativo.
 * Adiciona ao model veículos no patio e atualiza a View.
 */
function buscaLocalStorage(): void {
  if (!localStorage.patio) return;
  const arquivado = JSON.parse(localStorage.patio);
  arquivado['veiculos'].forEach((veiculo: VeiculoArquivado) => {
    veiculosNoPatio.adiciona(new Veiculo(
        veiculo._nome, veiculo._placa, veiculo._entrada));
  });
  atualizaView();
}

/**
 * Busca veículo na model e calcula o tempo de saída.
 * @param {string} placa A placa do veículo.
 * @return {boolean} Confirmação de que deseja registrar saída.
 */
function calculaTempo(placa: string):boolean {
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

  if (horas < 0 || minutos <0 ) {
    return confirm(
        'Dados de entrada inconsistentes. Deseja remover o veículo do sistema?',
    );
  }

  return confirm(
      `O veículo ficou estacionado por ${horas} horas 
      e ${minutos} minutos. Confirma a saída?`);
}

/**
 * Verifica se a placa possui 7 caracteres alfanuméricos
 * @param {string} placa Placa a ser testada
 * @return {boolean} Retorna true se a placa está no formato correto.
 */
function formatoPlaca(placa: string): boolean {
  const regex = /[A-Z0-9]{7}/;
  return regex.test(placa);
}

/**
 * Retorna uma string com o horário atual no formato HH:mm
 * @return {string} Horário atual no formato HH:mm
 */
function horarioAtual(): string {
  const horas = String(new Date().getHours()).padStart(2, '0');
  const minutos = String(new Date().getMinutes()).padStart(2, '0');
  return `${horas}:${minutos}`;
}

/**
 * Limpa todos os formulários.
 */
function limpaFormulario(): void {
  inputNome.value='';
  inputPlaca.value='';
  inputEntrada.value='';
  visibilidadeFormulario();
}

/**
 * Calcula tempo de estacionamento.
 * Pede confirmação de saída.
 * Se confirmado, remove o veículo do model e local storage.
 * @param {string} placa Placa do veículo.
 */
function registrarSaida(placa: string): void {
  if (calculaTempo(placa)) {
    veiculosNoPatio.remove(placa);
    localStorage.setItem('patio', JSON.stringify(veiculosNoPatio));
    atualizaView();
  }
}

/**
 * Habilita formulário de registro.
 * Define horário do input de entrada igual ao horário atual.
 */
function registrarVeiculo(): void {
  visibilidadeFormulario();
  inputEntrada.value = horarioAtual();
}

/**
 * Salva veículo com dados do formulário.
 * Atualiza view.
 * Limpa o formulário.
 */
function salva(): void {
  const veiculo = new Veiculo(
      inputNome.value, inputPlaca.value, inputEntrada.value);
  veiculosNoPatio.adiciona(veiculo);
  localStorage.setItem('patio', JSON.stringify(veiculosNoPatio));
  atualizaView();
  limpaFormulario();
}

/**
 * Define validação do campo de placa.
 * Busca placa repetida e faz validação dos caracteres permitidos.
 * @param {HTMLInputElement} campoPlaca Campo de placa
 */
function validaPlaca(campoPlaca: HTMLInputElement): void {
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

/**
 * Vincula os botões da tabela com os listeners de onclick.
 */
function vinculaBotoes(): void {
  const botoesDeSaida = document.querySelectorAll<HTMLButtonElement>('.saida');
  botoesDeSaida.forEach(function(botao) {
    botao.addEventListener('click', function() {
      registrarSaida(botao.dataset.placa as string);
    });
  });
}

/**
 * Altera a visibilidade do formulário e do botão registrar novo veículo.
 */
function visibilidadeFormulario(): void {
  botaoRegistrar.classList.toggle('invisible');
  formulario.classList.toggle('invisible');
}

buscaLocalStorage();

botaoRegistrar.onclick = registrarVeiculo;

inputPlaca.addEventListener('blur', (e) => {
  validaPlaca(e.target as HTMLInputElement);
});

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  salva();
});

botaoCancelar.onclick = limpaFormulario;


