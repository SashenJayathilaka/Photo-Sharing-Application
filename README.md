# Full Stack Photo Sharing Application with React Js

<a href="https://photo-sharingo.netlify.app" target="_blank">![](https://img.shields.io/website-up-down-green-red/http/monip.org.svg)</a>
![](https://img.shields.io/badge/Maintained-Yes-indigo)
![](https://img.shields.io/github/forks/SashenJayathilaka/Photo-Sharing-Application.svg)
![](https://img.shields.io/github/stars/SashenJayathilaka/Photo-Sharing-Application.svg)
![](https://img.shields.io/github/issues/SashenJayathilaka/Photo-Sharing-Application)
![](https://img.shields.io/github/last-commit/SashenJayathilaka/Photo-Sharing-Application)


<!-- Screenshots -->
### :camera: Screenshots

<div align="center">
<a href="https://photo-sharingo.netlify.app"><img width='800rem'  src='https://user-images.githubusercontent.com/99184393/194799568-88bce79a-1a90-4a1a-a6b5-506b8dcd2db3.png' alt='image'/></a>
</div>

## <a href="https://photo-sharingo.netlify.app" target="_blank">LIVE DEMO 💥</a>

![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)
![forthebadge](https://forthebadge.com/images/badges/for-you.svg)
![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)

### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://#/">Javascript</a></li>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://tailwindcss.com/">TailwindCSS</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.sanity.io">Sanity</a></li>
  </ul>
</details>

<br />

<table>
    <tr>
        <td>
<a href="#"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="" width="30" height="30" /></a>
        </td>
                        <td>
<a href="#"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg" alt="Google" width="30" height="30" /></a>
        </td>
                        <td>
<a href="#"><img src="https://user-images.githubusercontent.com/99184393/179383376-874f547c-4e6f-4826-850e-706b009e7e2b.png" alt="" width="30" height="30" /></a>
        </td>
                        <td>
<a href="#"><img src="https://user-images.githubusercontent.com/99184393/180462270-ea4a249c-627c-4479-9431-5c3fd25454c4.png" alt="" width="30" height="30" /></a>
        </td>
                                <td>
<a href="#"><img src="https://user-images.githubusercontent.com/99184393/183095729-0ae04014-a62c-4013-93ff-6861fbff308e.png" alt="" width="30" height="30" /></a>
        </td>
    </tr>
</table>

## 	:toolbox: Getting Started
### :bangbang: Prerequisites
- Sign up for a Firebase account <a href='https://firebase.google.com'>HERE</a>
- Sign up for a Sanity account <a href='https://www.sanity.io'>HERE</a>
- Install Node JS in your computer <a href='https://nodejs.org/en/'>HERE</a>

<!-- Env Variables -->
### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SANITY_API_TOKEN`

`NEXT_PUBLIC_SANITY_PROJECT_ID`

`NEXT_PUBLIC_SANITY_DATASET`

`NEXT_PUBLIC_FIREBASE_API_KEY`

`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`

`NEXT_PUBLIC_FIREBASE_PROJECT_ID`

`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`

`NEXT_PUBLIC_FIREBASE_MESSAGING_SET`

`NEXT_PUBLIC_FIREBASE_APP_ID`

`NEXT_PUBLIC_BASE_URL`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### :gear: Installation

![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

Install my-project with npm
```
npx create-react-app my-project
```
```
cd my-project
```

Install dependencies

### :test_tube: Install Tailwind CSS with Next.js
#### Install Tailwind CSS
![](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Install tailwindcss and its peer dependencies via npm, and then run the init command to generate both ``tailwind.config.js`` and ``postcss.config.js``.

```
npm install -D tailwindcss postcss autoprefixer
```
```
npx tailwindcss init -p
```
#### Configure your template paths
Add the paths to all of your template files in your ``tailwind.config.js`` file.
<br>
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
#### Add the Tailwind directives to your CSS
Add the ``@tailwind`` directives for each of Tailwind’s layers to your ``./src/index.css`` file.
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
Install dependencies

<a href="https://github.com/SashenJayathilaka/Photo-Sharing-Application/network/dependencies" target="_blank">🔶 Dependency Info</a>

<!-- Run Locally -->
### :running: Run Locally

![](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)

Clone the project

```bash
  git https://github.com/SashenJayathilaka/Photo-Sharing-Application.git
```

Install dependencies

```bash
  npm install
```
Start the server

```bash
  npm start
```

<hr />

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### ```npm test```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### ```npm run build```

Builds the app for production to the ``build`` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### ```npm run eject```

**Note: this is a one-way operation. Once you ``eject``, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can ``eject`` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except ``eject`` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use ``eject``. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

#### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### ``npm run build`` fails to minify


## :handshake: Contact

Sashen - [@twitter_handle](https://twitter.com/SashenHasinduJ) - sashenjayathilaka95@gmail.com

Project Link: [https://github.com/SashenJayathilaka/Photo-Sharing-Application.git](https://github.com/SashenJayathilaka/Photo-Sharing-Application.git)

<div align="center">
<a href="https://photo-sharingo.netlify.app"><img src='https://user-images.githubusercontent.com/99184393/194800713-ccb199af-9ebe-4f78-8f76-3855798a9895.png' alt='image'/></a>
</div>
