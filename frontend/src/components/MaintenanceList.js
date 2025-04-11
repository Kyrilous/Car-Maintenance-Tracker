import React from "react";
import { Card, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function MaintenanceList({ records, onDelete, newlyAddedId }) {
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        <b>Maintenance History</b>
      </Typography>
      {records.map((record) => (
        <Card
          key={record.id}
          sx={{
            mb: 2,
            p: 2,
            borderLeft: "5px solid",
            borderColor: "primary.main",
            backgroundColor:
              record.id === newlyAddedId
                ? "success.light"
                : "background.paper",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {record.service_type || record.serviceType}
              </Typography>
              <Typography color="text.secondary">
                📅 {record.date} | 🚗 {record.mileage} miles
              </Typography>
            </Box>
            <IconButton onClick={() => onDelete(record.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>
      ))}
    </Box>
  );
}

export default MaintenanceList;
