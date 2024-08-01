# NodeJS REST API with VueJS Firestore Panel

A NodeJS-based REST API backend server with a VueJS-based Firestore database panel, working separately in correlation.

## Information

This program consists of two separate frontend and backend systems working in correlation; a REST API developed in NodeJS and a database panel developed in VueJS. Firestore/Firebase is used as database and the frontend client accesses the backend server via Axios library to send necessary GET/POST requests to execute CRUD operations on the related data.

The backend server is in the **"nodejs-backend"** folder and the frontend client is in the **"vuejs-frontend"** folder, they can work separately and connect with each other as long as the necessary port & host settings are set correctly in the **".env"** files on both sides.

* **Example usage of the database panel:**

<img title="Database Panel" src="https://github.com/firatkorkmaz/NodeJS-REST-API-VueJS-Firestore-Panel/blob/main/images/Panel.png">

### Backend Server

The backend server has 4 authorization links and 5 data access links for GET/POST requests:

#### Authorization Links:

1. **"/register"** - POST (Used in the Frontend)

A JSON object with "email" and "password" keys should be provided in a POST request to register an account to the Firebase system to access the Firestore database.

3. **"/signin"** - POST (Used in the Frontend)

Any registered account should be used to sign in to the system before using the backend server.

4. **"/signout"** - POST (Used in the Frontend)

Without providing any JSON object, a POST request should be sent to this link to sign out from the backend server. 

5. **"/resetpassword"** - POST (Not used in the Frontend)

A JSON object with "email" data should be provided in a POST request to reset the password of your account.

#### Database Access (CRUD) Links:

1. **"/create"** - POST

A JSON object with "parameter_key", "value" and "description" data should be provided in a POST request to add a new row to the Firestore database.

2. **"/"** - GET

Without providing any JSON object, sending a GET request to the root (home) page of the backend server returns all the rows from the Firestore database in JSON format. 

3. **"/update/id"** - POST

A JSON object with "parameter_key", "value" and "description" data should be provided in a POST request to edit any row in the Firestore database, by specifying the related row id in the link.

4. **"/delete/id"** - POST

Without providing any JSON object, sending a POST request to this link deletes any row in the Firestore database, by specifying the related row id in the link.

### Frontend Client

The frontend client has 4 components for sending the necessary GET/POST requests to the API through the database panel interface:

#### HomePage:

* All the CRUD operations are implemented through this homepage which is accessed by the "/" root address.

* Opening/refreshing this page automatically gets all the rows of data from the Firestore database and shows "Edit"/"Delete" buttons on the right side of each row.

* At the bottom of the displayed rows, there is an additional empty row as input text area with an "ADD" button, which can be used to add new data row to the database.

* All the GET/POST requests are sent with the Authorization Header token, which is obtained in the sign in process and saved in the local storage.

  >> Since the "http-only" option is enabled on the backend side, the frontend client is not allowed to access the cookies directly to get the access-token.

* If the backend system rejects the provided access-token due to the cookie expiration issues, the client is forwarded to the sign in page automatically.

#### SignIn:

* If the local storage does not contain any access-token, the client is automatically forwarded to the SignIn page which is located on the "/signin" link.

* The access-token is obtained in this sign in process through the Axios requests and saved in the local storage, then the client is forwarded to the homepage.

* When the client is forwarded to the homepage after signing in, the Authorization Header is set by using the pre-obtained access-token in the local storage.

* If the local storage already has the access-token while trying to open this "/signin" page, the client is automatically forwarded back to the homepage.  

#### TheHeader:

* This page is always displayed on top of the homepage as a strip, containing both the company logo on the left side and the active session information with its related sign out button on the right side.

#### SignUp:

This page can be accessed any time through the "/signup" address, whether the local storage contains an access-token or not. The client is automatically forwarded to the sign in page after the registration.

### NOTES:

* You need to create your own Firestore database to use, explained in **"Setup & Run"**.

* Check the **".env"** files on both server and client sides for the environmental variables.

* PORT numbers of both frontend and backend systems are assigned in their related **".env"** files.

* GET/POST request links for the backend system are specified in the **".env"** file of frontend system.

* **"vue.config.js"** and the **"eslintConfig"** part of **"package.json"** were modified to resolve various errors.

* **Singleton**, **Adapter** and **Factory** Design Patterns that have been used in the backend system: **"/nodejs-backend/src/controllers/post-controller.js"**

* Function-based route design is also included in the routes file: **"/nodejs-backend/src/routes/index.js"**

#### About ".env" Files:

* In "vuejs-frontend" folder, the **".env"** file contains PORT, HOST and the destination links of the backend server. The HOST address is set to empty string here which results in using the "localhost" by default, it can be changed according to your frontend website address. All the other destination links must be equal to the working REST API backend server links.

