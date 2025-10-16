<script lang="ts">
    import Navegacao from "$lib/Navegacao.svelte";
    import Contatos from "$lib/Contatos.svelte";
    import Produto from "$lib/Produto.svelte";
    import { userInfo, userCode, sacola } from "$lib/stores/userCode";
    import { onMount } from "svelte";

    // let info = $userInfo[0];
    let resultado: any = {};
    let info: any = [];
    let total = 0;

    if ($userInfo.length > 0) {
        info = $userInfo[0];
        console.log(info);
    }

    $: $sacola = resultado.sacola || [];
    $: total = $sacola.reduce((acc, item) => acc + item.valor, 0);

    async function read() {
        let dadosSoltos = await fetch(
            `http://localhost:3000/acessar/${$userCode}`,
        );

        let dadosAgrupados = await dadosSoltos.json();
        resultado = dadosAgrupados;
        $userInfo.push(dadosAgrupados);
    }

    async function esvaziar() {
        if ($userCode == "" || $sacola.length == 0) {
            alert(
                "Entre em sua conta e adicione um produto antes de fazer o pedido!",
            );
        } else {
            try {
                console.log("entrei dentro");

                let dadosSoltos = await fetch(
                    `http://localhost:3000/post/${$userCode}/esvaziar`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );

                read();
                alert('O seu pedido foi feito com sucesso! Estaremos fazendo a entrega do seu pedido no endereço informado.')
            } catch (error) {
                console.log("erro ao acessar os dados", error);
            }
        }
    }

    onMount(() => {
        if ($userCode) {
            read();
        }
    });
</script>

<div id="pagina">
    <section id="conteudo">
        <nav>
            <Navegacao />
        </nav>

        <article>
            <div id="divSacola">
                <h1>- MINHA SACOLA -</h1>

                {#each $sacola as item}
                    <Produto
                        nome={item.nome || "sem nome"}
                        descricao={item.descricao || "sem descrição"}
                        propriedades={item.propriedades || []}
                        imagem={item.imagem ||
                            "https://via.placeholder.com/150"}
                        valor={item.valor || 0}
                    />
                {/each}

  
                    {#if $sacola.length == 0}
                    <p class="totalInfo">Adicione algum item à sua sacola!</p>
                    {/if}
 
                    {#if $sacola.length > 0}
                    <p class="totalInfo">o total de sua compra é de R${total},00</p>
                    <button id="botaoPedido" on:click={esvaziar}>fazer pedido</button>
                    {/if}
                
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

    h1 {
        font-family: "Lora", serif;
        font-weight: 100;
    }

    #conteudo {
        width: 100%;
        min-height: 50vh;
        background-color: white;
    }

    article {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 85vh;
        background-color: rgb(220, 228, 188);
        border-left: 1px black solid;
        border-right: 1px black solid;
    }

    .totalInfo {
        font-size: 2em;
        font-family: "Arial", sans-serif;
        font-weight: 100;
    }

    #divSacola {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 70%;
        min-height: 85vh;
        background-color: rgba(250, 247, 212, 0.699);
    }

    #botaoPedido {
        background-color: white;
        border: 1px solid black;
        font-size: 20px;
        padding: 10px 20px;
        margin-bottom: 2em;
    }
</style>
