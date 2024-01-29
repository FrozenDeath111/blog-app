import { useState } from "react";
import { useLogin } from "../../customHooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();

    const handleSubmit = async (event) => {
        event.preventDefault();

        await login(email, password);
    }

    return (
        <div>
            <form className="login" onSubmit={handleSubmit}>
            <input 
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email} 
            />
            <input 
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password} 
            />
            <button disabled={isLoading} type="submit">Login</button>
            {
                error && <div className="error">{error}</div>
            }
            </form>
        </div>
    );
};

export default Login;