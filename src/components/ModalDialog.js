import { Modal } from "antd";

const ModalDialog = ({ open, setOpen, children, title }) => {
  return (
    <>
      <Modal title={title} open={open} onCancel={() => setOpen(false)} footer={null}>
        {children}
      </Modal>
    </>
  );
};
export default ModalDialog;
