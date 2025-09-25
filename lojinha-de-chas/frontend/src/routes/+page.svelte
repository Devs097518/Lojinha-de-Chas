<script lang="ts">
    let nome: string = "";
    let endereco: string = "";
    let qualSacola: string = "";
    let exclui: string = "";
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



    // async function read() {
    //     try {
    //         let dadosSoltos = await fetch("http://localhost:3000/acessar");
    //         let dadosAgrupados = await dadosSoltos.json();

    //         resultado = dadosAgrupados[0];
    //         console.log(dadosAgrupados);
    //     } catch (error) {
    //         console.log("erro ao acessar os dados", error);
    //     }
    // }


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

    

    async function adicionar() {

        try {
            console.log('entrei dentro')
            // dependendo do id do usuário, ele coloca o item nele
            let dadosSoltos = await fetch(`http://localhost:3000/post/${userCode}/adicionar`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                
                body: JSON.stringify({
                        produto: `${itens[1].produto}`,
                        valor: `${itens[1].valor}`,
                }),
            });

            console.log("adicionado com sucesso!");
        } catch (error) {
            console.log("erro ao acessar os dados", error);
        }
    }




    async function esvaziar() {

        try {
            console.log('entrei dentro')
            // dependendo do id do usuário, ele coloca o item nele
            let dadosSoltos = await fetch(`http://localhost:3000/post/${userCode}/esvaziar`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                
            });

            console.log("adicionado com sucesso!");
        } catch (error) {
            console.log("erro ao acessar os dados", error);
        }
    }



    async function deletar() {
        try {
            // dependendo do id do usuário, ele deleta o mesmo
            let dadosSoltos = await fetch(`http://localhost:3000/post/${userCode}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("deletado com sucesso!");
        } catch (error) {
            console.log("erro ao acessar os dados", error);
        }
    }



</script>

<h1>Crud</h1>
<input type="text" bind:value={nome} /> <br />
<input type="text" bind:value={endereco} /> <br />
<button on:click={criar}>postar</button>

<h1>cRud</h1>

<button on:click={read}>ver os dados do Mongo</button><br />
<p>nome : {resultado.nome}</p>
<p>descrição : {resultado.descricao}</p>
<!-- <p>sacola : {JSON.stringify(resultado.sacola)}</p> -->


<h1>crUd</h1>
<input type="text" bind:value={userCode} /> <br />
<button on:click={adicionar}>botar 1 maçã na sacola</button>
<button on:click={esvaziar}>fazer compra</button>


<h1>cruD</h1>
<input type="text" bind:value={userCode} /> <br />
<button on:click={deletar}>Deletar da face da Terra</button>
