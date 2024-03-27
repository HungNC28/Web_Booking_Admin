import "./Login.css";
import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../../utils/const";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const clickHandle = async () => {
        try {
            const response = await fetch(`${BASE_URL}/admin/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.status === 401) {
                alert("Password or username is not correct");
            }
            if (response.status === 200) {
                alert("Logged in successfully");
                navigate("admin/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="loginContainer">
            <div className="loginCard">
                <h1>Login</h1>
                <Form method="post">
                    <input
                        className="loginInput"
                        placeholder="Username"
                        type="text"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="loginInput"
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="loginBtn"
                        type="submit"
                        onClick={clickHandle}
                    >
                        Login
                    </button>
                </Form>
            </div>
        </div>
    );
}
