import VeiculosNoPatio from "../models/veiculos-no-patio.js";

export default class PatioView{

    private tabela: HTMLTableSectionElement;

    constructor(){
        this.tabela = document.querySelector("tbody") as HTMLTableSectionElement;
    }


    atualiza(veiculos: VeiculosNoPatio): void{
        this.tabela.innerHTML = veiculos.lista().map(veiculo => {
            return `
            <tr>
                <td> ${veiculo.nome} </td>
                <td> ${veiculo.placa} </td>
                <td> ${veiculo.entrada} </td>
                <td>
                    <button class="button saida">Saída</button>
                    <button class="button editar">Editar</button>
                </td>
            </tr>`
        }).join("");
        ;
    }
}