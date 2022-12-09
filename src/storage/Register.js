
const Register = (props) => {

    return(
        <div>
            <div>
                Email ID :- 
                <input type= "email" name= "email" onChange= {(e) => {props.registerFieldChange(e)}}/>
            </div>
            <div>
                Password :-
                <input type= "password" name= "password" onChange= {(e) => {props.registerFieldChange(e)}}/>
            </div>
            <div>
                First Name :-
                <input type= "text" name= "firstName" onChange= {(e) => {props.registerFieldChange(e)}}/>
            </div>
            <div>
                Address :-
                <input type= "text" name= "address" onChange= {(e) => {props.registerFieldChange(e)}}/>
            </div>
            <div>
                City :-
                <input type= "text" name= "city" onChange= {(e) => {props.registerFieldChange(e)}}/>
            </div>
            {/* admin or user */}
            <div>
                Role of User :-<br/>
                <input type= "radio" name= "role" value= "admin" onChange= {(e) => {props.registerFieldChange(e)}}/>
                <label>Admin</label>
                <input type= "radio" name= "role" value= "user" onChange= {(e) => {props.registerFieldChange(e)}}/>
                <label>User</label>
            </div>
            <div>
                Mobile NO :-
                <input type= "number" name= "mobileNumber" onChange= {(e) => {props.registerFieldChange(e)}}/>
            </div>
            <div>
                Last Name :-
                <input type= "text" name= "lastName" onChange= {(e) => {props.registerFieldChange(e)}}/>
            </div>
            <div>
                <button onClick= {props.handleRegister}>Register</button>
            </div>
        </div>
    )
}
export default Register;