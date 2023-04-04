const api_key = "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";

const msg = document.getElementById('mensagem');

const botao = document.getElementById('enviar');

msg.addEventListener("keypress", (elemento)=>{
    if(msg.value && elemento.key ==="Enter"){
        enviarPergunta()
    }else if(!msg.value){
        const box = document.querySelector('.box_input');
        box.style.outline = '0.2rem red solid';
        return;
    }
   
});

botao.addEventListener("click",(elemento)=>{
   
    if(msg.value && elemento.button===0){
        enviarPergunta();
    }else if(!msg.value){
        const box = document.querySelector('.box_input');
        box.style.outline = '0.2rem red solid';
        return;
    }
   
});

function enviarPergunta(){


    const status = document.getElementById('status');
    status.innerHTML = "Carregando...";
    status.style.display='block';
    botao.disabled = true;
    botao.style.cursor = 'not-allowed';
    msg.disabled = true;
    msg.style.cursor = 'not-allowed';

    fetch("https://api.openai.com/v1/completions",{
        method: "POST",
        headers:{
            Accept: "applications/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${api_key}`,
        },

        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: msg.value,
            max_tokens: 2048,
            temperature: 0.6,
        }),
    })
    .then((response) => response.json())
    .then((response) => {
        let respostaChat = response.choices[0].text;
        status.style.display = 'none';
        exibirHistorico(msg.value, respostaChat);
    })
    .catch((error) =>{
        console.log(`Error -> ${error}`)
    })
    .finally(() => {
        botao.disabled = false;
        botao.style.cursor = 'pointer';
        msg.disabled = false;
        msg.style.cursor = 'pointer';
        msg.value='';
    })
}

function exibirHistorico(mensagem,resposta){
    var historico = document.getElementById('historico');
   
    //caixa usuario
    var boxUsuario = document.createElement('div');
    boxUsuario.className = 'box_usuario';
    var msgUsuario = document.createElement('p');
    msgUsuario.className = 'msg_usuario';
    msgUsuario.innerHTML = mensagem;
    boxUsuario.appendChild(msgUsuario);
    historico.appendChild(boxUsuario);

    //caixa chagpt
    var boxChatgpt = document.createElement('div');
    boxChatgpt.className = 'box_chatgpt';
    var msgChat = document.createElement('p');
    msgChat.className = 'msg_chtgpt';
    msgChat.innerHTML = resposta;
    boxChatgpt.appendChild(msgChat);
    historico.appendChild(boxChatgpt);

    historico.scrollTop = historico.scrollHeight;    
}


