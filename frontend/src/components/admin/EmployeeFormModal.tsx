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
import type { EmployeeFormData } from "../../types/IEmployee";
import { useEffect, useState } from "react";
import { useDelayedLoading } from "../../utils/useDelayedLoading";

interface FormProps {
  openModal: boolean;
  onSubmit: (formData: EmployeeFormData) => void;
  onClose: () => void;
  shouldReset?: boolean;
  pending: boolean;
  initialData?: EmployeeFormData | null; // <- new
  mode?: "create" | "edit";
}

const EmployeeFormModal: React.FC<FormProps> = ({
  openModal,
  onSubmit,
  onClose,
  shouldReset = false,
  pending = false,
  initialData,
  mode = "create",
}) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstname: "",
    lastname: "",
    middlename: "",
    role: "PHARMACIST",
    email: "",
  });

  const showSpinner = useDelayedLoading(pending, 250);

  useEffect(() => {
    if (shouldReset || !initialData) {
      setFormData({
        firstname: "",
        lastname: "",
        middlename: "",
        role: "PHARMACIST",
        email: "",
      });
    } else {
      setFormData(initialData);
    }
  }, [shouldReset, initialData]);

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
        {mode === "edit" ? "Edit Employee Information" : "Create Employee"}
      </ModalHeader>
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

export default EmployeeFormModal;
