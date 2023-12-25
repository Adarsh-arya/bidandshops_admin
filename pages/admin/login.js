// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from 'next/router';
// import authlayout to override default layout
import AuthLayout from "layouts/AuthLayout";
import { useState } from "react";
import makeApi from "lib/makeApi";
import { errorToast, showAsyncToast, showAsyncToastError, showAsyncToastSuccess } from "lib/showToast";
import { setStorage } from "lib/storage";
import { replaceNavigateMe } from "lib/useRouter";

const Login = () => {
    const router = useRouter();
    const [inputs, setInputs] = useState({ "uname": "", "pass": "" });

    const handelInput = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const makeApicall = async () => {
        const id = showAsyncToast("Verifying...")
        console.log(id);
        try {

            const response = await makeApi('/api/admin/login', 'POST', {
                "userinfo": inputs.uname,
                "pass": inputs.pass,
            });
            if (response.success == true) {
                setStorage('auth', response.token);
                showAsyncToastSuccess(id, "Login Successful Redirecting...")
                replaceNavigateMe(router, "/admin");
            } else {
                showAsyncToastError(id, response.error || "Something Want Wrong...")
            }
        } catch (error) {
            showAsyncToastError(id, error.response?.data.error || error.toString())
        }

    }

    const sendRequest = () => {
        if (inputs.uname.trim().length == 0 && inputs.pass.trim().length == 0) {
            errorToast("Please Enter ID Or PAssword");
        } else {
            makeApicall();
        }
    }

    return (
        <Row className="align-items-center justify-content-center g-0 min-vh-100">
            <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
                {/* Card */}
                <Card className="smooth-shadow-md">
                    {/* Card body */}
                    <Card.Body className="p-6">
                        <div className="mb-4">
                            <h3><b>BID & SHOPS ADMIN</b></h3>
                            <p className="mb-6">Please enter your user information.</p>
                        </div>
                        {/* Form */}
                        <Form onSubmit={(e) => e.preventDefault()}>
                            {/* Username */}
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username or email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="uname"
                                    placeholder="Enter address here"
                                    required
                                    value={inputs.uname}
                                    onChange={(e) => handelInput(e)}
                                />
                            </Form.Group>

                            {/* Password */}
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="pass"
                                    placeholder="**************"
                                    required
                                    value={inputs.pass}
                                    onChange={(e) => handelInput(e)}
                                />
                            </Form.Group>

                            <br />
                            <div>
                                {/* Button */}
                                <div className="d-grid">
                                    <Button variant="primary" type="submit" onClick={sendRequest}>
                                        Sign In
                                    </Button>
                                </div>

                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

Login.Layout = AuthLayout;

export default Login;
