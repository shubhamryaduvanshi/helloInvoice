// MyContext.js
import { createContext, useReducer, useContext } from "react";
import merchantReducer from "../reducers/merchantReducer";

const initialState: any = {
  merchant_fullName: "",
  merchant_companyName: "Brand Name",
  merchant_address: "Mumbai, M.H",
  merchant_logo: "https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg",
  merchant_mobile: "7977241828",
  merchant_website: "www.google.com",
  merchant_signUrl: "https://www.digisigner.com/free-electronic-signature-software/resources/images/free/instruction/draw-e-signature.png",
  merchant_footNote: "Thank you for your business!",
};
const MerchantContext = createContext(initialState);

export const MerchantContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(merchantReducer, initialState);

  return (
    <MerchantContext.Provider value={{ state, dispatch }}>
      {children}
    </MerchantContext.Provider>
  );
};

export const useMerchantContext = () => useContext(MerchantContext);
