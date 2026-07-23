import { useEffect, useState } from "react";
import { saveTag } from "../utils/secureStoreage";

export default function CheckStorage() {
    const mySecret = "super-secure-user-passphrase";
    // const uuid = crypto.randomUUID();
    
    const sensitiveTag = { id: Date.now(), name: "Offshore Account", balance: 500000 };
    const [tags, setTags] = useState([]);

    // useEffect(()=>{

    // },[])

    const handleClick = async () => {
        try {
            await saveTag(sensitiveTag.id, sensitiveTag, mySecret);
        } catch (err) {
            console.warn("Error on Tag create ", err);
        }
    };


    return (
        <div className="flex p-3 h-screen overflow-hidden bg-white text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-white">
            <button onClick={handleClick}>Click</button>
        </div>
    )
}