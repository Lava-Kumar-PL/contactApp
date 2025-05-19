# Online Contact App

An online contact management application built using **ExpressJS**. This app allows users to manage their contacts efficiently with features like adding, editing, and deleting contact information.

## 🚀 Features

- Add new contacts with details (name, phone number, email, etc.).
- Update existing contact information.
- Delete contacts.
- View all saved contacts.
- Search for contacts.

## 🛠️ Tech Stack

- **Backend:** Node.js, ExpressJS
- **Database:** MongoDB (via Mongoose)
- **Frontend:** handlebars
- **API:** RESTful API for contact management

## 📂 Project Structure

```
onlineContactApp
├── config/          # Configuration files (e.g., database connection)
├── controllers/     # Route controllers for different functionalities
├── models/          # Mongoose models
├── public/          # Static files (CSS, JavaScript)
├── routes/          # Application routes
├── views/           # EJS templates
├── .env             # Environment variables
└── server.js        # Main entry point of the application
```

## 💻 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Lava-Kumar-PL/contactApp.git
   cd contactApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory:
     ```
     PORT=3000
     MONGO_URI=mongodb://localhost:27017/contactApp
     JWT_SECRET=yourSecretKey
     ```

4. **Run the application:**
   ```bash
   npm start
   ```
   - Open your browser and visit `http://localhost:3000`.

## 📝 Usage

1. Register and log in to your account.
2. Add a new contact with details like name, phone number, and email.
3. Update or delete contacts as needed.
4. View your contact list in an organized format.

## 📦 Dependencies

- express
- mongoose
- body-parser
- dotenv
- handlebars
- bcrypt
- jsonwebtoken


## 🧪 Testing

- Run tests using:
  ```bash
  npm test
  ```
- Test coverage includes basic CRUD operations and authentication.

## 💡 Future Enhancements

- Add contact import/export feature.
- Integrate with third-party APIs for contact syncing.
- Implement data analytics for usage statistics.



---

Feel free to raise any issues or contribute to the project. Happy coding!
