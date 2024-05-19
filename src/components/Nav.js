import {Link, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {handleLogout} from "../actions/authedUser";
import "../css/Nav.css";

const Nav = ({dispatch, authedUserId}) => {
    const navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault();
        dispatch(handleLogout());
        navigate("/login");
    };

    return (
        <nav>
            <ul>
                <li><Link to="/" >Home</Link></li>
                <li><Link to="/leaderboard" >Leaderboard</Link></li>
                <li><Link to="/new">New Poll</Link></li>
                <li><span data-testid="user-information">User: {authedUserId}</span></li>
                <li style={{float:'right'}}><Link onClick={logout} >Logout</Link></li>
            </ul>
        </nav>
    );
};

const mapStateToProps = ({authedUser}) => ({
    authedUserId: authedUser.id,
});


export default connect(mapStateToProps)(Nav);