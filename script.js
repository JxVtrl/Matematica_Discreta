const table = document.querySelector('.table')
const expressao = "A ⊻ B <-> (A <-> B)'"
const expressaoSaved = expressao
   


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
    // tirando os espacoes das strings de expressao
    const expressaoSemEspacos =
        expressao.replace(/\s/g, '')
    

    // trocando os parenteses por colchete
    const expressaoSemParenteses =
        expressaoSemEspacos.replace(/\(/g, '[').replace(/\)/g, ']')

    console.log(expressaoSemParenteses)
    

    // separando as variaveis
    Variavel(expressaoSemParenteses)
}

var letrasSemDuplicados

var letrasInvertidas

var expressaoSeparada

function Variavel(expressao) {
    // letras
    const letras = expressao.match(/[A-Z01]/g)

    letrasSemDuplicados = letras.filter(
        (value, index, self) => self.indexOf(value) === index)
    
    console.log(letrasSemDuplicados)

    
        
    // Colchete
    if (expressao.includes('[')) {
        var posicaoColchete1 = expressao.indexOf('[')
        var posicaoColchete2 = expressao.indexOf(']')

        var hasInvertion = expressao[posicaoColchete2 + 1] === "'" || null
    }

    var expressaoDoColchete = ''

    for (let i = posicaoColchete1; i <= posicaoColchete2; i++) {
        expressaoDoColchete += expressao[i]
    }

    if (hasInvertion) {
        expressaoDoColchete += "'"
    }

    // remove expressaoDoColchete do expressao
    expressao = expressao.replace(expressaoDoColchete, '')

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

    expressaoSeparada.push(expressaoDoColchete)
    
    console.log(expressaoSeparada)
}

var colunas = ``
    
// adicionar colunas de letras
letrasSemDuplicados.map(letra => {
    colunas += `<th>${letra}</th>`
})

// adicionar colunas de itens separados
expressaoSeparada.map(item => {
    colunas += `<th>${item}</th>`
})

// adicionar coluna de expressao completa
colunas += `<th>${expressaoSaved}</th>`

table.innerHTML += `
    <tr>
        ${colunas}
    <tr>



`
/* Criar uma linha para cada item da função expressaoSeparada, e if(letras == 0 || letras == 1){
                                                                    expressaoSeparada +=  '1' ou '0'
                                                                    console.log(expressaoSeparada)
*/

