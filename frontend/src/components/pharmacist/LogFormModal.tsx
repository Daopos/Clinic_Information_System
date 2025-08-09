import { useEffect, useState } from "react";
import type { MedicineLogForm } from "../../types/IMedicineLog";
import { useDelayedLoading } from "../../utils/useDelayedLoading";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  TextInput,
} from "flowbite-react";

interface FormProps {
  onSubmit: (formData: MedicineLogForm) => void;
  onClose: () => void;
  openModal: boolean;
  shouldReset?: boolean;
  pending?: boolean;
  selectedStock?: {
    medicineStockId: number;
    medicineId: number;
  } | null;
}

const LogFormModal: React.FC<FormProps> = ({
  openModal,
  onSubmit,
  onClose,
  pending = false,
  selectedStock,
}) => {
  const showSpinner = useDelayedLoading(pending, 250);

  const [formData, setFormData] = useState<MedicineLogForm>({
    dispensed_to: "",
    quantity_dispensed: -1,
    medicineId: -1,
    medicineStockId: -1,
  });

  useEffect(() => {
    if (openModal) {
      setFormData({
        dispensed_to: "",
        quantity_dispensed: -1,
        medicineId: selectedStock?.medicineId || -1,
        medicineStockId: selectedStock?.medicineStockId || -1,
      });
    }
  }, [openModal, selectedStock]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity_dispensed"
          ? Number(value) // <-- Convert to number explicitly
          : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Modal show={openModal} onClose={onClose}>
      <ModalHeader>Create Log</ModalHeader>
      <ModalBody>
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="dispensed_to">Give to</Label>
            </div>
            <TextInput
              name="dispensed_to"
              id="dispensed_to"
              type="text"
              required
              shadow
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="quantity_dispensed">Quantity</Label>
            </div>
            <TextInput
              name="quantity_dispensed"
              id="quantity_dispensed"
              type="text"
              required
              shadow
              onChange={handleChange}
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit} disabled={pending}>
          {showSpinner ? (
            <>
              <Spinner aria-label="Creating" size="sm" light />
              <span className="pl-3">Creating...</span>
            </>
          ) : (
            "Create"
          )}
        </Button>
        <Button color="alternative" onClick={onClose} disabled={pending}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LogFormModal;
