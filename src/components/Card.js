import {connect} from "react-redux";
import {Link} from "react-router-dom";

const Card = ({question, author}) => {
    return (
        <Link to={'questions/' + question.id}>
        <div>
            <div>
                <img src={author?.avatarURL} alt="Author" width={100} height={100}/>
            </div>
            <div>
                <div>{question.author}</div>
                <p>{new Date(question.timestamp).toDateString()}</p>
            </div>
        </div>
        </Link>
    );
}

export default connect()(Card);