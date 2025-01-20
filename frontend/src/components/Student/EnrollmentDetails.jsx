import React, { useState } from "react";

const EnrollmentDetails = () => {
  const [enrollmentSteps, setEnrollmentSteps] = useState([
    {
      step: 1,
      title: "Log In",
      description: "Log in to the student portal using your credentials.",
      status: "Completed",
    },
    {
      step: 2,
      title: "Choose Courses",
      description: "Select the courses you want to enroll in from the course catalog.",
      status: "In Progress",
    },
    {
      step: 3,
      title: "Verify Prerequisites",
      description: "Ensure you meet the prerequisites for your chosen courses.",
      status: "Pending",
    },
    {
      step: 4,
      title: "Submit Enrollment",
      description: "Submit your course selections for review and approval.",
      status: "Pending",
    },
    {
      step: 5,
      title: "Payment",
      description: "Complete the payment for your selected courses.",
      status: "Pending",
    },
  ]);

  const updateStepStatus = (step, status) => {
    setEnrollmentSteps((prevSteps) =>
      prevSteps.map((s) =>
        s.step === step ? { ...s, status } : s
      )
    );
  };

  return (
    <div>
      {enrollmentSteps.map((step) => (
        <div key={step.step} style={styles.stepContainer}>
          <div style={styles.stepNumber}>Step {step.step}</div>
          <div style={styles.stepTitle}>{step.title}</div>
          <div style={styles.stepStatus}>Status: {step.status}</div>
          <div style={styles.stepDescription}>{step.description}</div>
          <button onClick={() => updateStepStatus(step.step, "Completed")}>
            Mark as Completed
          </button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  stepContainer: {
    width: "80%",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  stepNumber: {
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: "10px",
  },
  stepTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  stepStatus: {
    fontStyle: "italic",
    color: "#757575",
    marginBottom: "10px",
  },
  stepDescription: {
    marginTop: "10px",
    color: "#424242",
  },
};

export default EnrollmentDetails;