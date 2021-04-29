import { useState } from "react";

import { firebase } from "../../config";
import { Spinner, Alert } from "../../components";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = e => {
    e.preventDefault();

    setIsLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="nama-lengkap" className="form-label">
          Nama Lengkap
        </label>
        <input
          type="text"
          className="form-control"
          id="nama-lengkap"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={e => onSubmit(e)}
          style={{ minWidth: "150px" }}
        >
          {isLoading && <Spinner />}
          {!isLoading && "Daftar"}
        </button>
      </div>
    </form>
  );
}

export default Register;
