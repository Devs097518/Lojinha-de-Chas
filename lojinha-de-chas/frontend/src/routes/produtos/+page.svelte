<script lang="ts">
    import Navegacao from '$lib/Navegacao.svelte'
    import Contatos from '$lib/Contatos.svelte'
</script>

<div id="pagina">
    <section id="conteudo">
        <nav>
            <Navegacao />
        </nav>
        
        <article>
            <p>aqui fica a lista de produtos</p>
        </article>

        <footer>
            <Contatos />
        </footer>
    </section>
</div>

<style>
    #pagina{
        display: flex;
        justify-content: center;
    }

    #conteudo{
        width: 100%;
        min-height: 50vh;
        background-color: white;
    }

    article{
        min-height: 30vh;
        background-color: rgb(143, 189, 112);
        border-left: 1px black solid;
        border-right: 1px black solid;
    }
</style>
