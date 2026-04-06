
var r; 
mostrarPalabra();


async function fetchPalabra() {
const response = await fetch('./palabras.txt');
const text = await response.text();
const lines = text.split('\n');
const palabra = lines[Math.floor(Math.random() * lines.length)].trim();


// resvisar si tiene tilde 
let index = -1;
for (let i = 0; i < palabra.length; i++) {

 
    if (palabra[i] === 'á' || palabra[i] === 'é' || palabra[i] === 'í' || palabra[i] === 'ó' || palabra[i] === 'ú') {
        index = i;
        break;

    }

}
resultado = {
    palabra: palabra,
    index: index
}
r = resultado
return resultado
}


function mostrarPalabra() {

    fetchPalabra().then(resultado => {

        const texto =  document.getElementById('texto')

        //borrar el contexto 
        texto.innerHTML = '';

        for (let i = 0; i < resultado.palabra.length; i++) {
            texto.innerHTML += `<span data-index=${i}>${resultado.palabra[i]}</span>`;

        }


        document.querySelectorAll('#texto span').forEach(span => {
            span.addEventListener('click', () => {
                const index = parseInt(span.getAttribute('data-index'));

                
                if (index === resultado.index) {
                   
                    bien();
                }
                else {
                    mal();
                }
            });

        });

        //para el boton

       
    

        

    }); 

}



document.getElementById('buttonNoTilde').addEventListener('click', () => {

            if (boton) {
                if (r.index === -1) {
               
                    bien();
                }
                else {
            
                    mal();
                }

            }
            
});


//para q el boton no funcione mientras q se cambia de palabra 
var boton = true
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function bien(){
     boton = false

    mostrarPalabra(); 
    console.log('bien');
   
    const body = document.querySelector('body')
    body.classList.add('flashBien');
    setTimeout(() => body.classList.remove('flashBien'), 500);
    await sleep(500);
    boton = true
    
    


}

async function mal(){
    boton = false
    mostrarPalabra(); 

    
    const body = document.querySelector('body')
    body.classList.add('flashMal');
    setTimeout(() => body.classList.remove('flashMal'), 500);
    
    
    console.log('mal');
     await sleep(500);
    boton = true

    
}