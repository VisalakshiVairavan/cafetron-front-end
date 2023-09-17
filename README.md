# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Demo 
 
 The application is hosted in demo link : [App](https://cafetron-front-end.vercel.app/)
## Available Scripts

In the project directory, you can run:

Copy .env.sample into .env
 
### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



### Docker 

Alternatively this app can be build and run using docker in local after .env.sample is copied over to .env file 

```docker build -f Dockerfile -t client .```

```docker run -it -p 3000:3000 client```