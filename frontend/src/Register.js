import React, { useState } from "react";

function Register({ onSwitch }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();

    await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    alert("Registration successful");
    onSwitch();
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})} /><br/>
      <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})} /><br/>
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password:e.target.value})} /><br/>
      <button>Register</button>
      <p onClick={onSwitch} style={{cursor:"pointer"}}>Already have account? Login</p>
    </form>
  );
}

export default Register;
