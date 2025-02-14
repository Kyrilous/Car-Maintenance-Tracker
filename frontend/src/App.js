import React, { useState, useEffect } from "react";
import AddMaintenance from "./components/AddMaintenance";
import MaintenanceList from "./components/MaintenanceList";

function App() {
    const [records, setRecords] = useState([]);

    const fetchRecords = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/records");
            const data = await response.json();
            setRecords(data);
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <div>
            <h1>Car Maintenance Tracker</h1>
            <AddMaintenance onAdd={fetchRecords} />
            <MaintenanceList records={records} />
        </div>
    );
}

export default App;
