import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import dominio from '../../common/dominios'
import CandleMarketChart from '../template/CandleMarketChart'
import OportunidadeTable from './OportunidadeTable'
import api from '../../services/api'
import { format } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faSpinner } from "@fortawesome/free-solid-svg-icons";

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
        loadedChart: false,
        loadingChart:false,
        mercado: [],
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

        dados.direcao = mercado[candleIndex].abertura > mercado[candleIndex].fechamento ? 'Vendido' : 'Comprado'
        dados.hora_entrada = mercado[candleIndex + 1].hora;
        dados.hora_saida = mercado[candleIndex + 2].hora;
        dados.ponto_entrada = mercado[candleIndex].fechamento;

        for (let i = candleIndex + 1; i < mercado.length; i++) {
            let candle = mercado[i];
            let candleAnterior = mercado[i - 1];
            let direcao = candle.abertura > candle.fechamento ? 'Vendido' : 'Comprado'
            //let proxCandle = mercado[i+1]

            if (i === candleIndex + 1 && dados.direcao !== direcao) {
                dados.ponto_saida = candle.fechamento;
                dados.hora_reversao = candle.hora;
                break;
            }
            if (dados.direcao !== direcao) {
                dados.hora_reversao = candle.hora;
                dados.ponto_saida = candleAnterior.fechamento;
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
        this.setState({ loadingChart: true }, () => {
            api.get('/mercado', { params: {data: format(this.state.dados.data, 'yyyy-MM-dd')} })
            .then(res => {
                console.log('ended')
                this.setState({ mercado: res.data, showChart: true, loadingChart: false, loadedChart: true })
            })

        }) 
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
        if (this.state.showChart && this.state.mercado.length > 0 ) {
            let dataChart = this.state.mercado.map(item => {
                const [hora, minuto] = item.hora.split(':')
                return { x: `${hora}:${minuto}`, y: [item.abertura, item.maxima, item.minima, item.fechamento] }
            })
            return (
                <div>
                    <CandleMarketChart
                        onSelectCandle={(candle) => this.selectChartCandle(candle)}
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
                                    onChange={value => { 
                                                            this.updateField(null, 'data', value) 
                                                            this.setState({loadedChart:false})
                                                        }}
                                    dateFormat="dd/MM/yyyy"
                                    name="data_inicial"
                                    placeholder="Selecione a data Inicial..." />
                                <button className={['btn',  !this.state.loadedChart || this.state.mercado.length ? 'btn-primary' : 'btn-danger'].join( ' ')}
                                    onClick={() => this.findChart()} 
                                    disabled={this.state.loadedChart || this.state.loadingChart}>
                                    <FontAwesomeIcon icon={this.state.loadingChart?faSpinner:faDollarSign} 
                                    spin={this.state.loadingChart} />
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