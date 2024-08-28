const titulo = document.querySelector('.brand-title');

function typeWrite(elemento){
    const textoArray = elemento.innerHTML.split('');
    elemento.innerHTML = ' ';
    textoArray.forEach(function(letra, i){   
      
    setTimeout(function(){
        elemento.innerHTML += letra;
    }, 85 * i)
  });
}

setInterval(() => typeWrite(titulo), 7000);
