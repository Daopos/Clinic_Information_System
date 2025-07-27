import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  TextInput,
} from "flowbite-react";
import type { EmployeeFormData } from "../../types/IEmployee";
import { useEffect, useState } from "react";

interface FormProps {
  openModal: boolean;
  onSubmit: (formData: EmployeeFormData) => void;
  onClose: () => void;
  shouldReset?: boolean;
}

const EmployeeFormModal: React.FC<FormProps> = ({
  openModal,
  onSubmit,
  onClose,
  shouldReset = false,
}) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstname: "",
    lastname: "",
    middlename: "",
    role: "PHARMACIST",
    email: "",
  });
  useEffect(() => {
    if (shouldReset) {
      setFormData({
        firstname: "",
        lastname: "",
        middlename: "",
        role: "PHARMACIST",
        email: "",
      });
    }
  }, [shouldReset]);

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
      <ModalHeader>Employee Information</ModalHeader>
      <ModalBody>
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2">Email</Label>
            </div>
            <TextInput
              name="email"
              id="email2"
              type="email"
              placeholder="name@flowbite.com"
              required
              shadow
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="firstname">Firstname</Label>
            </div>
            <TextInput
              name="firstname"
              id="firstname"
              type="text"
              required
              shadow
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="middlename">Middlename</Label>
            </div>
            <TextInput
              name="middlename"
              id="middlename"
              type="text"
              required
              shadow
              value={formData.middlename}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="lastname">Lastname</Label>
            </div>
            <TextInput
              name="lastname"
              id="lastname"
              type="text"
              required
              shadow
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="role">Position</Label>
            </div>
            <Select
              name="role"
              id="role"
              required
              value={formData.role}
              onChange={handleChange}
            >
              <option value={"PHARMACIST"}>Pharmacist</option>
              <option value={"DENTIST"}>Dentist</option>
            </Select>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit}>Create</Button>
        <Button color="alternative" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EmployeeFormModal;
