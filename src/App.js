import React from 'react'
import axios from 'axios'
import AppContainer from './components/DesignComponents/AppStyles'

import Header from './components/SharedComponents/Header'
import Routes from './Routes'
import ImageSearch from './components/ImageComponents/ImageSearch'

axios.defaults.baseURL = `${process.env.REACT_APP_API_ENDPOINT}`

/**
 * Main function to start the application
 */
const App = () => {
  window.addEventListener("keydown", handleFirstTab);
  return (
    <AppContainer>
      <Header />
      <ImageSearch />
    </AppContainer>
  )
}

/**
 * Helper function to activate element focus for keyboard users
 */
function handleFirstTab(e) {
	if (e.keyCode === 9) {
		// the "I am a keyboard user" key
		document.body.classList.add("user-is-tabbing");
		window.removeEventListener("keydown", handleFirstTab);
	}
}

export default App;

/*
<Routes />
*/