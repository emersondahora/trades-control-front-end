import React, { Component } from 'react'
import { numberWithCommas } from '../../common/utility'
import {
  format,
} from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Confirm } from '../template/Component'


export default class OportunidadeTable extends Component {
  state = {
    showConfirmRemove: false,
    indexRow: null
  }
  showHideRemoveRow(showConfirmRemove, indexRow) {
    this.setState({showConfirmRemove, indexRow})
  }
  removeRow(){
    this.showHideRemoveRow(false);
    this.props.onRemoveRow(this.state.indexRow)
  }
  renderRows() {
    return this.props.list.map((oportunidadeItem, index) => {
      if (!oportunidadeItem) return null;
      let oportunidade = { ...oportunidadeItem };
      oportunidade.data = format(new Date(oportunidade.data), 'dd/MM/yyyy') //new Date(oportunidade.data);

      let duracao = new Date(new Date(`01/01/2019  00:00:00`).getTime() + (new Date(`01/01/2019  ${oportunidade.hora_saida}`) - new Date(`01/01/2019 ${oportunidade.hora_entrada}`)))
      
      let layout_line = oportunidade.pontos > 0 ? 'table-success' : 'table-danger'

      let operacao = (oportunidade.pontos > 0 && oportunidade.acao.toUpperCase() === 'OPEREI') || (oportunidade.pontos < 0 && oportunidade.acao.toUpperCase() === 'NÃO OPEREI') ? 'bg-success' : 'bg-danger'
      operacao = oportunidade.acao.toUpperCase() !== 'FORA DE OPERAÇÃO' ? operacao : 'bg-info'
      return (
        <tr key={index} className={layout_line}>

          <td>{oportunidade.data}</td>
          <td>{oportunidade.hora_entrada}</td>
          <td>{oportunidade.hora_saida}</td>
          <td>{duracao.getHours()}h{duracao.getMinutes()}m{duracao.getSeconds()}s</td>
          <td>{oportunidade.operacional}</td>
          <td>{oportunidade.direcao}</td>
          <td>{numberWithCommas(oportunidade.ponto_entrada)}</td>
          <td>{numberWithCommas(oportunidade.ponto_saida)}</td>
          <td>{oportunidade.pontos}</td>
          <td>{oportunidade.resultado}</td>
          <td className={operacao}>{oportunidade.acao}</td>
          {this.props.onRemoveRow?
          <td>
            <div className="d-flex justify-content-around align-items-center">
              <button type="button" className="text-danger btn btn-link" data-toggle="tooltip" data-placement="top" title="Remover Entrada"
                onClick={() => this.showHideRemoveRow(true, index)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </td>: null}
        </tr>
      )
    })
  }
  render() {
    return (
      <React.Fragment>
        <Confirm 
          show={this.state.showConfirmRemove} 
          message="Deseja apagar a entrada?" 
          onCancel={() => this.showHideRemoveRow(false)}
          onConfirm={() => this.removeRow()}
        />
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
              <th>Ação</th>
              {this.props.onRemoveRow?
              <th>Opções</th>:null}
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}