import React from "react";

const EnrollmentDetails = () => {
  // Example enrollment steps
  const enrollmentSteps = [
    {
      step: 1,
      title: "Log In",
      description: "Log in to the student portal using your credentials.",
      status: "Completed",
    },
    {
      step: 2,
      title: "Choose Courses",
      description:
        "Select the courses you want to enroll in from the course catalog.",
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
      description: "Complete the payment process to finalize your enrollment.",
      status: "Pending",
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Enrollment Process</h2>
      <ul style={styles.list}>
        {enrollmentSteps.map((step) => (
          <li key={step.step} style={styles.listItem}>
            <div style={styles.stepHeader}>
              <span style={styles.stepNumber}>Step {step.step}:</span>
              <span style={styles.stepTitle}>{step.title}</span>
              <span style={styles.stepStatus}>({step.status})</span>
            </div>
            <p style={styles.stepDescription}>{step.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  stepHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "5px",
  },
  stepNumber: {
    fontWeight: "bold",
    color: "#333",
  },
  stepTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  stepStatus: {
    fontStyle: "italic",
    color: "#555",
  },
  stepDescription: {
    marginTop: "5px",
    color: "#666",
  },
};

export default EnrollmentDetails;
