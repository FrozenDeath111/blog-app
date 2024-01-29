import { useState } from "react";
import { useRegister } from "../../customHooks/useRegister";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { register, error, isLoading } = useRegister();

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(email, name, password);

        await register(email, name, password);
    }

    return (
        <div>
            <form className="register" onSubmit={handleSubmit}>
            <input 
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email} 
            />
            <input 
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name} 
            />
            <input 
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password} 
            />
            <button disabled={isLoading} type="submit">Register</button>
            {
                error && <div className="error">{error}</div>
            }
            </form>
        </div>
    );
};

export default Register;