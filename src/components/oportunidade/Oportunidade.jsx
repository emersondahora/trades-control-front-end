import React, { Component } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import api from '../../services/api'
//import axios from 'axios' 
import Main from '../template/Main'
import OportunidadeTable from './OportunidadeTable'
import OportunidadeFiltro from './OportunidadeFiltro'
import OportunidadeImportar from './OportunidadeImportar'
import OportunidadeForm from './OportunidadeForm'

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
  list: []
}



export default class Oportunidade extends Component {

  state = { ...initialState }
  componentWillMount() {
    this.clearFormRelatorio();
    this.filtrarRelatorio();
  }
  filtrarRelatorio() {
    console.log(this.state.filtro);
    api.get('/oportunidade', { params: this.state.filtro })
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
          <button className="btn btn-success  ml-2 " onClick={() => this.mudarTela('formulario')}>
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
        {this.state.tela === 'formulario' ?
          <OportunidadeForm
            onReturn={() => this.mudarTela('relatorio')}
            onSucess={() => { this.mudarTela('relatorio'); this.filtrarRelatorio() }}  />
          : null}
      </Main>
    )
  }
}