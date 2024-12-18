import React, { useRef, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { AddCaptureFeedback } from "services/document";
import NotificationAlert from "react-notification-alert";

const FeedbackModal = ({ isOpen, onClose, batchId }) => {
  const [feedback, setFeedback] = useState("");
  const notificationAlertRef = useRef(null);

  const handleInputChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = async () => {
    try {
      if(!feedback){
        alert("Please enter feedback.")
        return;
      }
      
      const response = await AddCaptureFeedback(batchId, feedback);      
      onClose(false);
      notify("Feedback captured successfully!", "success");
    } catch (error) {
      console.error("Error on capturing feedback:", error.message);
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
      <Modal isOpen={isOpen} toggle={onClose}>
        <ModalHeader toggle={onClose}>Feedback</ModalHeader>
        <ModalBody>
         
          <textarea
            id="feedbackInput"
            rows="5"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              resize: "vertical",
              lineHeight: "0.9",
            }}
            value={feedback}
            onChange={handleInputChange}
            placeholder="Type your feedback here..."
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" onClick={handleSubmitFeedback}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default FeedbackModal;
