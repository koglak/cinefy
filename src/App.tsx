import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './routes/HomePage';
import Detail from './routes/DetailPage';
import Layout from './layouts/Layout';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Detail />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
