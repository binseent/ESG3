import React, { useEffect, useState } from "react";
import "./ResetPass.css";
import axios from "axios";

const ResetPass = () => {
  const [data, setData] = useState([]);
  const [showApproveForm, setShowApproveForm] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [requestStatus, setRequestStatus] = useState("");
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios
      .get("https://esg-3.vercel.app/api/password-reset-requests")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
    axios
      .post("https://esg-3.vercel.app/api/sendMail", {
        status: requestStatus,
        password: password,
        reason: reason,
        email: email,
      })
      .then((response) => {
        setMessage("Email sent successfully!");
        setIsError(false);
      })
      .catch((error) => {
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
              <th>User ID</th>
              <th>Email</th>
              <th>Request Date</th>
              <th>Approval Status</th>
              <th>Admin ID</th>
              <th>Approval Date</th>
              <th>Remarks</th>
              <th>Is Processed</th>
            </tr>
          </thead>
          <tbody>
            {data.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.user_id}</td>
                <td>{request.email}</td>
                <td>{new Date(request.request_date).toLocaleString()}</td>
                <td>{request.approval_status}</td>
                <td>{request.admin_id}</td>
                <td>
                  {request.approval_date
                    ? new Date(request.approval_date).toLocaleString()
                    : "N/A"}
                </td>
                <td>{request.remarks}</td>
                <td>{request.is_processed ? "Yes" : "No"}</td>
              </tr>
            ))}
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
            <button className="approve-btn" onClick={handleApprove}>
              Approve
            </button>
            <button className="reject-btn" onClick={handleReject}>
              Reject
            </button>
            <button className="pending-btn" onClick={handlePending}>
              Pending
            </button>
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
              <button className="send-email-btn" onClick={handleSendData}>
                Send Email
              </button>
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
              <button className="send-email-btn" onClick={handleSendData}>
                Send Email
              </button>
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
