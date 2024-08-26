const titulo = document.querySelector('.brand-title');

function typeWrite(elemento){
    const textoArray = elemento.innerHTML.split('');
    elemento.innerHTML = ' ';
    textoArray.forEach(function(letra, i){   
      
    setTimeout(function(){
        elemento.innerHTML += letra;
    }, 80 * i)
  });
}

setInterval(() => typeWrite(titulo), 5 * 1000);
typeWrite(titulo);
