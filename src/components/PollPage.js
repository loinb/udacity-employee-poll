import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleAddAnswer } from "../actions/questions";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/PollPage.css";

const PollPage = ({ dispatch, authedUser, question, author }) => {
  const navigate = useNavigate();

  const hasVotedForOptionOne = question.optionOne.votes.includes(authedUser.id);
  const hasVotedForOptionTwo = question.optionTwo.votes.includes(authedUser.id);
  const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  const handleOptionOne = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionOne"));
    alert("Answer success, back to home page");
    navigate("/");
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionTwo"));
    alert("Answer success, back to home page");
    navigate("/");
  };

  const calcPercentage = (option, question) => {
    const numberVotesTotal =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    switch (option) {
      case "optionOne":
        return (
          (question.optionOne.votes.length / numberVotesTotal) * 100 + " %"
        );
      case "optionTwo":
        return (
          (question.optionTwo.votes.length / numberVotesTotal) * 100 + " %"
        );
      default:
        return "";
    }
  };

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Poll by {author.id}</h1>

      <div>
        <img src={author.avatarURL} alt="Profile" height={200} width={200} className="center"/>
      </div>
      <div>
        <h2>Would you rather?</h2>
      </div>

      <div>
        <button onClick={handleOptionOne} disabled={hasVoted} className={"btn btn-primary"}>
          <div>
            <p>{question.optionOne.text}</p>
            {hasVoted && (
              <p>
                Votes: {question.optionOne.votes.length} (
                {calcPercentage("optionOne", question)})
              </p>
            )}
          </div>
        </button>
        &nbsp;
        <button onClick={handleOptionTwo} disabled={hasVoted} className={"btn btn-primary"}>
          <p>{question.optionTwo.text}</p>
          {hasVoted && (
            <p>
              Votes: {question.optionTwo.votes.length} (
              {calcPercentage("optionTwo", question)})
            </p>
          )}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  try {
    const question = Object.values(questions).find(
      (question) => question.id === useParams().id
    );
    console.log("question exist");
    console.log(question);
    const author = Object.values(users).find(
      (user) => user.id === question.author
    );
    console.log("author exist");
    console.log(author);
    return { authedUser, question, author };
  } catch (e) {
    alert("User or Quest not exist");
  }
};

export default connect(mapStateToProps)(PollPage);
