let contador = 1;
document.getElementById('radio1').checked = true;

setInterval(function(){
    proxImagem();
}, 5000);

function proxImagem(){
    contador++;
    if(contador>4){
        contador = 1;
    }
    document.getElementById('radio'+contador).checked = true;
}