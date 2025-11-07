import { Toast } from "primereact/toast";
import CineToolbar from "../components/CineToolbar";
import { useEffect, useRef, useState } from "react";
import EntradaForm from "../components/EntradaForm";
import { createEntrada, getEntradas} from "../services/EntradasServices";
import EntradasTable from "../components/EntradasTable";
import { tipoPagoList } from "../utils/listForm";
import {SelectButton} from 'primereact/selectbutton';

const CineAdminContainer = () => {
    const toast = useRef(null);

    const [entradas, setEntradas] = useState([])
    const [filtro, setFiltro] = useState(null);

    useEffect(()=> {
        setEntradas(getEntradas());
    },[])
    useEffect(()=> {
        if(filtro == null ){ setEntradas(getEntradas())}
        else{
            setEntradas(entradas.filter(en => en.pelicula.name = filtro))
        }
    },[entradas, filtro])

    const handleComprarEntrada = (rango) => {
        createEntrada(rango);
        setEntradas(getEntradas());
        toast.current.show({severity: "info", summary: "Entrada registrada", sticky:true})

    }
    
    const borrarFiltro = () => {
        setFiltro(null);
        setEntradas(getEntradas());
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
                        <div className="col col-md-8">
                            <SelectButton 
                                id="form-tipo-select" 
                                options={tipoPagoList} 
                                value={filtro} 
                                onChange={e=>setFiltro(e.value)}
                            />
                            <p onClick={borrarFiltro}>Limpiar</p>
                            <EntradasTable entradas={entradas}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CineAdminContainer;