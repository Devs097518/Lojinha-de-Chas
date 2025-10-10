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
        width: 300px;
        height: 300px;
        background-size: cover;
        padding: 2em;
    }

    #info {
        width: 300px;
        height: 300px;
        background-color: rgb(230, 134, 134);
        padding: 2em;
    }
</style>
