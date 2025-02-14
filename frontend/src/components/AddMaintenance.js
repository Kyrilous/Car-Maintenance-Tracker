import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";



function AddMaintenance({ onAdd }){
    const [serviceType, setServiceType] = useState("");
    const [mileage, setMileage] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!serviceType || !mileage || !date) return;
    
        const newRecord = { serviceType, mileage, date };
    
        try {
            const response = await fetch("http://127.0.0.1:5000/add_record", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newRecord),
            });
    
            if (!response.ok) {
                throw new Error("Failed to add record");
            }
    
            const data = await response.json();
            console.log("Record Added:", data);
    
            setMileage("");
            setDate("");
            setServiceType("");
    
            // Re-fetch updated records
            onAdd();
            
        } catch (error) {
            console.error("Error:", error);
        }
    };
    


    return (
       <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2, 
    width: "100%",
    maxWidth: "400px", 
    margin: "auto",
  }}
>
  {/* Service Type Dropdown */}
  <TextField
    select
    fullWidth
    label="Service Type"
    value={serviceType}
    onChange={(e) => setServiceType(e.target.value)}
    variant="outlined"
  >
    <MenuItem value="Oil Change">Oil Change</MenuItem>
    <MenuItem value="Brake Pads">Brake Pads</MenuItem>
    <MenuItem value="Tire Rotation">Tire Rotation</MenuItem>
  </TextField>

  {/* Mileage Input */}
  <TextField
    fullWidth
    type="number"
    label="Mileage"
    value={mileage}
    onChange={(e) => setMileage(e.target.value)}
    variant="outlined"
  />

  {/* Date Input */}
  <TextField
    fullWidth
    type="date"
    label="Date"
    InputLabelProps={{ shrink: true }}
    value={date}
    onChange={(e) => setDate(e.target.value)}
    variant="outlined"
  />

  {/* Submit Button */}
  <Button
    variant="contained"
    color="primary"
    sx={{ width: "100%", fontSize: "16px", padding: "10px", borderRadius: "8px" }}
    onClick={handleSubmit}

  >
    ADD MAINTENANCE RECORD
  </Button>
</Box>
        
      );
        
      
    }

    
    
    export default AddMaintenance;