import { Container} from "react-bootstrap";
import './footerlinks.css'
import SimpleNavbar from "../components/simplenavbar";
import Footer from "../components/footer";

const Privacypolicypage = () => {
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
                        <h1 style={{ fontSize: "44px", fontWeight: "bolder", marginBottom: "20px", color: "#f0f2f5" }}>Privacy Policy</h1>
                        <h4 style={{ fontSize: "18px", marginBottom: "20px" }}>Last updated: January 2025</h4>

                        <ol>
                            <li>
                                <h3 style={{ fontSize: "25px", marginTop: "20px", marginBottom: "20px", color: "#f0f2f5" }}>Information We Collect</h3>
                                <p>At ElevateAI, we collect information you provide directly to us, including:</p>
                                <ul>
                                    <li>Account information (name, email address, password)</li>
                                    <li>Resume content and documents you upload</li>
                                    <li>Job preferences and target roles</li>
                                    <li>Interview practice responses and recordings (if enabled)</li>
                                    <li>Usage data and analytics</li>
                                </ul>
                            </li>

                            <li>
                                <h3 style={{ fontSize: "25px", marginTop: "20px", marginBottom: "20px", color: "#f0f2f5" }}>How We Use Your Information</h3>
                                <p>We use the information we collect to:</p>
                                <ul>
                                    <li>Provide, maintain, and improve our AI-powered resume analysis services</li>
                                    <li>Generate personalized recommendations and skill gap analysis</li>
                                    <li>Create tailored interview questions based on your resume and target roles</li>
                                    <li>Track your progress and provide analytics</li>
                                    <li>Send you updates and promotional communications (with your consent)</li>
                                </ul>
                            </li>

                            <li>
                                <h3 style={{ fontSize: "25px", marginTop: "20px", marginBottom: "20px", color: "#f0f2f5" }}>Data Security</h3>
                                <p>We implement industry-standard security measures to protect your personal information. Your resume data is encrypted both in transit and at rest. We regularly audit our security practices and never share your resume content with third parties without your explicit consent.</p>
                            </li>

                            <li>
                                <h3 style={{ fontSize: "25px", marginTop: "20px", marginBottom: "20px", color: "#f0f2f5" }}>Data Retention</h3>
                                <p>We retain your information for as long as your account is active or as needed to provide you services. You can request deletion of your data at any time through your account settings or by contacting us.</p>
                            </li>

                            <li>
                                <h3 style={{ fontSize: "25px", marginTop: "20px", marginBottom: "20px", color: "#f0f2f5" }}>Your Rights</h3>
                                <p>You have the right to:</p>
                                <ul>
                                    <li>Access and download your personal data</li>
                                    <li>Correct inaccurate information</li>
                                    <li>Delete your account and associated data</li>
                                    <li>Opt out of marketing communications</li>
                                    <li>Export your resume analysis history</li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                </Container>
            </div>
                <Footer/>
        </>
    );
}

export default Privacypolicypage;
