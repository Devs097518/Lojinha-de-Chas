<script lang="ts">
    export let nome: string;
    export let descricao: string;
    export let propriedades: string[];
    export let imagem: string;
    export let valor: number;
</script>

<div class="Produto">
    <div id="card">
        <div id="imagem" style="background-image: url('{imagem}')"></div>
        <div id="info">
            <h2>{nome}</h2>
            <p>{descricao}</p>
            <p>propriedades:</p>
            <ul>
                {#each propriedades as prop}
                    {prop}
                {/each}
            </ul>
            <h3>R${valor},00</h3>
        </div>
    </div>
</div>

<style>
    .Produto {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: monospace;
    }

    #card {
        display: flex;
        margin-top: 2em;
    }

    #imagem {
        width: 200px;
        min-height: 200px;
        background-size: cover;
        padding: 2em;
        border: 1px solid black;
    }

    #info {
        width: 600px;
        min-height: 200px;
        background-color: rgb(231, 228, 189);
        padding: 2em;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
    }

    p{
        font-family: "Google Sans Code", monospace;
        font-size: 13px;
    }

    h3{
        font-size: 2em;
        font-family: "Lora", serif;
        color: rgb(0, 0, 0);
        font-weight: 100;
    }

    h2{
         font-family: "Lora", serif;
         font-weight: 300;
         
    }
</style>
