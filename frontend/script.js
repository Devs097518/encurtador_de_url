let output = document.getElementById('output');
let divLonga = document.getElementById('divLonga');
let divCurta = document.getElementById('divCurta');
let SERVIDOR = 'https://short075.vercel.app/' ;



//POST
let botaoPost = document.getElementById('botaoPost').onclick = async () => {
    
    let urlL = document.getElementById('inputLonga').value;
    if (urlL) {

        const resposta = await fetch(`${SERVIDOR}/AdicionarLink`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ linkLongo: `${urlL}` })
        });

        console.log('postado com sucesso!!!',resposta);

        
        const respostadoback = await resposta.json()
        console.log(JSON.stringify(respostadoback.pequenoUrl))

        output.textContent = respostadoback.pequenoUrl
        divLonga.style.display = 'none';
        divCurta.style.display = 'block';

    }
    else{
        alert('Insira um link no campo de texto antes de clicar para encurtar!!!')
    }
}


function copiar(){
    navigator.clipboard.writeText(output.textContent);
    alert('Link copiado!!!');
}
