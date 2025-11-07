
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';


function EntradasTable ({entradas}){

    return (
        <div>
            <DataTable value={entradas} tableStyle={{minWidth:'50rem'}}>
                <Column field='dia' header="Día"></Column>
                <Column field='pelicula.name' header="Película"></Column>
                <Column field='cantidad' header="Cantidad de Entradas"></Column>
                <Column field='valor' header="Valor a Pagar"></Column>
            </DataTable>
        </div>
    )
}

export default EntradasTable;