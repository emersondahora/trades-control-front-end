import React, { Component } from 'react'
import OportunidadeTable from './OportunidadeTable'
import os from 'os'
import api from '../../services/api'


export default class OportunidadeImportar extends Component {
  state = {
    stage: 0,
    txtImport: ``,
    list: []
  }
  processTxtImport() {
    let list = []
    list = this.state.txtImport.split(os.EOL).map((item, index) => {
      let data, hora_entrada, hora_saida, hora_reversao, periodo, operacional, direcao, ponto_entrada, ponto_saida, pontos, resultado, acao, detalhe;
      [data, hora_entrada, hora_saida, hora_reversao, periodo, operacional, direcao, ponto_entrada, ponto_saida, pontos, resultado, acao, detalhe] = item.split('\t')
      if (!data) return null;
      ponto_entrada = ponto_entrada.replace('.','');
      ponto_saida = ponto_saida.replace('.','');
      return { data, hora_entrada, hora_saida, hora_reversao, periodo, operacional, direcao, ponto_entrada, ponto_saida, pontos, resultado, acao, detalhe }
    });
    this.setState({ list, stage: 1 })
  }
  removerItem(item) {
    let list =[...this.state.list].filter((obj, index) => index !== item );
    this.setState({list})
  }
  renderEtapa1() {
    return (
      <div>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
          onChange={(event) => this.setState({ txtImport: event.target.value.trim() })}>{this.state.txtImport}</textarea>
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-secondary "
              onClick={this.props.onReturn}>
              Cancelar
                </button>
            <button className="btn btn-primary ml-2"
              onClick={() => this.processTxtImport()}>
              Avançar
                </button>
          </div>
        </div>
      </div>
    )
  }
  renderEtapa2() {
    return (
      <React.Fragment>
        <OportunidadeTable list={this.state.list} showOpcoes={true} onRemoveRow={(item) => this.removerItem(item)} />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-warning "
              onClick={() => this.voltarImport()}>
              Voltar
                </button>
            <button className="btn btn-success ml-2"
              onClick={() => this.salvarImportacao()}>
              Salvar
                </button>
          </div>
        </div>
      </React.Fragment>

    )
  }
  voltarImport() {
    this.setState({ list: [], stage: 0 })
  }
  salvarImportacao() {
    api.post(`/oportunidade`, { list:  this.state.list } )
       .then(res => {
         this.props.onSucess();
       })
  }
  render() {
    return (
      <div>
        <h1>Importar Oportunidades</h1>
        {this.state.stage === 0 ? this.renderEtapa1() : null}
        {this.state.stage === 1 ? this.renderEtapa2() : null}
      </div>
    )
  }
}