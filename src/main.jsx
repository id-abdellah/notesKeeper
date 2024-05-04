import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.scss"
import App from './App.jsx'

import { Provider } from 'react-redux'
import { store, persistor } from './state/store.js'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </>,
)
