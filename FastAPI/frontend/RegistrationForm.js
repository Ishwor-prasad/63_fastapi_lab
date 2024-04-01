import React, { useState } from 'react';
import './RegistrationForm.css';

const InputField = ({ id, value, onChange, placeholder, type = 'text', required = false }) => (
  <div className="form-group">
    <label htmlFor={id}>{placeholder}</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  </div>
);

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (username.length <= 5) {
      alert('Username must be more than 5 characters.');
      return;
    }
    if (password.length <= 6) {
      alert('Password must be more than 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (!email.includes('@')) {
      alert('Invalid email address.');
      return;
    }
    if (phoneNumber.length !== 11 || isNaN(phoneNumber)) {
      alert('Phone number must have exactly 11 digits.');
      return;
    }

    // Construct the data object to send to the backend
    const userData = {
      username: username,
      email: email,
      password: password,
      phone_number: phoneNumber
    };

    // Log user data to console
    console.log('User Info:', userData);

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        alert('Registration successful');
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.detail}`);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <InputField
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <InputField
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <InputField
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <InputField
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
        />
        <InputField
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
