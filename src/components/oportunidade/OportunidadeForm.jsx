import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import dominio from '../../common/dominios'
import CandleMarketChart from '../template/CandleMarketChart'
import OportunidadeTable from './OportunidadeTable'
import api from '../../services/api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

const initialState = {
    dados: {
        data: new Date(),
        hora_entrada: '',
        hora_saida: '',
        hora_reversao: '',
        periodo: '',
        operacional: '',
        direcao: '',
        ponto_entrada: '',
        ponto_saida: '',
        pontos: '',
        resultado: '',
        acao: '',
        detalhe: ''
    },
}

export default class OportunidadeForm extends Component {
    state = {
        showChart: false,
        dominio: {},
        mercado: [{ candle: 1, data: '11/10/2019', hora: '09:03:00', ponto_abertura: 102300, ponto_maxima: 102400, ponto_minima: 102300, ponto_fechamento: 102400 },
        { candle: 2, data: '11/10/2019', hora: '09:03:00', ponto_abertura: 102400, ponto_maxima: 102500, ponto_minima: 102400, ponto_fechamento: 102500 },
        { candle: 3, data: '11/10/2019', hora: '09:03:00', ponto_abertura: 102500, ponto_maxima: 102600, ponto_minima: 102500, ponto_fechamento: 102600 },
        { candle: 4, data: '11/10/2019', hora: '09:03:00', ponto_abertura: 102600, ponto_maxima: 102700, ponto_minima: 102600, ponto_fechamento: 102700 },
        { candle: 5, data: '11/10/2019', hora: '09:03:00', ponto_abertura: 102700, ponto_maxima: 102800, ponto_minima: 102700, ponto_fechamento: 102800 },
        { candle: 6, data: '11/10/2019', hora: '09:03:00', ponto_abertura: 102800, ponto_maxima: 102900, ponto_minima: 102800, ponto_fechamento: 102900 },
        { candle: 7, data: '11/10/2019', hora: '09:03:00', ponto_abertura: 102900, ponto_maxima: 103000, ponto_minima: 102900, ponto_fechamento: 103000 },
        { candle: 8, data: '11/10/2019', hora: '09:03:00', ponto_abertura: 103000, ponto_maxima: 103100, ponto_minima: 103000, ponto_fechamento: 103100 },
        { candle: 9, data: '11/10/2019', hora: '09:03:00', ponto_abertura: 103100, ponto_maxima: 103200, ponto_minima: 103100, ponto_fechamento: 103200 },
        { candle: 10, data: '11/10/2019', hora: '09:03:00', ponto_abertura: 103200, ponto_maxima: 103300, ponto_minima: 103140, ponto_fechamento: 103300 },
        { candle: 11, data: '11/10/2019', hora: '09:04:00', ponto_abertura: 103200, ponto_maxima: 103360, ponto_minima: 103100, ponto_fechamento: 103100 },
        { candle: 12, data: '11/10/2019', hora: '09:13:00', ponto_abertura: 103100, ponto_maxima: 103140, ponto_minima: 103000, ponto_fechamento: 103000 },
        { candle: 13, data: '11/10/2019', hora: '09:27:00', ponto_abertura: 103000, ponto_maxima: 103100, ponto_minima: 102900, ponto_fechamento: 102900 },
        { candle: 14, data: '11/10/2019', hora: '10:04:00', ponto_abertura: 103000, ponto_maxima: 103100, ponto_minima: 102835, ponto_fechamento: 103100 },
        { candle: 15, data: '11/10/2019', hora: '10:25:00', ponto_abertura: 103100, ponto_maxima: 103200, ponto_minima: 103090, ponto_fechamento: 103200 },
        { candle: 16, data: '11/10/2019', hora: '10:30:00', ponto_abertura: 103200, ponto_maxima: 103300, ponto_minima: 103130, ponto_fechamento: 103300 },
        { candle: 17, data: '11/10/2019', hora: '10:33:00', ponto_abertura: 103300, ponto_maxima: 103400, ponto_minima: 103290, ponto_fechamento: 103400 },
        { candle: 18, data: '11/10/2019', hora: '10:33:00', ponto_abertura: 103400, ponto_maxima: 103500, ponto_minima: 103350, ponto_fechamento: 103500 },
        { candle: 19, data: '11/10/2019', hora: '10:37:00', ponto_abertura: 103500, ponto_maxima: 103600, ponto_minima: 103380, ponto_fechamento: 103600 },
        { candle: 20, data: '11/10/2019', hora: '10:49:00', ponto_abertura: 103600, ponto_maxima: 103700, ponto_minima: 103600, ponto_fechamento: 103700 },
        { candle: 21, data: '11/10/2019', hora: '10:50:00', ponto_abertura: 103700, ponto_maxima: 103800, ponto_minima: 103555, ponto_fechamento: 103800 },
        { candle: 22, data: '11/10/2019', hora: '11:08:00', ponto_abertura: 103800, ponto_maxima: 103900, ponto_minima: 103765, ponto_fechamento: 103900 },
        { candle: 23, data: '11/10/2019', hora: '11:13:00', ponto_abertura: 103900, ponto_maxima: 104000, ponto_minima: 103900, ponto_fechamento: 104000 },
        { candle: 24, data: '11/10/2019', hora: '11:13:00', ponto_abertura: 104000, ponto_maxima: 104100, ponto_minima: 103945, ponto_fechamento: 104100 },
        { candle: 25, data: '11/10/2019', hora: '11:14:00', ponto_abertura: 104000, ponto_maxima: 104125, ponto_minima: 103900, ponto_fechamento: 103900 },
        { candle: 26, data: '11/10/2019', hora: '11:15:00', ponto_abertura: 104000, ponto_maxima: 104100, ponto_minima: 103885, ponto_fechamento: 104100 },
        { candle: 27, data: '11/10/2019', hora: '11:31:00', ponto_abertura: 104000, ponto_maxima: 104170, ponto_minima: 103900, ponto_fechamento: 103900 },
        { candle: 28, data: '11/10/2019', hora: '11:34:00', ponto_abertura: 104000, ponto_maxima: 104100, ponto_minima: 103825, ponto_fechamento: 104100 },
        { candle: 29, data: '11/10/2019', hora: '12:20:00', ponto_abertura: 104100, ponto_maxima: 104200, ponto_minima: 104085, ponto_fechamento: 104200 },

        { candle: 30, data: '11/10/2019', hora: '12:20:00', ponto_abertura: 104100, ponto_maxima: 104255, ponto_minima: 104000, ponto_fechamento: 104000 },
        { candle: 31, data: '11/10/2019', hora: '12:41:00', ponto_abertura: 104000, ponto_maxima: 104045, ponto_minima: 103900, ponto_fechamento: 103900 },
        { candle: 32, data: '11/10/2019', hora: '12:47:00', ponto_abertura: 103900, ponto_maxima: 104095, ponto_minima: 103800, ponto_fechamento: 103800 },
        { candle: 33, data: '11/10/2019', hora: '13:32:00', ponto_abertura: 103900, ponto_maxima: 104000, ponto_minima: 103705, ponto_fechamento: 104000 },
        { candle: 34, data: '11/10/2019', hora: '13:45:00', ponto_abertura: 104000, ponto_maxima: 104100, ponto_minima: 103980, ponto_fechamento: 104100 },
        { candle: 35, data: '11/10/2019', hora: '13:49:00', ponto_abertura: 104000, ponto_maxima: 104190, ponto_minima: 103900, ponto_fechamento: 103900 },
        { candle: 36, data: '11/10/2019', hora: '14:06:00', ponto_abertura: 103900, ponto_maxima: 103930, ponto_minima: 103800, ponto_fechamento: 103800 },
        { candle: 37, data: '11/10/2019', hora: '14:24:00', ponto_abertura: 103900, ponto_maxima: 104000, ponto_minima: 103715, ponto_fechamento: 104000 },
        { candle: 38, data: '11/10/2019', hora: '14:26:00', ponto_abertura: 104000, ponto_maxima: 104100, ponto_minima: 103930, ponto_fechamento: 104100 },
        { candle: 39, data: '11/10/2019', hora: '14:27:00', ponto_abertura: 104100, ponto_maxima: 104200, ponto_minima: 104050, ponto_fechamento: 104200 },
        { candle: 40, data: '11/10/2019', hora: '14:27:00', ponto_abertura: 104200, ponto_maxima: 104300, ponto_minima: 104200, ponto_fechamento: 104300 },
        { candle: 41, data: '11/10/2019', hora: '14:27:00', ponto_abertura: 104300, ponto_maxima: 104400, ponto_minima: 104275, ponto_fechamento: 104400 },
        { candle: 42, data: '11/10/2019', hora: '14:27:00', ponto_abertura: 104400, ponto_maxima: 104500, ponto_minima: 104400, ponto_fechamento: 104500 },
        { candle: 43, data: '11/10/2019', hora: '14:27:00', ponto_abertura: 104500, ponto_maxima: 104600, ponto_minima: 104440, ponto_fechamento: 104600 },
        { candle: 44, data: '11/10/2019', hora: '14:27:00', ponto_abertura: 104500, ponto_maxima: 104610, ponto_minima: 104400, ponto_fechamento: 104400 },
        { candle: 45, data: '11/10/2019', hora: '14:28:00', ponto_abertura: 104400, ponto_maxima: 104475, ponto_minima: 104300, ponto_fechamento: 104300 },
        { candle: 46, data: '11/10/2019', hora: '14:28:00', ponto_abertura: 104300, ponto_maxima: 104335, ponto_minima: 104200, ponto_fechamento: 104200 },
        { candle: 47, data: '11/10/2019', hora: '14:28:00', ponto_abertura: 104300, ponto_maxima: 104400, ponto_minima: 104100, ponto_fechamento: 104400 },
        { candle: 48, data: '11/10/2019', hora: '14:32:00', ponto_abertura: 104300, ponto_maxima: 104450, ponto_minima: 104200, ponto_fechamento: 104200 },
        { candle: 49, data: '11/10/2019', hora: '14:34:00', ponto_abertura: 104200, ponto_maxima: 104255, ponto_minima: 104100, ponto_fechamento: 104100 },
        { candle: 50, data: '11/10/2019', hora: '14:37:00', ponto_abertura: 104100, ponto_maxima: 104220, ponto_minima: 104000, ponto_fechamento: 104000 },
        { candle: 51, data: '11/10/2019', hora: '14:53:00', ponto_abertura: 104000, ponto_maxima: 104080, ponto_minima: 103900, ponto_fechamento: 103900 },
        { candle: 52, data: '11/10/2019', hora: '15:00:00', ponto_abertura: 103900, ponto_maxima: 103940, ponto_minima: 103800, ponto_fechamento: 103800 },
        { candle: 53, data: '11/10/2019', hora: '15:05:00', ponto_abertura: 103800, ponto_maxima: 103800, ponto_minima: 103700, ponto_fechamento: 103700 },
        { candle: 54, data: '11/10/2019', hora: '15:06:00', ponto_abertura: 103700, ponto_maxima: 103710, ponto_minima: 103600, ponto_fechamento: 103600 },
        { candle: 55, data: '11/10/2019', hora: '15:06:00', ponto_abertura: 103700, ponto_maxima: 103800, ponto_minima: 103595, ponto_fechamento: 103800 },
        { candle: 56, data: '11/10/2019', hora: '15:07:00', ponto_abertura: 103800, ponto_maxima: 103900, ponto_minima: 103630, ponto_fechamento: 103900 },
        { candle: 57, data: '11/10/2019', hora: '15:45:00', ponto_abertura: 103800, ponto_maxima: 103940, ponto_minima: 103700, ponto_fechamento: 103700 },
        { candle: 58, data: '11/10/2019', hora: '16:10:00', ponto_abertura: 103800, ponto_maxima: 103900, ponto_minima: 103650, ponto_fechamento: 103900 },
        { candle: 59, data: '11/10/2019', hora: '16:35:00', ponto_abertura: 103900, ponto_maxima: 104000, ponto_minima: 103900, ponto_fechamento: 104000 },
        { candle: 60, data: '11/10/2019', hora: '16:35:00', ponto_abertura: 104000, ponto_maxima: 104100, ponto_minima: 103895, ponto_fechamento: 104100 },
        { candle: 61, data: '11/10/2019', hora: '16:39:00', ponto_abertura: 104000, ponto_maxima: 104200, ponto_minima: 103900, ponto_fechamento: 103900 },
        { candle: 62, data: '11/10/2019', hora: '16:46:00', ponto_abertura: 103900, ponto_maxima: 104030, ponto_minima: 103800, ponto_fechamento: 103800 },
        { candle: 63, data: '11/10/2019', hora: '17:00:00', ponto_abertura: 103800, ponto_maxima: 103925, ponto_minima: 103700, ponto_fechamento: 103700 },
        { candle: 64, data: '11/10/2019', hora: '17:27:00', ponto_abertura: 103700, ponto_maxima: 103795, ponto_minima: 103600, ponto_fechamento: 103600 },
        { candle: 65, data: '11/10/2019', hora: '18:01:00', ponto_abertura: 103600, ponto_maxima: 103600, ponto_minima: 103500, ponto_fechamento: 103500 }
        ],
        dados: { ...initialState.dados },
        list: [],
    }
    componentWillMount() {
        this.setState({ dominio })
    }
    updateField(event, fieldIn, valueIn) {
        let dados = { ...this.state.dados };
        let field, value;
        if (event) {
            field = event.target.name
            value = event.target.value
            dados[event.target.name] = event.target.value
        } else {
            field = fieldIn
            value = valueIn
        }

        dados[field] = value;

        this.setState({ dados });
    }
    processOption(listIn) {
        let list = [['', 'Selecione'], ...listIn]
        return list.map(item => {
            return <option value={item[0]}>{item[1]}</option>
        })
    }
    selectChartCandle(candleIndex) {
        let mercado = [...this.state.mercado]
        let dados = { ...this.state.dados }

        dados.direcao = mercado[candleIndex].ponto_abertura > mercado[candleIndex].ponto_fechamento ? 'Vendido' : 'Comprado'
        dados.hora_entrada = mercado[candleIndex + 1].hora;
        dados.hora_saida = mercado[candleIndex + 2].hora;
        dados.ponto_entrada = mercado[candleIndex].ponto_fechamento;

        for (let i = candleIndex + 1; i < mercado.length; i++) {
            let candle = mercado[i];
            let candleAnterior = mercado[i - 1];
            let direcao = candle.ponto_abertura > candle.ponto_fechamento ? 'Vendido' : 'Comprado'
            //let proxCandle = mercado[i+1]

            if (i === candleIndex + 1 && dados.direcao !== direcao) {
                dados.ponto_saida = candle.ponto_fechamento;
                dados.hora_reversao = candle.hora;
                break;
            }
            if (dados.direcao !== direcao) {
                dados.hora_reversao = candle.hora;
                dados.ponto_saida = candleAnterior.ponto_fechamento;
                break;
            }
        }
        dados.pontos = dados.direcao === 'Comprado' ? dados.ponto_saida - dados.ponto_entrada : dados.ponto_entrada - dados.ponto_saida;
        dados.resultado = dados.pontos > 0 ? 'Gain' : 'Loss'

        let [horaEntrada] = dados.hora_entrada.split(':');
        dados.periodo = dominio.periodo[horaEntrada >= 16 ? 2 : (horaEntrada >= 12 ? 1 : 0)][0]
        this.setState({ showChart: false, dados })

    }
    findChart() {
        this.setState({ showChart: true }) 
    }
    adicionarLista() {
        let list = [...this.state.list]
        list.push({ ...this.state.dados })
        this.setState({ dados: { ...initialState.dados }, list })
        console.log(list);
        //initialState
    }
    removerItem(item) {
        let list = [...this.state.list].filter((obj, index) => index !== item);
        this.setState({ list })
    }
    salvar() {
        api.post(`/oportunidade`, { list: this.state.list })
            .then(res => {
                this.props.onSucess();
            })
    }

