const localKey = "entradas_list_data";

const createEntrada = (entrada) => {
    let lista = [];
    const data = localStorage.getItem(localKey);
    if(data != null) {
        lista = JSON.parse(data);
    }

    lista = [...lista, entrada];
    localStorage.setItem(localKey, JSON.stringify(lista));
}

const getEntradas = () => {
    const data = localStorage.getItem(localKey);
    if(data != null){
        return JSON.parse(data);
    }
    return []
}

export { createEntrada, getEntradas };