import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

type MedicineDataType = {
  [key: string]: {
    dates: string[];
    added: number[];
    given: number[];
    totalRemaining: number;
  };
};

const medicineData: MedicineDataType = {
  Paracetamol: {
    dates: ["2025-08-01", "2025-08-05", "2025-08-10"],
    added: [50, 30, 20],
    given: [10, 5, 8],
    totalRemaining: 77,
  },
  Ibuprofen: {
    dates: ["2025-08-02", "2025-08-06", "2025-08-11"],
    added: [40, 20, 10],
    given: [5, 10, 5],
    totalRemaining: 50,
  },
  Amoxicillin: {
    dates: ["2025-08-03", "2025-08-07", "2025-08-12"],
    added: [60, 40, 30],
    given: [15, 10, 12],
    totalRemaining: 93,
  },
  asdasd: {
    dates: ["2025-08-03", "2025-08-07", "2025-08-12"],
    added: [60, 40, 30],
    given: [15, 10, 12],
    totalRemaining: 93,
  },
  sdasdas: {
    dates: ["2025-08-03", "2025-08-07", "2025-08-12"],
    added: [60, 40, 30],
    given: [15, 10, 12],
    totalRemaining: 93,
  },
  sd: {
    dates: ["2025-08-03", "2025-08-07", "2025-08-12"],
    added: [60, 40, 30],
    given: [15, 10, 12],
    totalRemaining: 93,
  },
  zxc: {
    dates: ["2025-08-03", "2025-08-07", "2025-08-12"],
    added: [60, 40, 30],
    given: [15, 10, 12],
    totalRemaining: 93,
  },
  zx: {
    dates: ["2025-08-03", "2025-08-07", "2025-08-12"],
    added: [60, 40, 30],
    given: [15, 10, 12],
    totalRemaining: 93,
  },
  c: {
    dates: ["2025-08-03", "2025-08-07", "2025-08-12"],
    added: [60, 40, 30],
    given: [15, 10, 12],
    totalRemaining: 93,
  },
  a: {
    dates: ["2025-08-03", "2025-08-07", "2025-08-12"],
    added: [60, 40, 30],
    given: [15, 10, 12],
    totalRemaining: 93,
  },
};

export default function MedicineInventoryDashboard() {
  const [selectedMedicine, setSelectedMedicine] = useState("Paracetamol");

  // Bar Chart Data (Overall Stock In vs Stock Out)
  const barData = {
    labels: Object.keys(medicineData),
    datasets: [
      {
        label: "Stock In",
        data: Object.values(medicineData).map((m) =>
          m.added.reduce((a, b) => a + b, 0)
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Stock Out",
        data: Object.values(medicineData).map((m) =>
          m.given.reduce((a, b) => a + b, 0)
        ),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  // Line Chart Data (Selected Medicine Over Time)
  const { dates, added, given } = medicineData[selectedMedicine];
  const lineData = {
    labels: dates,
    datasets: [
      {
        label: "Stock In",
        data: added,
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
      {
        label: "Stock Out",
        data: given,
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
    ],
  };

  // Pie Chart Data (Current Stock Distribution)
  const pieData = {
    labels: Object.keys(medicineData),
    datasets: [
      {
        data: Object.values(medicineData).map((m) => m.totalRemaining),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Bar Chart */}
      <div style={{ width: "80%", marginBottom: 40 }}>
        <h3>Overall Stock Summary</h3>
        <Bar data={barData} />
      </div>

      {/* Medicine Selector */}
      <select
        value={selectedMedicine}
        onChange={(e) => setSelectedMedicine(e.target.value)}
        style={{ marginBottom: 20 }}
      >
        {Object.keys(medicineData).map((med) => (
          <option key={med} value={med}>
            {med}
          </option>
        ))}
      </select>

      {/* Line Chart */}
      <div className="flex" style={{ marginBottom: 40 }}>
        <div style={{ width: "70%" }}>
          <h3>{selectedMedicine} Stock Movement Over Time</h3>
          <Line data={lineData} />
        </div>

        <div style={{ width: "30%" }}>
          <h3>Current Stock Distribution</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}
