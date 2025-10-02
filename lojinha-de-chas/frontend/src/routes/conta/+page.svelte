<script lang="ts">
    import Navegacao from "$lib/Navegacao.svelte";
    import Contatos from "$lib/Contatos.svelte";

    let nome: string = "";
    let endereco: string = "";
    let resultado: any = {};
    let userCode: string = "";

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
        try {
            const idCriado = Math.random().toString(36).substring(2, 8);
            const sacola: string[] = [];
            userCode = idCriado;
            alert(userCode);

            console.log("postado com sucesso!", idCriado);
            let dadosSoltos = await fetch("http://localhost:3000/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    identificador: `${idCriado}`,
                    nome: `${nome}`,
                    descricao: `${endereco}`,
                    sacola: {
                        produto: `${itens[0].produto}`,
                        valor: `${itens[0].valor}`,
                    },
                }),
            });
        } catch (error) {
            console.log("erro ao acessar os dados", error);
        }
    }


    async function read() {
        try {
            let dadosSoltos = await fetch(
                `http://localhost:3000/acessar/${userCode}`,
            );
            let dadosAgrupados = await dadosSoltos.json();

            resultado = dadosAgrupados;
            console.log(dadosAgrupados);
        } catch (error) {
            console.log("erro ao acessar os dados", error);
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
            <div id="conta" style="display:{conta};">
                <h1>Escolha</h1>
                <button on:click={() => trocarTela("acessar")}
                    >Acessar conta</button
                >
                <button on:click={() => trocarTela("gerar")}>Criar conta</button
                >
            </div>



            <div id="criar" style="display:{gerar};">
                <h1>Criar Conta</h1>


                <table>
                    <thead>
                        <tr>
                            <td>nome</td>
                            <td style="padding:0"><input type="text" bind:value={nome} class="inputCriar"/> <br /></td>
                        </tr>
                        <tr>
                            <td>endereço</td>
                            <td style="padding:0"><input type="text" bind:value={endereco} class="inputCriar" /></td>
                        </tr>
                    </thead>
                </table>

                <button on:click={criar} on:click={read} on:click={() => trocarTela("dados")}>criar conta</button>
            </div>



            <div id="acessar" style="display:{acessar};">
                <h1>Acessar Conta</h1>

                <div style="display:flex">
                    <input id="inputAcesso" type="text" bind:value={userCode} />
                    <br />
                    <button
                        id="buttonAcesso"
                        on:click={read}
                        on:click={() => trocarTela("dados")}
                    >
                        entrar
                    </button>
                </div>

                <br />
            </div>

            <div id="dados" style="display:{dados};">
                <hr />
                <h1>Informações Pessoais</h1>

                <table>
                    <thead>
                        <tr>
                            <td>nome</td>
                            <td>{resultado.nome}</td>
                        </tr>
                        <tr>
                            <td>descrição</td>
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
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(143, 189, 112);
        border-left: 1px black solid;
        border-right: 1px black solid;
    }

    #conta {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    #criar {
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
    }
    table,
    tr,
    td {
        background-color: white;
        border: 1px solid rgb(110, 110, 110);
        padding: 0.5em 2em;
        font-family: monospace;
        font-size: 30px;
    }

    table {
        margin-bottom: 2em;
        border-radius: 0.8em;
    }

    h1 {
        font-size: 40px;
        font-family: monospace;
        color: rgb(255, 255, 255);
    }

    #inputAcesso {
        width: 400px;
        font-size: 1.4em;
        padding: 0.8em;
        border-radius: 10px 0 0 10px;
        border: 0;
    }

    #buttonAcesso {
        font-size: 1.4em;
        padding: 0.8em;
        display: flex;
        border-radius: 0 10px 10px 0;
        border: 0;
        border-left: 2px solid rgb(212, 212, 212);
        color: rgb(3, 3, 3);
    }

    .inputCriar{
        width: 100%;
        height: 2em;
        padding: 0;
        font-size: 1em;
        border: 0;
    }
</style>
