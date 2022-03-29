const table = document.querySelector('.table')
const table_head = document.querySelector('.table-head')
var expressao = "A -> (B -> C) <-> (A ^ B) -> C"
var expressaoSaved = ''
const expressaoHtml = document.querySelector('.expressao_show')
const expressao_input = document.querySelector('#text')
const butao_enviar = document.querySelector('#calc_btn')

butao_enviar.addEventListener('click', () => {
    if (expressao_input.value != '') {
        expressao = expressao_input.value   
        Format()
    }
})

//1 - [A] [0] [A!0] [A <-> A!0]

//2 - [A] [B] [[A <-> B]] [A ⊻ B] [[A <-> B]'] [A ⊻ B <-> (A <-> B)']

/*       Negação (inverso):
            Símbolo: '
    
        Conjunção (E - lógico):
            Simbolo: ^

        Disjunção (OU - lógico):
            Simbolo: v
        
        Implicação:
            Símbolo: -> 

        Equivalência (==)
            Símbolo: <-> 
      
        Ou-Exclusivo:
            Símbolo: ⊻, para respresentar: &veebar; ou $

        Conectivo Universal Barra_Vertical: 
            Símbolo: ⇒ |
        
        Conectivo Universal Seta_Baixo:
            Símbolo: ↓, para respresentar: &darr; ou !
        */


Format()

function Format() {
    // Imprimindo no Html
    expressaoHtml.innerHTML = expressao

    // tirando os espacoes das strings de expressao
    const expressaoSemEspacos =
        expressao.replace(/\s/g, '')
    
    // trocando os parenteses por colchete
    const expressaoSemParenteses =
        expressaoSemEspacos.replace(/\(/g, '[').replace(/\)/g, ']')
    
    // Salvando a expressão
    expressaoSaved = expressaoSemParenteses

    Variavel(expressaoSemParenteses)
}

var letras,
    expressaoSeparada,
    expressaoSemInvertido
    
var expressoesComColchete = []

function Variavel(expressao) {
    var letrasBruto = expressao.match(/[A-Z01]/g)
    letras = [...new Set(letrasBruto)];
    
    // Colchete
    if (expressao.includes('[')) {
        // salvar o que estiver dentro de []
        expressoesComColchete = expressao.match(/\[(.*?)\]/g)
    }

    // remove expressaoDoColchete da expressao
    expressao = expressao.replace(expressoesComColchete, '')

    console.log('Expressão: ' + expressao)

    // Partes da expressão
    expressaoSeparada = expressao.split(/(<->)/g)

    // remove item <-> do array
    expressaoSeparada.map(item => {
        if (item === '<->') {
            expressaoSeparada.splice(expressaoSeparada.indexOf(item), 1)
        }
    })

    // remove posicoes vazias de expressao
    expressaoSeparada.map(item => {
        if (item === '') {
            expressaoSeparada.splice(expressaoSeparada.indexOf(item), 1)
        }
    })

    console.log(expressaoSeparada)

    Imprime()
}


function FormatExpression(expressao) {
    return expressao.replace(/\[/g, '').replace(/\]/g, '')
}

function criarHead() {
    var headerArray = []

    for (let i = 0; i < letras.length; i++) {
        headerArray.push(letras[i])
    }
    
    for (let i = 0; i < expressoesComColchete.length; i++) {
        headerArray.push(FormatExpression(expressoesComColchete[i]))
    }
    
    // adicionar colunas de itens separados
    expressaoSeparada.map(item => {
        headerArray.push(item) 
    })
    
    // adicionar expressao completa
    headerArray.push(expressaoSaved)

    // imprimir header
    headerArray.map(item => {
        return table_head.innerHTML += `<th>${item}</th>`
    })

    console.log(headerArray)
}

function testes() {
    // calcular numero de possibilidades
    var qtd = 0
    for (let i = letras.length; i > 0; i--) qtd += i
    console.log(qtd)

    let possibilidades = []

    for (let i = 0; i < (1 << letras.length); i++) {
        let boolArr = [];
        // Criar array booleano
        for (let j = letras.length - 1; j >= 0; j--) boolArr.push(Boolean(i & (1 << j)));

        // transformar array booleano em binario
        for (let k = 0; k < boolArr.length; k++) boolArr[k] = boolArr[k] ? 1 : 0;

        possibilidades.push(boolArr);
    }

    console.log(possibilidades)
}




function Imprime() {
    criarHead()

    testes()
    
    
    table.innerHTML += `
        <tr>
            <td>
            
            </td>
        <tr>
    `
}
/* Criar uma linha para cada item da função expressaoSeparada, e if(letras == 0 || letras == 1){
    expressaoSeparada +=  '1' ou '0'
    console.log(expressaoSeparada)
*/

