import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    console.log("test");
  }, []);

  return <div>Dashboards</div>;
};

export default Dashboard;
