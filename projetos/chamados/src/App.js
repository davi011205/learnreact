import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoutesApp from "./routes";
import AuthProvider from './contexts/auth';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <BrowserRouter>
          <AuthProvider>
            <RoutesApp></RoutesApp>
          </AuthProvider>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
