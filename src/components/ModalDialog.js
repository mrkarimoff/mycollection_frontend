import { Modal } from "antd";

const ModalDialog = ({ open, setOpen, children, onCancel, title }) => {
  return (
    <>
      <Modal
        title={title}
        open={open}
        onCancel={() => (onCancel ? onCancel() : setOpen(false))}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
};
export default ModalDialog;
