Google Drive Integration with Node.js

This lightweight solution allows you to interact with Google Drive using Node.js and Express. It provides functionality to authenticate, list files, upload files, download files, and delete files from Google Drive. It’s super easy to set up and integrates seamlessly with your Node.js backend.

Features

    Smooth Authentication: Uses OAuth 2.0 to securely authenticate with Google Drive.

    File Listing: Fetch and display files from your Google Drive.

    File Upload: Upload files (e.g., images) to Google Drive.

    File Download: Download files (e.g., images) from Google Drive and save them locally.

    File Deletion: Delete files from Google Drive by their ID.

    Express Router: Easily integrate the functionality into your Express app.

How to get started:

  Install Node.js: Make sure you have Node.js installed on your machine. You can download it from nodejs.org.

  Clone the Repository:
    git@github.com:shafqat-baloch786/CRUD-on-Google-drive-using-Node.js.git

  Install Dependencies:
  npm install express googleapis @google-cloud/local-auth mime-types

  Set Up Google API Credentials:
  
        1. Go to the Google Cloud Console.

        2. Create a new project and enable the Google Drive API.

        3. Download the credentials.json file and place it in the root of your project.

  Run the Application:
    node app.js

  Access the Application:
    Open your browser and navigate to http://localhost:3000 to see the home page.
