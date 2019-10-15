import React, { Component } from 'react'
import OportunidadeTable from './OportunidadeTable'
import os from 'os'
import api from '../../services/api'

export default class OportunidadeImportar extends Component {
  state = {
    stage: 0,
    txtImport: `02/09/2019	10:04:55	10:12:36	10:12:36	Horário de Operação	CANDLE DE REVERSÃO	COMPRADO	102.000	102.100	100	GAIN	NÃO OPEREI
02/09/2019	10:28:37	10:35:00	10:40:07	Horário de Operação	DUPLO CANDLE	COMPRADO	101.900	102.200	300	GAIN	NÃO OPEREI
02/09/2019	12:14:16	12:20:09	12:50:11	Horário GSAF	CANDLE DE REVERSÃO	VENDIDO	102.000	101.600	400	GAIN	NÃO OPEREI
02/09/2019	14:00:07	14:20:19	14:20:19	Horário GSAF	CANDLE DO OTARIO	VENDIDO	101.600	101.800	-200	LOSS	NÃO OPEREI
02/09/2019	15:17:42	15:42:42	15:42:42	Horário GSAF	SAIDA DE CONSOLIDAÇÃO	COMPRADO	101.900	101.700	-200	LOSS	NÃO OPEREI
02/09/2019	15:42:42	15:43:25	17:13:22	Horário GSAF	CANDLE DE REVERSÃO	VENDIDO	101.700	101.100	600	GAIN	NÃO OPEREI
03/09/2019	09:00:49	09:00:52	09:00:52	Horário de Operação	GAP	VENDIDO	100.900	100.800	100	GAIN	NÃO OPEREI
03/09/2019	09:10:01	09:12:12	09:12:12	Horário de Operação	CANDLE DO OTARIO	VENDIDO	100.800	100.700	100	GAIN	NÃO OPEREI
03/09/2019	09:33:19	09:59:21	09:59:21	Horário de Operação	CANDLE DE REVERSÃO	COMPRADO	100.900	101.000	100	GAIN	NÃO OPEREI
03/09/2019	10:34:19	10:34:56	10:55:02	Horário de Operação	CANDLE DO OTARIO	COMPRADO	101.400	102.100	700	GAIN	NÃO OPEREI
03/09/2019	11:04:20	11:04:36	11:15:03	Horário de Operação	CANDLE DO OTARIO	VENDIDO	101.600	100.800	800	GAIN	NÃO OPEREI
03/09/2019	11:31:46	11:36:41	11:36:41	Horário de Operação	DUPLO CANDLE	VENDIDO	100.500	100.700	-200	LOSS	NÃO OPEREI
03/09/2019	11:36:41	11:40:12	11:49:08	Horário de Operação	CANDLE DO OTARIO	COMPRADO	100.700	100.900	200	GAIN	NÃO OPEREI
03/09/2019	12:05:18	12:12:39	12:18:57	Horário GSAF	CANDLE DE REVERSÃO	VENDIDO	100.700	100.500	200	GAIN	NÃO OPEREI
03/09/2019	12:32:34	12:56:07	12:56:07	Horário GSAF	CANDLE DE REVERSÃO	COMPRADO	100.700	100.500	-200	LOSS	NÃO OPEREI
03/09/2019	12:56:07	12:56:36	12:56:36	Horário GSAF	CANDLE DO OTARIO	VENDIDO	100.500	100.300	200	GAIN	NÃO OPEREI
03/09/2019	13:30:14	13:44:55	13:44:55	Horário GSAF	DUPLO CANDLE	VENDIDO	100.400	100.300	100	GAIN	NÃO OPEREI
03/09/2019	14:28:42	14:36:18	14:36:18	Horário GSAF	CANDLE DO OTARIO	COMPRADO	100.600	100.400	-200	LOSS	NÃO OPEREI
03/09/2019	15:15:14	15:17:30	15:17:30	Horário GSAF	SAIDA DE CONSOLIDAÇÃO	COMPRADO	100.700	100.800	100	GAIN	NÃO OPEREI
03/09/2019	16:20:37	16:30:55	16:32:52	Fora de Operação	CANDLE DE REVERSÃO	COMPRADO	100.200	100.400	200	GAIN	NÃO OPEREI
`,
    list: []
  }
  processTxtImport() {
    let list = []
    list = this.state.txtImport.split(os.EOL).map((item, index) => {
      let data, hora_entrada, hora_saida, hora_reversao, periodo, operacional, direcao, preco_entrada, preco_saida, pontos, resultado, entrei, detalhe;
      [data, hora_entrada, hora_saida, hora_reversao, periodo, operacional, direcao, preco_entrada, preco_saida, pontos, resultado, entrei, detalhe] = item.split('\t')
      if (!data) return null;
      return { data, hora_entrada, hora_saida, hora_reversao, periodo, operacional, direcao, preco_entrada, preco_saida, pontos, resultado, entrei, detalhe }
    });
    this.setState({ list, stage: 1 })
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
        <OportunidadeTable list={this.state.list} />
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