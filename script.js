
var r; 
mostrarPalabra();


var correcto = 0;
var incorrecto = 0;

async function fetchPalabra() {

    const moneda = Math.round(Math.random());
    let text = '';
    if (moneda === 0) {
        const response = await fetch('./noTildes.txt');
        text = await response.text();
    }
    else {
        const response = await fetch('./tildes.txt');
        text = await response.text();

    }
    
    const lines = text.split('\n');
    const palabra = lines[Math.floor(Math.random() * lines.length)].trim();


    // resvisar si tiene tilde 
    let index = -1;
    const accentMap = {
        "á": "a",
        "é": "e",
        "í": "i", 
        "ó": "o",
        "ú": "u"
    };

    let newPalabra = ''; 

    for (let i = 0; i < palabra.length; i++) {
    
    
        if (palabra[i] === 'á' || palabra[i] === 'é' || palabra[i] === 'í' || palabra[i] === 'ó' || palabra[i] === 'ú') {
            index = i;
            newPalabra += accentMap[palabra[i]];
      



        }
        else {
            newPalabra += palabra[i];
        }
        

    }
    let resultado = {
        palabra: newPalabra,
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


    correcto++;
    document.getElementById("correcto").innerText = `Correcto ${correcto}`;

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
    incorrecto++;

    document.getElementById("incorrecto").innerText = `Incorrecto: ${incorrecto}`;

    boton = false
    mostrarPalabra(); 

    
    const body = document.querySelector('body')
    body.classList.add('flashMal');
    setTimeout(() => body.classList.remove('flashMal'),  500);

    //convertir palabra back to tilde 

    const accentMapRerverse = {
        "a": "á",
        "e": "é",
        "i": "í",
        "o": "ó",
        "u": "ú"
    };
    newPalabra = '';
    for (let i = 0; i < r.palabra.length; i++) {
        if (i === r.index) {
            newPalabra += accentMapRerverse[r.palabra[i]];
        }
        else {
            newPalabra += r.palabra[i];
        }
    }



    document.getElementById('palabrasMalas').innerHTML += `<li>${newPalabra}</li>`;
    
    console.log('mal');
    await sleep(500);
    boton = true




    
}