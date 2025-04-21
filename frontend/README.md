🍽️ Digital Diner
A full-stack restaurant ordering system built with the MERN stack (MongoDB + Express + React + Node.js) and PostgreSQL. Customers can browse a dynamic menu, place orders, and view their order history using their phone number.

My website Link :https://digitial-diner.netlify.app/

🚀 Tech Stack
Frontend: React, Axios, CSS

Backend: Node.js, Express

Database:

MongoDB – Stores menu items

PostgreSQL – Stores customer orders

Others: CORS, dotenv, pg, mongoose

📦 Project Structure

digital-diner/
├── backend/
│ ├── config/
│ │ └── postgres.js # PostgreSQL connection pool
│ ├── models/ # (optional) Mongoose schemas
│ ├── routes/
│ │ └── api.js # Main API routes
│ ├── server.js # Entry point for backend
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ └── OrderConfirm.jsx
│ │ │ └── OrderHistory.jsx
│ │ └── context/ # Cart context
│ ├── public/
│ └── App.js
│
├── README.md
└── package.json
📥 Installation

1. Clone the repo
   bash
   Copy code
   git clone https://github.com/Shankars57/Digital_Diner
   cd digital-diner
2. Setup MongoDB & PostgreSQL
   MongoDB should run on MongoDB atlas :
   --> mongodb+srv://shankar:admin@cluster0.liimvo6.mongodb.net/
   PostgreSQL running on Neon serverless postgreSQL:
   -->postgresql:neondb_owner:npg_UxmRH2nVX3SA@ep-old-credit-a4kfodwg-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require

Create a PostgreSQL database named digital_diner and a table:

sql
Copy code
CREATE TABLE orders (
id SERIAL PRIMARY KEY,
customer_name TEXT,
phone_number TEXT,
email TEXT,
address JSONB,
items JSONB,
total NUMERIC
); 3. Backend Setup
bash
Copy code
cd backend
npm install
node server.js 4. Frontend Setup
bash
Copy code
cd frontend
npm install
npm start
🧪 API Endpoints
POST /api/orders
Place a new order.

Request Body:

json
Copy code
{
"customerName": "John Doe",
"phoneNumber": "1234567890",
"email": "john@example.com",
"address": {
"street": "123 Main St",
"city": "City",
"state": "State",
"zip": "12345",
"country": "Country"
},
"items": [
{ "itemId": "abc123", "name": "Burger", "price": 10, "quantity": 2 }
],
"total": 22
}
GET /api/orders/:phone
Fetch order history using a phone number.

Response:

json
Copy code
[
{
"customer_name": "John Doe",
"phone_number": "1234567890",
"items": [...],
"total": 22
}
]
✅ Features
🧾 Place orders with full customer and cart data

📜 View order history by phone number

🛒 Dynamic cart context using React

🗂 Data separation: MongoDB for menu, PostgreSQL for orders

💡 Future Improvements
Admin dashboard for order management

Email/SMS confirmation

Payment integration (Stripe or Razorpay)

Responsive mobile UI

🧑‍💻 Author
Made with ❤️ by Bonam.Chandra Durga Gowri Shankar
