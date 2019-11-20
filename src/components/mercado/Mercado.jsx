import React, { Component } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import api from '../../services/api'
import {
    format, subDays
} from 'date-fns';
//import axios from 'axios' 
import CandleMarketChart from '../template/CandleMarketChart'
import Main from '../template/Main'

import MercadoImportar from './MercadoImportar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const headerProps = {
    icon: 'dollar',
    title: 'Mercado',
    subtitle: 'Gráfico com o movimento no mercado diário'
}

const initialState = {
    show_filtro: false,
    tela: 'chart',
    filtro: {
        data: subDays(new Date(), 1),
    },
    filtro_atual: null,
    list: []
}



export default class Mercado extends Component {
    state = { ...initialState }
    componentDidMount() {
        this.clearFormRelatorio();
        this.filtrarRelatorio();
    }
    clearFormRelatorio() {
        this.setState({ filtro_atual: { ...this.state.filtro } })
    }
    filtrarRelatorio() {
        let filtro = { ...this.state.filtro };
        filtro.data = format(filtro.data, 'yyyy-MM-dd')
        api.get('/mercado', { params: filtro })
            .then(res => {
                this.setState({ list: res.data })

            })
    }
    changeFiltro(name, value){
        let filtro = {...this.state.filtro }
        filtro[name] = value;
        this.setState({ filtro }, this.filtrarRelatorio)

    }
    mudarTela(tela) {
        this.setState({ tela })
    }
    chartRender() {
        
        let dataChart = this.state.list.map(item => {
            const [hora, minuto] = item.hora.split(':')
            return { x: `${hora}:${minuto}`, y: [item.abertura, item.maxima, item.minima, item.fechamento] }
        })
        let chart = dataChart.length ?  <CandleMarketChart dados={dataChart} />: null;
        return (
            <React.Fragment>
                <div className="header-bottons" >
                    <div>
                        <div className="form-group d-flex">
                            <div className="p-2 ">Data do Gráfico</div>
                            <div className="input input-bottom">
                                <DatePicker type="text" className="form-control"
                                    selected={this.state.filtro.data}
                                    dateFormat="dd/MM/yyyy"
                                    onChange={value => this.changeFiltro('data', value) }
                                    name="data_final"
                                    placeholder="Selecione a Data que deseja exibir o gráfico..." />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-warning" onClick={() => this.mudarTela('importar')}>
                            <FontAwesomeIcon icon={faUpload} />
                            <span className="ml-2"> Importar</span>
                        </button>
                    </div>
                </div>
                {chart}
            </React.Fragment>
        )
    }
    render() {

        return (
            <Main {...headerProps}>
                {this.state.tela === 'chart' ? this.chartRender() : null}
                {this.state.tela === 'importar' ?
                    <MercadoImportar
                        onReturn={() => this.mudarTela('chart')}
                        onSucess={() => { this.mudarTela('chart'); }} /> : null}
            </Main>
        )
    }
}