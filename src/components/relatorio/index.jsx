import React, { Component } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import api from '../../services/api'

import Main from '../template/Main'


const headerProps = {
    icon: 'line-chart   ',
    title: 'Relatórios',
    subtitle: 'Relatórios comparativos de Operacionais'
}

const initialState = {
    show_filtro: false,
    tela: 'formulario',
    filtro: {
        data_inicial: new Date(),
        data_final: new Date()
    },
    filtro_atual: null,
    list: []
}



export default class Report extends Component {
    state = { ...initialState }
    render() {
        return (
            <Main {...headerProps}>
                <div className="form">
                    <h1>Relatórios de Oportunidade</h1>
                    <hr />
                </div>
            </Main>
        )
    }
}