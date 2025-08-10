import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import medicineLogService from "../services/medicineLogService";
import type { PaginatedMedicineLogs } from "../types/IMedicineLog";

interface UseMedicineLogOptions {
  page?: number;
  limit?: number;
}

export const useMedicineLog = ({
  page = 1,
  limit = 10,
}: UseMedicineLogOptions = {}) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: createLog,
    isSuccess: createSuccess,
    isPending: createPending,
    isError: createError,
  } = useMutation({
    mutationFn: medicineLogService.createMedicineLog,
    onSuccess: (newLog) => {
      // Invalidate all medicine log queries to refresh pagination
      queryClient.invalidateQueries({
        queryKey: ["medicineLogPharma"],
      });

      // Optionally, you can also optimistically update the first page
      queryClient.setQueryData<PaginatedMedicineLogs>(
        ["medicineLogPharma", 1, limit],
        (old) => {
          if (old) {
            return {
              ...old,
              data: [newLog, ...old.data.slice(0, limit - 1)], // Keep within limit
              total: old.total + 1,
            };
          }
          return old;
        }
      );
    },
  });

  const {
    data: paginatedData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<PaginatedMedicineLogs>({
    queryKey: ["medicineLogPharma", page, limit],
    queryFn: () => medicineLogService.getAllMedicineLogs(page, limit),
  });

  return {
    // Retrieve data
    medicineLogs: paginatedData?.data || [],
    total: paginatedData?.total,
    currentPage: paginatedData?.page || page,
    totalPages: paginatedData?.totalPages,
    isLoading,
    isError,
    error,
    refetch,

    // Create data
    createLog,
    createSuccess,
    createPending,
    createError,
  };
};
