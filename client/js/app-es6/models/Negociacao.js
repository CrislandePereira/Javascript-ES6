export class Negociacao {
  
  constructor(data, quantidade, valor) {
    this._data = new Date(data.getTime());
    this._quantidade = quantidade;
    this._valor = valor;
    Object.freeze(this);
  }

  // funcao dentro da classe chama metodo
  get volume() {                      //get por debaixo dos panos chama um metodo, e no index.html posso chamar como prop
    return this._quantidade * this._valor; //_ ninguem de fora pode acessa-los
  }

  get data() {
    return new Date(this._data.getTime());
  }

  get quantidade() {
    return this._quantidade;
  }

  get valor() {
    return this._valor;
  }
}