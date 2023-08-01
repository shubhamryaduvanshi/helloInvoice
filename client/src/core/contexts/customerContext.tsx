// MyContext.js
import { createContext, useReducer, useContext } from "react";
import customerReducer from "../reducers/customerReducer";
import { formateDate } from "../utility";

const initialState: any = {
    customer_fullName: "Dwayene Clark",
    customer_address: "4567 Ross Street, Herminie,United States,25656",
    customer_mobile: "7977241858",
    customer_inv_no: 'I5N65',
    customer_inv_date: formateDate(new Date()),
    customer_product_list_items: [],
    customer_sub_total_amt: 0,
    customer_tax_percent: 0,
    customer_total_amt: 0
};
const CustomerContext = createContext(initialState);

export const CustomerContextProvider = ({ children }: any) => {
    const [customerState, customerDispatch] = useReducer(customerReducer, initialState);

    return (
        <CustomerContext.Provider value={{ customerState, customerDispatch }}>
            {children}
        </CustomerContext.Provider>
    );
};

export const useCustomerContext = () => useContext(CustomerContext);
