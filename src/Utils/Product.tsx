import {API} from "./Contants";
import {axiosGet, axiosPostV1, axiosPutEx, yourErrorHandler} from "./Axios";
import {
    RequestResult, RequestResultCheckProduct,
    RequestResultEx,
    RequestResultOld, RequestResultPage
} from "./RequestResult";
import {Error} from "../Utils/Error"
import {getData} from "./Storage";

const qcCheckoutFabric = API + "/api/qcCheckoutFabric";
const audit = API + "/api/qcCheckoutFabric/vouch";
const batch = API + "/api/productHandbookInv/batch";
const proBleadyeRunJob = API + "/api/proFinalProductCard";
const whsCarriageStorage = API + "/api/whsCarriageStorage";
const proFinalProductCard = API + "/api/proFinalProductCard";
const whseFinishedFabricShot = API + "/api/whseFinishedFabricShot";
export const checkVatNoImp = async (vatNo: string) => {
    if (vatNo == null && vatNo == "" && vatNo == undefined) {
        return
    }
    let requestValue = vatNo.split(":")[0]
    let version = vatNo.split(":")[1]
    if (requestValue == null || version == null) {
        return RequestResultEx(false, Error["225"]);
    }
    try {
        let result = await axiosGet(qcCheckoutFabric, {vatNo: requestValue, isPrinted: true, prodType: 1});
        // @ts-ignore
        if (result[0].verId != version) {
            return RequestResultEx(false, Error["226"]);// Phiên bản hiện tại không phải mới nhất
        }
        // kiểm tra trong danh sách kho nhập kho
        // @ts-ignore
        let qcList = result[0].fabricDtls
        let whse = await axiosGet(whseFinishedFabricShot, {vatNo: requestValue});
        console.log(whse)
        // @ts-ignore
        let whseList: any[] = [];
        // @ts-ignore
        whse.map((e: any, _) => {
            whseList.push(e);
        })
        // kiểm tra trong danh sách kho xem có thông tin xuất kho không ?
        let scanImport: any[] = [];
        let diffList: { pidNo: any; err: string; }[] = [];
        qcList.map((e: any, _: number) => {
            let pos = whseList.findIndex((item: any) => Number(item.productNo.slice(-3)) == e.pidNo)
            console.log(pos, e, whseList[pos])
            if (pos == -1) {
                scanImport.push(e);
            } else {
                // @ts-ignore
                if (whseList[pos].fabricState != 7) {
                    scanImport.push(e);
                } else {
                    // @ts-ignore
                    if (e.netWeight != whseList[pos].netWeight) {
                        diffList.push({pidNo: e.pidNo, err: "Trọng lượng thay đổi"})
                    }
                    // if (e.yardLength != whseList[pos].yardLength) {
                    //     diffList.push({pidNo: pos, err: "Chiều dài thay đổi"})
                    // }
                }
            }

        })
        if (diffList.length > 0) {
            return RequestResultEx(false, Error["224"]);
        }
        return {result: true, data: scanImport, msg: "ok"};
        // if (result.data)
        //     return RequestResultOld(Object.assign({
        //         data: result,
        //         optionId: 11,
        //         dataSend: JSON.stringify({vatNo: vatNo, isPrinted: true, prodType: 1}),
        //         apiName: qcCheckoutFabric
        //     }));
    } catch (e) {
        let msg = yourErrorHandler(e);
        return RequestResultEx(false, msg);
    }
};

export const checkProduct = async (val: string) => {
    if (val == null || val == "" || val == undefined) {
        return;
    }
    try {
        let pResult = await axiosGet(proFinalProductCard, {
            cardType: 1,
            isPrinted: true,
            delFlag: false,
            productNo: val
        });
        console.log(pResult);
        return RequestResultCheckProduct(pResult);
    } catch (e) {
        let msg = yourErrorHandler(e);
        return RequestResultEx(false, msg);
    }
}

export const changeAudit = async (data: any, type: number) => {
    console.log("fata", data);
    if (data.checkoutId == null && data.checkoutId == "" && data.checkoutId == undefined) {
        return;
    }
    if (data.vatNo == null && data.vatNo == "" && data.vatNo == undefined) {
        return;
    }

    let params = {
        checkoutId: data.checkoutId,
        vatNo: data.vatNo,
        whseVouch: type,
        whseVouchTime: "2022-10-10 16:14:01",
        whseVoucher: 100001,
        UserName: 100001
    };
    console.log("f fata", params);

    try {
        let result = await axiosPutEx(audit, params);
        return RequestResult(Object.assign(result, {
            data: result,
            optionId: 11,
            dataSend: params,
            apiName: audit,
            note: "PUT"
        }));
    } catch (e) {
        let msg = yourErrorHandler(e);
        return RequestResultEx(false, msg);
    }
};

export const getImportDetail = async (vat: string) => {
    if (vat != null && vat != "" && vat != undefined) {
        try {
            let result = await axiosGet(proBleadyeRunJob + "/page", {
                vatNo: vat,
                degFlag: 0,
                isPrinted: 1,
                cardType: 1,
                rows: 300,
                start: 1
            });
            console.log(result);
            return RequestResultPage(result);
        } catch (e) {
            let msg = yourErrorHandler(e);
            return RequestResultEx(false, msg);
        }
    }
};

export const checkPallet = async (pallet: string) => {
    if (pallet == null && pallet == "" && pallet == undefined) {
        return;
    }
    try {
        let result = await axiosGet(whsCarriageStorage, {storageCode: pallet});
        return RequestResultOld(Object.assign({data: result}));
    } catch (e) {
        let msg = yourErrorHandler(e);
        return RequestResultEx(false, msg);
    }
};

export const checkExist = async (code: string) => {
    if (code.trim() == null || code.trim() == "" || code.trim() == undefined || code.trim().length == 0) {
        return RequestResultEx(false, Error["223"]);
    }
    try {
        let result = await axiosGet(whseFinishedFabricShot, {productNo: code});
        if (result.length == 0) {
            return RequestResultEx(false, Error["203"]);
        }
        return {result: true, data: result, msg: null};
    } catch (e) {
        let msg = yourErrorHandler(e);
        return RequestResultEx(false, msg);
    }
};

export const InvBatch = async (list: any[], pallet: string, local: string) => {
    let user = await getData('userLogin');
    if (user == undefined) {
        user = ""
    }
    let arr: { cardId: any; productNo: any; netWeight: any; grossWeight: any; yardLength: any; vatNo: any; netWeightLbs: string; grossWeightLbs: string; dataMatch: number; invUser: string | undefined; invFlag: number; invStoreLoadCode: string; invLocationCode: string; }[] = [];
    list.map((e, _) => {
        let object = {
            cardId: e.id,
            productNo: e.productNo,
            netWeight: e.netWeight,
            grossWeight: e.grossWeight,
            yardLength: e.yardLength,
            vatNo: e.vatNo,
            netWeightLbs: Number(e.netWeight * 2.2046).toFixed(1),
            grossWeightLbs: Number(e.grossWeight * 2.2046).toFixed(1),
            dataMatch: 2,
            invUser: user,
            invFlag: 1,
            invStoreLoadCode: pallet,
            invLocationCode: local
        }
        arr.push(object)
    })
    try {
        let result = await axiosPostV1(batch, JSON.stringify(arr));
        return RequestResult(result)
    } catch (e) {
        let msg = yourErrorHandler(e);
        return RequestResultEx(false, msg);
    }
}

