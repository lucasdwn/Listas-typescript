import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";
import CadastroTelefone from "./cadastroTelefone";

export default class CadastroClienteDependentes extends Processo{
    private cliente: Cliente[]

    constructor(){
        super();
        this.cliente = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        let entrada = this.entrada.receberTexto("Digite o CPF do Titular: ")
        
        this.cliente.forEach(i => {
            i.Documentos.filter(x => {
                if(x.Numero === entrada){
                    let nome = this.entrada.receberTexto("Digite o Nome do Cliente ");
                    let nomeSocial = this.entrada.receberTexto("Digite o Nome Social do Cliente");
                    let dataNascimento = this.entrada.receberData("Digite a Data de Nascimento");

                    let clienteDependente = new Cliente(nome, nomeSocial, dataNascimento);

                    this.processo = new CadastrarDocumentosCliente(clienteDependente);
                    this.processo.processar()

                    i.Dependentes.push(clienteDependente);
                    
                    clienteDependente.Endereco = i.Endereco.clonar() as Endereco;
                }
            })
        })
    }
}