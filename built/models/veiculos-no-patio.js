export default class VeiculosNoPatio {
    constructor() {
        this.veiculos = [];
    }
    adiciona(novoVeiculo) {
        this.veiculos.push(novoVeiculo);
    }
    lista() {
        const novaLista = [];
        novaLista.push(...this.veiculos);
        return novaLista;
    }
    pesquisaPlaca(placa) {
        if (this.veiculos.find((veiculo) => veiculo.placa === placa)) {
            return true;
        }
        return false;
    }
    remove(placa) {
        this.veiculos = this.veiculos.filter((veiculo) => veiculo.placa !== placa);
    }
}
