import {connect} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const Leaderboard = ({users}) => {
    return (
        <div>
            <h1>Leaderboard</h1>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>User</th>
                    <th>Answered</th>
                    <th>Created</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{Object.keys(user.answers).length}</td>
                            <td>{user.questions.length}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = ({users}) => ({
    users: Object.values(users).sort((a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length),
});

export default connect(mapStateToProps)(Leaderboard);