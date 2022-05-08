/**
 * View da lista de carros estacionados.
 */
export default class PatioView {
    /**
     * Vincula a tabela à view.
     */
    constructor() {
        this.tabela = document.querySelector('tbody');
    }
    /**
     * Atualiza a view com uma lista de veículos.
     * @param {VeiculosNoPatio} veiculos Lista de veículos que será adicionada.
     */
    atualiza(veiculos) {
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
