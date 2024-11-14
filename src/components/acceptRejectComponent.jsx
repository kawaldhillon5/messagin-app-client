import { Form, useNavigate } from "react-router-dom";
export default function AcceptReject({req, submitFunc}){

    const acceptLabelAddClass = () => {
        document.querySelector("#accept_label").classList.add("labelActiveAccept");
        document.querySelector("#reject_label").classList.remove("labelActiveReject");
    }

    const rejectLabelAddClass = () => {
        document.querySelector("#accept_label").classList.remove("labelActiveAccept");
        document.querySelector("#reject_label").classList.add("labelActiveReject");
    }
    return (
        <>
            <Form className="accept_reject_form" method="post">
                <div className="accept_reject_in_group">
                    <label htmlFor="acceptRadio" id="accept_label" className="labelActiveAccept" onClick={acceptLabelAddClass}>✔</label>
                    <input type="radio" name="radio" id="acceptRadio" className="radioReq"  />
                    <label htmlFor="rejectRadio" id="reject_label" onClick={rejectLabelAddClass}>✘</label>
                    <input type="radio" name="radio" id="rejectRadio" className="radioReq" />
                </div>
                <button className="accept_reject_btn" type="button" onClick={(e) => {
                        e.preventDefault();
                        let choice  = false
                        document.querySelector("#accept_label").classList.contains("labelActiveAccept")
                        ? choice = true : choice = false;
                        submitFunc(req, choice) 
                    }
                    }>Submit</button>
            </Form>
        </>
    )
}