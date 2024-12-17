import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoutesApp from "./routes";

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
        <RoutesApp></RoutesApp>
      </>
    </div>
  );
}

export default App;