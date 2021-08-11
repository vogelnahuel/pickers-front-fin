const stateNames = new Map()
stateNames.set(1,"Sin asignar")
stateNames.set(3,"En retiro")
stateNames.set(4,"En punto de retiro")
stateNames.set(2,"Asignado")
stateNames.set(5,"Retirado")
stateNames.set(6,"En entrega")
stateNames.set(7,"En lugar de entrega")
stateNames.set(10,"Entregado")
stateNames.set(8,"En devolución")
stateNames.set(11,"Devuelto a origen")
stateNames.set(9,"Cancelado")
stateNames.set(12,"Siniestrado")
const stateName = (id) =>  {

    return stateNames.get(id)
}

export default stateName