import React from 'react'
import DatePicker from "react-datepicker";

export default props =>
    <div className="form" style={{ marginBottom: "15px" }}>
        <div className="row">
            <div className="col-12 col-md-3">
                <div className="form-group">
                    <label>Data Inicial</label>
                    <div className="input input-bottom">
                        <DatePicker type="text" className="form-control"
                            selected={props.filtro.data_inicial}
                            onChange={value => props.onChangeField(null, 'data_inicial', value)}
                            dateFormat="dd/MM/yyyy"
                            name="data_inicial"
                            placeholder="Selecione a data Inicial..." />
                        <button className="btn  btn-secondary" onClick={() => this.clearField('data_inicial')}>X</button>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-3">
                <div className="form-group">
                    <label>Data Final</label>
                    <div className="input input-bottom">
                        <DatePicker type="text" className="form-control"
                            selected={props.filtro.data_final}
                            dateFormat="dd/MM/yyyy"
                            onChange={value => props.onChangeField(null, 'data_final', value)}
                            name="data_final"
                            placeholder="Selecione a Data Final..." />
                        <button className="btn  btn-secondary" onClick={() => this.clearField('data_final')}>X</button>
                    </div>
                </div>
            </div>

        </div>

        <hr />
        <div className="row">
            <div className="col-12 d-flex justify-content-end">
                <button className="btn btn-secondary "
                    onClick={() => props.onCancel()}>
                    Cancelar
    </button>
                <button className="btn btn-primary ml-2"
                    onClick={e => props.onFiltrar(e)}>
                    Filtrar
    </button>
            </div>
        </div>
    </div>