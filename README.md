React Base Shad CN Template
Getting Started
Prerequisites
Node.js: Version 20+. You can download and install it from nodejs.org.
Installing
To set up the project on your local environment, follow these steps:
Clone the Repository
First, you need to clone the repository.
nvm (Node Version Manager): If the required Node version 20+ is already installed and active, you can skip this step else you can use nvm (Node Version Manager). Here's how to use it:
Switch Node Version: If the required Node version is already installed, run:
nvm use
Install Node Version: If the required Node version isn’t installed, you can install it by running:
nvm install
Tip: If you don't have nvm installed, you can install it by following the instructions on nvm-sh/nvm.

Alternatively, you can update Node.js directly by downloading the latest version from the official website: nodejs.org.
Install the necessary dependencies using yarn
npm install
Run the Development Server
npm run dev
The app will typically be available at http://localhost:3000, but check the terminal output for the exact URL.

NOTE: : If you want to change the server's port number, you can do so by creating a .env file at the root level of the project and update the PORT field (check .env.template for reference)
PORT=<New Port>
Format the Code
npm run prettier:fix
Lint the Code
npm run lint
To Fix Lint errors
npm run lint:fix
Build the Project
npm run build
This command will generate the optimized production build in the dist directory.
Preview the build
npm run preview
Setup Husky (If pre-commit hooks are not working)
npm run prepare