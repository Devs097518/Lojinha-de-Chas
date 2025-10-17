<script lang="ts">
    import Navegacao from "$lib/Navegacao.svelte";
    import Contatos from "$lib/Contatos.svelte";
    import { userCode , userInfo} from '$lib/stores/userCode';

    let nome: string = "";
    let endereco: string = "";
    let resultado: any = {};

    let conta: string = "flex";
    let gerar: string = "none";
    let acessar: string = "none";
    let dados: string = "none";

    let itens = [
        {
            produto: "",
            valor: 0,
        },

        {
            produto: "Maçã",
            valor: 2,
        },
        {
            produto: "Uva",
            valor: 4,
        },
    ];

    async function criar() {
        if (nome != "" && endereco != "") {
            try {
                const idCriado = Math.random().toString(36).substring(2, 8);
                const sacola: string[] = [];
                $userCode = idCriado;

                console.log("postado com sucesso!", idCriado);
                let dadosSoltos = await fetch("https://lojinha-de-chas.onrender.com/post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // body: JSON.stringify({
                    //     identificador: `${idCriado}`,
                    //     nome: `${nome}`,
                    //     descricao: `${endereco}`,
                    //     sacola: {
                    //         produto: `${itens[0].produto}`,
                    //         valor: `${itens[0].valor}`,
                    //     },
                    // }),
                    body: JSON.stringify({
                        identificador: idCriado,
                        nome,
                        descricao:endereco,
                        sacola: [],
                    }),
                });
            } catch (error) {
                console.log("erro ao acessar os dados", error);
            }
        } else {
            alert("preencha os campos para criar sua conta");
        }
    }

    /*
    
    async function read() {
                let dadosSoltos = await fetch(
                    `http://localhost:3000/acessar/${$userCode}`,
                );
                let dadosAgrupados = await dadosSoltos.json();
                    resultado = dadosAgrupados;
                    $userInfo.push(dadosAgrupados);
                }
    }
    
    */




    async function read() {
        if ($userCode != '') {
            try {
                let dadosSoltos = await fetch(
                    `https://lojinha-de-chas.onrender.com/acessar/${$userCode}`,
                );
                let dadosAgrupados = await dadosSoltos.json();

                if (dadosAgrupados.error) {
                    console.log($userCode)
                    alert('código inválido')
                } else {
                    resultado = dadosAgrupados;
                    $userInfo.push(dadosAgrupados);

                    // console.log(dadosAgrupados);
                    // console.log($userCode)
                    trocarTela("dados");
                }

                

            } catch (error) {
                console.log("erro ao acessar os dados", error);
            }
        } else {
            alert("insira seu código de acesso para entrar na sua conta");
        }
    }

    let trocarTela = (info: string) => {
        info == "acessar" ? (acessar = "flex") : (acessar = "none");
        info == "gerar" ? (gerar = "flex") : (gerar = "none");
        info == "dados" ? (dados = "flex") : (dados = "none");
        info == "conta" ? (conta = "flex") : (conta = "none");
    };
</script>

<div id="pagina">
    <section id="conteudo">
        <nav>
            <Navegacao />
        </nav>

        <article>
            <div class="caixa" style="display:{conta};">
                <h1 style="color:rgb(49, 49, 49)">ENTRAR</h1>
                <button class="botao" on:click={() => trocarTela("acessar")}
                    >Acessar conta</button
                >
                <button class="botao" on:click={() => trocarTela("gerar")}
                    >Criar conta</button
                >
            </div>

            <div class="caixa" style="display:{gerar};">
                <h1>CRIAR CONTA</h1>

                <table>
                    <thead>
                        <tr>
                            <td>nome</td>
                            <td style="padding:0"
                                ><input
                                    type="text"
                                    bind:value={nome}
                                    class="inputCriar"
                                /> <br /></td
                            >
                        </tr>
                        <tr>
                            <td>endereço</td>
                            <td style="padding:0"
                                ><input
                                    type="text"
                                    bind:value={endereco}
                                    class="inputCriar"
                                /></td
                            >
                        </tr>
                    </thead>
                </table>

                <button class="botao" on:click={criar}>criar conta</button>

                <span>
                    *Após criar sua conta, guarde seu código de acesso para
                    entrar na sua conta e acessar suas coisas. seu código de
                    acesso: <br />
                    <h1 style="color: black;">{$userCode}</h1>
                </span>
            </div>

            <div class="caixa" style="display:{acessar};">
                <h1>ACESSAR CONTA</h1>

                <div style="display:flex ; height:60px ">
                    <input id="inputAcesso" type="text" bind:value={$userCode} />
                    <br />
                    <button id="buttonAcesso" on:click={read}> entrar </button>
                </div>

                <br />
            </div>

            <div class="caixa" style="display:{dados};">
                <hr />
                <h1>INFORMAÇÔES PESSOAIS</h1>

                <table>
                    <thead>
                        <tr>
                            <td>nome</td>
                            <td>{resultado.nome}</td>
                        </tr>
                        <tr>
                            <td>endereço</td>
                            <td>{resultado.descricao}</td>
                        </tr>
                        <tr>
                            <td>código de acesso</td>
                            <td>{resultado.identificador}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </article>

        <footer>
            <Contatos />
        </footer>
    </section>
</div>

<style>
    #pagina {
        display: flex;
        justify-content: center;
    }

    #conteudo {
        width: 100%;
        min-height: 50vh;
        background-color: white;
    }

    article {
        min-height: 90vh;
        display: flex;
        align-items: center;
        justify-content: center;
        /* background-color: rgb(255, 244, 179); */
        background-image: url(/paisagem2.jpg);
        background-size: cover;

        border-left: 1px black solid;
        border-right: 1px black solid;
    }

    .caixa {
        display: flex;
        align-items: center;
        border: 1px solid rgb(92, 92, 92);
        flex-direction: column;
        justify-content: center;
        background-color: rgb(255, 255, 255);
        width: 600px;
        height: 400px;
    }


    /* #criar {
        display: none;
        align-items: center;
        flex-direction: column;
    }

    #acessar {
        display: none;
        align-items: center;
        flex-direction: column;
    }

    #dados {
        display: none;
        align-items: center;
        flex-direction: column;
    } */


    table,
    tr,
    td {
        background-color: white;
        /* border: 1px solid rgb(110, 110, 110); */
        padding: 0.1em 2em;
        font-family: monospace;
        font-size: 20px;
        padding: 10px;
    }

    table {
        margin-bottom: 1em;
    }

    h1 {
        font-size: 40px;
        font-family: "Lora", serif;
        font-weight: 200;
        color: rgb(0, 0, 0);
    }

    .botao {
        padding: 0.3em 0.6em;
        margin: 0.5em;
        font-size: 20px;
        border-radius: 10px;
        border: 1px solid rgb(97, 97, 97);
        background-color: white;
        cursor: pointer;
    }

    #inputAcesso {
        width: 400px;
        font-size: 1.4em;
        padding: 0.8em;
        border-radius: 10px 0 0 10px;
        border: 1px solid black;
        
    }

    span {
        /* margin-top: 2em; */
        font-family: monospace;
        font-size: 15px;
        text-align: center;
    }

    #buttonAcesso {
        font-size: 1.4em;
        padding: 0.8em;
        display: flex;
        border-radius: 0 10px 10px 0;
        border: 1px solid black;
        border-left: 2px solid rgb(212, 212, 212);
        color: rgb(3, 3, 3);
    }

    .inputCriar {
        width: 100%;
        height: 2em;
        padding: 0;
        font-size: 1em;
        border: 0;
        border: 1px solid black;
    }
</style>
