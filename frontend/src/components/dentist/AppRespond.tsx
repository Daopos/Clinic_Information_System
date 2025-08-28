import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
  Select,
} from "flowbite-react";
import type { AppointmentForm } from "../../types/IAppointment";
import { useEffect, useState } from "react";
import { formatDateTimeLocal } from "../../utils/transformDate";

interface FormProps {
  openModal: boolean;
  onSubmiit: (formdata: AppointmentForm) => void;
  onClose: () => void;
  initialData: AppointmentForm;
}

const AppRespond: React.FC<FormProps> = ({
  openModal,
  onSubmiit,
  initialData,
  onClose,
}) => {
  const [formData, setFormData] = useState<AppointmentForm>({
    app_date: "",
    status: "",
  });

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (openModal) {
      setFormData(initialData);
      setError(""); // clear error when reopening
    }
  }, [openModal, initialData]);

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
    setError(""); // reset errors

    // ✅ Only check time restriction if Approved
    if (formData.status === "Approved") {
      const selected = new Date(formData.app_date);
      const hour = selected.getHours();

      if (hour < 8 || hour > 17) {
        setError("Appointment must be between 8:00 AM and 5:00 PM.");
        return;
      }
    }

    if (!formData.status) {
      setError("Please select a status.");
      return;
    }

    // ✅ If valid, submit
    onSubmiit(formData);
  };

  return (
    <Modal show={openModal} onClose={onClose}>
      <ModalHeader>Appointment Response</ModalHeader>
      <ModalBody>
        {/* Appointment Date & Time */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="app_date">Appointment Date & Time</Label>
          </div>
          <TextInput
            name="app_date"
            id="app_date"
            type="datetime-local"
            required
            shadow
            value={formatDateTimeLocal(formData.app_date)}
            min={new Date().toISOString().slice(0, 16)}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        {/* Status Dropdown */}
        <div className="mt-4">
          <div className="mb-2 block">
            <Label htmlFor="status">Status</Label>
          </div>
          <Select
            name="status"
            id="status"
            required
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">-- Select Status --</option>
            <option value="Approved">Approved</option>
            <option value="Declined">Declined</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </Select>
        </div>

        {/* Error Message */}
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

export default AppRespond;
