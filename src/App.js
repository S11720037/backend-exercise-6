import { Register, Navbar } from "./components";

function App() {
  return (
    <div className="container-fluid p-0 m-0">
      <Navbar />

      <div className="container-md mt-3 rounded shadow border p-3">
        <Register />
      </div>
    </div>
  );
}

export default App;
