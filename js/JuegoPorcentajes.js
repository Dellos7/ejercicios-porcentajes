export class JuegoPorcentajes{

    constructor(){
        this.empezado = false;
        this.aciertos = 0;
        this.errores = 0;
    }

    empezar(){
        this.empezado = true;
        this.nuevoEjercicio();
    }

    nuevoEjercicio(){
        this.ejercicioActual = new Ejercicio();
        this.reemplazarEjercicioHtml( this.ejercicioActual );
        return this.ejercicioActual;
    }

    reemplazarEjercicioHtml( ejercicio ){
        const ejerciciosEl = document.querySelector('#ejercicios');
        const ejercicioActualEl = ejerciciosEl.querySelector('.ejercicio');
        if( ejercicioActualEl ){
            ejercicioActualEl.remove();
        }
        this.ocultarMostrarMensajeCorrecto( false );
        this.ocultarMostrarMensajeIncorrecto( false );
        this.ocultarMostrarBotonSiguienteEjercicio( false );
        const ejercicioEl = document.createElement('form');
        ejercicioEl.classList.add('ejercicio');
        let descrip;
        if( ejercicio.tipoEjercicio === TipoEjercicio.AFORO.val ){
            descrip = `Si a un local que tiene un aforo de ${ejercicio.numero} personas se le aplica una restricción de un aforo máximo del ${ejercicio.tantoPorCiento}%, ¿cuántas personas cabrían en el local como máximo?`;
        } else if( ejercicio.tipoEjercicio === TipoEjercicio.PRECIO.val ){
            descrip = `Si un objeto que vale ${ejercicio.numero}€ lo encontramos rebajado al ${ejercicio.tantoPorCiento}%, ¿cuál es el precio de ese objeto rebajado?`;
        }
        ejercicioEl.innerHTML = `
        <label class="ejercicio__pregunta">${descrip}</label>
        <input class="ejercicio__respuesta" type="number" step="any" name="respuesta" required>
        <button class="btn ejercicio__comprobar" type="submit">Comprobar</button>
        `;
        ejercicioEl.addEventListener( 'submit', (e) => {
            e.preventDefault();
            const respuestaInputEl = document.querySelector('#ejercicios .ejercicio input[name="respuesta"]');
            const correcto = this.validarEjercicio( respuestaInputEl.value );
            if( correcto ){
                if( !this.ejercicioActual.acertado ){
                    this.aciertos++;
                    this.ejercicioActual.acertado = true;
                    this.reemplazarAciertos();
                }
                this.mostrarEjercicioCorrecto();
            } else{
                this.errores++;
                this.reemplazarFallos();
                this.mostrarEjercicioIncorrecto();
            }
        });
        //ejerciciosEl.appendChild(ejercicioEl);
        ejerciciosEl.insertBefore( ejercicioEl, ejerciciosEl.childNodes[0] );
    }

    validarEjercicio( numero ){
        return this.ejercicioActual.validar(numero);
    }

    mostrarEjercicioCorrecto(){
        this.ocultarMostrarMensajeCorrecto( true );
        this.ocultarMostrarMensajeIncorrecto( false );
        this.ocultarMostrarBotonSiguienteEjercicio( true );
    }

    mostrarEjercicioIncorrecto(){
        this.ocultarMostrarMensajeIncorrecto( true );
        this.ocultarMostrarMensajeCorrecto( false );
        this.ocultarMostrarBotonSiguienteEjercicio( false );
    }

    ocultarMostrarMensajeCorrecto( mostrar ){
        const ejercicioCorrectoEl = document.querySelector('#ejercicios .ejercicios__correcto');
        if( mostrar ){
            ejercicioCorrectoEl.classList.remove('oculto');
        } else{
            ejercicioCorrectoEl.classList.add('oculto');
        }
    }

    ocultarMostrarMensajeIncorrecto( mostrar ){
        const ejercicioIncorrectoEl = document.querySelector('#ejercicios .ejercicios__incorrecto');
        if( mostrar ){
            ejercicioIncorrectoEl.classList.remove('oculto');
        } else{
            ejercicioIncorrectoEl.classList.add('oculto');
        }
    }

    ocultarMostrarBotonSiguienteEjercicio( mostrar ){
        const siguienteEjercicioFormEl = document.querySelector('#siguiente-ejercicio-form');
        if( mostrar ){
            siguienteEjercicioFormEl.classList.remove('oculto');
        } else{
            siguienteEjercicioFormEl.classList.add('oculto');
        }
    }

    reemplazarAciertos(){
        const aciertosNumEl = document.querySelector('#aciertos .aciertos__num');
        aciertosNumEl.innerHTML = this.aciertos;
    }

    reemplazarFallos(){
        const fallosNumEl = document.querySelector('#fallos .fallos__num');
        fallosNumEl.innerHTML = this.errores;
    }

}

const TipoEjercicio = { AFORO: { val: 0, max: 500 } , PRECIO: { val: 1, max: 10000 } };

class Ejercicio{
    constructor(){
        this.acertado = false;

        this.tipoEjercicio = Math.round( Math.random() );
        const tipo = this.tipoEjercicio === TipoEjercicio.AFORO.val ? TipoEjercicio.AFORO : TipoEjercicio.PRECIO;

        // Valor entre 1 y 100
        this.tantoPorCiento = Math.round( Math.random()*100 );
        // Valor entre 1 y 10000
        this.numero = Math.round( Math.random()* tipo.max );
        this.resultado = this.numero * this.tantoPorCiento / 100;
    }

    validar( resultado ){
        if( typeof resultado !== 'number' ) resultado = Number.parseFloat( resultado );
        let res = this.resultado === resultado;
        if( this.resultado !== resultado && this.tipoEjercicio === TipoEjercicio.AFORO.val ){
            res = Math.trunc( this.resultado ) === Math.trunc(resultado);
        }
        return res;
    }
}