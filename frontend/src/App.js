import React, { useState, useEffect } from "react";
import { auth, signOut } from "./firebase";
import Login from "./components/Login";
import AddMaintenance from "./components/AddMaintenance";
import MaintenanceList from "./components/MaintenanceList";

function App() {
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    const storedUserEmail = localStorage.getItem("userEmail");

    if (storedUserId) {
      setUser({ uid: storedUserId, email: storedUserEmail });
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("✅ User logged in:", user.uid);
        setUser(user);
        localStorage.setItem("user_id", user.uid);
        localStorage.setItem("userEmail", user.email);
      } else {
        console.log("❌ No user found, clearing storage.");
        setUser(null);
        localStorage.removeItem("user_id");
        localStorage.removeItem("userEmail");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch records for the logged in user
  const fetchRecords = async () => {
    if (!user || !user.uid) {
      console.log("User ID is missing, skipping API call.");
      return;
    }

    console.log("Fetching records for user ID:", user.uid);

    try {
      const response = await fetch(`http://127.0.0.1:5000/records?user_id=${user.uid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data from database");
      }
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      fetchRecords();
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setRecords([]);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Car Maintenance Tracker</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
          <AddMaintenance user_id={user.uid} onAdd={fetchRecords} />
          <MaintenanceList user_id={user.uid} records={records} />
        </>
      ) : (
        <Login onLogin={setUser} />
      )}
    </div>
  );
}

export default App;
