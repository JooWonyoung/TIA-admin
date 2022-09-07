import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import variables from './styles/variables';
import theme from './styles/theme';
import AppRoutes from './routing/AppRouter';
import { AuthProvider } from './context/auth';
import { createStore } from 'redux';
import rootReducers from 'modules';
import 'antd/dist/antd.min.css';
import { Provider } from 'react-redux';

const store = createStore(rootReducers);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ThemeProvider theme={{ style: theme, variables }}>
      <Provider store={store}>
        <GlobalStyle />
        <AppRoutes />
      </Provider>
    </ThemeProvider>
  </AuthProvider>
);
