const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // You can change the port if needed

// Sample balance sheet data
const sheet = [
    {
        "year": 2020,
        "month": 12,
        "profitOrLoss": 250000,
        "assetsValue": 1234
    },
    {
        "year": 2020,
        "month": 11,
        "profitOrLoss": 1150,
        "assetsValue": 5789
    },
    {
        "year": 2020,
        "month": 10,
        "profitOrLoss": 2500,
        "assetsValue": 22345
    },
    {
        "year": 2020,
        "month": 9,
        "profitOrLoss": -187000,
        "assetsValue": 223452
    }
];

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Simulated database
const applications = [];

// Submit application
app.post('/submit_application', (req, res) => {
    const data = req.body;
    // Perform data validation here
    applications.push(data);

    // Calculate pre-assessment value
    const profitMonths = sheet.filter(entry => entry.profitOrLoss > 0).length;
    const totalAssetsValue = sheet.reduce((total, entry) => total + entry.assetsValue, 0);
    const averageAssetsValue = totalAssetsValue / sheet.length;

    if (profitMonths >= 1) {
        data.preAssessment = 60;
    } else if (averageAssetsValue > data.loanAmount) {
        data.preAssessment = 100;
    } else {
        data.preAssessment = 20;
    }

    // Simulate integration with the decision engine
    const decisionResult = { "status": "approved" };
    data.decision = decisionResult;
    res.json({ message: "Application submitted", data });
});

app.get('/request_balance_sheet', (req, res) => {
    res.json({ balanceSheet: sheet });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
