
const limparFormulario = (endereco) => {
    /* usando funcções do  DOM(Document object Model) */
    document.getElementById('endereco').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}



const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

/* validando os CEP  REGX*/
const eNumero = (numero) => /^[0-9]+$/;

/* validando CEP se tem 8caracteres */
const cepvalido = (cep) => 
cep.length == 8 && eNumero(numero);

/* fazendo uma requisição para API viaCEP */

const pesquisaCEP = async () => {
    limparFormulario(); /* ERRO */

    const cep = document.getElementById('cep').value.replace("-", " ");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    /* verificando se CEP é valido */
    if (cepvalido(cep)) { /* ERRO */
        const dados = await fetch(url);
        const endereco = await dados.json();

        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'CEP não encontrado!!!'
        } else {
            preencherFormulario(endereco);
        }
    } else {
        document.getElementById('endereco'). value = 'CEP incorreto!';
    }
}

document.getElementById('endereco')
.addEventListener('focusout',pesquisaCEP);