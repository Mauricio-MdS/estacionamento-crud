export default class PatioView {
    constructor() {
        this.tabela = document.querySelector("tbody");
    }
    atualiza(veiculos) {
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
            </tr>`;
        }).join("");
        ;
    }
}