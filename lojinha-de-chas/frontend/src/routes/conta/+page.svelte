<script lang="ts">
    import Navegacao from "$lib/Navegacao.svelte";
    import Contatos from "$lib/Contatos.svelte";

    let nome: string = "";
    let endereco: string = "";
    let resultado: any = {};
    let userCode : string = '4xhzst';

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
            console.log("postado com sucesso!");
        } catch (error) {
            console.log("erro ao acessar os dados", error);
        }
    }

    async function read() {
        try {
            let dadosSoltos = await fetch(`http://localhost:3000/acessar/${userCode}`);
            let dadosAgrupados = await dadosSoltos.json();

            resultado = dadosAgrupados;
            console.log(dadosAgrupados);
        } catch (error) {
            console.log("erro ao acessar os dados", error);
        }
    };
</script>

<div id="pagina">
    <section id="conteudo">
        <nav>
            <Navegacao />
        </nav>

        <article>
            <p>essa daqui é a minha conta</p>

            <div>
                <h1>Criar Conta</h1>
                <input type="text" bind:value={nome} /> <br />
                <input type="text" bind:value={endereco} /> <br />
                <button on:click={criar} on:click={read}>postar</button>
            </div>

            <div>
                <h1>Acessar Conta</h1>
                <input type="text" bind:value={userCode} /> <br />
                <button on:click={read}>ver os dados do Mongo</button><br />
                
                <!-- <p>sacola : {JSON.stringify(resultado.sacola)}</p> -->
            </div>

            <div>
                <hr>
                <h1>Informações Pessoais</h1>
                <p>nome : {resultado.nome}</p>
                <p>descrição : {resultado.descricao}</p>
                <p>conta : {resultado.identificador}</p>
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
        min-height: 30vh;
        background-color: rgb(143, 189, 112);
        border-left: 1px black solid;
        border-right: 1px black solid;
    }
</style>
