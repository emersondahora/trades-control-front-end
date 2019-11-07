import React, { Component } from 'react'
import DatePicker from "react-datepicker";

import MercadoTable from './MercadoTable'
import os from 'os'
import api from '../../services/api'
import {
   parseISO, compareAsc
} from 'date-fns';


export default class MercadoImportar extends Component {
  state = {
    stage: 0,
    data_inicial: new Date('2019-11-02'),
    data_final: new Date(),
    txtImport: ``,
    list: []
  }
  componentDidMount() {
    let { data_inicial, data_final } = this.state;
    data_inicial = new Date(data_inicial.toDateString())
    data_final = new Date(data_final.toDateString())
    this.setState({ data_inicial, data_final })
  }
  processTxtImport() {
    let list = []
    let regexData = new RegExp('[0-9]{2}/[0-9]{2}/[0-9]{2,4}');
    let dataAtual, dataCount;

    list = this.state.txtImport.split(os.EOL).map((item, index) => {
      let [dataHora,
        abertura,
        maxima,
        minima,
        fechamento] = item.split('\t').map(value => value.replace(',', '.').trim());
      if (!regexData.test(dataHora))
        return null;

      let [data, hora] = dataHora.split(' ');
      let [dia, mes, ano] = data.split('/');
      data = `${ano}-${mes}-${dia}`;
      return {
        ordem: 0,
        data,
        hora,
        abertura,
        maxima,
        minima,
        fechamento,
        gap: false,
      }
    })
      // Remover itens inválidos da lista
      .filter(item => item)
      // Filtrar itens do range de data da importação
      .filter(({ data }) => {
        return compareAsc(parseISO(data), this.state.data_inicial) !== -1 && compareAsc(this.state.data_final, parseISO(data)) !== -1
      })
      .reverse()
      .map((itemIn, index) => {
        let item = itemIn
        item.index = index;
        if (dataAtual === item.data) {
          item.ordem = dataCount;
          dataCount = dataCount + 1;
        } else {
          dataAtual = item.data;
          dataCount = 1;
        }
        return item;
      })
    this.setState({ list, stage: 1 })
  }
  checkGap(index, checked) {
    let list = { ...this.state.list }
    list[index].gap = checked;
    this.setState({ list })
  }
  removerItem(item) {
    let list = [...this.state.list].filter((obj, index) => index !== item);
    this.setState({ list })
  }
  renderEtapa1() {
    return (
      <div className="form">
        <div className="row  d-flex" style={{ marginLeft: '10px' }}>
          <div>
            <div className="form-group d-flex">
              <div className="p-2 ">Data Inicial</div>
              <div className="input input-bottom">
                <DatePicker type="text" className="form-control"
                  selected={this.state.data_inicial}
                  onChange={value => this.setState({ data_inicial: value })}
                  dateFormat="dd/MM/yyyy"
                  name="data_inicial"
                  placeholder="Selecione a data Inicial..." />
              </div>
            </div>
          </div>
          <div>
            <div className="form-group d-flex">
              <div className="p-2 ">Data Final</div>
              <div className="input input-bottom">
                <DatePicker type="text" className="form-control"
                  selected={this.state.data_final}
                  dateFormat="dd/MM/yyyy"
                  onChange={value => this.setState({ data_final: value })}
                  name="data_final"
                  placeholder="Selecione a Data Final..." />
              </div>
            </div>
          </div>

        </div>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
          onChange={(event) => this.setState({ txtImport: event.target.value.trim() })} defaultValue={this.state.txtImport} />
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
        <MercadoTable
          list={this.state.list}
          showOpcoes={true}
          onCheckGap={(item, checked) => this.checkGap(item, checked)}
          onSave={(data) => this.salvarImportacao(data)}
          onExluirDia={(data) => this.removerRowsDay(data)}
        />
        <div className="row mt-2">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-warning "
              onClick={() => this.voltarImport()}>
              Voltar
                </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
  voltarImport() {
    this.setState({ list: [], stage: 0 })
  }
  removerRowsDay(data) {

  }
  async salvarImportacao(data) {
    let list = this.state.list.filter(item => item.data === data)

    await api.post(`/mercado`, { list, data });

    list = this.state.list.filter(item => item.data !== data)
    this.setState({ list })
    if(list.length)
      return list;
    this.props.onSucess();
    return null;
  }
  render() {
    return (
      <div>
        <h1>Importar Mercado</h1>
        {this.state.stage === 0 ? this.renderEtapa1() : null}
        {this.state.stage === 1 ? this.renderEtapa2() : null}
      </div>
    )
  }
}