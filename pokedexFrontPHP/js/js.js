var arraypokemons = [];
var arrayTipos = [];
var urlBackend = 'http://localhost:8000/sistema';
var urlImagem = "./img/pokes";

function arrayFilter() {
    const buscaEl = $("#busca") 
    const busca = buscaEl.find("input").val().trim();
    const tipoSelect = buscaEl.find("select").val();
    const lista = arraypokemons.filter(pokemon => {
        const nome = pokemon.nome.toUpperCase();
        const pesquisa = busca.toUpperCase();
        return nome.indexOf(pesquisa) > -1
    })
    .filter(pokemon => {
        const tipos = pokemon.tipos
        .map(tipo => tipo.id);
        return tipos.find(tipo => tipo === tipoSelect || tipoSelect === "todos");
    });
    return lista;

}

$(function() {

    carregarDados();
    
})

    function criarTipos()
    {
        const select = $("#busca").find("select");
        select.html("");

        let tipos = "<option value='todos' selected>TODOS</option>";
        arrayTipos.forEach(tipo => {
            tipos += `<option value='${tipo.id}'>${tipo.nome}</option>`;
            
        });
        select.html(tipos);
    }

    function carregarDados()
    {
        $.ajax({
            //type: "method",
            url: urlBackend + '/pokemons.php',
            //data: "data",
            dataType: "JSON",
            success: function (response) {
                if (response.status === 0) {
                    console.log(response.msg);
                    return;
                }
                arraypokemons = response.item;
                criarTabela();
            }
        });
    
        $.ajax({
            //type: "method",
            url: urlBackend + '/tipos.php',
            //data: "data",
            dataType: "JSON",
            success: function (response) {
                if (response.status === 0) {
                    console.log(response.msg);
                    return;
                }
                arrayTipos = response.item;
                criarTipos(); 
            }
        });
    }

    function criarTabela()
    {
        const tbody = $("#lista").find("table").find("tbody");
        tbody.html("");

        let pokemonsTr = "";

        const lista = arrayFilter();

        if (lista.length === 0) {
            pokemonsTr += `<tr>
            <td colspan='2' style='text-align: center;'>
            SEM REGISTROS
            </td>
            </tr>`;
        } else {
            lista.forEach(pokemon => {
                pokemonsTr += `<tr onclick="abrirDetalhesPokemon($(this))" key="${pokemon.numero_dex}"><td>${pokemon.numero_dex}</td><td class='nomePokemon'>${pokemon.nome}</td</tr>`;
            });
        }
        tbody.html(pokemonsTr);
    }   

    function abrirDetalhesPokemon(tr)
    {
        const numeroDex = tr.attr("key");
        const pokemon = arraypokemons.find(pokemon => Number(pokemon.numero_dex) === Number(numeroDex));

        if (!pokemon) {
            console.log(`pokemon ${numeroDex} não encontrado`);
            return false;
        }

        $("#tr").removeClass("pokemonSelecionado");
        tr.addClass("pokemonSelecionado");

        const {
            nome,
            img,
            descricao,
            id_anterior,
            anterior,
            id_proximo,
            proximo,
            tipos,
        } = pokemon;

        const titulo = `${nome} - #${numeroDex}`;
        const pokemonAnterior = anterior ? anterior : "NENHUM";
        const pokemonProximo = proximo ? proximo : "NENHUM";
        let tipoSpan = '';

        tipos.forEach(tipo => {
            tipoSpan += ` <span key="${tipo.id}">
                        ${tipo.nome}
                        </span>`            
        });

        $("#titulo").text(titulo);
        $("#imagem").find("img").attr("src", `${urlImagem}/${img}`);
        $("#descricao").text(descricao);
        $("#tipos").html(tipoSpan);
        $("#evoluiDe").find("span").text(pokemonAnterior);
        $("#evoluiPara").find("span").text(pokemonProximo);
    }