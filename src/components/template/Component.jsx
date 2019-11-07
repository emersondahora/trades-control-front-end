import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export const Confirm = props => {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        {props.title? 
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          
          </Modal.Title>
      </Modal.Header> : null }
      <Modal.Body>
        <p>{props.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-danger"  onClick={props.onCancel}>Não</Button>
        <Button className="btn-success" onClick={props.onConfirm}>Sim</Button>
      </Modal.Footer>
    </Modal>)
}