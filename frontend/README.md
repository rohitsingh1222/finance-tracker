# 💰 Personal Finance Tracker (MERN)

A simple and responsive **Finance Tracker** app built with the MERN stack (MongoDB, Express, React, Node.js).  
It allows users to **add, edit, delete, and view transactions** with categories, dates, and amounts.  
Authentication (Signup/Login) can also be added.

---

## 🚀 Features
- Add, Edit, and Delete Transactions
- View Balance, Income, and Expenses summary
- Toast notifications for feedback
- Responsive UI
- MongoDB database integration
- Organized with routes and API layer

---

## 🛠️ Tech Stack
- **Frontend:** React, Axios, React Router, React Toastify
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Other:** dotenv, CORS

---

## 📂 Project Structure

finance-tracker/
│
├── backend/ # Express + MongoDB API
│ ├── server.js # Main backend entry
│ ├── models/ # Mongoose models
│ └── routes/ # API routes
│
├── frontend/ # React frontend
│ ├── src/
│ │ ├── pages/ # Home, AddEdit, DeleteConfirm
│ │ ├── components/ # TransactionList, TransactionForm
│ │ ├── api.js # Axios API setup
│ │ └── App.js # Main App
│ ├── public/
│ └── package.json
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/finance-tracker.git
cd finance-tracker


Backend Setup
cd backend
npm install

Create a .env file:
PORT=4001
MONGO_URI=mongodb://127.0.0.1:27017/finance

Run backend:
npm start

Frontend Setup
cd frontend
npm install
npm start


API Endpoints
Method	Endpoint	Description
GET	/api/transactions	Get all transactions
POST	/api/transactions	Add new transaction
GET	/api/transactions/:id	Get single transaction
PUT	/api/transactions/:id	Update transaction
DELETE	/api/transactions/:id	Delete transaction


---

👉 You can just **copy this into a `README.md` file** in your project root (`finance-tracker/README.md`).  

