//import {Outlet, useNavigate } from "react-router-dom";

const Login = (props) => {

        

    return(
        <div>
            <div>
                Email ID :- 
                <input type= "email" name= "email" onChange= {(e) => {props.handLoginChange(e)}}/>
            </div>
            <div>
                Password :-
                <input type= "password" name= "password" onChange= {(e) => {props.handLoginChange(e)}}/>
            </div>
            <div>
                 <button onClick={props.loginUser}>Login</button>
            </div>
            
        </div>
    )
}
export default Login;