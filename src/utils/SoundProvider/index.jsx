import { useEffect } from "react"

export default function AudioProvider({children}) {

    useEffect(() => {

        const audio = new Audio()
    }, []);
    
  return (
    <div>
        {children}
    </div>
  )
}
