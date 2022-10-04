import Completed from './Completed';
import { useState, useEffect, useRef } from 'react';

const Form = () => {
    const [visitor, setVisitor] = useState({
        name: '',
        password: '',
        email: '',
        occupation: '',
        state: ''
    });

    const [formErrors, setFormErrors] = useState({}); // builds up the errors, but doeos not change the form style until submit is hit.
    const initialRender = useRef(true);
    
    // fields to be fed into visitor object once submitted and complete
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [occupation, setOccupation] = useState('');
    const [state, setState] = useState('');

    const [formSubmitted, setFormSubmitted] = useState(false);

    const submitForm = () => { // TODO: POST will be here, upload whole state of visitor as a JSON object within the request body
        setVisitor({
            name: fullName, 
            password: password,
            email: email,
            occupation: occupation,
            state: state
        });
        console.log("Submitting form... with user info:", visitor);
    }

    const validationHandler = () => {
        setFormSubmitted(true);
        return checkForCompleteForm(fullName, password, email, occupation, state);
    }

    const checkForCompleteForm = (fullName, password, email, occupation, state) => {
        let errors = {}; // update formErrors with this value

        if (formErrors === {}){
            return true;
        }
        else{
            if (fullName === ''){errors["name"] = "Name cannot be empty."}
            if (password === ''){errors["password"] = "Password cannot be empty."}
            if (email === ''){errors["email"] = "Email cannot be empty."} // TODO: check for email format
            if (occupation === ''){errors["occupation"] = "Please select an occupation."}
            if (state === ''){errors["state"] = "Please select a state."}
        setFormErrors(errors);
        }
        return false;
    }

    useEffect(() => {
        if (initialRender.current){
            initialRender.current = false;
            return;
        }
        checkForCompleteForm(fullName, password, email, occupation, state);
    }, [fullName, password, email, occupation, state])

    if (validationHandler === true){ // if no errors
        submitForm();
        return (
            <Completed/>
        )
    }

    return(
        <div id="Form">
            <form className="neat-form">
                <label>Full Name: 
                    {formSubmitted && <p className = "form-error">{formErrors["name"]}</p>}
                    <input type="text" name="name" placeholder='Enter full name...' style={formSubmitted && formErrors["name"] ? {borderColor: "red"} : null} 
                    onChange={(e) => setFullName(e.target.value)} />
                </label>
                <label>Email Address 
                    {formSubmitted && <p className = "form-error">{formErrors["email"]}</p>}
                    <input type="email" name="email" placeholder='Enter email address...' style={formSubmitted && formErrors["email"] ? {borderColor: "red"} : null} 
                    onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>Password 
                    {formSubmitted && <p className = "form-error">{formErrors["password"]}</p>}
                    <input type="password" name="password" placeholder='Password...' style={formSubmitted && formErrors["password"] ? {borderColor: "red"} : null} 
                    onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <label> {/* TODO map function ==> option from the GET request */}Occupation 
                {formSubmitted && <p className = "form-error">{formErrors["occupation"]}</p>
                    }
                    <select name="occupation" placeholder='Select an occupation...' style={formSubmitted && formErrors["occupation"] ? {borderColor: "red"} : null} 
                    onChange={(e) => setOccupation(e.target.value)}>
                    </select>
                </label>
                <label> {/* TODO map function ==> option from the GET request */} State 
                {formSubmitted && <p className = "form-error">{formErrors["state"]}</p>}
                    <select name="state" placeholder='Select a state...' style={formSubmitted && formErrors["state"] ? {borderColor: "red"} : null} 
                    onChange={(e) => setState(e.target.value)}>
                    </select>
                </label>
                <button type ="button" value="Submit" onClick={validationHandler}>Submit</button>
            </form>
        </div>
    )
}

export default Form;