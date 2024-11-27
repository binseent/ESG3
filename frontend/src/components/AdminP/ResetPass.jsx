import React, { useState } from "react";
import "./ResetPass.css";

const ResetPass = () => {
    const [showApproveForm, setShowApproveForm] = useState(false);
    const [showRejectForm, setShowRejectForm] = useState(false);
    const [requestStatus, setRequestStatus] = useState("");
    const [password, setPassword] = useState("");
    const [reason, setReason] = useState("");
    const [email, setEmail] = useState("");  

    const handleApprove = () => {
        setShowApproveForm(true);
        setShowRejectForm(false);
        setRequestStatus("Approved");
    };

    const handleReject = () => {
        setShowRejectForm(true);
        setShowApproveForm(false);
        setRequestStatus("Rejected");
    };

    const handlePending = () => {
        setShowApproveForm(false);
        setShowRejectForm(false);
        setRequestStatus("Pending");
    };

    const handleSendData = () => {
        axios.post('/api/sendMail', {
            status: requestStatus,
            password: password,
            reason: reason,
            email: email
        })
        .then(response => {
            console.log(response.data.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="Reset-Container">
            <h2 className="Reset-Title">Reset Password Requests</h2>
            <div className="Reset-Table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User_ID</th>
                        <th>Email</th>
                        <th>Request_Date</th>
                        <th>Approval_Status</th>
                        <th>Admin_ID</th>
                        <th>Approval_Date</th>
                        <th>Remarks</th>
                        <th>Is_Processed</th>
                    </tr>
                </thead>
              <tr>
                  <td>1</td>
                  <td>12345</td>
                  <td>user1@example.com</td>
                  <td>2023-01-01</td>
                  <td>Approved</td>
                  <td>admin001</td>
                  <td>2023-01-02</td>
                  <td>All good</td>
                  <td>Yes</td>
              </tr>
              <tr>
                  <td>2</td>
                  <td>67890</td>
                  <td>user2@example.com</td>
                  <td>2023-02-01</td>
                  <td>Pending</td>
                  <td>admin002</td>
                  <td>2023-02-05</td>
                  <td>Needs review</td>
                  <td>No</td>
              </tr>
              <tr>
                  <td>3</td>
                  <td>11223</td>
                  <td>user3@example.com</td>
                  <td>2023-03-01</td>
                  <td>Rejected</td>
                  <td>admin003</td>
                  <td>2023-03-03</td>
                  <td>Incomplete data</td>
                  <td>No</td>
              </tr>
              <tr>
                  <td>4</td>
                  <td>44556</td>
                  <td>user4@example.com</td>
                  <td>2023-04-01</td>
                  <td>Approved</td>
                  <td>admin004</td>
                  <td>2023-04-02</td>
                  <td>Verified</td>
                  <td>Yes</td>
              </tr>
              <tr>
                  <td>5</td>
                  <td>77889</td>
                  <td>user5@example.com</td>
                  <td>2023-05-01</td>
                  <td>Pending</td>
                  <td>admin005</td>
                  <td>2023-05-06</td>
                  <td>Under Review</td>
                  <td>No</td>
              </tr>
              <tr>
                  <td>6</td>
                  <td>99100</td>
                  <td>user6@example.com</td>
                  <td>2023-06-01</td>
                  <td>Rejected</td>
                  <td>admin006</td>
                  <td>2023-06-04</td>
                  <td>Not eligible</td>
                  <td>No</td>
              </tr>
              <tr>
                  <td>7</td>
                  <td>22334</td>
                  <td>user7@example.com</td>
                  <td>2023-07-01</td>
                  <td>Approved</td>
                  <td>admin007</td>
                  <td>2023-07-02</td>
                  <td>All set</td>
                  <td>Yes</td>
              </tr>
              <tr>
                  <td>8</td>
                  <td>55667</td>
                  <td>user8@example.com</td>
                  <td>2023-08-01</td>
                  <td>Pending</td>
                  <td>admin008</td>
                  <td>2023-08-05</td>
                  <td>Awaiting info</td>
                  <td>No</td>
              </tr>
              <tr>
                  <td>9</td>
                  <td>88990</td>
                  <td>user9@example.com</td>
                  <td>2023-09-01</td>
                  <td>Rejected</td>
                  <td>admin009</td>
                  <td>2023-09-03</td>
                  <td>Incorrect details</td>
                  <td>No</td>
              </tr>                    
            </table>
            </div>

            <h2 className="Reset-Title">Email Form</h2>
            <div className="Reset-form">
                <div className="Form-Status">
                    <input 
                        type="email" 
                        placeholder="Enter email" 
                        className="email-input" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <div className="button-container">
                        <button className="approve-btn" onClick={handleApprove}>Approve</button>
                        <button className="reject-btn" onClick={handleReject}>Reject</button>
                        <button className="pending-btn" onClick={handlePending}>Pending</button>
                    </div>
                </div>

                <div className="Form-Email">
                    {showApproveForm && (
                        <div id="approve-form" className="form-a">
                            <h3>Approve Form</h3>
                            <input
                                type="text"
                                placeholder="Enter student new password"
                                className="password-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            <button className="send-email-btn" onClick={handleSendData}>Send Email</button>
                        </div>
                    )}

                    {showRejectForm && (
                        <div id="reject-form" className="form-r">
                            <h3>Reject Form</h3>
                            <input
                                type="text"
                                placeholder="Enter reason why password reset request is rejected"
                                className="reason-input"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)} 
                            />
                            <button className="send-email-btn" onClick={handleSendData}>Send Email</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPass;

