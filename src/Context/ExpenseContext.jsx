import { createContext, ReactNode, useContext, useState } from "react";

const trackerContext = createContext(null);

export default function TrackerContextProvider({children}) {
    const [allData, setAllData] = useState([]);
    // const [income, setIncome] = useState<number>();
    // const [expense, setExpense] = useState<number>();
    const trackData = (data) => {
        setAllData(data);
    }
    // console.log(allData);
    return (
        <trackerContext.Provider value={{ allData, trackData }}>
            {children}
        </trackerContext.Provider>
    );
}

export const UsetrackerContext = () => useContext(trackerContext);