    renderChart() {
        if (this.state.showChart) {
            let dataChart = this.state.mercado.map(item => {
                const [hora, minuto] = item.hora.split(':')
                return { x: `${hora}:${minuto}`, y: [item.ponto_abertura, item.ponto_maxima, item.ponto_minima, item.ponto_fechamento] }
            })
            return (
                <div>
                    <CandleMarketChart
                        onSelectCandle={(candle) => this.selectChartCandle(candle)}
                        titulo="Mercado dia 11/10/2019"
                        dados={dataChart} />
                    <hr />
                </div>
            )
        }
        return;
    }
    render() {
        let tela = []
        tela.push((
            <div className="form">
                <h1>Cadastrar Oportunidade</h1>
                <hr />
                {this.renderChart()}

                <div className="row">
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Data da Oportunidade</label>
                            <div className="input input-bottom">
                                <DatePicker type="text" className="form-control"
                                    selected={this.state.dados.data}
                                    onChange={value => this.updateField(null, 'data', value)}
                                    dateFormat="dd/MM/yyyy"
                                    name="data_inicial"
                                    placeholder="Selecione a data Inicial..." />
                                <button className="btn  btn-secondary"
                                    onClick={() => this.findChart()} >
                                    <FontAwesomeIcon icon={faDollarSign} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Operacional</label>
                            <div className="input input-bottom">
                                <select
                                    name="operacional"
                                    className="form-control"
                                    value={this.state.dados.operacional}
                                    onChange={(e) => this.updateField(e)}
                                >
                                    {this.processOption(this.state.dominio.operacional)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Hora de Entrada</label>
                            <div className="input input-bottom">
                                <input
                                    name="hora_entrada"
                                    className="form-control"
                                    type="time"
                                    step="2"
                                    value={this.state.dados.hora_entrada}
                                    onChange={(e) => this.updateField(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Hora de Saída</label>
                            <div className="input input-bottom">
                                <input
                                    name="hora_saida"
                                    className="form-control"
                                    type="time"
                                    step="2"
                                    value={this.state.dados.hora_saida}
                                    onChange={(e) => this.updateField(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Hora de Reversão</label>
                            <div className="input input-bottom">
                                <input
                                    name="hora_reversao"
                                    className="form-control"
                                    type="time"
                                    step="2"
                                    value={this.state.dados.hora_reversao}
                                    onChange={(e) => this.updateField(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Período</label>
                            <div className="input input-bottom">
                                <select
                                    name="periodo"
                                    className="form-control"
                                    value={this.state.dados.periodo}
                                    onChange={(e) => this.updateField(e)}
                                >
                                    {this.processOption(this.state.dominio.periodo)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Direção</label>
                            <div className="input input-bottom">
                                <select
                                    name="direcao"
                                    className="form-control"
                                    value={this.state.dados.direcao}
                                    onChange={(e) => this.updateField(e)}
                                >
                                    {this.processOption(this.state.dominio.direcao)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label>Pontos da Operação</label>
                            <div className="input input-bottom">
                                <input
                                    name="pontos"
                                    className="form-control"
                                    type="number"
                                    step="2"
                                    value={this.state.dados.pontos}
                                    onChange={(e) => this.updateField(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label>Pontos de Entrada</label>
                            <div className="input input-bottom">
                                <input
                                    name="ponto_entrada"
                                    className="form-control"
                                    type="number"
                                    step="2"
                                    value={this.state.dados.ponto_entrada}
                                    onChange={(e) => this.updateField(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label>Pontos de Saída</label>
                            <div className="input input-bottom">
                                <input
                                    name="ponto_saida"
                                    className="form-control"
                                    type="number"
                                    step="2"
                                    value={this.state.dados.ponto_saida}
                                    onChange={(e) => this.updateField(e)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Resultado</label>
                            <div className="input input-bottom">
                                <select
                                    name="resultado"
                                    className="form-control"
                                    value={this.state.dados.resultado}
                                    onChange={(e) => this.updateField(e)}
                                >
                                    {this.processOption(this.state.dominio.resultado)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Ação</label>
                            <div className="input input-bottom">
                                <select
                                    name="acao"
                                    className="form-control"
                                    value={this.state.dados.acao}
                                    onChange={(e) => this.updateField(e)}
                                >
                                    {this.processOption(this.state.dominio.acao)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Observação</label>
                            <div className="input input-bottom">
                                <select
                                    name="detalhe"
                                    className="form-control"
                                    value={this.state.dados.detalhe}
                                    onChange={(e) => this.updateField(e)}
                                >
                                    {this.processOption(this.state.dominio.detalhe)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-danger "
                            onClick={() => this.props.onReturn()}>
                            Cancelar
                </button>
                        <button className="btn btn-success ml-2"
                            onClick={() => this.adicionarLista()}>
                            Adicionar
                </button>
                    </div>
                </div>
            </div>
        ));

        if (this.state.list.length > 0)
            tela.push(
                <React.Fragment>
                    <hr />
                    <OportunidadeTable list={this.state.list} onRemoveRow={(item) => this.removerItem(item)} />
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-success ml-2"
                                onClick={() => this.salvar()}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </React.Fragment>)
        return tela;
    }
}