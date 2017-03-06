import TinyEmitter from "tiny-emitter";
import Request from "browser-request";

//Cria uma classe pai que herda as funcionalidades do módulo tiny-emitter, para
//que seja possível emitir e escutar eventos do browser.
class NTask extends TinyEmitter {
  constructor() {
    super();
    this.request = Request; //Carrega o módulo browser-request
    this.URL = "https://localhost:3000"; //Endereço da API.
  }
}

module.exports = NTask;
