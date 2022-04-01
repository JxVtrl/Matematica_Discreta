const table = document.querySelector('.table')
const table_head = document.querySelector('.table-head')
const table_body = document.querySelector('.table-body')
var headerArray = []
var expressao = " [(A v B) ^ C'] -> A' v C"
var expressaoSaved = ''
var letras, expressaoSeparada, expressaoSemInvertido, expressoesComColchete
const expressaoHtml = document.querySelector('.expressao_show')
const expressao_input = document.querySelector('#text')
const butao_enviar = document.querySelector('#calc_btn')

butao_enviar.addEventListener('click', () => {
    if (expressao_input.value != '') {
        expressao = expressao_input.value   
        Format(expressao)
    }
})

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

Format(expressao)

function resetValues() {
    headerArray = []
    expressoesComColchete = []
    expressaoSemInvertido = ''
    expressaoSeparada = ''
}

function Format(value) {
    resetValues()
    
    // Tirando os espacoes das strings de expressao e trocando () por []
    var expressao = value.replace(/\s/g, '').replace(/\(/g, '[').replace(/\)/g, ']')
    
    // Salvando a expressão
    expressaoSaved = expressao

    // Imprimindo no Html
    expressaoHtml.innerHTML = value

    Variavel(expressao)
}



function Variavel(expressao) {
    var letrasBruto = expressao.match(/[A-Z01]/g)
    letras = [...new Set(letrasBruto)]; //Removendo todos os ítens iguais da expressão

    for (let i = 0; i < expressao.length; i++) {
        for (let j = 0; j < letras.length; j++) {
            if (expressao[i] === letras[j] && expressao[i + 1] === "'") 
                letras.push(`${letras[j]}'`)
        }
    }


    // Salvar tudo que tem dentro de []
    if (expressao.includes('[')) {
        expressoesComColchete = expressao.match(/\[(.*?)\]/g)
        // verificar se existe ' apos o []
        for (let i = 0; i < expressoesComColchete.length; i++) {
            var index = (expressoesComColchete[i].length - 1) + expressao.indexOf(expressoesComColchete[i])
            if (expressao[index + 1] === "'") expressoesComColchete[i] = `${expressoesComColchete[i]}'`
        }
    }    

    if (expressao.includes('<->')) {
        let indice = expressao.indexOf('<->')
        for (let i = indice; i < expressao.length; i++) {
            if (expressao[i] === '[') {
                expressaoSeparada = expressao.split('<->')
            } else if (expressao[i] === ']') break
        }

        if (!expressao.includes('[')) expressaoSeparada = expressao.split('<->')
    }


    if (expressao.includes('->') && !expressao.includes('<->')) {
        expressaoSeparada = expressao.split('->')
    }




    console.log(expressaoSeparada)

    table_head.innerHTML = ''
    criarHead()
    testes()
    criarLinhas()
}


function FormatExpression(expressao) {
    return expressao.replace(/\[/g, '').replace(/\]/g, '')
}

function criarHead() {
    for (let i = 0; i < letras.length; i++) headerArray.push(letras[i])
    
    if (expressoesComColchete) {
        for (let i = 0; i < expressoesComColchete.length; i++) {
            if (expressoesComColchete[i].includes("]'")) {
                headerArray.push(expressoesComColchete[i])
                expressoesComColchete[i] = expressoesComColchete[i].slice(0, -1)
            }
            headerArray.push(FormatExpression(expressoesComColchete[i]))
        }
    }
    
    // adicionar as partes da expressão
    if (expressaoSeparada) {
        expressaoSeparada.map(item => {
            if (item[item.length - 1] === ']') headerArray.push(FormatExpression(item))
            else headerArray.push(item)
        })  
    }
    
    // adicionar a expressão inteira
    headerArray.push(expressaoSaved)

    // verificar se não tem nenhum ' solto
    for (let i = 0; i < headerArray.length; i++) 
        if (headerArray[i] === "'") headerArray.splice(i, 1)  
    
    // remover itens iguais
    headerArray = [...new Set(headerArray)]
    
    // ordernar o array by length
    headerArray.sort((a, b) => a.length - b.length)

    // imprimir header
    headerArray.map(item => table_head.innerHTML += `<th>${item}</th>`)
}

var possibilidades = []

function testes() {
    possibilidades = []
    let letrasLimpas = []

    for (let i = 0; i < letras.length; i++) 
        if (letras[i][1] !== "'" && letras[i] !== 1 && letras[i] != 0)
            letrasLimpas.push(letras[i])

    for (let i = 0; i < (1 << letrasLimpas.length); i++) {
        let boolArr = [];

        // Criar array booleano
        for (let j = letrasLimpas.length - 1; j >= 0; j--) boolArr.push(Boolean(i & (1 << j)));

        // transformar array booleano em binario
        for (let k = 0; k < boolArr.length; k++) boolArr[k] = boolArr[k] ? 1 : 0;

        possibilidades.push(boolArr);
    }

    console.log(possibilidades)
}

function criarLinhas() {
    console.log(headerArray)

    // quantidade de linhas
    var qtdLinhas = possibilidades.length

    // quantas colunas
    var qtdColunas = headerArray.length

    // criar as linhas
    for (let i = 0; i < qtdLinhas; i++) {
        var linha = document.createElement('tr')
        table_body.appendChild(linha)

        for (let j = 0; j < qtdColunas; j++){
            var coluna = document.createElement('td')
            linha.appendChild(coluna)
                
            if (possibilidades[i][j] === 1 || possibilidades[i][j] === 0) coluna.innerHTML = possibilidades[i][j]
            
            else coluna.innerHTML = '-'

        }
    }
}

