import { Form, useActionData, redirect } from "react-router-dom";
import { logIn } from "../functions/functions";

export async function action({request, params}) {
    const formData = await request.formData();
    try {
        const response = await logIn(formData.get("username"), formData.get("password"));
        if(!(response.status === 200)) {
            throw new Error(response);
        }
    } catch (error){
        return error.message;
    }
    return redirect('/');
}


export default function LogIn(){
    let error = useActionData()

    return (
        <div id="login_div">
                <div id="login_div_msg">Log In</div>
                <Form method="post" id="login_form">
                        <fieldset id="form_fieldset">
                            <div className="input_group">
                                <label htmlFor="username">username:</label>
                                <input type="text" name="username" />
                            </div>
                            <div className="input_group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" name="password"/>
                            </div>
                        </fieldset>
                    <button type="submit">Log In</button>
                    <span>{error}</span>
                </Form>
        </div>
    )
}