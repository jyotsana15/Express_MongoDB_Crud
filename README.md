# 🚀 Express + MongoDB CRUD Application

A robust RESTful API built with **Node.js**, **Express**, and **MongoDB**. This application demonstrates full Create, Read, Update, and Delete (CRUD) operations on an `Item` resource, featuring data validation, error handling, and a structured project architecture.

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (using [Mongoose](https://mongoosejs.com/) ORM)
- **Utilities**:
  - `dotenv` for environment configuration
  - `cors` for Cross-Origin Resource Sharing
  - `axios` for API testing script

## 📂 Project Structure

```
├── config.env          # Environment variables (PORT, MONGODB_URI)
├── models/             # Mongoose schemas
│   └── Item.js         # Item schema definition
├── public/             # Static files (HTML/CSS/JS)
├── routes/             # API route definitions
│   └── items.js        # CRUD routes for Items
├── server.js           # Entry point, App configuration
└── test-api.js         # Script to test API endpoints
```

## ⚙️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Express_MongoDB_Crud
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file or use `config.env` and update the values:
    ```ini
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/crud_app
    ```

4.  **Start the Server:**
    ```bash
    # Run in development mode (with nodemon)
    npm run dev

    # Run in production mode
    npm start
    ```
    The server typically runs on `http://localhost:3000`.

## 📡 API Endpoints

The API is mounted at `/api/items`.

| Method | Endpoint | Description | Request Body (JSON) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/items` | Retrieve all items | N/A |
| **GET** | `/api/items/:id` | Retrieve a single item by ID | N/A |
| **POST** | `/api/items` | Create a new item | `{ "name": "...", "price": 100, ... }` |
| **PUT** | `/api/items/:id` | Update an existing item | `{ "price": 150, ... }` |
| **DELETE**| `/api/items/:id` | Delete an item | N/A |

### 📦 Data Model (Item)

The `Item` schema enforces the following structure:

- **name** (String, required): Max 100 chars.
- **description** (String, required): Max 500 chars.
- **price** (Number, required): Must be non-negative.
- **category** (String, required): One of `['Electronics', 'Clothing', 'Books', 'Home', 'Other']`.
- **inStock** (Boolean): Defaults to `true`.
- *(Timestamps `createdAt` and `updatedAt` are automatically managed)*

## 🧪 Testing the API

A test script is included to verify all CRUD operations automatically.

To run the test:
```bash
node test-api.js
```
This script will:
1. Create a test item ("Test Laptop").
2. Fetch all items to verify the addition.
3. Fetch the specific item by ID.
4. Update the item's price.
5. Delete the item and verify it's gone.
