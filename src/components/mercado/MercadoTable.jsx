import React, { Component } from 'react'
import { numberWithCommas } from '../../common/utility'
import {
  format,
} from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faTable, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Confirm } from '../template/Component'
import CandleMarketChart from '../template/CandleMarketChart'
import { parseISO } from 'date-fns/esm';


export default class MercadoTable extends Component {
  state = {
    showConfirmRemove: false,
    indexRow: null,
    listProcessada: []
  }
  processarLista(list) {
    console.log(list);
    if (list) {
      let listProcessada = list.reduce((prev, item) => {
        let list = [], itemCurrent;
        if (prev.length) {
          list = prev.filter(itemPrev => itemPrev.data !== item.data);
          itemCurrent = prev.filter(itemPrev => itemPrev.data === item.data).shift();
        }
        if (!itemCurrent)
          itemCurrent = {
            showChart: false,
            showReport: false,
            sending: false,
            data: item.data,
            dataView: format(parseISO(item.data), 'dd/MM/yyyy'),
            rows: []
          }
        itemCurrent.rows.push(item)
        list.push(itemCurrent);
        return list;
      }, [])
      this.setState({ listProcessada })
    }
  }
  componentDidMount() {
    this.processarLista(this.props.list);
  }
  showHideRemoveRow(showConfirmRemove, indexRow) {
    this.setState({ showConfirmRemove, indexRow })
  }
  removeRow() {
    this.showHideRemoveRow(false);
    this.props.onRemoveRow(this.state.indexRow)
  }
  sendDay(index) {
    let listProcessada = [...this.state.listProcessada]
    listProcessada[index].sending = true;
    this.setState({ listProcessada }, () => this.props.onSave(listProcessada[index].data).then(list => this.processarLista(list)))
  }
  showHideChartReport(item, index) {
    //let item = this.state.listProcessada.filter((item, itemIndex) => itemIndex === index)
    let listProcessada = this.state.listProcessada;
    if (item === 'chart')
      listProcessada[index].showChart = listProcessada[index].showChart ? false : true;
    if (item === 'report')
      listProcessada[index].showReport = listProcessada[index].showReport ? false : true;
    this.setState({ listProcessada })
  }
  renderChart(item) {
    if (!item.showChart) {
      return;
    }
    let dataChart = item.rows.map(item => {
      const [hora, minuto] = item.hora.split(':')
      return { x: `${hora}:${minuto}`, y: [item.abertura, item.maxima, item.minima, item.fechamento] }
    })
    return (
      <CandleMarketChart
        titulo={`Mercado dia ${item.dataView}`}
        dados={dataChart} />
    )
  }
  renderReport(item) {
    if (!item.showReport) {
      return;
    }
    return (
      <table className="table table-striped table-bordered table-hover table-sm mb-0">
        <thead className="thead-dark">
          <tr>
            <th width="2">GAP</th>
            <th>Hora</th>
            <th>Abertura</th>
            <th>Máxima</th>
            <th>Mínima</th>
            <th>Fechamento</th>
          </tr>
        </thead>
        <tbody>
          {item.rows.map((row, index) => {
            return (
              <tr key={index}>
                <td className="text-justify pt-2">
                  <div className="d-flex justify-content-center align-items-center">
                    <input type="checkbox"
                      checked={row.gap}
                      onChange={(event) => this.props.onCheckGap(row.index, event.target.checked)} />
                  </div>
                </td>
                <td>{row.hora}</td>
                <td>{numberWithCommas(row.abertura.replace('.', ','))}</td>
                <td>{numberWithCommas(row.maxima.replace('.', ','))}</td>
                <td>{numberWithCommas(row.minima.replace('.', ','))}</td>
                <td>{numberWithCommas(row.fechamento.replace('.', ','))}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
  renderDays() {
    return this.state.listProcessada.map((item, index) => {
      let data = item.dataView
      return (
        <React.Fragment key={index}>
          <div style={{ border: '1px solid #ccc' }} className="pt-2">
            <div className="d-flex justify-content-between mr-2 align-items-cente ">
              <h1 className="ml-2 h1">
                <button
                  className={['btn mr-1', item.showChart ? 'btn-success' : 'btn-danger'].join(' ')}
                  onClick={() => this.showHideChartReport('chart', index)}>
                  <FontAwesomeIcon icon={faChartLine} />
                </button>
                <button
                  className={['btn mr-1', item.showReport ? 'btn-success' : 'btn-danger'].join(' ')}

                  onClick={() => this.showHideChartReport('report', index)}>
                  <FontAwesomeIcon icon={faTable} />
                </button>
                <span>{data} ({item.rows.length} candles)</span>
              </h1>
              <div>
                <button className="btn btn-danger "
                  disabled={item.sending}
                  onClick={() => this.voltarImport()}>
                  Excluir
                </button>
                <button className="btn btn-success ml-2"
                  onClick={() => this.sendDay(index)}>
                  {item.sending ? <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> : null}
                  Salvar
                </button>
              </div>

            </div>

            {this.renderChart(item)}
            {this.renderReport(item)}
          </div>
        </React.Fragment>
      )
    });
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
        {this.renderDays()}
      </React.Fragment>
    )
  }
}