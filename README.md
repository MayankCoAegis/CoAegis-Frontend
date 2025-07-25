Of course, here is a README file for your React application.

-----

# CoAegis Frontend 🚀

This repository contains the source code for the CoAegis application's frontend, built using React.

-----

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### **Prerequisites**

Make sure you have Node.js and npm installed on your system.

  * **Node.js**: [https://nodejs.org/](https://nodejs.org/)
  * **npm**: (comes with Node.js)

### **Local Setup**

1.  **Clone the repository:**
    Open your terminal and run the following command.

    ```bash
    git clone https://github.com/MayankCoAegis/CoAegis-Frontend.git
    cd CoAegis-Frontend
    ```

2.  **Setup Environment Variables:**
    Create a `.env` file in the project's root directory. You can copy the example file to get started.

    ```bash
    cp .env.example .env
    ```

    Open the `.env` file and add the URL for your backend API.

    ```
    VITE_BACKEND_URL = "http://your-backend-api-url.com"
    ```

3.  **Install Dependencies:**

    ```bash
    npm install
    ```

4.  **Run the Application:**

    ```bash
    npm run dev
    ```

    The application should now be running on `http://localhost:5173`.

-----

## Deployment 🌐

The application is hosted on Railway and is set up for continuous deployment. Any changes pushed to the `main` branch will automatically trigger a new build and deployment.

To make changes to the live application:

1.  **Make your changes** in the code.

2.  **Commit and push** the changes to the `main` branch.

    ```bash
    git add .
    git commit -m "your commit message"
    git push origin main
    ```

-----

## Folder Structure

Here is an overview of the project's directory structure.

```
CoAegis-Frontend/
├── public/           # Static assets like images and logos
├── src/              # Main source code directory
│   ├── api/          # Functions for API calls to the backend
│   ├── components/   # Reusable React components (Chat, Loader, etc.)
│   ├── context/      # Global state management (user details, chat history)
│   ├── pages/        # Page components (Home, Login, Register)
│   └── routes/       # Protected routes and authentication logic
├── .env.example      # Example environment variables file
└── package.json      # Project dependencies and scripts
```
