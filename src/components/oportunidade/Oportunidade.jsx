import React, { Component } from 'react'
//import axios from 'axios'
import Main from '../template/Main'
import OportunidadeTable from './OportunidadeTable'

const headerProps = {
    icon: 'bar-chart',
    title: 'Oportunidades',
    subtitle: 'Lista das oportunidades de operações que surgiram no mercado'
}

//const baseUrl = 'http://localhost:3001/users'
const initialState = {
    show_filtro:false,
    list: [
{data:"02/09/2019", hora_entrada:"10:04:55", hora_saida: "10:12:36", hora_reversao: "10:12:36", operacional:"CANDLE DE REVERSÃO", direcao: "COMPRADO", valor_entrada: "102.000", valor_saida: "102.100", pontos: "100", resultado: "GAIN", entrei: "NÃO OPEREI"},
{data:"02/09/2019", hora_entrada:"10:28:37", hora_saida: "10:35:00", hora_reversao: "10:40:07", operacional:"DUPLO CANDLE", direcao: "COMPRADO", valor_entrada: "101.900", valor_saida: "102.200", pontos: "300", resultado: "GAIN", entrei: "NÃO OPEREI"},
{data:"02/09/2019", hora_entrada:"12:14:16", hora_saida: "12:20:09", hora_reversao: "12:50:11", operacional:"CANDLE DE REVERSÃO", direcao: "VENDIDO", valor_entrada: "102.000", valor_saida: "101.600", pontos: "400", resultado: "GAIN", entrei: "NÃO OPEREI"},
{data:"02/09/2019", hora_entrada:"14:00:07", hora_saida: "14:20:19", hora_reversao: "14:20:19", operacional:"CANDLE DO OTARIO", direcao: "VENDIDO", valor_entrada: "101.600", valor_saida: "101.800", pontos: "-200", resultado: "LOSS", entrei: "NÃO"},
{data:"02/09/2019", hora_entrada:"15:17:42", hora_saida: "15:42:42", hora_reversao: "15:42:42", operacional:"SAIDA DE CONSOLIDAÇÃO", direcao: "COMPRADO", valor_entrada: "101.900", valor_saida: "101.700", pontos: "-200", resultado: "LOSS", entrei: "SIM"},
{data:"02/09/2019", hora_entrada:"15:42:42", hora_saida: "15:43:25", hora_reversao: "17:13:22", operacional:"CANDLE DE REVERSÃO", direcao: "VENDIDO", valor_entrada: "101.700", valor_saida: "101.100", pontos: "600", resultado: "GAIN", entrei: "SIM"},
{data:"03/09/2019", hora_entrada:"09:00:49", hora_saida: "09:00:52", hora_reversao: "09:00:52", operacional:"GAP", direcao: "VENDIDO", valor_entrada: "100.900", valor_saida: "100.800", pontos: "100", resultado: "GAIN", entrei: "NÃO OPEREI"},
{data:"03/09/2019", hora_entrada:"09:10:01", hora_saida: "09:12:12", hora_reversao: "09:12:12", operacional:"CANDLE DO OTARIO", direcao: "VENDIDO", valor_entrada: "100.800", valor_saida: "100.700", pontos: "100", resultado: "GAIN", entrei: "NÃO"},
{data:"03/09/2019", hora_entrada:"09:33:19", hora_saida: "09:59:21", hora_reversao: "09:59:21", operacional:"CANDLE DE REVERSÃO", direcao: "COMPRADO", valor_entrada: "100.900", valor_saida: "101.000", pontos: "100", resultado: "GAIN", entrei: "NÃO OPEREI"}, 
]
}



export default class Oportunidade extends Component {

  state = { ...initialState }

  showHideFiltro() {
    this.setState({show_filtro: !this.state.show_filtro })
  }
  render (){
    return (
      <Main {...headerProps}>
        <div style={{marginBottom:"15px"}}>
          <button className="btn btn-primary" onClick={ () => this.showHideFiltro()}>                      Filtros</button>
        </div>
        {this.state.show_filtro?(
          <div>Filtros</div>
        ):''}
        <OportunidadeTable list={this.state.list} />
      </Main>
    )
  }  
}