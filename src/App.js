import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [businessName, setBusinessName] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [accountingProvider, setAccountingProvider] = useState('xero');
  const [preAssessment, setPreAssessment] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      businessName,
      loanAmount,
      accountingProvider,
    };

    try {
      const response = await fetch('/submit_application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResponseMessage(data.message);
      setPreAssessment(data.data.preAssessment);
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const handleRequestBalanceSheet = async () => {
    try {
      const response = await fetch('/request_balance_sheet');
      const data = await response.json();
      alert("Balance Sheet Data: " + JSON.stringify(data.balanceSheet));
    } catch (error) {
      console.error('Error requesting balance sheet:', error);
    }
  };

  return (
    <div className="container">
      <h1>Business Loan Application</h1>
      <form onSubmit={handleSubmit}>
        <h2>Fill Business Details</h2>
        <label htmlFor="businessName">Business Name</label>
        <input type="text" id="businessName" name="businessName" required />

        <h2>Loan Amount</h2>
        <label htmlFor="loanAmount">Loan Amount</label>
        <input
          type="number"
          id="loanAmount"
          name="loanAmount"
          required
        />

        <h2>Select Accounting Provider</h2>
        <label htmlFor="accountingProvider">Accounting Provider</label>
        <select
          id="accountingProvider"
          name="accountingProvider"
          onChange={(e) => setAccountingProvider(e.target.value)}
        >
          <option value="xero">Xero</option>
          <option value="myob">MYOB</option>
        </select>

        <button type="submit">Submit Application</button>
        <div className="response-message">{responseMessage}</div>
        {preAssessment !== null && (
          <div className="pre-assessment">
            Pre-assessment: {preAssessment}%
          </div>
        )}
      </form>

      <button type="button" onClick={handleRequestBalanceSheet}>
        Request Balance Sheet
      </button>
    </div>
  );
};

export default App;
