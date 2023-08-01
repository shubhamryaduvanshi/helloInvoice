import { MERCHANT_ACTIONS } from "../enums";

// reducer.js
const merchantReducer = (state: any, action: any) => {
    switch (action.type) {

        case MERCHANT_ACTIONS.SET_FULL_NAME:
            return {
                ...state,
                merchant_fullName: action.payload
            }
        case MERCHANT_ACTIONS.SET_COMPANY_NAME:
            return {
                ...state,
                merchant_companyName: action.payload
            }
        case MERCHANT_ACTIONS.SET_LOGO_URL:
            return {
                ...state,
                merchant_logo: action.payload
            }
        case MERCHANT_ACTIONS.SET_ADDRESS:
            return {
                ...state,
                merchant_address: action.payload
            }
        case MERCHANT_ACTIONS.SET_MOBILE_NUMBER:
            return {
                ...state,
                merchant_mobile: action.payload
            }
        case MERCHANT_ACTIONS.SET_WEBSITE_URL:
            return {
                ...state,
                merchant_website: action.payload
            }
        case MERCHANT_ACTIONS.SET_FOOTNOTE:
            return {
                ...state,
                merchant_footNote: action.payload
            }

        case MERCHANT_ACTIONS.SET_SIGNATURE_URL:
            return {
                ...state,
                merchant_signUrl: action.payload
            }

        default:
            return state;
    }
};

export default merchantReducer;
