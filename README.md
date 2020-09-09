# Image Gallery App
[![Netlify Status](https://api.netlify.com/api/v1/badges/58b30765-5c4e-4e99-a1fe-ded2b4fd4b49/deploy-status)](https://app.netlify.com/sites/wme-image-gallery/deploys)

An application used to search and save images.

<p align="center"> 
    <img src="https://github.com/wmemorgan/image-gallery-app-frontend/blob/master/public/assets/screenshot.png">
</p>

## Features
- Search images using my [custom search engine](https://github.com/wmemorgan/image-search-api-v2)
- Navigate through search results
- Select and save an image to your library
- View and delete images in your library

## Application Arichtecture
The Image Gallery App is made up of 3 modular components:

- [**Image Gallery Backend**](#image-gallery-api): api which manages user security and image library
- [**Image Search Engine**](https://github.com/wmemorgan/image-search-api-v2): custom search api which uses the Google Search Engine to query images
- [**Image Gallery Client**](https://github.com/wmemorgan/image-gallery-app-frontend): frontend which performs user registration, image searches, and library updates

## Demo Site
- [Image Gallery App](https://wme-image-gallery.netlify.app/)
- [Source Code](https://github.com/wmemorgan/image-gallery-app-frontend)

## Installation
- Clone this repo to your local machine using `https://github.com/wmemorgan/image-gallery-app-frontend.git`

## Setup
Go to your repo directory and enter the following commands to install project dependencies
```bash
$ yarn install
```

## Usage
Inside your repo directory run the REACT app locally on your machine
```bash
$ yarn run start
```

## License
[MIT](https://github.com/wmemorgan/image-gallery-app-frontend/blob/master/LICENSE)


