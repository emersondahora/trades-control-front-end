import React, { Component } from 'react'

export default class OportunidadeImportar extends Component {
    state = {
        txtImport: '',
        list: []
    }
    render() {
        return (
            <div>
                <h1>Importar Oportunidades</h1>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-secondary ">
                            Cancelar
                </button>
                        <button className="btn btn-primary ml-2">
                            Avançar
                </button>
                    </div>
                </div>
            </div>
        )
    }
}