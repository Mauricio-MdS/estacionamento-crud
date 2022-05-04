export default class VeiculosNoPatio {
    constructor() {
        this.veiculos = [];
    }
    adiciona(novoVeiculo) {
        this.veiculos.push(novoVeiculo);
    }
    remove(placa) {
        this.veiculos = this.veiculos.filter(veiculo => veiculo.placa !== placa);
    }
    lista() {
        let novaLista = [];
        novaLista.push(...this.veiculos);
        return novaLista;
    }
}
