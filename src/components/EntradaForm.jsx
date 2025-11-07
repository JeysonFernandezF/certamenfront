import { useState, useRef } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import {SelectButton} from 'primereact/selectbutton';
import {Dropdown} from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { ListBox } from 'primereact/listbox';

import { Messages } from 'primereact/messages';
import { diasList, peliculasList, tipoPagoList } from "../utils/listForm";
        
        
function EntradaForm({onCreateEntrada = () => {}}) {

    const msgs = useRef(null);

    const [dia, setDia] = useState('');
    const [tipoDePago, setTipoDePago] = useState('');
    const [cantidad, setCantidad]= useState(1);
    const [ciudad, setCiudad] = useState('');
    const [pelicula, setPelicula] = useState(null);

    const handleClick = () => {
        msgs.current.clear();
        const nuevaEntrada = validarFormulario(); 

        console.log(nuevaEntrada)

        if(nuevaEntrada) {
            onCreateEntrada(nuevaEntrada);
            return; 
        }
        msgs.current.show({ id: '1', sticky: true, severity: 'error', summary: 'Error', detail: 'El formulario contiene errores.', closable: false });
    }
    

    const validarFormulario = () => {

        if(dia == '' || dia == null){
            return null;
        }
        if(cantidad <= 0 || cantidad == null){
            return null;
        }
        if(tipoDePago == '' || tipoDePago == null){
            return null;
        }
        if(ciudad == '' || ciudad == null){
            return null;
        }
        if(pelicula == '' || pelicula == null){
            return null;
        }


        return {dia,tipoDePago,cantidad,ciudad,pelicula, valor: cantidad * 5000}
    }


    
    return(
        <Panel header="Comprar entrada"> 
            <Messages ref={msgs} />
            <div className="d-flex flex-column align-items-start mb-3 gap-2">
                <label htmlFor="form-dia">Día</label>
                <Dropdown className='w-100' id="form-dia" value={dia} onChange={e=>setDia(e.value)} options={diasList} optionLabel="dia"
                    placeholder="Seleccionar un día" checkmark={true} highlightOnSelect={false}/>
            </div>
            <div className="mb-3 d-flex flex-row justify-content-between gap-2">
                <label htmlFor="form-tipo-select">Tipo de Pago</label>
                <SelectButton 
                    id="form-tipo-select" 
                    options={tipoPagoList} 
                    value={tipoDePago} 
                    onChange={e=>setTipoDePago(e.value)}
                />
            </div>
            <div className="d-flex flex-column  mb-3 gap-2">
                <label className="text-start" htmlFor="nombre-rango-txt">Cantidad de entradas</label>
                <InputNumber value={cantidad} 
                    onValueChange={(e) => setCantidad(e.value)} 
                    min={1} 
                />
            </div>
            <div className="d-flex flex-column align-items-start mb-3 gap-2">
                <label htmlFor="nombre-rango-txt">Ciudad</label>
                <InputText 
                    id="nombre-rango-txt" 
                    value={ciudad} onChange={(e) => setCiudad(e.target.value)}
                    className="w-100" 
                    aria-describedby="nombre-rango-help"    
                />
            </div>
            <div className="d-flex flex-column align-items-start mb-3 gap-2">
                <label htmlFor="nombre-rango-txt">Película</label>
                <ListBox value={pelicula} onChange={(e) => setPelicula(e.value)} options={peliculasList} optionLabel="name" className="w-full md:w-14rem" />     
            </div>
            
            <div className="mb-3">
                <Button  label='Comprar' severity='info' onClick={() => handleClick()}/>
            </div>
        </Panel>
    )

}

export default EntradaForm;