import { Modal, Button, Form, Badge } from "react-bootstrap";
import { FaBriefcase, FaPlus, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTargetRoles from "../hooks/useTargetRoles";

const Targetroles = ({ initialRoles, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  
  const {
    roles,
    setRoles,
    currentInput,
    setCurrentInput,
    addRole,
    removeRole,
  } = useTargetRoles(initialRoles || []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    if (initialRoles) {
      setRoles(initialRoles);
    }
  }, [initialRoles, setRoles]);

  const saveRolesToBackend = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        "http://localhost:5000/api/auth/updateroles",
        { targetRoles: roles },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (onUpdate) onUpdate(roles);
      toast.success("Roles updated successfully");
      handleClose();
    } catch (error) {
      console.error("Error saving roles", error);
      toast.error("Failed to save roles");
    }
  };

  return (
    <>
      <div
        className="p-4 w-100"
        style={{
          maxWidth: "850px",
          border: "1px solid #2d343f",
          borderRadius: "20px",
          backgroundColor: "#121825",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)",
          color: "#fff",
        }}
      >
        <div className="d-flex align-items-center justify-content-between mb-4 px-2">
          <div className="d-flex align-items-center">
            <FaBriefcase
              style={{
                color: "#3b82f6",
                fontSize: "1.4rem",
                marginRight: "12px",
              }}
            />
            <h4 className="mb-0" style={{ fontWeight: "600", fontSize: "1.25rem" }}>
              Target Roles
            </h4>
          </div>
          <button
            className="btn btn-link text-decoration-none p-0"
            style={{ color: "#3b82f6", fontSize: "0.9rem", fontWeight: "500" }}
            onClick={handleShow}
          >
            <FaPlus size={12} className="me-1" /> Add Role
          </button>
        </div>

        <div className="text-center py-4">
          {roles && roles.length > 0 ? (
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              {roles.map((role, index) => (
                <Badge
                  key={index}
                  style={{ backgroundColor: "#3b82f6", fontSize: "14px", padding: "10px 12px" }}
                  pill
                >
                  {role}
                </Badge>
              ))}
            </div>
          ) : (
            <p style={{ color: "#747475" }}>
              No target roles added yet. Add roles to get tailored recommendations.
            </p>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} centered contentClassName="border-0">
        <div
          style={{
            backgroundColor: "#121825",
            color: "#fff",
            borderRadius: "7px",
            border: "1px solid #2d343f",
            overflow: "hidden",
          }}
        >
          <Modal.Header closeButton closeVariant="white" className="border-0">
            <Modal.Title className="text-white fs-5">Manage Target Roles</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="d-flex gap-2 mb-3">
              <Form.Control
                type="text"
                placeholder="Add a target role..."
                className="bg-dark border-secondary text-white shadow-none"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addRole();
                  }
                }}
              />
              <Button variant="primary" className="rounded-circle" onClick={addRole}>
                <FaPlus />
              </Button>
            </div>

            <div className="mb-4">
              {roles.length === 0 ? (
                <p className="text-muted fst-italic small">No target roles added yet</p>
              ) : (
                <div className="d-flex flex-wrap gap-2">
                  {roles.map((role, index) => (
                    <Badge
                      key={index}
                      bg="secondary"
                      className="p-2 d-flex align-items-center gap-2"
                    >
                      {role}{" "}
                      <FaTimes
                        onClick={() => removeRole(role)}
                        style={{ cursor: "pointer", fontSize: "16px" }}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <hr className="border-secondary" />
            <div className="d-flex gap-2 justify-content-end">
              <Button variant="outline-secondary" className="rounded-pill px-4" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" className="rounded-pill px-4" onClick={saveRolesToBackend}>
                Save Roles
              </Button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default Targetroles;