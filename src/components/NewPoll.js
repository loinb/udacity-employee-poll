import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";
import "bootstrap/dist/css/bootstrap.min.css";

const NewPoll = ({ dispatch }) => {
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");
  const navigate = useNavigate();

  const handleFirstOptionChange = (e) => {
    const value = e.target.value;
    setFirstOption(value);
  };

  const handleSecondOptionChange = (e) => {
    const value = e.target.value;
    setSecondOption(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstOption === "" || secondOption === "") {
        alert("First Option AND Second Option must input");
    } else {
        dispatch(handleAddQuestion(firstOption, secondOption));
        alert("Register Poll success, back to home page");
        navigate("/");
    }
  };

  return (
    <div>
      <h1>New Poll</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Option</label>
          <input
            value={firstOption}
            onChange={handleFirstOptionChange}
            type="text"
            name="firstOption"
            id="firstOption"
            data-testid="firstOption"
            className="form-control"
          />
        </div>
        <br />
        <div className="form-group">
          <label>Second Option</label>
          <input
            value={secondOption}
            onChange={handleSecondOptionChange}
            type="text"
            name="secondOption"
            id="secondOption"
            data-testid="secondOption"
            className="form-control"
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect()(NewPoll);
