/**
 * Modelo da classe veículo.
 */
export default class Veiculo {
    /**
     * @param {string} _nome Nome do condutor.
     * @param {string} _placa Placa do veículo.
     * @param {string} _entrada Horário de entrada.
     */
    constructor(_nome, _placa, _entrada) {
        this._nome = _nome;
        this._placa = _placa;
        this._entrada = _entrada;
    }
    /**
     * Getter do nome.
     * @return {string} Nome do condutor.
     */
    get nome() {
        return this._nome;
    }
    /**
     * Getter da placa.
     * @return {string} Placa do veículo.
     */
    get placa() {
        return this._placa;
    }
    /**
     * Getter do horário de entrada.
     * @return {string} Horário de entrada.
     */
    get entrada() {
        return this._entrada;
    }
}
