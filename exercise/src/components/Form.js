import Completed from './Completed';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

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

    const [selectionOptions, setSelectionOptions] = useState({});

    async function fetchSelectionOptions() {
        const response = await fetch("https://frontend-take-home.fetchrewards.com/form");
        const options = await response.json();

        setSelectionOptions(options);
        return options;
    }

    const submitForm = (userInfo) => { // TODO: POST will be here, upload whole state of visitor as a JSON object within the request body
        console.log("Submitting form... with user info:", userInfo);
        // TODO: redirect to Completed component
    }

    const validationHandler = () => {
        setFormSubmitted(true);
        const isFormComplete = checkForCompleteForm(fullName, password, email, occupation, state);
        
        if (isFormComplete){
            submitForm(visitor);
        }
    }

    const checkForCompleteForm = (fullName, password, email, occupation, state) => {
        let errors = {}; // update formErrors with this value
        if (fullName === ''){errors["name"] = "Name cannot be empty."}
        if (password === ''){errors["password"] = "Password cannot be empty."}
        if (email === ''){errors["email"] = "Email cannot be empty."} // TODO: check for email format
        if (occupation === ''){errors["occupation"] = "Please select an occupation."}
        if (state === ''){errors["state"] = "Please select a state."}
        setFormErrors(errors);

        return Object.keys(formErrors).length === 0;
    }

    useEffect(() => {
        if (initialRender.current){
            fetchSelectionOptions();
            initialRender.current = false;
            return;
        }
        if (selectionOptions.length === 0){
            fetchSelectionOptions();
        }
        checkForCompleteForm(fullName, password, email, occupation, state);
        setVisitor({name: fullName, password: password, email: email, occupation: occupation, state: state});
    }, [fullName, password, email, occupation, state])


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
                <label>Occupation 
                {formSubmitted && <p className = "form-error">{formErrors["occupation"]}</p>}
                    <select name="occupation" placeholder='Select an occupation...' style={formSubmitted && formErrors["occupation"] ? {borderColor: "red"} : null} 
                            onChange={(e) => setOccupation(e.target.value)}>
                        <option key = "0"></option>
                    {Object.keys(selectionOptions).length > 0 ?selectionOptions.occupations.map((occup, index) =>
                        (<option key = {index + 1}>{occup}</option>)) : null}
                    </select>
                </label>
                <label>State 
                {formSubmitted && <p className = "form-error">{formErrors["state"]}</p>}
                    <select name="state" placeholder='Select a state...' style={formSubmitted && formErrors["state"] ? {borderColor: "red"} : null} 
                            onChange={(e) => setState(e.target.value)}>
                        <option key = "0"></option>
                        {Object.keys(selectionOptions).length > 0 ? selectionOptions.states.map((state, index) =>
                        (<option key = {index + 1}>{state.name}</option>)) : null}
                    </select>
                </label>
                <button type ="button" value="Submit" onClick={validationHandler}>Submit</button>
            </form>
        </div>
    )
}

export default Form;