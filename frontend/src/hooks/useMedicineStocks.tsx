import { useQuery } from "@tanstack/react-query";
import type { MedicineStock } from "../types/IMedicineStock";
import medicineStockService from "../services/medicineStockService";

export const useMedicineStock = () => {
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

  return {
    medicineStocks,
    isLoading,
    isError,
    error,
    refetch,
  };
};
