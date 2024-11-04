import { Form, redirect, useActionData } from "react-router-dom";
import { signUp } from "../functions/functions";

export async function action({request,params}) {
    const formData = await request.formData();
    if(formData.get("password1") === formData.get("password2")){
        const formObject = Object.fromEntries(formData.entries());
        formObject.dateCreated = new Date();
        try{
            const res = await signUp(formObject);
            if(!(res.status === 200)){
                throw new Error(res);
            }
        } catch(error){
            return error;
        }
    } else {
        const error = new Error("Password does not match");
        return error;
    }
    return redirect("../auth/logIn");
}

export default function SignUp(){
    const error = useActionData(); 
    return (
        <div id="sign_up_div">
            <Form method="post">
            <div id="signup_div_msg">Sign Up</div>
            <fieldset id="form_fieldset" className="signup_fielset">
                <div className="input_group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" />
                </div>
                <div className="input_group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" />
                </div>
                <div className="input_group">
                    <label htmlFor="password1">Password:</label>
                    <input type="password" name="password1"/>
                </div>
                <div className="input_group">
                    <label htmlFor="password2">Confirm Password:</label>
                    <input type="password" name="password2"/>
                </div>
            </fieldset>
                <button type="submit">Sign Up</button>
                <span>{(error) ? error.message: null}</span>
            </Form>
        </div>
    )
}