import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './constants/AppRoutes';
import { Provider } from 'react-redux'
import store from "./redux/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;
