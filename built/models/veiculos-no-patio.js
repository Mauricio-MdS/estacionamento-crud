export default class VeiculosNoPatio {
    constructor() {
        this.veiculos = [];
    }
    adiciona(novoVeiculo) {
        this.veiculos.push(novoVeiculo);
    }
    lista() {
        let novaLista = [];
        novaLista.push(...this.veiculos);
        return novaLista;
    }
}
