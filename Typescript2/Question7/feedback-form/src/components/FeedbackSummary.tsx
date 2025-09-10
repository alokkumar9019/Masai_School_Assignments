import { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";
import { useNavigate } from "react-router-dom";

const FeedbackSummary: React.FC = () => {
  const context = useContext(FeedbackContext);
  const navigate = useNavigate();

  if (!context) return <div>Context not found</div>;

  const { feedback } = context;

  if (
    !feedback.name ||
    !feedback.email ||
    !feedback.rating ||
    !feedback.feedback
  ) {
    navigate("/");
    return null;
  }

  return (
    <div>
      <h2>Feedback Summary</h2>
      <p>Name:{feedback.name}</p>
      <p>Email:{feedback.email}</p>
      <p>Rating:{feedback.rating}</p>
      <p>feedback:{feedback.feedback}</p>

      <button onClick={() => navigate("/")}>Back to Form</button>
    </div>
  );
};

export default FeedbackSummary;
