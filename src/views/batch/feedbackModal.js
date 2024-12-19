import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { AddCaptureFeedback } from "services/document";
import NotificationAlert from "react-notification-alert";

const FeedbackModal = ({ isOpen, onClose, selectedDetail}) => {
  const {batchId, documentId} = selectedDetail
  const [feedback, setFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const notificationAlertRef = useRef(null);

  const handleInputChange = (e) => {
    setFeedback(e.target.value);
    setFeedbackError(""); 
  };

  useEffect(() => {
    setFeedback(selectedDetail.feedback || "");
  }, [selectedDetail.feedback]);

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) {
      setFeedbackError("Feedback is required.");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await AddCaptureFeedback(batchId, documentId, feedback);      
      onClose(true, feedback);
      notify("Feedback submitted successfully!", "success");
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
      notify("Error submitting feedback. Please try again.", "danger");
    } finally {
      setIsLoading(false); 
    }
  };

  const notify = (message, type) => {
    const options = {
      place: "tr",
      message: <div>{message}</div>,
      type: type,
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  return (
    <>
      <NotificationAlert ref={notificationAlertRef} />
      <Modal isOpen={isOpen} toggle={()=>onClose(false)}>
        <ModalHeader >Feedback</ModalHeader>
        <ModalBody>
         
          <textarea
            id="feedbackInput"
            rows="5"
            style={{
              width: "100%",
              padding: "8px",
              border: feedbackError ? "1px solid red" : "1px solid #ccc",
              borderRadius: "4px",
              resize: "vertical",
              lineHeight: "0.9",
            }}
            value={feedback}
            onChange={handleInputChange}
            placeholder="Type your feedback here..."
          />
          {feedbackError && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {feedbackError}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={()=>onClose(false)} disabled={isLoading}>
            Close
          </Button>
          <Button color="primary" onClick={handleSubmitFeedback} disabled={isLoading}>
            {isLoading ? (
              <div className="loader">
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Submitting...
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default FeedbackModal;