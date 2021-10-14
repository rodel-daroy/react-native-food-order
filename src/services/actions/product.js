import { PRODUCT_DESCRIPTION, PRODUCT_ID, PRODUCT_NAME, PRODUCT_QUANTITY, PRODUCT_TOTALPRICE, RESET_PRODUCT } from "../type";

export const productId = (pId) => {
    return {
        type: PRODUCT_ID,
        pId
    };
}

export const productQuantity = (pQuantity) => {
    return {
        type: PRODUCT_QUANTITY,
        pQuantity
    };
}

export const productName = (pName) => {
    return {
        type: PRODUCT_NAME,
        pName
    };
}

export const productDescription = (pDescription) => {
    return {
        type: PRODUCT_DESCRIPTION,
        pDescription
    };
}

export const productTotalPrice = (pTotalPrice) => {
    return {
        type: PRODUCT_TOTALPRICE,
        pTotalPrice
    };
}

export const resetProduct = () => {
    return {
        type: RESET_PRODUCT
    };
}