# Crypto Exchange

Full stack web application that lets you practice cryptocurrency trading with fake money!

![project_demo](crypto-exchange.png)

<div align="center">

[Visit Crypto Exchange](https://rcamach7.github.io/crypto-exchange/#/)

</div>

## Key Features

- Users can view, purchase and sell crypto coins at real-time prices. They can also filter and sort through crypto coins. Profile overview showcases users total investments performances, along with a breakdown of their investment wallet.
- Front end built using Typescript with React. Utilized MUI Components, styled components, and SCSS for a responsive UX. Back end server built with Node, Express, and MongoDB, using a 3rd party API for real-time crypto prices.
- Implemented user authentication, data validation/sanitation on client and server, custom React hooks, lifecycle hooks, error handling on API calls, and much more.

#### Built Using:

- react, typescript, mongoose, MUI components, styled-components, animate.css, axios interceptors, react-router-dom, sass, useEffect, useState, Context API, custom hooks, hash router, promise based functions, async/await, custom API, moment etc...

#### How to install and run?

```bash
 git clone https://github.com/rcamach7/crypto-exchange
 cd crypto-exchange

#  Run local server
 cd api
 npm install
 npm run serverstart

#  Run client
cd ../client
npm install
npm start
```

API server would need the following environment variables provided to run successfully:

- MONGO_DB, SECRET_STRING, PORT

#### To-Do's

- Add ability for user to update:
  - profile picture
  - full name
- Catch any network issues and give that information to user for better User experience.
- Have server calculate average price per coin, on any investment a user makes. We can have that number reflect on client UI, for better user experience.
