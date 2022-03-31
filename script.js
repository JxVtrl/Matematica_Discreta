const table = document.querySelector('.table')
const table_head = document.querySelector('.table-head')
var headerArray = []
var expressao = " A ⊻ B <-> (A v B)' ^ (A ^ B)'"
var expressaoSaved = ''
var letras,
    expressaoSeparada,
    expressaoSemInvertido,
    expressoesComColchete
const expressaoHtml = document.querySelector('.expressao_show')
const expressao_input = document.querySelector('#text')
const butao_enviar = document.querySelector('#calc_btn')

butao_enviar.addEventListener('click', () => {
    if (expressao_input.value != '') {
        expressao = expressao_input.value   
        Format(expressao)
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

Format(expressao)

function resetValues() {
    headerArray = []
    expressoesComColchete = []
    expressaoSemInvertido = ''
    expressaoSeparada = ''
}

function Format(value) {


    resetValues()

    // Imprimindo no Html
    expressaoHtml.innerHTML = value
    
    // tirando os espacoes das strings de expressao
    var expressao = value.replace(/\s/g, '')
    
    // trocando os parenteses por colchete
    var expressaoSemParenteses = expressao.replace(/\(/g, '[').replace(/\)/g, ']')
    
    // Salvando a expressão
    expressaoSaved = expressaoSemParenteses

    Variavel(expressaoSemParenteses)
}



function Variavel(expressao) {
    var letrasBruto = expressao.match(/[A-Z01]/g)
    letras = [...new Set(letrasBruto)]; //Removendo todos os ítens iguais da expressão
    
    console.log(expressao)
    for (let i = 0; i < expressao.length; i++) {
        for (let j = 0; j < letras.length; j++) {
            if (expressao[i] === letras[j] && expressao[i + 1] === "'") 
                letras.push(`${letras[j]}'`)
        }
    }

    // Salvar tudo que tem dentro de []
    if (expressao.includes('[')) {
        
        // verificar se a expressao com colchete tem ']
        expressoesComColchete = expressao.match(/\[(.*?)\]/g)


        //
        // ACHAR AS EXPRESSOES COM []'
        //


        for(let i = 0; i < expressao.length; i++) {
        
            if (expressao[i] === "]'") {
                var indice 
                console.log(expressao.indexOf("]'"))

            }
            
        }
    }    

    if (expressao.includes('<->')) {
        let indice = expressao.indexOf('<->')
        for (let i = indice; i < expressao.length; i++) {
            if (expressao[i] === '[' || expressao[i] === expressao[expressao.length-1]) {
                expressaoSeparada = expressao.split('<->')
            } else if (expressao[i] === ']') break
        }
    }

    if (expressao.includes('^')) {
        let indice = expressao.indexOf('^')
        for (let i = indice; i < expressao.length; i++) {
            if (expressao[i] === '[') {
                expressaoSeparada = expressao.split(indice)
            } else if (expressao[i] === ']') break
        }
    }

    if (expressao.includes('⊻')) {
        let indice = expressao.indexOf('⊻')
        for (let i = indice; i < expressao.length; i++) {
            if (expressao[i] === '[') {
                expressaoSeparada = expressao.split(indice)
            } else if (expressao[i] === ']') break
        }
    }

    if (expressao.includes('v')) {
        let indice = expressao.indexOf('v')
        for (let i = indice; i < expressao.length; i++) {
            if (expressao[i] === '[') {
                expressaoSeparada = expressao.split(indice)
            } else if (expressao[i] === ']') break
        }
    }
  
        
        
    //     expressaoSeparada = expressao.split(/(<->)/g)
    // else if (expressao.includes('->')) 
    //     expressaoSeparada = expressao.split(/(->)/g)
    // else if (expressao.includes('^')) {
    //     expressaoSeparada = expressao.split(/(\^)/g)
    // }

    // adicionar a expressao com colchete onde nao houver nada
    let j = 0
    for (let i = 0; i < expressaoSeparada.length; i++) {
        // index de espacos estao vazios
        if (expressaoSeparada[i] == '') {
            expressaoSeparada[i] = expressoesComColchete[j]
            j++
        }
    }
    // remove posicoes vazias de expressao
    expressaoSeparada.map(item => {
        if (item === '') {
            expressaoSeparada.splice(expressaoSeparada.indexOf(item), 1)
        }
    })

    table_head.innerHTML = ''
    criarHead()
    testes()
}


function FormatExpression(expressao) {
    return expressao.replace(/\[/g, '').replace(/\]/g, '')
}

function criarHead() {
    
  

    for (let i = 0; i < letras.length; i++) headerArray.push(letras[i])
    
    if (expressoesComColchete) {
        for (let i = 0; i < expressoesComColchete.length; i++) {

            headerArray.push(FormatExpression(expressoesComColchete[i]))
        }
    }
    
    expressaoSeparada.map(item => headerArray.push(item))  
    


    headerArray.push(expressaoSaved)

    // verificar se não tem nenhum ' solto
    for (let i = 0; i < headerArray.length; i++) 
        if (headerArray[i] === "'") headerArray.splice(i, 1)  
    
    // remover itens iguais
    headerArray = [...new Set(headerArray)]
    
    // imprimir header
    headerArray.map(item => {
        return table_head.innerHTML += `<th>${item}</th>`
    })
}

function testes() {
    let possibilidades = []

    for (let i = 0; i < (1 << letras.length); i++) {
        let boolArr = [];
        // Criar array booleano
        for (let j = letras.length - 1; j >= 0; j--) boolArr.push(Boolean(i & (1 << j)));

        // transformar array booleano em binario
        for (let k = 0; k < boolArr.length; k++) boolArr[k] = boolArr[k] ? 1 : 0;

        possibilidades.push(boolArr);
    }

    // console.log(possibilidades)
}

