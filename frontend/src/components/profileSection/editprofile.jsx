import React, { useRef, useEffect } from "react";
import { Form, Row, Col, Button, Badge } from "react-bootstrap";
import { FaPlus, FaTimes } from "react-icons/fa";
import useTargetRoles from "../../hooks/useTargetRoles";

const Editprofile = ({
  editData,
  setEditData,
  experienceOptions,
}) => {
  const fileInputRef = useRef(null);

  const {
    roles,
    currentInput,
    setCurrentInput,
    addRole,
    removeRole,
  } = useTargetRoles(editData?.targetRoles || []);

  useEffect(() => {
    setEditData((prev) => ({
      ...prev,
      targetRoles: roles,
    }));
  }, [roles, setEditData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditData((prev) => ({
        ...prev,
        profilePic: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddRole = () => addRole();
  const handleRemoveRole = (role) => removeRole(role);

  return (
    <>
      <div className="text-center mb-4">
        <div
          onClick={() => fileInputRef.current.click()}
          style={{
            cursor: "pointer",
            position: "relative",
            display: "inline-block",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "#2d343f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
              overflow: "hidden",
              border: "3px solid #2575fc",
            }}
          >
            {editData?.profilePic ? (
              <img
                src={editData.profilePic}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              editData?.name?.charAt(0).toUpperCase()
            )}
          </div>

          <div className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-1 px-2 small">
            <FaPlus size={10} color="white" />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>

      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label className="small">Full Name</Form.Label>
            <Form.Control
              className="bg-dark text-white border-secondary shadow-none"
              value={editData?.name || ""}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </Col>

          <Col md={6}>
            <Form.Label className="small">Experience Level</Form.Label>
            <Form.Select
              className="bg-dark text-white border-secondary shadow-none"
              value={editData?.experienceLevel || ""}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, experienceLevel: e.target.value }))
              }
            >
              {(experienceOptions || []).map((level, i) => (
                <option key={i} value={level}>
                  {level}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label className="small">Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            className="bg-dark text-white border-secondary shadow-none"
            value={editData?.bio || ""}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, bio: e.target.value }))
            }
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label className="small">Target Roles</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control
              placeholder="Press Enter to add role"
              className="bg-dark text-white border-secondary shadow-none"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addRole();
                }
              }}
            />
            <Button variant="primary" onClick={handleAddRole}>
              <FaPlus />
            </Button>
          </div>
        </Form.Group>

        <div className="d-flex flex-wrap gap-2 mb-3">
          {roles.length === 0 ? (
            <small className="text-muted">No roles added</small>
          ) : (
            roles.map((role, i) => (
              <Badge
                key={i}
                bg="secondary"
                className="p-2 fw-normal d-flex align-items-center gap-2"
              >
                {role}
                <FaTimes
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRemoveRole(role)}
                />
              </Badge>
            ))
          )}
        </div>
      </Form>
    </>
  );
};

export default Editprofile;