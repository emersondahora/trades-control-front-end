import React, { Component } from 'react'
import { 
  parseISO, 
  format, 
  formatRelative, 
  formatDistance,
} from 'date-fns';



export default class OportunidadeTable extends Component {
  state = {}

  renderRows() {
    return this.props.list.map((oportunidadeItem, index) => {
      if (!oportunidadeItem) return null;
      let oportunidade = {...oportunidadeItem};
      oportunidade.data = format(new Date(oportunidade.data), 'dd/MM/yyyy') //new Date(oportunidade.data);

      let duracao = new Date(new Date(oportunidade.data).getTime() + (new Date(`${oportunidade.data} ${oportunidade.hora_saida}`) - new Date(`${oportunidade.data} ${oportunidade.hora_entrada}`)))

      let layout_line = oportunidade.pontos > 0 ? 'table-success' : 'table-danger'

      let operacao = (oportunidade.pontos > 0 && oportunidade.entrei === 'SIM') || (oportunidade.pontos < 0 && oportunidade.entrei === 'NÃO') ? 'bg-success' : 'bg-danger'
      operacao = oportunidade.entrei !== 'NÃO OPEREI' ? operacao : 'bg-info'
      return (
        <tr key={index} className={layout_line}>
          <td>{oportunidade.data}</td>
          <td>{oportunidade.hora_entrada}</td>
          <td>{oportunidade.hora_saida}</td>
          <td>{duracao.getHours()}h{duracao.getMinutes()}m{duracao.getSeconds()}s</td>
          <td>{oportunidade.operacional}</td>
          <td>{oportunidade.direcao}</td>
          <td>{oportunidade.pontos_entrada}</td>
          <td>{oportunidade.pontos_saida}</td>
          <td>{oportunidade.pontos}</td>
          <td>{oportunidade.resultado}</td>
          <td className={operacao}>{oportunidade.entrei}</td>
        </tr>
      )
    })
  }
  render() {
    return (
      <table className="table table-striped table-bordered table-hover  table-sm">
        <thead className="thead-dark">
          <tr>
            <th>Data</th>
            <th>Hora entrada</th>
            <th>Hora Saída</th>
            <th>Duração</th>
            <th>Operacional</th>
            <th>Direção</th>
            <th>Entrada</th>
            <th>Saída</th>
            <th>Pontos</th>
            <th>Resultado</th>
            <th>Entrei</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }
}