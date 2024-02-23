"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";

export default function App() {
  const [locations, setLocations] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchLocations();
  }, []);

  async function fetchLocations() {
    try {
      const response = await fetch(
        "https://efbdpjvnpulvomzjmpfz.supabase.co/functions/v1/rest-interview"
      );
      const { locations } = await response.json();
      setLocations(locations);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.loc}>
      <h1>Find Location</h1>
      <h3> Welcome to the home page!</h3>
      <input
        type="text"
        placeholder="Enter location name"
        className={styles.search}
        value={filter}
        onChange={(text) => setFilter(text.target.value)}
      />
      <table className={styles.table}
      border={1}
      cellSpacing={0}
      cellPadding={14}
    >
        <thead>
          <tr>
            <th className="text-md  border border-slate-600">No</th>
            <th className="text-md border border-slate-600">Name</th>
            <th className="text-md  border border-slate-600">Address</th>
            <th className="text-md border border-slate-600">Is Permanent</th>
          </tr>
        </thead>
        <tbody>
          {filteredLocations.map((location, index) => (
            <tr key={index}>
              <td> {index+1}</td>
              <td>{location.name}</td>
              <td>{location.address}</td>
              <td>{location.isPermanent ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}