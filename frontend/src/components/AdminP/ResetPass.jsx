import React, { useState } from "react";
import "./ResetPass.css";
import axios from 'axios';

const ResetPass = () => {
    const [showApproveForm, setShowApproveForm] = useState(false);
    const [showRejectForm, setShowRejectForm] = useState(false);
    const [requestStatus, setRequestStatus] = useState("");
    const [password, setPassword] = useState("");
    const [reason, setReason] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

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
        axios.post('http://localhost:3000/api/sendMail', {
            status: requestStatus,
            password: password,
            reason: reason,
            email: email,
        })
        .then(response => {
            setMessage("Email sent successfully!");
            setIsError(false);
        })
        .catch(error => {
            setMessage("Failed to send email. Please try again.");
            setIsError(true);
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
                    <tbody>
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
                    </tbody>
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

            {message && (
                <div className={`feedback ${isError ? "error" : "success"}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default ResetPass;
