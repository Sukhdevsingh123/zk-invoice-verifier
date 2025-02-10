import React, { useEffect } from "react";
import axios from "axios";
const Data = () => {
  useEffect(() => {
    axios.get("http://localhost:3000/data").then((data) => console.log(data));
  }, []);
  return (
    <div>
      <h1>Get Data</h1>
    </div>
  );
};

export default Data;
