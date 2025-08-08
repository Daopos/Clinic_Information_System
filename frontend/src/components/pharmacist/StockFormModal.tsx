import { useEffect, useState } from "react";
import type { MedicineStockForm } from "../../types/IMedicineStock";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useDelayedLoading } from "../../utils/useDelayedLoading";
import type { MedicineOptions } from "../../types/IMedicine";
import medicineService from "../../services/medicineService";

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

  const [medicineOptions, setMedicineOptions] = useState<MedicineOptions[]>([]);

  useEffect(() => {
    getMedicineOptions();
  }, []);

  const getMedicineOptions = async () => {
    try {
      const options = await medicineService.getMedicineOptions();
      setMedicineOptions(options);
    } catch (err) {
      console.log(err);
    }
  };

  const [formData, setFormData] = useState<MedicineStockForm>({
    expiration: "",
    hand_in: "",
    quantity: 0,
    medicineId: -1,
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
      [name]:
        name === "quantity"
          ? Number(value) // <-- Convert to number explicitly
          : value,
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
            <Select
              name="medicineId"
              id="medicineId"
              onChange={handleChange}
              value={formData.medicineId}
              required
            >
              <option value="">Select a medicine</option>
              {medicineOptions.map((option) => (
                <option value={option.id}>{option.med_name}</option>
              ))}
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="quantity">Quantity</Label>
            </div>
            <TextInput
              name="quantity"
              id="quantity"
              type="text"
              required
              shadow
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="hand_in">Hand in</Label>
            </div>
            <TextInput
              name="hand_in"
              id="hand_in"
              type="date"
              required
              shadow
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="expiration">Expiration</Label>
            </div>
            <TextInput
              name="expiration"
              id="expiration"
              type="date"
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
