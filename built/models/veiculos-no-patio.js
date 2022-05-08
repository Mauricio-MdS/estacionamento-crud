/**
 * Classe com lista de veículos estacionados.
 */
export default class VeiculosNoPatio {
    constructor() {
        this.veiculos = [];
    }
    /**
     * Adiciona um novo veículo a lista de veículos estacionados.
     * @param {Veiculo} novoVeiculo Veículo a ser adicionado.
     */
    adiciona(novoVeiculo) {
        this.veiculos.push(novoVeiculo);
    }
    /**
     * Remove um veículo da lista de veículos estacionados.
     * @param {string} placa Placa do veículo a ser removido.
     */
    remove(placa) {
        this.veiculos = this.veiculos.filter((veiculo) => veiculo.placa !== placa);
    }
    /**
     * Retorna uma cópia da lista de veículos estacionados.
     * @return {Veiculo[]} Cópia da lista de veículos estacionados.
     */
    lista() {
        const novaLista = [];
        novaLista.push(...this.veiculos);
        return novaLista;
    }
}
