import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {connect} from "react-redux";
import Login from "./Login";
import Nav from "./Nav";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import PollPage from "./PollPage";
import NewPoll from "./NewPoll";
import {handleInitialData} from "../actions/shared";

function App({dispatch, loggedIn}) {
    useEffect(() => {
        dispatch(handleInitialData());
    });

    return (
        <div>
            {loggedIn && <Nav/>}
            <Routes>
                <Route path="/login" exact element={<Login/>}/>
                <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                <Route path="/leaderboard" exact element={<PrivateRoute><Leaderboard/></PrivateRoute>}/>
                <Route path="/questions/:id" element={<PrivateRoute><PollPage/></PrivateRoute>}/>
                <Route path="/new" exact element={<PrivateRoute><NewPoll/></PrivateRoute>}/>
            </Routes>
        </div>
    );
}

const mapStateToProps = ({authedUser}) => ({
    loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(App);