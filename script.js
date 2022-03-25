const table = document.querySelector('.table')
const expressao = "A -> (B -> C) <-> (A ^ B) -> C"
const expressaoHtml = document.querySelector('.expressao')
expressaoHtml.innerHTML = expressao
var expressaoSaved = ''

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
    
    // Salvando a expressão
    expressaoSaved = expressaoSemParenteses

    Variavel(expressaoSemParenteses)
}

var letras,
    expressaoSeparada,
    expressaoSemInvertido
    
var expressoesComColchete = []

function Variavel(expressao) {
    const letrasPossiveis = expressao.match(/[A-Z01]/g)

    letras = letrasPossiveis.filter(
        (value, index, self) => self.indexOf(value) === index)

      
    console.log(expressao)





    // Colchete
    if (expressao.includes('[')) {
        // salvar o que estiver dentro de []
        expressoesComColchete = expressao.match(/\[(.*?)\]/g)
        console.log(expressoesComColchete)
    
    }

    // remove expressaoDoColchete da expressao
    expressao = expressao.replace(expressoesComColchete, '')

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


function removeColchetes(expressao) {
    return expressao.replace(/\[/g, '').replace(/\]/g, '')
}


function Imprime() {
    var colunas = ``
        
    // adicionar colunas de letras
    letras.map(letra => {
        colunas += `<th>${letra}</th>`
    })
    
    for (let i = 0; i < expressoesComColchete.length; i++) {
        colunas += `<th>${removeColchetes(expressoesComColchete[i])}</th>`
    }
    
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
}
/* Criar uma linha para cada item da função expressaoSeparada, e if(letras == 0 || letras == 1){
                                                                    expressaoSeparada +=  '1' ou '0'
                                                                    console.log(expressaoSeparada)
*/

