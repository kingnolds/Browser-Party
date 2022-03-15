import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import ReactDOM from "react-dom";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";


function GameOver(props) {


    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (!props.modal) {
        return <div></div>
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <ModalHeader>
                    <ModalTitle>Round Over!</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    Heading back to the Scoreboard!
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default GameOver;