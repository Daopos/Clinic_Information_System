import { useEffect, useState } from "react";
import type { MedicineStockForm } from "../../types/IMedicineStock";
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
import { useDelayedLoading } from "../../utils/useDelayedLoading";

interface FormProps {
  openModal: boolean;
  onSubmit: (formData: MedicineStockForm) => void;
  onClose: () => void;
  shouldReset?: boolean;
  pending?: boolean;
  initialData?: MedicineStockForm | null;
  mode?: "create" | "edit";
}

const StockFormModal: React.FC<FormProps> = ({
  openModal,
  onSubmit,
  onClose,
  shouldReset = false,
  pending = false,
  initialData,
  mode = "create",
}) => {
  const showSpinner = useDelayedLoading(pending, 250);

  const [formData, setFormData] = useState<MedicineStockForm>({
    expiration: "",
    hand_in: "",
    quantity: 0,
    medicineId: 0,
  });

  useEffect(() => {
    if (openModal) {
      if (shouldReset || !initialData) {
        setFormData({
          expiration: "",
          hand_in: "",
          quantity: 0,
          medicineId: 0,
        });
      } else {
        setFormData(initialData);
      }
    }
  }, [openModal, shouldReset, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Modal show={openModal} onClose={onClose}>
      <ModalHeader>
        {mode === "edit" ? "Edit Medicine Information" : "Create Medicine"}
      </ModalHeader>
      <ModalBody>
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="med_name">Medicine name</Label>
            </div>
            <TextInput
              name="med_name"
              id="med_name"
              type="text"
              required
              shadow
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="form_med">Form of medicine</Label>
            </div>
            <TextInput
              name="form_med"
              id="form_med"
              type="text"
              required
              shadow
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="dosage">Dosage</Label>
            </div>
            <TextInput
              name="dosage"
              id="dosage"
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
              <Spinner
                aria-label={`${
                  mode === "edit" ? "Updating" : "Creating"
                } employee`}
                size="sm"
                light
              />
              <span className="pl-3">
                {mode === "edit" ? "Updating..." : "Creating..."}
              </span>
            </>
          ) : mode === "edit" ? (
            "Update"
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

export default StockFormModal;
