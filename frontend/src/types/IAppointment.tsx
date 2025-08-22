export interface Appointment {
  id: number;
  services: string;
  dentistId: number | null;
  status: string;
  app_date: string;
  createdAt: string;
  patient: {
    id: number;
    firstname: string;
    lastname: string;
    middlename: string;
  };
}
