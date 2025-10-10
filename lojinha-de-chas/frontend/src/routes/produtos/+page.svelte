<script lang="ts">
    import Navegacao from "$lib/Navegacao.svelte";
    import Contatos from "$lib/Contatos.svelte";
    import Produto from "$lib/Produto.svelte";
    import { userCode, userInfo, sacola } from "$lib/stores/userCode";
    import { onMount } from "svelte";

    let itemx: number = 1;
    let resultado: any = {};

    $: $sacola = resultado.sacola || [];

    let itens = [
        {
            produto: "",
            valor: 0,
        },

        {
            nome: "Maçã",
            descricao:
                "descrição e tal da maçã que a gente olha, bate o olho e já consegue localizar a descrição daquele produto saca?",
            propriedades: ["propriedade 1 ", "propriedade 2 ", "propriedade 3 "],
            imagem: "sacola.jpeg",
            valor: 3,
        },
        {
            nome: "Morango",
            descricao:
                "descrição e tal do morango que a gente olha, bate o olho e já consegue localizar a descrição daquele produto saca?",
            propriedades: ["propriedade 1 ", "propriedade 2 ", "propriedade 3 "],
            imagem: "sacola.jpeg",
            valor: 5,
        },
        {
            nome: "Erva Doce",
            descricao:
                "descrição e tal da erva doce que a gente olha, bate o olho e já consegue localizar a descrição daquele produto saca?",
            propriedades: ["propriedade 1 ", "propriedade 2 ", "propriedade 3 "],
            imagem: "sacola.jpeg",
            valor: 7,
        },
    ];


    async function read() {
        let dadosSoltos = await fetch(
            `http://localhost:3000/acessar/${$userCode}`,
        );
        let dadosAgrupados = await dadosSoltos.json();
        resultado = dadosAgrupados;
        $userInfo.push(dadosAgrupados);
    }


    async function adicionar() {
        try {
            let dadosSoltos = await fetch(
                `http://localhost:3000/post/${$userCode}/adicionar`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        nome: `${itens[itemx].nome}`,
                        descricao: `${itens[itemx].descricao}`,
                        propriedades: `${itens[itemx].propriedades}`,
                        imagem: `${itens[itemx].imagem}`,
                        valor: `${itens[itemx].valor}`,
                    }),
                },
            );

            console.log("adicionado com sucesso!");
            read();
        } catch (error) {
            console.log("erro ao acessar os dados", error);
        }
    }

    function adicionarItem(x: number) {
        if ($userCode == "") {
            alert(
                "você precisa acessar sua conta antes de adicionar itens na sacola",
            );
        } else {
            itemx = x;
            adicionar();
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
            <h1>- PRODUTOS -</h1>

            
            <Produto 
            nome={itens[2].nome || "sem nome"}
            descricao={itens[2].descricao || "sem descrição"}
            propriedades={itens[2].propriedades || []}
            imagem={itens[2].imagem || "https://via.placeholder.com/150"}
            valor={itens[2].valor || 0}
             />
            <button class="botaoAdicionar" on:click={() => adicionarItem(2)}
                >Adicionar na sacola</button
            >

            <Produto 
            nome={itens[1].nome || "sem nome"}
            descricao={itens[1].descricao || "sem descrição"}
            propriedades={itens[1].propriedades || []}
            imagem={itens[1].imagem || "https://via.placeholder.com/150"}
            valor={itens[1].valor || 0}
             />
            <button class="botaoAdicionar" on:click={() => adicionarItem(1)}
                >Adicionar na sacola</button
            >

            <Produto 
            nome={itens[3].nome || "sem nome"}
            descricao={itens[3].descricao || "sem descrição"}
            propriedades={itens[3].propriedades || []}
            imagem={itens[3].imagem || "https://via.placeholder.com/150"}
            valor={itens[3].valor || 0}
             />
            <button class="botaoAdicionar" on:click={() => adicionarItem(3)}
                >Adicionar na sacola</button
            >

        </article>

        <footer>
            <Contatos />
        </footer>
    </section>
</div>

<style>
    

    h1{
        font-family: "Lora", serif;
        font-weight: 300;
    }

    #pagina {
        display: flex;
        justify-content: center;
        align-items: center;
    }


    #conteudo {
        width: 100%;
        min-height: 50vh;
        background-color: white;
        
    }

    article {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        min-height: 30vh;
        background-color: rgb(220, 228, 188);
        border-left: 1px black solid;
        border-right: 1px black solid;
    }

    .botaoAdicionar{
        padding: 1em;
        margin-bottom: 3em;
        width: 907px;
        font-size: 1em;
        background-color: rgb(255, 255, 255);
        border-bottom: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;
        border-top: 0px ;
        cursor: pointer;
    }
</style>
