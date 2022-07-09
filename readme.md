# Crypto Exchange

Full stack Crypto Exchange that lets you practice cryptocurrency trading with fake money!

<div align="center">

[Visit Crypto Exchange](https://rcamach7.github.io/crypto-exchange/#/)

</div>

![project_demo](crypto_demo.gif)

<p align="center">
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1652491477/main-portfolio/tech-skills/typescript_v3ztli.png" width="40" height="40" alt="Typescript" />
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1648514838/main-portfolio/animated-logos/react-anim_jqtsxo.gif" width="40" height="40" alt="React" />
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1646101318/main-portfolio/tech-skills/node_lzpvq6.png" width="40" height="40" alt="Node" />
    <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1647634998/main-portfolio/tech-skills/express_ibtfvl.png" width="40" height="40" alt="Express" />
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1646101239/main-portfolio/tech-skills/mongodb_r1xhyn.png" width="40" height="40" alt="MongoDB" />
</p>

## Key Features

- Users can view, purchase and sell crypto coins at real-time market prices. They mau also view their total investment performances, or a breakdown of their individual coin investment(s). When browsing cryptos, they can filter and sort the data displayed to their liking.
- UI built with Typescript + React. Utilized MUI Components, styled components, and SCSS for a responsive UX. Back end server built with Node, Express, and MongoDB, using a 3rd party API to obtain real-time crypto prices.
- Implemented user authentication, data validation/sanitation on client and server, protected routes, custom React hooks, lifecycle hooks, error handling on API calls, and much more.

#### Built Using:

- react, typescript, mongoose, MUI components, styled-components, cloudinary, animate.css, axios interceptors, react-router-dom, sass, useEffect, useState, Context API, custom hooks, hash router, promise based functions, async/await, custom API, moment etc...

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

API server would need the following environments and variables provided to run successfully:

- MONGO_DB, SECRET_STRING, CLOUDINARY_CLOUD, CLOUDINARY_API, CLOUDINARY_SECRET, NEWSDATA_TOKEN

#### To-Do's

> Features

- Add fourth statistic on price history on crypto card.

> Bugs

- Fix dark theme not filling up entire page on News route, leaving a partial white background.
