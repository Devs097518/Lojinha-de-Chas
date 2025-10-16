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
            <section class="banners">
                <div id="info1" class="lado-info">
                    <h1>Faça uma pausa</h1>
                    <p>Tenha um momento para descansar fazendo uma xícara de chá.</p>
                </div>

                <div id="imagem1" class="lado-imagem"></div>
            </section>


            <section class="banners">
                <div id="imagem2" class="lado-imagem"></div>

                <div id="info2" class="lado-info">
                    <h1>Escolha o seu sabor</h1>
                    <p>Aqui você encontra uma variedade de sabores e propriedades diferentes para se adequar ao seu momento </p>
                    <a href="/produtos">
                        <button>
                            produtos
                        </button>
                    </a>    
                    
                </div>
            </section>


            <section class="banners">
                <div id="info3" class="lado-info">
                    <h1>Faça suas compras</h1>
                    <p>Faça o seu login ou crie a sua conta para colocar seus itens na sacola</p>
                    <a href="/conta">
                        <button>
                            acesse sua conta
                        </button>
                    </a> 
                </div>
                <div id="imagem3" class="lado-imagem"></div>
            </section>


            <section class="banners">
                <div id="imagem4" class="lado-imagem"></div>

                <div id="info4" class="lado-info">
                    <h1>Técnica de<br>preparo : infusão</h1>
                    <ol>
                        <li>coloque as ervas num copo ou recipiente</li>
                        <li>esquente a água e coloque no recipiente e tampe</li>
                        <li>espere até que se esfrie e então tire a tampa e pode beber</li>
                    </ol>
                </div>
            </section>


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
        min-height: 90vh;
        background-color: rgb(255, 244, 179);
    }

    .banners{
        display: flex;
    }

    a{
        text-decoration: none;
        color: black;
    }

    .lado-imagem{
        width: 50%;
        height: 70vh;
        background-size: cover;
        margin: 0;
    }

    .lado-info{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: 70vh;
        background-color: rgb(209, 235, 243);
        margin: 0;
    }

    button{
        width: 300px;
        height: 60px;
        font-size: 1.2em;
        border-radius: 5em;
        border: 1px solid black;
        cursor: pointer;
    }

    #imagem1{
        background-image: url(relaxamento.jpg);
    }
    #info1{
        background-color: rgb(247, 237, 228);
    }


    #imagem2{
        background-image: url(variedades.jpg);
    }
    #info2{
        background-color: rgb(66, 109, 37);
        color: rgb(212, 255, 195);
    }


    #imagem3{
        background-image: url(compra.jpg);
    }
    #info3{
        background-color: rgb(109, 72, 37);
        color: rgb(255, 234, 195);
    }


    #imagem4{
        background-image: url(infusão.jpg);
    }
    #info4{
        background-color: rgb(139, 197, 192);
        color: rgb(0, 0, 0);
    }



    h1{
        font-family: "Lora", serif;
        font-weight: 100;
        margin-top: 1em;
        font-size: 4em;
    }

    p,li{
        padding: 0 5em;
        font-family: "Google Sans Code", monospace;
        font-size: 19px;
    }

</style>
