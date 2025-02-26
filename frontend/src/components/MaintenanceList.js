import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";

function MaintenanceList(){
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const userId = localStorage.getItem('user_id');
      console.log("✅ Fetching records for user ID:", userId);
      fetch(`http://127.0.0.1:5000/records?user_id=${userId}`)
        .then((response) => {
            if(!response.ok){
                throw new Error("Failed to fetch data from database");
            }
            return response.json();
        })
        .then((data) => {
            setRecords(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error.message);
            setLoading(false);
        });
    }, []) //Runs when the component mounts

    if(loading){
        return <p>Loading Records...</p>
    }

    if(error){
        return <p style={{color: "red"}}> Error: {error} </p>
    }

    const deleteRecord = async (id) => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/records/${id}`, {
          
          method: "DELETE",
        });

        if(response.ok){
          setRecords(records.filter(record => record.id !== id)); // Remove from UI
        }else{
          console.error("Failed to delete record");
        }
      }catch (error) {
        console.error("Error deleting record", error);
      }
    };
    


    //UI layout
    return (
        <Box sx={{ maxWidth: "600px", margin: "auto", marginTop: "20px" }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Maintenance History
          </Typography>
      
          {records.length === 0 ? (
            <Typography color="textSecondary">No records found.</Typography>
          ) : (
            records.map((record, index) => (
              <Card key={record.id} sx={{ marginBottom: "10px", variant:"outlined" ,padding: "10px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {record.service_type}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    📅 {record.date} | 🚗 {record.mileage} miles
                  </Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => deleteRecord(record.id)}
                >
                  🗑️
                </Button>
              </Card>
            ))
          )}
        </Box>
      );
}
export default MaintenanceList;