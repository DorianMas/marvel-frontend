import NotFoundIllustration from "../assets/404-image.jpg";

import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page-container">
      <div className="description-section-not-found-page">
        <h3>error 404</h3>
        <p>Page not found</p>
        <button
          className="button-404"
          onClick={() => {
            navigate("/");
          }}
        >
          Back Home
        </button>
      </div>
      <img src={NotFoundIllustration} alt="illustration-not-found" />
    </div>
  );
};

export default NotFoundPage;
