import readline = require("readline-sync"); //Import do readline-sync para entrada de dados
import { colors } from "./src/util/Colors"; //Import de cores
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";
import { ContaController } from "./src/controller/ContaController";


export function main(){

    let contas: ContaController = new ContaController();

    let opcao, numero, agencia, tipo, saldo, limite, aniversario: number;
    let titular: string;
    const tipoContas = [`Conta Corrente`, `Conta Poupança`];

    while(true){

        console.log(colors.bg.black, colors.fg.yellow, 
                    "***************************************************");
        console.log("                                                   ");
        console.log("               BANCO DO BRAZIL COM Z               ");
        console.log("                                                   ");
        console.log("***************************************************");
        console.log("                                                   ");
        console.log("         1 - Criar Conta                           ");
        console.log("         2 - Listar todas as Contas                ");
        console.log("         3 - Buscar conta por Número               ");
        console.log("         4 - Atualziar Dados da Conta              ");
        console.log("         5 - Apagar Conta                          ");
        console.log("         6 - Sacar                                 ");
        console.log("         7 - Depositar                             ");
        console.log("         8 - Transferir Valores entre Contas       ");
        console.log("         9 - Sair                                  ");
        console.log("                                                   ");
        console.log("***************************************************");
        console.log("                                                   ",
        colors.reset);

        console.log("Entre com a opção desejada: ");
        opcao = readline.questionInt("");

        if(opcao == 9){
            console.log(colors.fg.whitestrong, "\nBanco do Brazil com Z - O seu futuro começa aqui!");
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }
        switch(opcao){
            case 1:
                console.log(colors.fg.whitestrong,"\n\nCriar Conta\n\n", colors.reset);

                console.log("Digite o Número da Agência: ");
                agencia = readline.questionInt("");

                console.log("Digite o Nome do Titular da Conta: ");
                titular = readline.question("");

                console.log("Digite o tipo da Conta: ");
                tipo = readline.keyInSelect(tipoContas, "", {cancel: false}) + 1;

                console.log("Digite o Saldo da Conta (R$): ");
                saldo = readline.questionFloat("");

                    switch(tipo){
                        case 1: 
                            console.log("Digite o limite da Conta (R$): ");
                            limite = readline.questionFloat("");
                            contas.cadastrar(new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite));
                        break;

                        case 2: 
                            console.log("Digite o Dia do aniversário da Conta Poupança: ");
                            aniversario = readline.questionFloat("");
                            contas.cadastrar(new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario));
                        break;
                    }

                keyPress();
                break;

            case 2:
                console.log(colors.fg.whitestrong, colors.reset);
                contas.listarTodas();
                keyPress();
                break;

            case 3:
                console.log(colors.fg.whitestrong, "\n\nConsultar dados da Conta - por número\n\n", colors.reset);
                console.log("Digite o número da Conta: ");
                numero = readline.questionInt("");
                contas.procurarPorNumero(numero);

                keyPress();
                break;

            case 4:
                console.log(colors.fg.whitestrong,"\n\nAtualizar dados da Conta\n\n", colors.reset);
                console.log("Digite o número da Conta: ");
                numero = readline.questionInt("");

                let conta = contas.buscarNoArray(numero);

                if(conta != null){
                    console.log("Digite o Número da Agência: ");
                    agencia = readline.questionInt("");

                    console.log("Digite o Nome do Titular da Conta: ");
                    titular = readline.question("");

                    console.log("Digite o tipo da Conta: ");
                    tipo = readline.keyInSelect(tipoContas, "", {cancel: false}) + 1;

                    console.log("Digite o Saldo da Conta (R$): ");
                    saldo = readline.questionFloat("");

                        switch(tipo){
                            case 1: 
                                console.log("Digite o limite da Conta (R$): ");
                                limite = readline.questionFloat("");
                                contas.atualizar(new ContaCorrente(numero, agencia, tipo, titular, saldo, limite));
                            break;

                            case 2: 
                                console.log("Digite o Dia do aniversário da Conta Poupança: ");
                                aniversario = readline.questionFloat("");
                                contas.cadastrar(new ContaCorrente(numero, agencia, tipo, titular, saldo, aniversario));
                            break;
                        }
                }else{
                    console.log(colors.fg.red, `\n A Conta número: ${numero} não foi encontrada!`, colors.reset);
                }
                
                keyPress();
                break;

            case 5:
                console.log(colors.fg.whitestrong, "\n\nApagar uma Conta\n\n", colors.reset);
                console.log("Digite o número da Conta: ");
                numero = readline.questionInt("");
                contas.deletar(numero);
                
                keyPress();
                break;

            case 6:
                console.log(colors.fg.whitestrong,
                            "\n\nSaque\n\n", colors.reset);
                keyPress();
                break;

            case 7:
                console.log(colors.fg.whitestrong,
                            "\n\nDepósito\n\n", colors.reset);
                keyPress();
                break;

            case 8:
                console.log(colors.fg.whitestrong,
                            "\n\nTransferência entre Contas\n\n", colors.reset);
                keyPress();
                break;

            default:
                console.log(colors.fg.whitestrong,
                            "\nOpção Inválida!\n", colors.reset);
                keyPress();
                break;
        }
    }
}

// Função com os dados da pessoa desenvolvedora 
export function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: ");
    console.log("Gabriel Coutinho de Souza - gabriel.csouza16@outlook.com");
    console.log("github.com/gcoutinhoo");
    console.log("*****************************************************");
}
// Função para aguardar o usuário pressionar enter antes de continuar
function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readline.prompt();
}

main();