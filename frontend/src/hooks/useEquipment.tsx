import { useQuery } from "@tanstack/react-query";
import type { Equipment } from "../types/IEquipment";
import equipmentService from "../services/equipmentService";

export const useEquipments = () => {
  const {
    data: equipments = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Equipment[]>({
    queryKey: ["equipments"],
    queryFn: equipmentService.getAllEquipments,
  });

  return {
    equipments,
    isLoading,
    isError,
    error,

    refetch,
  };
};
