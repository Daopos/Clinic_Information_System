import { Button, Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDelayedLoading } from "../utils/useDelayedLoading";
interface FormProps {
  openModal: boolean;
  onSubmit: () => void;
  onClose: () => void;
  pending: boolean;
  description: string;
}

const ConfirmModal: React.FC<FormProps> = ({
  openModal,
  onSubmit,
  onClose,
  pending,
  description,
}) => {
  const showSpinner = useDelayedLoading(pending, 250);

  return (
    <Modal show={openModal} size="md" onClose={onClose} popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {description}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="red" onClick={onSubmit}>
              {showSpinner ? (
                <>
                  <Spinner aria-label="Creating employee" size="sm" light />
                  <span className="pl-3">Deleteing...</span>
                </>
              ) : (
                "Yes, I'm sure"
              )}
            </Button>
            <Button color="alternative" onClick={onClose}>
              No, cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ConfirmModal;
