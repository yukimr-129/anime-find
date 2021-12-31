import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import reportWebVitals from './reportWebVitals';

import App from './App';
import theme from './defaultStyle/theme';
import RecoilStatePersist from './RecoilStatePersist';
import { CurrentUser, IsSignedIn } from './store/auth/Auth'
import { AuthLoding } from './store/loding/AuthLoding'

const initializeState = (mutableSnapshot: MutableSnapshot) => {
  // for(const [key, value] of Storage.entries()) {
  //   set(myLookupOfAtomWithKey(key), JSON.parse(value).value);
  // }
  const currentUser = localStorage.getItem('CurrentUser');
  const isSignedIn = localStorage.getItem('IsSignedIn');
  const authLoding = localStorage.getItem('AuthLoding');

  if(currentUser && isSignedIn && authLoding) {
    mutableSnapshot.set(CurrentUser, JSON.parse(currentUser).value);
    mutableSnapshot.set(IsSignedIn, JSON.parse(isSignedIn).value);
    mutableSnapshot.set(AuthLoding, JSON.parse(authLoding).value);
  }
}



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot initializeState={initializeState}>
        <RecoilStatePersist />
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
