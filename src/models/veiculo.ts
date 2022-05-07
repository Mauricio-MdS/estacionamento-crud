/**
 * Modelo da classe veículo.
 */
export default class Veiculo {
  /**
   * @param {string} _nome Nome do condutor.
   * @param {string} _placa Placa do veículo.
   * @param {string} _entrada Horário de entrada.
   */
  constructor(
        private _nome: string,
        private _placa: string,
        private _entrada: string) {}
  /**
   * Getter do nome.
   * @return {string} Nome do condutor.
   */
  get nome(): string {
    return this._nome;
  }

  /**
   * Getter da placa.
   * @return {string} Placa do veículo.
   */
  get placa(): string {
    return this._placa;
  }

  /**
   * Getter do horário de entrada.
   * @return {string} Horário de entrada.
   */
  get entrada(): string {
    return this._entrada;
  }
}
