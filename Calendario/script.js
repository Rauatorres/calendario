const dataHoje = new Date()

var anoHoje = dataHoje.getFullYear()
var mesHoje = dataHoje.getMonth()
var diaHoje = dataHoje.getDate()
var diaSemanaHoje = dataHoje.getDay()

var anoMinSelecao = anoHoje - 100


//  função que gera os dias
function mostrarDias(){
    
    let mesSelecionado = $('#selecao-mes').val()
    let anoSelecionado = $('#selecao-ano').val()
    let dataSelecionada = new Date(anoSelecionado, mesSelecionado, 1)
    let diasMes = [1]
    let diaCont = 2
    //  este loop oercorre os dias do mês começando pelo dia 2, caso a contagem de dias chegue a 31, ela retorna para 1 e o loop se encerra
    while(diaCont > 1){
        diasMes.push(diaCont)
        //  como também existem meses que chegam só até o dia 30 e o mês de fevereiro tem 28 dias em anos normais e 29 em anos bissextos, essas restrições foram adicionadas para quando ele cheguar no final do mês, a contagem de dias vá para zero e o loop se encerre
        if (mesSelecionado < 7 && mesSelecionado != 1){
            if (mesSelecionado % 2 != 0 && diaCont > 30){
                diaCont = 0
            }
        }else if (mesSelecionado >= 7){
            if (mesSelecionado % 2 == 0 && diaCont > 30){
                diaCont = 0
            }
        }else{
            if (anoSelecionado % 4 != 0 && diaCont > 28){
                diaCont = 0
            }else if (diaCont > 29){
                diaCont = 0
            }
        }
        diaCont++ //    caso a contagem chegue em 0, será adicionado 1 e o loop se encerra do mesmo jeito
        let dataCont = new Date(anoSelecionado, mesSelecionado, diaCont)
        diaCont = dataCont.getDate()
    }
    $('#dias').html('') //  Apagando o html da div "dias"

    //  Adicionando espaços vazios antes do dia 1
    for(let contSemana = 0; contSemana < dataSelecionada.getDay(); contSemana++){
        $('#dias').html($('#dias').html() + '<p class="vazio"></p>')
    }

    //  Adicionando os dias
    for(let key in diasMes) {
        let element = "<p>" + diasMes[key] + "</p>"
        $('#dias').html($('#dias').html() + element)
    }

    //  Último dia do mês selecionado
    ultimoDia = new Date(anoSelecionado, mesSelecionado, diasMes.length)

    //  Adicionando espaços vazios depois do último dia
    for(let contSemana = ultimoDia.getDay(); contSemana < 6; contSemana++){
        $('#dias').html($('#dias').html() + '<p class="vazio"></p>')
    }

}

$(document).ready(function(){
    //  definindo as opções de seleção e deixando o ano e o mês atual pré-selecionado
    for(let anoCont = anoMinSelecao; anoCont < anoHoje + 70; anoCont++){
        let anoOptHtml
        if (anoCont != anoHoje){
            anoOptHtml = '<option value="' + anoCont + '">' + anoCont + '</option>'
        }else{
            anoOptHtml = '<option value="' + anoCont + '" selected>' + anoCont + '</option>'
        }
        $('#selecao-ano').html($('#selecao-ano').html() + anoOptHtml)
    }
    let mesSelect = '[value="' + mesHoje + '"]'
    $(mesSelect).prop('selected', true)

    //  gerando os dias
    mostrarDias()
})

