import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ModalWrapper extends Component {
  render() {
  	const {
  	  id,
  	  title,
  	  buttonText,
  	  children,
  	  onClick,
  	} = this.props
  	
  	return (
  	  <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby={id + 'Label'} aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={id + 'Label'}>{ title }</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              { children }
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target={'#' + id} onClick={onClick}>{ buttonText }</button>
            </div>
          </div>
        </div>
      </div>
  	)
  }
}

ModalWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
}
