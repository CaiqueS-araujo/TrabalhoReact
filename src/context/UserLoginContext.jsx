import { createContext, useState } from "react";

    export const UserLoginContext = createContext();

 export function UserLoginContextProvider({children}) {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
   
    return (
     <div>
            <UserLoginContext.Provider value = {{username, setUsername, password, setPassword}}>
                {children}
            </UserLoginContext.Provider>
     </div>
   )
 }
 