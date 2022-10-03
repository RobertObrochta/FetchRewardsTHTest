import Completed from './Completed';
import { useState, useEffect } from 'react';

const Form = () => {
    const [visitor, setVisitor] = useState({
        name: '',
        password: '',
        email: '',
        occupation: '',
        state: ''
    });
    
    // fields to be fed into visitor object once submitted and complete
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [occupation, setOccupation] = useState('');
    const [state, setState] = useState('');

    const submitForm = () => { // POST will be here, upload whole state of visitor as a JSON object within the request body
        console.log("Submitting form...");
        setVisitor({
            name: fullName, 
            password: password,
            email: email,
            occupation: occupation,
            state: state
        });
    }

    const validationHandler = () => {
        return checkForCompleteForm(visitor.name, visitor.password, visitor.email, visitor.occupation, visitor.state);
    }

    const checkForCompleteForm = (fullName, password, email, occupation, state) => {
        if (fullName.length >= 1 && password.length >= 1 && email.length >= 1 && occupation.length >= 1 && state.length >= 1){
            return true;
        }
        console.log("Form isn't complete"); // add some sort of red boxes to the forms that the user missed
        return false;
    }

    if (validationHandler === true){
        submitForm();
        return (
            <Completed/>
        )
    }

    return(
        <div id="Form">
            <form className="neat-form">
                <label>
                    Full Name:
                    <input type="text" name="name" placeholder='Enter full name...' onChange={(e) => setFullName(e.target.value)}/>
                </label>
                <label>
                    Email Address
                    <input type="text" name="email" placeholder='Enter email address...' onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label> {/* Make this masked with an eye thing */}
                    Password
                    <input type="text" name="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <label> {/* map function ==> option from the GET request */}
                    Occupation
                    <select name="password" placeholder='Select an occupation...' onChange={(e) => setOccupation(e.target.value)}>

                    </select>
                </label>
                <label> {/* map function ==> option from the GET request */}
                    State
                    <select name="password" placeholder='Select a state...' onChange={(e) => setState(e.target.value)}>

                    </select>
                </label>
                <input type="submit" value="Submit" onSubmit={validationHandler}/>
            </form>
        </div>
    )

}

export default Form;