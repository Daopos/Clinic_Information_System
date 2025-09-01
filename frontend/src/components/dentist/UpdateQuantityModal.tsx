import { useState, useEffect } from "react";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import type { UpdateQuantity } from "../../types/IEquipment"; // <-- import the interface

interface UpdateQuantityModalProps {
  openModal: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateQuantity) => void; // now expects UpdateQuantity
  mode: "add" | "reduce"; // determines if add or reduce
}

const UpdateQuantityModal: React.FC<UpdateQuantityModalProps> = ({
  openModal,
  onSubmit,
  onClose,
  mode,
}) => {
  const [formData, setFormData] = useState<UpdateQuantity>({
    total_quantity: 0,
  });

  // reset when opened
  useEffect(() => {
    if (openModal) setFormData({ total_quantity: 0 });
  }, [openModal]);

  const handleSubmit = () => {
    if (formData.total_quantity <= 0) return;
    onSubmit(formData); // ✅ { total_quantity: number }
  };

  return (
    <Modal show={openModal} onClose={onClose}>
      <ModalHeader>
        {mode === "add"
          ? "Add Equipment Quantity"
          : "Reduce Equipment Quantity"}
      </ModalHeader>
      <ModalBody>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="quantity">
              {mode === "add" ? "Quantity to Add" : "Quantity to Reduce"}
            </Label>
          </div>
          <TextInput
            name="total_quantity"
            id="total_quantity"
            type="number"
            min={1}
            required
            shadow
            value={formData.total_quantity}
            onChange={(e) =>
              setFormData({ total_quantity: Number(e.target.value) })
            }
            placeholder="Enter quantity"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit}>
          {mode === "add" ? "Add" : "Reduce"}
        </Button>
        <Button color="alternative" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateQuantityModal;
