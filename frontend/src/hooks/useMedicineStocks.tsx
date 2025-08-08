import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MedicineStock } from "../types/IMedicineStock";
import medicineStockService from "../services/medicineStockService";

export const useMedicineStock = () => {
  const queryClient = useQueryClient();

  const {
    data: medicineStocks = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<MedicineStock[]>({
    queryKey: ["medicineStockPharma"],
    queryFn: medicineStockService.getMedicineStocksToPharma,
  });

  const {
    mutateAsync: createStock,
    isSuccess: createSuccess,
    isPending: createPending,
    isError: createError,
  } = useMutation({
    mutationFn: medicineStockService.createMedicineStock,
    onSuccess: (newStock) => {
      queryClient.setQueryData<MedicineStock[]>(
        ["medicineStockPharma"],
        (old = []) => [newStock, ...old]
      );
    },
  });

  return {
    //retreive Data
    medicineStocks,
    isLoading,
    isError,
    error,
    refetch,

    //create Data
    createStock,
    createSuccess,
    createPending,
    createError,
  };
};
