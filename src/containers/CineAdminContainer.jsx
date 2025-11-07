import { Toast } from "primereact/toast";
import CineToolbar from "../components/CineToolbar";
import { useEffect, useRef, useState } from "react";
import EntradaForm from "../components/EntradaForm";
import { createEntrada, getEntradas} from "../services/EntradasServices";
import EntradasTable from "../components/EntradasTable";
import { peliculasList } from "../utils/listForm";
import {Dropdown} from 'primereact/dropdown';

const CineAdminContainer = () => {
    const toast = useRef(null);

    const [entradas, setEntradas] = useState([])
    const [entradasOriginales, setEntradasOriginales] = useState([])
    const [filtro, setFiltro] = useState(null);
    
    useEffect(()=> {
        reiniciarDatos()
    },[])

    useEffect(() => {
    if (filtro == null) {
        setEntradas(entradasOriginales);
    } else {
        setEntradas(entradasOriginales.filter(en => en.pelicula.name === filtro));
    }
    }, [filtro, entradasOriginales]);

    const handleComprarEntrada = (rango) => {
        setFiltro(null);
        createEntrada(rango);
        reiniciarDatos();
        toast.current.show({severity: "info", summary: "Entrada registrada", sticky:true})
    }

    const borrarFiltro = () => {
        setFiltro(null);
        reiniciarDatos()
    }

    const reiniciarDatos = () => {
        const datos = getEntradas();
        setEntradasOriginales(datos);
        setEntradas(datos);
    }


    return (
        <>
            <Toast ref={toast} />
            <CineToolbar />
            <div className="row mt-5">
                <div className="col">
                    <div className="row mt-5">
                        <div className="col col-md-4">
                            <EntradaForm onCreateEntrada={handleComprarEntrada} />
                        </div>
                        <div className="col col-md-8  mt-2">
                            <div className="d-flex flex-column gap-2 mb-2">
                                <label className="text-start" htmlFor="form-pelicula">Filtro por película</label>
                                <div className="d-flex gap-2">
                                    <Dropdown className='w-100' id="form-pelicula" value={filtro} onChange={e=>setFiltro(e.value)} options={peliculasList.map(p => p.name)} optionLabel="dia"
                                        placeholder="Selecciona una pelicula" checkmark={true} highlightOnSelect={false}/>
                                    <p onClick={borrarFiltro}>Limpiar</p>
                                </div>
                            </div>
                            <EntradasTable entradas={entradas}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CineAdminContainer;