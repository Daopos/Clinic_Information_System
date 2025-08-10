import { useMutation, useQueryClient } from "@tanstack/react-query";
import medicineLogService from "../services/medicineLogService";
import type { MedicineLog } from "../types/IMedicineLog";

export const useMedicineLog = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: createLog,
    isSuccess: createSuccess,
    isPending: createPending,
    isError: createError,
  } = useMutation({
    mutationFn: medicineLogService.createMedicineLog,
    onSuccess: (newLog) => {
      queryClient.setQueryData<MedicineLog[]>(
        ["medicineLogPharma"],
        (old = []) => [newLog, ...old]
      );
    },
  });

  return {
    createLog,
    createSuccess,
    createPending,
    createError,
  };
};
