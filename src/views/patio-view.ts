import VeiculosNoPatio from '../models/veiculos-no-patio.js';

/**
 * View da lista de carros estacionados.
 */
export default class PatioView {
  private tabela: HTMLTableSectionElement;

  /**
   * Vincula a tabela à view.
   */
  constructor() {
    this.tabela = document.querySelector('tbody') as HTMLTableSectionElement;
  }

  /**
   * Atualiza a view com uma lista de veículos.
   * @param {VeiculosNoPatio} veiculos Lista de veículos que será adicionada.
   */
  atualiza(veiculos: VeiculosNoPatio): void {
    this.tabela.innerHTML = veiculos.lista().map((veiculo) => {
      return `
            <tr>
                <td> ${veiculo.nome} </td>
                <td> ${veiculo.placa} </td>
                <td> ${veiculo.entrada} </td>
                <td>
                    <button class="button saida" data-placa="${veiculo.placa}">
                      Saída
                    </button>
                </td>
            </tr>`;
    }).join('');
    ;
  }
}
