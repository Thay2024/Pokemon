$(document).ready(function(){
    console.log("jQuery iniciado");

    $("#btnBuscar").on("click", function(){  // Evento de clique no botão de busca
        let pokemonName = $("#pokemon-input").val().trim().toLowerCase();     // Obtém o valor do campo de entrada, remove espaços e converte para minúsculas

        if(pokemonName === ""){          // Verifica se o campo está vazio
            alert("Por favor, informe um nome ou número de Pokémon.");     // Exibe alerta se o campo estiver vazio
            return;
        }

        let urlAPI = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;   // URL da API com o nome ou número do Pokémon
        
        // ALTERAÇÃO 1: Mostra a nova animação de carregamento
        // Em vez de texto, inserimos o HTML do nosso 'loader'
        $("#pokemon-info").html('<div class="loader"></div>');

        $.ajax({
            url: urlAPI,
            type: "GET",
            dataType: "json",
            success: function(data) {
                // LÓGICA NOVA: Mapeia as habilidades para uma string
                const abilities = data.abilities.map(item => ` ${item.ability.name}`).join(', '); 

                // LÓGICA NOVA: Mapeia os status para uma lista HTML (<ul>)
                const stats = data.stats.map(item => 
                    `<li><strong>${item.stat.name}:</strong> ${item.base_stat}</li>`
                ).join('');

                // ALTERAÇÃO 2: O HTML final agora inclui as novas informações
                const infoHtml = `
                    <img src="${data.sprites.front_default}" alt="Imagem do ${data.name}"> 
                    <h2>${data.name} (#${data.id})</h2>       
                    <p><strong>Tipo:</strong> ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p> 
                    <p><strong>Habilidades:</strong>${abilities}</p>
                    
                    <div class="pokemon-stats">
                        <h4>Status Base:</h4>
                        <ul>
                            ${stats}
                        </ul>
                    </div>
                `;

                $("#pokemon-info").html(infoHtml);   // Exibe as informações do Pokémon
                $("#pokemon-input").val(""); // Limpa o campo de entrada após a busca
            },
            error: function (){    // LÓGICA NOVA: Tratamento de erro para exibir mensagem amigável
                // ALTERAÇÃO 3: Exibe uma mensagem de erro amigável
                console.error("Erro ao carregar os dados.");
                $("#pokemon-info").html(`<p style="color: red;">Pokémon não encontrado. Tente novamente.</p>`);
            },
        });
    });

    $("#pokemon-input").on("keypress", function(event) { // Evento de tecla pressionada no campo de entrada
        if (event.key === "Enter") {
            $("#btnBuscar").click(); // Simula o clique no botão de busca ao pressionar Enter
        }
    });
});