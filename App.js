import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    user_id: "",
    college_email_id: "",
    college_roll_number: "",
    numbers: "",
    alphabets: "",
  });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare numbers and alphabets as arrays
    const preparedData = {
      ...formData,
      numbers: formData.numbers.split(",").map(Number),
      alphabets: formData.alphabets.split(","),
    };

    // Send POST request to the API
    try {
      const res = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preparedData),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>User Data Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>College Email ID:</label>
          <input
            type="email"
            name="college_email_id"
            value={formData.college_email_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>College Roll Number:</label>
          <input
            type="text"
            name="college_roll_number"
            value={formData.college_roll_number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Numbers (comma-separated):</label>
          <input
            type="text"
            name="numbers"
            value={formData.numbers}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Alphabets (comma-separated):</label>
          <input
            type="text"
            name="alphabets"
            value={formData.alphabets}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
