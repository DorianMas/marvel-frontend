import { useNavigate } from "react-router-dom";

const Modal = ({ setOpenModal }) => {
  const navigate = useNavigate();
  return (
    <div className="modal-container">
      <span
        className="close-button-modal"
        onClick={() => {
          setOpenModal(false);
        }}
      >
        x
      </span>
      <p>You need an account to save your favorites comics and heroes</p>
      <div className="options-connection-modal">
        <div>
          <button
            className="button-modal"
            onClick={() => navigate("/user/login")}
          >
            Log in
          </button>
        </div>
        <div>
          <button
            className="button-modal"
            onClick={() => navigate("/user/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
