import React from "react";

const ErrorMessage = ({ errors, variant }) => {
  if (!errors) {
    return null;
  }
  return (
    <div className={`alert alert-${variant}`}>
      {Object.values(errors).map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
};

export default ErrorMessage;
