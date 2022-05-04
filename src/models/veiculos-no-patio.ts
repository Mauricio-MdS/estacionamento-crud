import Veiculo from "./veiculo.js";

export default class VeiculosNoPatio{
    
    private veiculos: Veiculo[] = [];

    adiciona(novoVeiculo: Veiculo): void{
        this.veiculos.push(novoVeiculo);
    }

    remove(placa: string) {
        this.veiculos = this.veiculos.filter(veiculo => veiculo.placa !== placa);
    }

    lista(): Veiculo[]{
        let novaLista : Veiculo[] = [];
        novaLista.push(...this.veiculos);
        return novaLista;
    }
}