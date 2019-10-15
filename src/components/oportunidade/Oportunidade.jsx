import React, { Component } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import api from '../../services/api'
//import axios from 'axios'
import Main from '../template/Main'
import OportunidadeTable from './OportunidadeTable'
import OportunidadeFiltro from './OportunidadeFiltro'
import OportunidadeImportar from './OportunidadeImportar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";


const headerProps = {
  icon: 'bar-chart',
  title: 'Oportunidades',
  subtitle: 'Lista das oportunidades de operações que surgiram no mercado'
}

//const baseUrl = 'http://localhost:3001/users'
const initialState = {
  show_filtro: false,
  tela: 'relatorio',
  filtro: {
    data_inicial: new Date(),
    data_final: new Date()
  },
  filtro_atual: null,
  list: [
    /*
    { data: "02/09/2019", hora_entrada: "10:04:55", hora_saida: "10:12:36", hora_reversao: "10:12:36", operacional: "CANDLE DE REVERSÃO", direcao: "COMPRADO", ponto_entrada: "102.000", ponto_saida: "102.100", pontos: "100", resultado: "GAIN", entrei: "NÃO OPEREI" },
    { data: "02/09/2019", hora_entrada: "10:28:37", hora_saida: "10:35:00", hora_reversao: "10:40:07", operacional: "DUPLO CANDLE", direcao: "COMPRADO", ponto_entrada: "101.900", ponto_saida: "102.200", pontos: "300", resultado: "GAIN", entrei: "NÃO OPEREI" },
    { data: "02/09/2019", hora_entrada: "12:14:16", hora_saida: "12:20:09", hora_reversao: "12:50:11", operacional: "CANDLE DE REVERSÃO", direcao: "VENDIDO", ponto_entrada: "102.000", ponto_saida: "101.600", pontos: "400", resultado: "GAIN", entrei: "NÃO OPEREI" },
    { data: "02/09/2019", hora_entrada: "14:00:07", hora_saida: "14:20:19", hora_reversao: "14:20:19", operacional: "CANDLE DO OTARIO", direcao: "VENDIDO", ponto_entrada: "101.600", ponto_saida: "101.800", pontos: "-200", resultado: "LOSS", entrei: "NÃO" },
    { data: "02/09/2019", hora_entrada: "15:17:42", hora_saida: "15:42:42", hora_reversao: "15:42:42", operacional: "SAIDA DE CONSOLIDAÇÃO", direcao: "COMPRADO", ponto_entrada: "101.900", ponto_saida: "101.700", pontos: "-200", resultado: "LOSS", entrei: "SIM" },
    { data: "02/09/2019", hora_entrada: "15:42:42", hora_saida: "15:43:25", hora_reversao: "17:13:22", operacional: "CANDLE DE REVERSÃO", direcao: "VENDIDO", ponto_entrada: "101.700", ponto_saida: "101.100", pontos: "600", resultado: "GAIN", entrei: "SIM" },
    { data: "03/09/2019", hora_entrada: "09:00:49", hora_saida: "09:00:52", hora_reversao: "09:00:52", operacional: "GAP", direcao: "VENDIDO", ponto_entrada: "100.900", ponto_saida: "100.800", pontos: "100", resultado: "GAIN", entrei: "NÃO OPEREI" },
    { data: "03/09/2019", hora_entrada: "09:10:01", hora_saida: "09:12:12", hora_reversao: "09:12:12", operacional: "CANDLE DO OTARIO", direcao: "VENDIDO", ponto_entrada: "100.800", ponto_saida: "100.700", pontos: "100", resultado: "GAIN", entrei: "NÃO" },
    { data: "03/09/2019", hora_entrada: "09:33:19", hora_saida: "09:59:21", hora_reversao: "09:59:21", operacional: "CANDLE DE REVERSÃO", direcao: "COMPRADO", ponto_entrada: "100.900", ponto_saida: "101.000", pontos: "100", resultado: "GAIN", entrei: "NÃO OPEREI" },
    */
  ]
}



export default class Oportunidade extends Component {

  state = { ...initialState }
  componentWillMount() {
    this.clearFormRelatorio();
    this.filtrarRelatorio();
  }
  filtrarRelatorio() {
    console.log(this.state.filtro);
    api.get('/oportunidade', {params: this.state.filtro})
      .then(res => {
        this.setState({ list: res.data })

      })
  }
  mudarTela(tela) {
    this.setState({ tela })
  }
  clearFormRelatorio() {
    this.setState({ filtro_atual: { ...this.state.filtro } })
  }
  showHideFiltro(opcao, clear) {

    if (clear)
      this.clearFormRelatorio();
    this.setState({ show_filtro: opcao || !this.state.show_filtro })

  }

  updateField(event, field, value) {
    let filtro_atual = { ...this.state.filtro_atual };
    filtro_atual[field] = value;
    this.setState({ filtro_atual });
  }
  clearField(field) {
    let filtro_atual = { ...this.state.filtro_atual };
    filtro_atual[field] = "";
    this.setState({ filtro_atual });
  }
  filterReport() {
    this.setState({ filtro: { ...this.state.filtro_atual } });
    this.showHideFiltro(false, true);
    this.filtrarRelatorio();
  }
  renderRelatorio() {
    let relatorio = [(
      <div className="header-bottons" >
        <button className="btn btn-primary" onClick={() => this.showHideFiltro()}>
          <FontAwesomeIcon icon={this.state.show_filtro ? faChevronUp : faChevronDown} />
          <span className="ml-2">Filtros</span>
        </button>
        <div>
          <button className="btn btn-warning" onClick={() => this.mudarTela('importar')}>
            <li className="fa fa-upload"> Importar</li>

          </button>
          <button className="btn btn-success  ml-2 " onClick={() => this.mudarTela('cadastrar')}>
            <li className="fa fa-plus"> Adicionar</li>
          </button>

        </div>
      </div>
    )]

    if (this.state.show_filtro)
      relatorio.push(
        <OportunidadeFiltro
          filtro={this.state.filtro_atual}
          onChangeField={(event, field, value) => this.updateField(event, field, value)}
          onClearField={(field) => this.clearField(field)}
          onCancel={() => this.showHideFiltro(false, true)}
          onFiltrar={() => this.filterReport()}
        />
      )
    relatorio.push(<OportunidadeTable list={this.state.list} />)
    return relatorio;
  }
  render() {

    return (
      <Main {...headerProps}>
        {this.state.tela === 'relatorio' ? this.renderRelatorio() : null}
        {this.state.tela === 'importar' ?
          <OportunidadeImportar
            onReturn={() => this.mudarTela('relatorio')}
            onSucess={() => { this.mudarTela('relatorio'); this.filtrarRelatorio() }} /> : null}
      </Main>
    )
  }
}