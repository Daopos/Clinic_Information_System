import { useState } from "react";
import type { EquipmentForm } from "../../types/IEquipment";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "flowbite-react";

interface FormProps {
  openModal: boolean;
  onClose: () => void;
  onSubmit: (formdata: EquipmentForm) => void;
}

const CreateEquipmentModal: React.FC<FormProps> = ({
  openModal,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<EquipmentForm>({
    equipment_name: "",
    total_quantity: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "total_quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Modal show={openModal} onClose={onClose}>
      <ModalHeader>Create Equipment</ModalHeader>
      <ModalBody>
        {/* Equipment Name */}
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="equipment_name">Equipment Name</Label>
          </div>
          <TextInput
            name="equipment_name"
            id="equipment_name"
            type="text"
            required
            shadow
            value={formData.equipment_name}
            onChange={handleChange}
            placeholder="Enter equipment name"
          />
        </div>

        {/* Total Quantity */}
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="total_quantity">Total Quantity</Label>
          </div>
          <TextInput
            name="total_quantity"
            id="total_quantity"
            type="number"
            min={0}
            required
            shadow
            value={formData.total_quantity}
            onChange={handleChange}
            placeholder="Enter total quantity"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit}>Submit</Button>
        <Button color="alternative" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateEquipmentModal;
