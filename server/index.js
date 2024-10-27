const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const ExpenseRouter = require('./Routes/ExpenseRouter');
const ensureAuthenticated = require('./Middlewares/Auth');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const ExcelJS = require('exceljs');
const UserModel = require('./Models/User')

async function getTransactions() {
    try {
        const transactions = await UserModel.expenses.find(); // Fetch all transactions
        console.log(transactions);
    
        return transactions;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error; // Re-throw the error for handling later
    }
}


function createPDF(UserModel) {
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream('transactions.pdf');

    doc.pipe(writeStream);

    doc.fontSize(25).text('Transaction Report', { align: 'center' });
    doc.moveDown();

    UserModel.forEach(expenses => {
        doc.fontSize(12).text(`Date: ${expenses.createdAt}, Amount: ${expenses.amount}, Description: ${expenses.text}`);
        doc.moveDown();
    });

    doc.end();
}
async function createExcel(UserModel) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Transactions');

    worksheet.columns = [
        { header: 'Date', key: 'createdAt', width: 15 },
        { header: 'Amount', key: 'amount', width: 10 },
        { header: 'Description', key: 'text', width: 30 },
    ];

    UserModel.forEach(expenses => {
        worksheet.addRow({
            text: expenses.text,
            amount: expenses.amount,
            date: expenses.createdAt,
        });
    });

    await workbook.xlsx.writeFile('transactions.xlsx');
}

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/expenses', ensureAuthenticated, ExpenseRouter)
app.get('/download/excel', async (req, res) => {
    // Fetch transactions from your database
    const transactions = getTransactions(); // Your method to get transactions
    await createExcel(transactions);

    res.download('transactions.xlsx');
});
app.get('/download/pdf', (req, res) => {
    // Fetch transactions from your database
    const transactions = getTransactions(); // Your method to get transactions
    createPDF(transactions);

    res.download('transactions.pdf');
});




app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})