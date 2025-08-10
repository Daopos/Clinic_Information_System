import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import medicineService from "../services/medicineService";
import type { Medicine, MedicineForm } from "../types/IMedicine";

export const useMedicines = () => {
  const queryClient = useQueryClient();

  const {
    data: medicines = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Medicine[]>({
    queryKey: ["medicines"],
    queryFn: medicineService.getMedicines,
  });

  const {
    mutateAsync: createMedicine,
    isSuccess: createSuccess,
    isPending: createPending,
    isError: createError,
  } = useMutation({
    mutationFn: medicineService.createMedicine,
    onSuccess: (newMedicine) => {
      queryClient.setQueryData<Medicine[]>(["medicines"], (old = []) => [
        newMedicine,
        ...old,
      ]);
    },
  });

  const {
    mutateAsync: deleteMedicine,
    isSuccess: deleteSucess,
    isPending: deletepending,
    isError: deleteError,
  } = useMutation({
    mutationFn: medicineService.deleteMedicineById,
    onSuccess: (_, deleteId) => {
      queryClient.setQueryData<Medicine[]>(["medicines"], (old = []) =>
        old.filter((medicine) => medicine.id !== deleteId)
      );
    },
  });

  const {
    mutateAsync: updateMedicine,
    isSuccess: updateSuccess,
    isPending: updatePending,
    isError: updateError,
  } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: MedicineForm }) =>
      medicineService.updateMedicineById(id, data),
    onSuccess: (updatedEmployee) => {
      queryClient.setQueryData<Medicine[]>(["medicines"], (old = []) =>
        old.map((emp) =>
          emp.id === updatedEmployee.id ? updatedEmployee : emp
        )
      );
    },
  });

  const consumeMedicine = (id: number, amount: number) => {
    queryClient.setQueryData<Medicine[]>(["medicines"], (old = []) =>
      old.map((med) =>
        med.id === id ? { ...med, quantity: med.quantity - amount } : med
      )
    );
  };

  return {
    //fetch data
    medicines,
    isLoading,
    isError,
    error,
    refetch,

    //create data
    createMedicine,
    createSuccess,
    createPending,
    createError,

    //delete data
    deleteMedicine,
    deleteSucess,
    deletepending,
    deleteError,

    //update data
    updateMedicine,
    updateSuccess,
    updatePending,
    updateError,

    //consume minus quantity
    consumeMedicine,
  };
};
