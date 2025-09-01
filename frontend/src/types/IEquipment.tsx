export interface Equipment {
  id: number;
  equipment_name: string;
  total_quantity: number;
}

export interface EquipmentForm {
  equipment_name: string;
  total_quantity: number;
}

export interface EditEquipmentForm {
  id: number;
  equipment_name: string;
}

export interface UpdateQuantity {
  total_quantity: number;
}
