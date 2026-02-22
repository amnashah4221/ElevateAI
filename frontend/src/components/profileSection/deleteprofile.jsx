import {
  FaTrashAlt}
  from "react-icons/fa";
import {Button} from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Deleteprofile = () => {
  const navigate = useNavigate();
 const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action is permanent and cannot be undone!",
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("accessToken");

        const { data } = await axios.delete(
          "http://localhost:5000/api/auth/deleteaccount",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        toast.success(data.message || "Account deleted successfully");

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to delete account. Please try again.",
        );
      }
    }
  };
    return(
 <div
  className="p-2 w-100 shadow-lg mt-4" 
  style={{
    maxWidth: "850px",
    borderRadius: "20px",
    color: "#fff",
  }}
>
  <div className="d-flex align-items-center mb-3">
    <h4 className="fw-bold mb-0 text-danger">Danger Zone</h4>
  </div>

  <div
    className="p-2 rounded-3"
  >
    <div className="mb-3 text-center text-md-start">
      <p className="small mb-0">
        Once you delete your account, there is no going back. Please be certain before proceeding.
      </p>
    </div>

     <Button
      className="fw-bold py-2 w-100 bg-dark" 
      style={{
        borderRadius: "12px",
        border: "1px solid #dc3545",
        color: "#dc3545",
        fontSize: "0.95rem",
      }}
      onClick={handleDeleteAccount}
    >
      <FaTrashAlt className="me-2" /> Delete My Account
    </Button>
  </div>
</div>
    )
}

export default Deleteprofile;