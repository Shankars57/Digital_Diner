🍽️ Digital Diner
A full-stack restaurant ordering system built with the MERN stack (MongoDB + Express + React + Node.js) and PostgreSQL. Customers can browse a dynamic menu, add items to a cart, place orders, and view their order history using their phone number.

🚀 Tech Stack
Frontend: React, Axios, CSS

Backend: Node.js, Express

Database:

MongoDB – Stores menu items

PostgreSQL – Stores customer orders

Others: CORS, dotenv, pg, mongoose

📦 Project Structure
php
Copy
Edit
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
│ │ │ ├── OrderConfirm.jsx # Order placement form
│ │ │ ├── OrderHistory.jsx # Order history by phone
│ │ │ └── Menu.jsx # Displays dynamic menu
│ │ ├── context/
│ │ │ └── ContextProvider.jsx # Cart context logic
│ │ └── App.js
│ ├── public/
├── README.md
└── package.json
📥 Installation

1. Clone the Repo
   bash
   Copy
   Edit
   git clone https://github.com/your-username/digital-diner.git
   cd digital-diner
2. Setup MongoDB & PostgreSQL
   MongoDB should run locally on:
   mongodb://localhost:27017/digital-diner

PostgreSQL:

sql
Copy
Edit
CREATE DATABASE digital_diner;

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
Copy
Edit
cd backend
npm install
node server.js 4. Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm start
🧪 API Endpoints
✅ POST /api/orders – Place a new order
Request Body:

json
Copy
Edit
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
{
"itemId": "abc123",
"name": "Burger",
"price": 10,
"quantity": 2
}
],
"total": 22
}
✅ GET /api/orders/:phone – Fetch order history by phone number
Response:

json
Copy
Edit
[
{
"customer_name": "John Doe",
"phone_number": "1234567890",
"items": [...],
"total": 22
}
]
🧾 Frontend Features
🍔 Dynamic Menu (MongoDB)
Menu items are fetched from MongoDB using Axios on component mount.

Displayed via the Menu.jsx component.

Each item has a name, image, price, and "Add to Cart" button.

🛒 Cart Functionality (Context API)
Uses ContextProvider.jsx for managing cart state.

Cart updates are available across all pages.

Calculates subtotal, delivery fee, and total dynamically.

📦 Order Placement (OrderConfirm.jsx)
Customers fill in:

Name, Email, Phone

Address

Cart items and total are submitted to the backend via Axios.

Success/failure message shown and redirected to order history after submission.

📜 Order History (OrderHistory.jsx)
Customers enter their phone number to fetch past orders.

Results are displayed with item breakdown and total cost.

Uses Axios to hit the /api/orders/:phone endpoint.

✅ Key Features
🧾 Place orders with full customer and cart data

📜 View order history by phone number

🛒 Dynamic cart context using React

🗂 Data separation: MongoDB for menu, PostgreSQL for orders

💡 Future Improvements
Admin dashboard for order management

Email/SMS order confirmation

Payment integration (Stripe or Razorpay)

Responsive mobile UI

🧑‍💻 Author
Made with ❤️ by Bonam.Chandra Durga Gowri Shankar
