import { ProductListItemType } from "../commonTypes";
import { CUSTOMER_ACTIONS } from "../enums";



// reducer.js
const customerReducer = (state: any, action: any) => {

    const getSubTotalAmount = () => {
        let subTotalAmt = 0;
        state.customer_product_list_items.forEach((element: ProductListItemType) => {
            subTotalAmt = subTotalAmt + element.totalPrice
        })
        return subTotalAmt;
    }

    const getTotalAmount = (subtotal: number, taxRatePercent: number) => {
        console.log({ subtotal, taxRatePercent });

        const taxRateDecimal = taxRatePercent / 100;
        const totalAmount = subtotal + subtotal * taxRateDecimal;
        console.log(totalAmount);

        return totalAmount;
    }


    switch (action.type) {
        case CUSTOMER_ACTIONS.SET_FULL_NAME:
            return {
                ...state,
                customer_fullName: action.payload
            }
        case CUSTOMER_ACTIONS.SET_INVOICE_DATE:
            return {
                ...state,
                customer_inv_date: action.payload
            }

        case CUSTOMER_ACTIONS.SET_ADDRESS:
            return {
                ...state,
                customer_address: action.payload
            }
        case CUSTOMER_ACTIONS.SET_MOBILE_NO:
            return {
                ...state,
                customer_mobile: action.payload
            }
        case CUSTOMER_ACTIONS.SET_INVOICE_NO:
            return {
                ...state,
                customer_inv_no: action.payload
            }
        case CUSTOMER_ACTIONS.SET_PRODUCT_LIST_ITEMS:
            return {
                ...state,
                customer_product_list_items: [...state.customer_product_list_items, action.payload]
            }

        case CUSTOMER_ACTIONS.REMOVE_PRODUCT_FROM_LIST:
            return {
                ...state,
                customer_product_list_items: state.customer_product_list_items.filter((item: ProductListItemType) => item.id !== action.payload)
            }

        case CUSTOMER_ACTIONS.SET_SUBTOTAL_AMOUNT:
            return {
                ...state,
                customer_sub_total_amt: getSubTotalAmount()
            }

        case CUSTOMER_ACTIONS.SET_TAX_PERCENTAGE:
            return {
                ...state,
                customer_tax_percent: action.payload
            }

        case CUSTOMER_ACTIONS.SET_TOTAL_AMOUNT:
            return {
                ...state,
                customer_total_amt: getTotalAmount(state.customer_sub_total_amt, state.customer_tax_percent)
            }

        default:
            return state;
    }
};

export default customerReducer;
