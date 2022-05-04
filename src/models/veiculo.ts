export default class Veiculo{
    constructor(
        private _nome: string, 
        private _placa: string, 
        private _entrada: string){}

        get nome(){
            return this._nome;
        }

        get placa(){
            return this._placa;
        }

        get entrada(){
            return this._entrada;
        }

}