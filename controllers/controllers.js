const path = require("path");
const fs = require("fs");
const http = require("http");
const process = require("process");
const myFile = path.join(process.cwd(), '/images/laptop.jpg');
console.log(myFile);
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const { json } = require("body-parser");
const SCOPES = [
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.file',
];

// Paths
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
console.log(TOKEN_PATH);
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');


// Loading the saved credentials if exist

async function loadCreds() {
    try {
        console.log("Load creds function is running...");
        // await fs.promises.readFile(TOKEN_PATH, 'utf8');
        const content = await fs.promises.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (error) {
        console.log("An error occured during loading the saved credentiasl...", error);
    }
}

// Function to save the credentials such as token.json etc

async function saveCreds(client) {
    try {
        console.log("Save creds function is running fine...");
        const content = fs.readFileSync(CREDENTIALS_PATH);
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
        let a = await fs.writeFileSync(TOKEN_PATH, payload);
    } catch (error) {
        console.log("An error occured while saving credentials...", error);
    }
}

// Function to complete authorization
async function authorize() {
    try {
        console.log("Authenticate function running....");
        let client = await loadCreds();
        if (client) {
            return client;
        }
        else {
            console.log("First done..");
            client = await authenticate({
                scopes: SCOPES,
                keyfilePath: CREDENTIALS_PATH,
            });
        }
        if (client.credentials) {
            await saveCreds(client);
        }
        return client;

    } catch (error) {
        console.log("An error occured during authentication...");
    }
}

// Function to List names of files from google drive
async function listFiles(authClient) {
    try {
        console.log("List files function is running fine...");
        const drive = google.drive({
            version: 'v3',
            auth: authClient
        });
        const list = await drive.files.list({
            // pageSize: 10,
            fields: 'nextPageToken, files(id, name)'
        });
        const result = list.data.files;
        if (result.length === 0) {
            console.log("No files found...");
        }
        let final = result.map((file) => {
            console.log(`${file.name} (${file.id})`);
            // return file.name;
        });
        const fileName = final.name;
        const fileId = final.id;
        // return allFiles.name;








        // Testing
const mime = require('mime-types');
        const alls = await Promise.all(
            result.map(async (eachOne) => {
                try {
                    console.log(eachOne);
                    const mm = mime.lookup(eachOne);
                    if(mm === "image/jpg" || mm === 'image/png') {

                 
                    const file = await drive.files.get({
                        fileId: eachOne.id,
                        // mimeType: 'image/png',
                        // mimeType: 'application/msword'
                        alt: 'media'
                    });
                }
                    // console.log(file);
                    const Downloaded_files = path.join(__dirname, 'Downloaded files');
                    // await fs.writeFile(Downloaded_files, file.data, 'binary');
                    await fs.writeFile(eachOne.name, file.data, (error) => {
                        console.log("Error...", error);
                    });
                    console.log("Each...", eachOne.name);
                    console.log("File current status...", file.status);
                } catch (error) {
                    console.log("Error...", error);
                }
            })
        );

        // Test ending








        // Upload files to google drive

        async function uploadFiles() {
            try {
                console.log("Upload function is running...");
                const drive = google.drive({
                    version: 'v3',
                    auth: authClient
                });
                // Uploading the actual file
                const data = await drive.files.create({
                    requestBody: {
                        name: 'myFile.jpg',
                        mimeType: 'image/jpg',
                    },
                    media: {
                        mimeType: 'image/jpg',
                        body: fs.createReadStream(myFile),
                    },
                });
            } catch (error) {
                console.log("An error occured while uploading the file...", error);
            }
        }

        // Delete function
async function deleteFile() {
    try {
        console.log("Delete function is running fine...");
        const drive = google.drive({
            version: 'v3',
            auth: authClient
        });

        // Deleting the actual file
        const fileId = '1-LQ_oqiSLIeFj9ckBjHAtk70gaNYhqe3';
        drive.files.delete({ fileId });

    } catch (error) {
        console.log("An error occured while deleting the file...", error);
    }
}
        uploadFiles();
        // deleteFile();
    } catch (error) {
        console.log("An error occurede while listing the files...", error);
    }
}

authorize().then(listFiles);


// Front page
let home = async (request, response) => {
    try {
       response.send("Welcome to home page...");
    } catch (error) {
        console.log("An error occured in home page...", error);
    }
}

module.exports = {
    home,
}
