import { 
    AGREGAR_NOMBRE,
    AGREGAR_NOMBRE_EXITO,
    AGREGAR_NOMBRE_ERROR
} from '../types/index'

export function agregarNombreAction() {

    return () => {
        console.log('desde action')
    }
}