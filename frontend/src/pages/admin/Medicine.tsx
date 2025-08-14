import { TabItem, Tabs } from "flowbite-react";
import MedicineList from "./medicineTabs/MedicineList";
import MedicineHistory from "./medicineTabs/MedicineHistory";

const Medicine = () => {
  return (
    <Tabs aria-label="Tabs with underline" variant="underline">
      <TabItem active title="Medcine">
        <MedicineList />
      </TabItem>
      <TabItem title="Log">
        <MedicineHistory />
      </TabItem>
    </Tabs>
  );
};

export default Medicine;
