# library-api-nestjs-nest

Library REST API with NestJS

## .env.development

You need to generate **.env.development** file in root folder.
It will hold project setup variables like database connection string, port number and etc.

```js
DB_URL = 'mongodb://localhost:27017';
PORT = 3000;
JWT_SECRET = secret_key;

//Cloudinary account
CLOUD_NAME = your_token;
API_KEY = your_api_key;
API_SECRET = your_api_key_secret;

//SendGrid account
SENDGRID_API_KEY = your_sendgrid_api_key;
SENDER_EMAIL = your_sender_email;
```

 ## OLD VERSION is deployed in Heroku - https://the-curious-readers-api.herokuapp.com/api 
