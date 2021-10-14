import { PRODUCT_DESCRIPTION, PRODUCT_ID, PRODUCT_NAME, PRODUCT_QUANTITY, PRODUCT_TOTALPRICE, RESET_PRODUCT } from "../type";

const initialState = {
    pId: 0,
    pQuantity: 0,
    pName: '',
    pDescription: '',
    pTotalPrice: 0,
    pIds: [],
    pQuantities: [],
    pNames: [],
    pDescriptions: [],
    pTotalPrices: []
};

const product = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_ID:
            return {
                ...state,
                pIds: state.pIds.concat({
                    value: action.pId
                })
            };
        case PRODUCT_QUANTITY:
            return {
                ...state,
                pQuantities: state.pQuantities.concat({
                    value: action.pQuantity
                })
            };
        case PRODUCT_NAME:
            return {
                ...state,
                pNames: state.pNames.concat({
                    value: action.pName
                })
            };
        case PRODUCT_DESCRIPTION:
            return {
                ...state,
                pDescriptions: state.pDescriptions.concat({
                    value: action.pDescription
                })
            };
        case PRODUCT_TOTALPRICE:
            return {
                ...state,
                pTotalPrices: state.pTotalPrices.concat({
                    value: action.pTotalPrice
                })
            };

        case RESET_PRODUCT:
            return initialState;
        default:
            return state;
    }
}

export default product;