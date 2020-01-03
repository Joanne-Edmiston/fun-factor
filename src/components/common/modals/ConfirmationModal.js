import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './_commonModal.scss';

function ConfirmationModal(props) {

  const [show, setShow] = useState(false);

  const onClose = () => {
    if (props.onClose) {
      props.onClose();
    }

    setShow(false);
  }

  const size = props.size ? props.size : 'sm';

  const closeButtonText = props.closeButtonText ? props.closeButtonText : 'Close';

  if (props.show && !show){
    setShow(true);
  }


  return (
    <Modal
      show={show}
      onHide={onClose}
      size={size}
      aria-labelledby="common-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="common-modal">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.body}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>{closeButtonText}</Button>
      </Modal.Footer>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  size: PropTypes.string,
  closeButtonText: PropTypes.string
};

export default ConfirmationModal;