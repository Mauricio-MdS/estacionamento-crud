export default class Veiculo {
    constructor(_nome, _placa, _entrada) {
        this._nome = _nome;
        this._placa = _placa;
        this._entrada = _entrada;
    }
    get nome() {
        return this._nome;
    }
    get placa() {
        return this._placa;
    }
    get entrada() {
        return this._entrada;
    }
}
