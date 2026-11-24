# FurniStyle 🛋️

**FurniStyle** is a full-stack furniture e-commerce web application developed using the MERN stack. It provides users with an online platform to explore furniture products, browse categories, add products to their shopping cart, and place orders.

## 🚀 Features

- User Registration and Login
- Email OTP Verification
- Browse Furniture Categories
- View Furniture Products
- Add Products to Cart
- Update Product Quantities
- Buy Now Functionality
- Place and Manage Orders
- View My Orders
- Admin Dashboard
- Admin Product Management
- Admin Order Management
- Email Notifications using Nodemailer
- Contact Us Page
- MongoDB Database Integration

## 🛠️ Technologies Used

**Frontend:**
- React.js
- JavaScript
- HTML5
- CSS3

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB
- Mongoose

**Other Tools & Technologies:**
- Nodemailer
- REST API
- Git & GitHub
- npm

## 📂 Project Structure

```text
FurniStyle/
│
├── client/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   └── package.json
│
└── .gitignore
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Rajratna777/FurniStyle.git
```

### 2. Navigate to the Project

```bash
cd FurniStyle
```

### 3. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the server folder and configure your environment variables:

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
```

Use the exact variable names required by your backend code. Never upload your actual `.env` file or credentials to GitHub.

Start the backend:

```bash
npm start
```

### 4. Setup Frontend

Open another terminal:

```bash
cd client
npm install
```

Start the frontend using the script configured in `client/package.json`:

```bash
npm start
```

## 🔐 Security

- Environment variables are stored in `.env` files.
- Database credentials and email passwords should remain private.
- Sensitive information should never be uploaded to GitHub.

## 👨‍💻 Author

**Rajratna777**

## 🔗 GitHub Repository

[https://github.com/Rajratna777/FurniStyle](https://github.com/Rajratna777/FurniStyle)

---

⭐ If you like this project, consider giving the repository a star!
