import React, {createContext, useState, useContext} from "react";
import Home from "../components/home";
import AppBar from "../components/AppBar";
import Login from "../components/Login";

export const AuthContext = createContext(undefined);

export default function AuthSystem(){
    const [useContextApi, setUseContextApi] = useState(false);
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (newUsername) => {
        setUsername(newUsername);
        setIsLoggedIn(true);
    }


    const logout = () =>{
        setUsername('');
        setIsLoggedIn(false);
    }

    const contextValue = useContextApi ? { username, isLoggedIn, login, logout } : undefined;

    return (
        <AuthContext.Provider value={contextValue}>
            <div style={{minHeight: '100vh', display:'flex', flexDirection:'column'}}>
                <AppBar
                    username={username}
                    isLoggedIn={isLoggedIn}
                    logout={logout}
                />
                <div style={{display: 'flex', alignItems:'center', gap: '0.5rem'}}>
                    <input 
                      id="use-context-api"
                      type="checkbox"
                      checked={useContextApi}
                      onChange={(e)=>setUseContextApi(e.target.checked)}
                    />
                    <label htmlFor="use-context-api">
                        Use Context Api: {useContextApi? 'on':'off'}
                    </label>
                </div>
            </div>
            <main style={{flex: 1, padding: '1rem'}}>
                {isLoggedIn ? (
                    <Home />
                ) : (
                    <Login onLogin={login} />
                )}
            </main>
        </AuthContext.Provider>
    )
}