* In "nodejs-backend" folder, the **".env"** file contains PORT, HOST (Self-Backend address), ORIGIN (Frontend address) and the Firebase keys to access the Firestore database. The HOST address is set to empty string here which results in using the "localhost" by default, it can be changed according to your backend website address.

#### jsPlayground_#.js Files:

* These files are not directly used on either side, they were created only for coding exercise to build the necessary code structures.

#### Getting JSON Config Data: 

* The Node.js backend server provides JSON config data that is extracted from the current database and sends it to any requesting application as a response, which can be obtained from **"apiwebsite/log"** without any authorization request. The related link for this backend server with the current settings is:

```
http://localhost:8000/log
```

## Setup & Run

### Firestore Database

Firstly you need to create a new Firestore database and integrate it with the backend server by following these steps: 

1. Go to: https://console.firebase.google.com

2. Click: "Get started with a Firebase project"

3. Enter your project name, accept the Firebase terms and click "Continue"

4. Optionally enable "Google Analytics" and click "Create project"

5. Click "Web" icon below the "Get started by adding Firebase to your app" message.

6. Write a nickname of your app that will connect to the database and click "Register app"
   
7. From this page, copy the given data of variables (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId) and paste them to their places in the **"/nodejs-backend/.env"** file.

**Example:**

The given data:

```
const firebaseConfig = {
  apiKey: "apiKey_DATA",
  authDomain: "authDomain_DATA",
  projectId: "projectId_DATA",
  storageBucket: "storageBucket_DATA",
  messagingSenderId: "messagingSenderId_DATA",
  appId: "appId_DATA"
};
```

The related part of the **"/nodejs-backend/.env"** file content after copying this data:

```
FIREBASE_API_KEY             = "apiKey_DATA"
FIREBASE_AUTH_DOMAIN         = "authDomain_DATA"
FIREBASE_PROJECT_ID          = "projectId_DATA"
FIREBASE_STORAGE_BUCKET      = "storageBucket_DATA"
FIREBASE_MESSAGING_SENDER_ID = "messagingSenderId_DATA"
FIREBASE_APP_ID              = "appId_DATA"
```

8. Click "Continue to console"

9. On the new page, click "Authentication" below "Accelerate app development" and then click "Get started"

10. On the next page, click "Email/Password" from "Native providers" below the "Sign-in providers" section, and then enable "Email/Password", click "Save".

11. Click "Users" tab below the "Authentication" title on top of the page, then click "Add user" to register any email of yours with a password.

12. After registering your email, go to "Project settings" by clicking the gear icon near the "Project Overview" title on top-left corner of the page.

13. Now you can also see the previously showed **firebaseConfig** data at the bottom of this page if you missed it on step-7. Here, on top of this page, click "Service accounts"

14. On this page, click "Generate new private key" and get the downloaded JSON file.

15. Change the name of this file to **"FirebaseService.json"** and place it in the **"src"** folder of the backend server: **"/nodejs-backend/src/"**

16. Now you can use your new Firestore database with this API backend server by signing in to your registered account from the frontend panel interface.

### NodeJS Backend:

1. Download and Install NodeJS:\
https://nodejs.org/en/download/package-manager

3. Open CMD/Terminal in the "nodejs-backend" folder and run:

```
npm install express dotenv firebase firebase-admin cookie-parser express-async-handler
```

3. Run this command to start the REST API backend server:

```
node src/app
```

### VueJS Frontend:

1. Open CMD/Terminal and install VueJS by running:

```
npm install -g @vue/cli
```

2. Go to the "vuejs-frontend" path in CMD/Terminal and run (choose "Vue 3" when asked):

```
vue create .
```

```
npm install axios vue-router
```

3. Copy/move the content of CopyBack folder to its parent folder "vuejs-frontend" where you created the Vue 3 project in step-2 and approve replacing files.

4. Run this command to start the frontend panel client:

```
npm run serve
```

You can also run this command to create a production build:

```
npm run build
```

### E-Mail & Password to Sign in:

* When you open the frontend home page, you will be forwarded to the **"/signin"** page automatically.

* Use your registered email and password to sign in for getting access to the database panel.

* You can also register new accounts to your database from the **"/signup"** page.

### FULL PROGRAMS:

The folders with pre-installed libraries can also be downloaded from here:\
https://www.mediafire.com/file/k4x5yyc0qimv61c/REST_API.rar

* Firstly integrate your Firestore database with the backend server by copying your given **firebaseConfig** data into the **"/nodejs-backend/.env"** file and placing your downloaded **FirebaseConfig.json** file in the **"/nodejs-backend/src/"** folder (Explained in: **Setup & Run -> Firestore Database -> Step-7**).

* Then, you can run the server and client directly without installing any library, simply run those commands in each related folder:

#### nodejs-backend:

Run this command to start the REST API backend server:

```
node src/app
```

#### vuejs-frontend:

Run this command to start the frontend panel client:

```
npm run serve
```

You can also run this command to create a production build:

```
npm run build
```

