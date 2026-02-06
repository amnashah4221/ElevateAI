import { Container } from "react-bootstrap";
import './footerlinks.css';
import SimpleNavbar from "../components/simplenavbar";
import Footer from "../components/footer";

const Termspage = () => {
    return (
        <>
            <SimpleNavbar/>
            <div style={{ marginTop: "80px", backgroundColor: "#111621" }} className="py-5">
                <Container className="d-flex justify-content-center">
                    <div className="card p-4" style={{
                        maxWidth: "800px",
                        border: "1px solid #747475",
                        borderRadius: "15px",
                        backgroundColor: "#121825",
                        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)",
                        color: "#c4c6cb"
                    }}>
                        <h1 style={{ fontSize: "44px", fontWeight: "bolder", marginBottom: "20px", color: "#f0f2f5" }}>Terms of Service</h1>
                        <h4 style={{ fontSize: "18px", marginBottom: "20px" }}>Last updated: January 2025</h4>

                        <ol>
                            <li>
                                <h3 style={{ fontSize: "25px", marginTop: "20px", marginBottom: "20px", color: "#f0f2f5" }}>Acceptance of Terms</h3>
                                <p>By accessing or using ElevateAI's resume intelligence platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                            </li>

                            <li>
                                <h3 style={{ fontSize: "25px", marginTop: "20px", marginBottom: "20px", color: "#f0f2f5" }}>Description of Service</h3>
                                <p>ElevateAI provides an AI-powered resume analysis and optimization platform that includes:</p>
                                <ul>
                                    <li>ATS (Applicant Tracking System) compatibility scoring</li>
                                    <li>Skill gap analysis and recommendations</li>
                                    <li>AI-generated interview question preparation</li>
                                    <li>Resume version comparison and tracking</li>
                                    <li>Career progress analytics</li>
                                </ul>
                            </li>

                            <li>
                                <h3 style={{ fontSize: "25px", marginTop: "20px", marginBottom: "20px", color: "#f0f2f5" }}>User Accounts</h3>
                                <p>To access certain features, you must create an account. You are responsible for:</p>
                                <ul>
                                    <li>Maintaining the confidentiality of your account credentials</li>
                                    <li>All activities that occur under your account</li>
                                    <li>Providing accurate and complete information</li>
                                    <li>Notifying us immediately of any unauthorized access</li>
                                </ul>
                            </li>

                            <li>
                                <h3 style={{ fontSize: "25px", marginTop: "20px", marginBottom: "20px", color: "#f0f2f5" }}>Acceptable Use</h3>
                                <p>You agree not to:</p>
                                <ul>
                                    <li>Upload false, misleading, or fraudulent resume information</li>
                                    <li>Use the service for any illegal purposes</li>
                                    <li>Attempt to reverse engineer or extract our AI algorithms</li>
                                    <li>Share your account with others or create multiple accounts</li>
                                    <li>Interfere with the proper functioning of the platform</li>
                                </ul>
                            </li>

                            <li>
                                <h3 style={{ fontSize: "25px", marginTop: "20px", marginBottom: "20px", color: "#f0f2f5" }}>Intellectual Property</h3>
                                <p>You retain ownership of your resume content. By uploading content to ElevateAI, you grant us a limited license to process and analyze your documents for the purpose of providing our services. Our AI analysis, recommendations, and platform technology remain our intellectual property.</p>
                            </li>

                            <li>
                                <h3 style={{ fontSize: "25px", marginTop: "20px", marginBottom: "20px", color: "#f0f2f5" }}>Disclaimer of Warranties</h3>
                                <p>ElevateAI provides its services "as is" without warranties of any kind. While we strive to provide accurate ATS scoring and recommendations, we cannot guarantee job interview invitations or employment outcomes. Our AI analysis is meant to be a tool to assist you, not a guarantee of success.</p>
                            </li>

                            <li>
                                <h3 style={{ fontSize: "25px", marginTop: "20px", marginBottom: "20px", color: "#f0f2f5" }}>Limitation of Liability</h3>
                                <p>ElevateAI shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service, including but not limited to lost opportunities, lost data, or business interruption.</p>
                            </li>

                            <li>
                                <h3 style={{ fontSize: "25px", marginTop: "20px", marginBottom: "20px", color: "#f0f2f5" }}>Change to Terms</h3>
                                <p>We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the platform. Continued use after changes constitutes acceptance of the new terms.</p>
                            </li>
                        </ol>
                    </div>
                </Container>
            </div>
            <Footer/>
        </>
    );
}

export default Termspage;
