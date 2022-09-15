# Crypto Exchange

Full stack Crypto Exchange that lets you practice cryptocurrency trading with fake money!

<div align="center">

[Visit Crypto Exchange](https://rcamach7.github.io/crypto-exchange/#/)

</div>

![project_demo](crypto_demo.gif)

## Key Features

- Users can view, purchase and sell crypto coins at real-time market prices. Crypto data can be filtered, sorted, and searched by user.
- Utilized Redux to manage application state for an easier and more predictable access across application.
- Client built with React, using typescript. Utilized MUI Components, styled components, and SCSS for a responsive UI.
- Back end server built with Node, Express, and MongoDB, using an external API to obtain real-time crypto prices.
- Implemented user authentication via JWT, data validation/sanitation on client and server, and error handling on API calls.

#### Built Using:

<p align="center">
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1652491477/main-portfolio/tech-skills/typescript_v3ztli.png" width="40" height="40" alt="Typescript" />
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1648514838/main-portfolio/animated-logos/react-anim_jqtsxo.gif" width="40" height="40" alt="React" />
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1656116643/main-portfolio/tech-skills/redux_rbbutz.png" width="40" height="40" alt="Redux" />
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1646101318/main-portfolio/tech-skills/node_lzpvq6.png" width="40" height="40" alt="Node" />
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1647634998/main-portfolio/tech-skills/express_ibtfvl.png" width="40" height="40" alt="Express" />
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1646101239/main-portfolio/tech-skills/mongodb_r1xhyn.png" width="40" height="40" alt="MongoDB" />
</p>

react, typescript, redux, mongoose, MUI components, styled-components, cloudinary, animate.css, axios interceptors, react-router-dom, sass, useEffect, useState, Context API, custom hooks, hash router, promise based functions, async/await, custom API, moment etc...

#### How to install and run?

```bash
# Clone this repository
 git clone https://github.com/rcamach7/crypto-exchange
 cd crypto-exchange

#  Run local server
 cd api
 npm install
 npm run serverstart

#  Run client using local server
cd ../client
npm install
npm run use-local-server
```

Server would need the following environments and variables provided to run successfully:

- MONGO_DB, SECRET_STRING, CLOUDINARY_CLOUD, CLOUDINARY_API, CLOUDINARY_SECRET, NEWSDATA_TOKEN, API_SERVER_URL
