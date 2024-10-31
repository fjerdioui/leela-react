import { useState } from 'react';
import { supabase } from '../supabaseConfig'; // Import Supabase configuration

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        const { error } = await supabase.auth.signIn({ email, password });
        if (error) {
            setError(error.message);
        } else {
            console.log('User signed in successfully');
            // Redirect to a different page or perform other logic
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
