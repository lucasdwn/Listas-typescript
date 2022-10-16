import Processo from "../abstracoes/processo";
import MenuTipoCadastroTelefone from "../menus/menuTipoCadastroTelefone";
import Cliente from "../modelos/cliente";
import CadastroTelefone from "./cadastroTelefone";

export default class CadastroClienteTelefone extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.menu = new MenuTipoCadastroTelefone();
        this.cliente = cliente;
        this.execucao = true;
    };

    processar(): void {
        console.log('Cadastro de telefone...');
        while (this.execucao) {
            this.menu.mostrar();
            this.opcao = this.entrada.receberNumero('Escolha uma opção ')
            switch (this.opcao){
                case 1:
                    this.processo = new CadastroTelefone(this.cliente);
                    this.processo.processar();
                    break;
                case 0:
                    this.execucao = false;
                    break;
            }
        }

    }
}