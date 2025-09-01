import { useState, useEffect } from "react";
import type { EditEquipmentForm, Equipment } from "../../types/IEquipment";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "flowbite-react";

interface EditFormProps {
  openModal: boolean;
  onClose: () => void;
  onSubmit: (formdata: EditEquipmentForm) => void;
  equipment: Equipment | null; // the equipment to edit
}

const EditEquipmentModal: React.FC<EditFormProps> = ({
  openModal,
  onSubmit,
  onClose,
  equipment,
}) => {
  const [equipmentName, setEquipmentName] = useState("");

  // preload equipment_name when opening modal
  useEffect(() => {
    if (equipment) {
      setEquipmentName(equipment.equipment_name);
    }
  }, [equipment]);

  const handleSubmit = () => {
    if (!equipment) return;
    onSubmit({
      id: equipment.id, // make sure you pass id for update
      equipment_name: equipmentName,
    });
  };

  return (
    <Modal show={openModal} onClose={onClose}>
      <ModalHeader>Edit Equipment</ModalHeader>
      <ModalBody>
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
            value={equipmentName}
            onChange={(e) => setEquipmentName(e.target.value)}
            placeholder="Enter new equipment name"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit}>Save Changes</Button>
        <Button color="alternative" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditEquipmentModal;
