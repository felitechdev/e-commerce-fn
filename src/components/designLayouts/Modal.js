import { Modal } from 'flowbite-react';

const ModalComponent = (props) => {

  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal dismissible show={props.openModal} onClose={() => props.setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body className={props.styles}>{props.children}</Modal.Body>
        
      </Modal>
    </>
  );
}

export default ModalComponent
