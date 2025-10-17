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
            nome: "Camomila",
            descricao:
                "A camomila é uma das ervas mais conhecidas e apreciadas em todo o mundo por suas propriedades suaves e efeito calmante. Suas delicadas flores brancas liberam um aroma doce e reconfortante quando infusionadas. Ideal para ser consumida à noite, esta erva promove uma sensação de tranquilidade que prepara o corpo e a mente para um descanso profundo e revitalizante.",
            propriedades: ["Promove relaxamento e melhora a qualidade do sono","Ajuda no alívio de tensões e ansiedade leve", "Auxilia no processo digestivo"],
            imagem: "camomila.jpg",
            valor: 7,
        },

        {
            nome: "Erva-Doce",
            descricao:
                "A erva-doce é caracterizada por seu sabor distintamente adocicado e aroma que remete ao anis. Suas sementes são ricas em óleos essenciais que proporcionam benefícios notáveis ao sistema digestivo. Seu consumo regular pode trazer conforto abdominal e é frequentemente recomendada para casos de flatulência e cólicas, inclusive em bebês.Além disso, seu sabor naturalmente doce dispensa a adição de açúcares, sendo uma opção saudável para diversos momentos do dia.",
            propriedades: ["Alivia cólicas e desconfortos digestivos | ", "Atua como expectorante suave"],
            imagem: "ervadoce.jpg",
            valor: 6,
        },
        {
            nome: "Hortelã",
            descricao:
                "A hortelã é uma erva refrescante e vigorante, conhecida por seu aroma intenso e sabor característico. Suas folhas verdes escondem poderosos óleos essenciais que ativam os sentidos e trazem alívio imediato. No sistema digestivo, age relaxando a musculatura lisa, o que a torna eficaz contra náuseas e indigestões. Também é um descongestionante natural muito utilizado em casos de resfriados. Seu frescor único transforma uma simples xícara de chá em uma experiência revigorante para o paladar e para o corpo.",
            propriedades: ["Alivia náuseas e auxilia na digestão | ","Ação descongestionante das vias respiratórias | ","Efeito refrescante e energizante"],
            imagem: "hortela.jpg",
            valor: 5,
        },
        {
            nome: "Gengibre",
            descricao:
                "O gengibre é uma raiz picante e aromática, amplamente utilizada tanto na culinária quanto na medicina tradicional. Seu principal componente, o gingerol, confere não apenas o sabor característico, mas também suas propriedades medicinais. É reconhecido por sua potente ação anti-inflamatória e termogênica, capaz de aquecer o corpo e acelerar o metabolismo. Também é um aliado do sistema imunológico. Para quem busca um chá forte, revigorante e com personalidade, o gengibre oferece uma experiência única que aquece desde o primeiro gole.",
            propriedades: ["Ação termogênica e anti-inflamatória","Fortalece o sistema imunológico","Alivia náuseas e enjoos"],
            imagem: "gengibre.jpg",
            valor: 9,
        },
        {
            nome: "Hibisco",
            descricao:
                "O hibisco é uma flor de coloração vermelha intensa e sabor levemente azedo, que lembra framboesa. Quando secas, suas pétalas produzem uma infusão de cor rubi e sabor refrescante. Rico em antioxidantes, é famoso por sua ação diurética e pela contribuição no controle da pressão arterial. Seu consumo regular ajuda na eliminação de toxinas. Esta erva forma um chá que é tanto uma delícia para os olhos quanto para o paladar, ideal para ser apreciado quente ou gelado.",
            propriedades: ["Ação diurética e auxilia na eliminação de líquidos","Rico em antioxidantes que combatem radicais livres","Auxilia no controle da pressão arterial"],
            imagem: "hibisco.jpg",
            valor: 8,
        },
        {
            nome: "Mulungu",
            descricao:
                "O mulungu é uma árvore nativa do Brasil, cuja casca é utilizada há séculos por povos tradicionais por suas notáveis propriedades calmantes. Seu chá possui um sabor amadeirado e suave. Atua como um sedativo natural no sistema nervoso central, sendo muito eficaz para reduzir a ansiedade, o estresse e promover um estado de tranquilidade. É a escolha ideal para quem busca uma alternativa natural para acalmar a mente em períodos de tensão e agitação mental.",
            propriedades: ["Potente ação calmante e ansiolítica","Auxilia no combate à insônia","Pode ajudar no controle da pressão arterial"],
            imagem: "especiaria.jpg",
            valor: 13,
        },
        {
            nome: "Boldo do Chile",
            descricao:
                "O boldo do Chile é diferente do boldo nacional e é reconhecido por seus poderosos efeitos no sistema digestivo e hepático. Suas folhas possuem um sabor amargo e aroma marcante. Seu componente principal, a boldina, estimula a produção de bile pelo fígado, facilitando a digestão de gorduras e aliviando sensações de empachamento e mal-estar Recomenda-se consumo moderado e este chá é um verdadeiro socorro para aqueles momentos em que se exagera na comida.",
            propriedades: ["Melhora a função hepática e digestiva","Alivia azia, indigestão e gases","Efeito detoxificador no fígado"],
            imagem: "boldo.jpg",
            valor: 4,
        },
        {
            nome: "Capim Santo",
            descricao:
                "O capim-cidreira, também conhecido como capim-santo ou erva-cidreira, é uma planta aromática com um delicioso e suave sabor cítrico. Diferente da erva-cidreira (melissa), ele é amplamente cultivado em jardins. Seu chá é um clássico das avós, utilizado para acalmar os nervos e preparar o corpo para uma noite de sono reparador. Também é benéfico para o estômago, acalmando espasmos leves. A simplicidade do seu aroma lembra a infância e proporciona um conforto que vai muito além do sabor.",
            propriedades: ["Efeito calmante e relaxante","Auxilia no alívio de dores de cabeça por tensão","Ação antiespasmódica no sistema digestivo"],
            imagem: "capims.jpg",
            valor: 3,
        },
        {
            nome: "Alecrim",
            descricao:
                "O alecrim é uma erva aromática de folhas pontiagudas e aroma inconfundível, que remete aos jardins mediterrâneos. Suas propriedades vão muito além do uso culinário, oferecendo um chá revigorante e estimulante para a mente. Esta infusão é conhecida por melhorar a circulação sanguínea e ativar as funções cognitivas, sendo excelente para momentos que exigem concentração e clareza mental. Seu sabor marcante e herbáceo aquece o corpo e desperta os sentidos, proporcionando uma verdadeira revitalização interior.",
            propriedades: ["Melhora a memória e a concentração","Estimula a circulação sanguínea","Ação digestiva e antioxidante"],
            imagem: "alecrim.jpg",
            valor: 6,
        },

        {
            nome: "Sálvia",
            descricao:
                "A sálvia é uma erva de folhas aveludadas e cinzentas, carregada de tradição e propriedades medicinais. Seu nome deriva do latim `salvare`, que significa salvar ou curar, indicando sua reputação histórica como planta curativa. Seu chá é particularmente benéfico para a saúde feminina, ajudando a aliviar os sintomas da menopausa e cólicas menstruais. Também age como um poderoso anti-inflamatório para gargantas irritadas. O sabor é terroso e ligeiramente amargo, criando uma experiência de consumo profundamente terapêutica e reconfortante.",
            propriedades: ["Alivia ondas de calor da menopausa","Ação anti-inflamatória para garganta","Auxilia no controle da glicemia"],
            imagem: "salvia.jpg",
            valor: 9,
        },
        {
            nome: "Melissa",
            descricao:
                "A melissa, verdadeira erva-cidreira, possui um aroma cítrico suave e delicado que acalma imediatamente os sentidos. Diferente do capim-limão, suas folhas são mais arredondadas e seu efeito calmante é mais pronunciado. Esta erva é reconhecida por sua capacidade de acalmar a ansiedade e trazer serenidade em momentos de estresse emocional. Seu consumo regular pode ajudar a restaurar o equilíbrio do sistema nervoso. O chá oferece uma experiência suave e reconfortante, ideal para ser tomado ao final do dia para desacelerar e encontrar paz interior.",
            propriedades: ["Calmante natural para ansiedade e nervosismo","Alivia problemas digestivos de origem nervosa","Auxilia no tratamento da insônia leve"],
            imagem: "cidreira.jpg",
            valor: 8,
        },
        {
            nome: "Passiflora",
            descricao:
                "A passiflora, conhecida como flor do maracujá, oferece um chá calmante mais suave que o maracujá fruto. Suas lindas flores possuem alcaloides e flavonoides com comprovada ação sedativa. Esta infusão é ideal para quem sofre de ansiedade generalizada e insônia, promovendo um relaxamento profundo sem causar sonolência residual no dia seguinte. Acalma a mente agitada e prepara para o sono. O sabor é floral e suave, criando uma experiência de consumo que é em si mesma um ritual de autocuidado e tranquilidade.",
            propriedades: ["Ação calmante e sedativa suave","Reduz a ansiedade e nervosismo","Auxilia na qualidade do sono"],
            imagem: "lora.jpg",
            valor: 12,
        },
    ];


    async function read() {
        let dadosSoltos = await fetch(
            `https://lojinha-de-chas.onrender.com/acessar/${$userCode}`,
        );
        let dadosAgrupados = await dadosSoltos.json();
        resultado = dadosAgrupados;
        $userInfo.push(dadosAgrupados);
    }


    async function adicionar() {
        try {
            let dadosSoltos = await fetch(
                `https://lojinha-de-chas.onrender.com/post/${$userCode}/adicionar`,
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
            nome={itens[0].nome || "sem nome"}
            descricao={itens[0].descricao || "sem descrição"}
            propriedades={itens[0].propriedades || []}
            imagem={itens[0].imagem || "https://via.placeholder.com/150"}
            valor={itens[0].valor || 0}
             />
            <button class="botaoAdicionar" on:click={() => adicionarItem(0)}
                >Adicionar na sacola</button
            >
            
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

            <Produto 
            nome={itens[4].nome || "sem nome"}
            descricao={itens[4].descricao || "sem descrição"}
            propriedades={itens[4].propriedades || []}
            imagem={itens[4].imagem || "https://via.placeholder.com/150"}
            valor={itens[4].valor || 0}
             />
            <button class="botaoAdicionar" on:click={() => adicionarItem(4)}
                >Adicionar na sacola</button
            >

            <Produto 
            nome={itens[5].nome || "sem nome"}
            descricao={itens[5].descricao || "sem descrição"}
            propriedades={itens[5].propriedades || []}
            imagem={itens[5].imagem || "https://via.placeholder.com/150"}
            valor={itens[5].valor || 0}
             />
            <button class="botaoAdicionar" on:click={() => adicionarItem(5)}
                >Adicionar na sacola</button
            >

            <Produto 
            nome={itens[6].nome || "sem nome"}
            descricao={itens[6].descricao || "sem descrição"}
            propriedades={itens[6].propriedades || []}
            imagem={itens[6].imagem || "https://via.placeholder.com/150"}
            valor={itens[6].valor || 0}
             />
            <button class="botaoAdicionar" on:click={() => adicionarItem(6)}
                >Adicionar na sacola</button
            >

            <Produto 
            nome={itens[7].nome || "sem nome"}
            descricao={itens[7].descricao || "sem descrição"}
            propriedades={itens[7].propriedades || []}
            imagem={itens[7].imagem || "https://via.placeholder.com/150"}
            valor={itens[7].valor || 0}
             />
            <button class="botaoAdicionar" on:click={() => adicionarItem(7)}
                >Adicionar na sacola</button
            >

            <Produto 
            nome={itens[8].nome || "sem nome"}
            descricao={itens[8].descricao || "sem descrição"}
            propriedades={itens[8].propriedades || []}
            imagem={itens[8].imagem || "https://via.placeholder.com/150"}
            valor={itens[8].valor || 0}
             />
            <button class="botaoAdicionar" on:click={() => adicionarItem(8)}
                >Adicionar na sacola</button
            >

            <Produto 
            nome={itens[9].nome || "sem nome"}
            descricao={itens[9].descricao || "sem descrição"}
            propriedades={itens[9].propriedades || []}
            imagem={itens[9].imagem || "https://via.placeholder.com/150"}
            valor={itens[9].valor || 0}
             />
            <button class="botaoAdicionar" on:click={() => adicionarItem(9)}
                >Adicionar na sacola</button
            >

            <Produto 
            nome={itens[10].nome || "sem nome"}
            descricao={itens[10].descricao || "sem descrição"}
            propriedades={itens[10].propriedades || []}
            imagem={itens[10].imagem || "https://via.placeholder.com/150"}
            valor={itens[10].valor || 0}
             />
            <button class="botaoAdicionar" on:click={() => adicionarItem(10)}
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

        min-height: 90vh;
        background-color: rgb(255, 244, 179);
        border-left: 1px black solid;
        border-right: 1px black solid;
    }

    .botaoAdicionar{
        color: rgb(99, 213, 255);
        padding: 1em;
        margin-bottom: 3em;
        width: 907px;
        font-size: 1.3em;
        background-color: rgb(47, 77, 88);
        border-bottom: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;
        border-top: 0px ;
        cursor: pointer;
    }
</style>
