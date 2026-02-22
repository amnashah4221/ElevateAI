import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import Editprofile from "./editprofile";
import Changepassword from "./changepassword";
import Deleteprofile from "./deleteprofile";

const Editmodal = ({
  showModal,
  setShowModal,
  editData,
  setEditData,
  userData,
  setUserData,
  experienceOptions,
}) => {

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const payload = {
        name: editData.name || "",
        bio: editData.bio || "",
        experienceLevel: editData.experienceLevel || "",
        targetRoles: editData.targetRoles || [],
        profilePic: editData.profilePic || "",
      };

      const { data } = await axios.put(
        "http://localhost:5000/api/auth/updateprofile",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUserData(data);
      setShowModal(false);
      toast.success("Profile updated successfully");

    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) toast.error("Session expired. Please login again.");
      else toast.error("Failed to update profile");
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      size="lg"
      contentClassName="bg-dark text-white border-secondary rounded-4 shadow"
    >
      <Modal.Header closeButton closeVariant="white" className="border-0 px-4 pt-4">
        <Modal.Title className="fw-bold">Edit Profile</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4">
        <Editprofile
          editData={editData}
          setEditData={setEditData}
          userData={userData}
          setUserData={setUserData}
          experienceOptions={experienceOptions}
        />

        <Modal.Footer className="border-0 px-0 mt-2">
          <Button
            variant="primary"
            className="w-100 rounded-pill fw-bold py-2 shine-btn"
            onClick={handleSave}
          >
            Save Changes <span className="shine"></span>
          </Button>
        </Modal.Footer>

        <Changepassword />
        <Deleteprofile setUserData={setUserData} />
      </Modal.Body>
    </Modal>
  );
};

export default Editmodal;