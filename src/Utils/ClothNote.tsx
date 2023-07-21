import {API} from "./Contants";
import {axiosGet, axiosPost1, axiosPut, yourErrorHandler} from "./Axios";
import {
    DontFindResultId, exportResult,
    RequestResult, RequestResultAll,
    RequestResultEx,
    RequestResultOld,
    RequestResultPage,
    RequestResultW
} from "./RequestResult";
import {Error} from "./Error";
import {getData} from "./Storage";

const proClothNote = API + "/api/proClothNote";
const URL = API + "/api/proClothNote/page";
const stockOutInspect = API + "/api/proBleadyeRunJobCalico/stockOutInspect";
const whsePartition = API + "/api/whsePartition/page";
const whseLocation = API + "/api/whseLocation";
const update = API + "/api/proClothNote/invBatch";
const runJob = API + "/api/proBleadyeRunJob";
const proWeaveJob = API + "/api/proWeaveJob";
const whseMaterial = API + "/api/whseMaterial";
const stockOut = API + "/api/proBleadyeRunJobCalico/stockOut"
const whseCalicoin = API + "/api/whseCalicoin/ware"
const whseNot = API + "/api/whseCalicoin/whseNot"
const clothNoteInStorage = API + "/api/clothNoteInStorage";
const clothNoteOutStorage = API + "/api/clothNoteOutStorage/page";
const proClothNoteHis = API + "/api/proClothNoteHis"
const proClothNoteInvHis = API + "/api/proClothNoteInvHis"
const whseCalicoinDtlb = API + "/api/whseCalicoinDtlb/v1.0/list"
const wareOutbound = API + "/api/whseCalicoin/wareOutbound"


export const postExportCloth = async (list: any[], target: number, actual: number, vatNo: string) => {
    if (Number(actual) - Number(target) > 15) {
        return {success: false, error: Error["217"]}
    }
    try {
        let user = await getData('userLogin');
        console.log(user)
        let arrPost: { clothNoteCode: any; clothNoteId: any; clothWeight: any; isFabric: boolean; sn: number; }[] = [];
        list.map((e, i) => {
            arrPost.push({
                clothNoteCode: e.noteCode,
                clothNoteId: e.id,
                clothWeight: e.clothWeight,
                isFabric: e.fabric == true,
                sn: i + 1,
            })
        });
        console.log(arrPost)
        let data = await axiosPost1(stockOut + `?user=${user}&vatNo=${vatNo}`, arrPost)
        console.log(data)
        if (data.code == 200) {
            return {success: true, msg: data.msg};
        }
        let err = Error["400"];
        err.massage = data.msg;
        return {success: false, error: err};
    } catch (e) {
        let err = Error["301"];
        err.massage = e.toString();
        return {success: false, error: err};
    }
}

export const postInWhse = async (list: any, deliNo: string, storeLoadCode: string, locationCode: string, outworkFlag: number) => {
    try {
        outworkFlag = (outworkFlag == undefined || outworkFlag == null) ? 0 : outworkFlag
        let res = await axiosPost1(whseCalicoin + "?deliNo=" + deliNo + "&storeLoadCode=" + storeLoadCode + "&locationCode=" + locationCode + "&outworkFlag=" + outworkFlag, list)
        return RequestResult(res);
    } catch (e) {
        let msg = yourErrorHandler(e);
        return RequestResultEx(false, msg);
    }
}

export const historyCLoth = async (noteCode: string) => {
    try {
        let resultArray: number | any[] = [];
        let checkCloth = await axiosGet(proClothNote, {noteCode: noteCode});
        if (checkCloth.length == 0) {
            let err = Error["203"];
            return {result: false, data: [], msg: err}
        }
        let imp = await axiosGet(clothNoteInStorage, {noteCode: noteCode});
        let oup = await axiosGet(clothNoteOutStorage, {custTicket: `${noteCode}%`});
        // @ts-ignore
        let his = await axiosGet(proClothNoteHis, {clothNoteFk: checkCloth[0].noteId})
        // @ts-ignore
        let hisInv = await axiosGet(proClothNoteInvHis, {clothNoteFk: checkCloth[0].noteId})

        imp.map((e, i) => {
            resultArray.push(object(1, "NHẬP KHO", e.yinDate, e.storeLoadCode, e.weight, e.locationCode))
        });
        oup.records.map((e, i) => {
            let t = (e.custTicket == noteCode) ? "XUẤT KHO TOÀN BỘ" : "CẮT VẢI XUẤT KHO";
            resultArray.push(object(3, t, e.retDate, "", e.weight, ""))
        });

        hisInv.map((e, i) => {
            resultArray.push(object(2, "KIỂM KHO", e.invDate, e.invStoreLoadCode, e.clothWeight, e.invLocationCode))
        });
        his.map((e, i) => {
            if (e.clothState != 0) {
                if (resultArray.findIndex((el) => el.time == e.createTime) == -1) {
                    resultArray.push(object(0, "QC CHỈNH SỬA", e.createTime, e.storeLoadCode, e.clothWeight, ""))
                }
            }
        });
        resultArray.sort((a, b) => {
            return a.time > b.time ? 1 : -1
        })
        return {result: true, data: resultArray, msg: null}
    } catch (e) {
        let msg = yourErrorHandler(e);
        return RequestResultEx(false, msg);
    }
}

const object = (type: number, title: string, time: string, pallet: string, weight: string, location: string) => {
    return {
        type: type,
        title: title,
        time: time,
        pallet: pallet,
        weight: weight,
        location: location,
    }
}

export const getClothNoteInfo = async (noteCode: string) => {
    if (noteCode != null && noteCode != "" && noteCode != undefined) {
        try {
            let respone = await axiosGet(proClothNote, {noteCode: noteCode})
            return RequestResultAll(Object.assign({data: respone}));
        } catch (e) {
            let msg = yourErrorHandler(e);
            return RequestResultEx(false, msg);
        }
    }
}
export const CheckHadImport = async (noteCode: string) => {
    if (noteCode != null && noteCode != "" && noteCode != undefined) {
        try {
            let check = await axiosGet(wareOutbound, {noteCode: noteCode});
            if (check.code != 200) {
                console.log(check)
                let err = Error["400"];
                err.massage = check.msg;
                return {result: false, data: [], msg: err};
            }
            return {result: true, data: {no: check.msg, cloth: check.data}, msg: null};
        } catch (e) {
            let msg = yourErrorHandler(e);
            return RequestResultEx(false, msg);
        }
    }
}


export const putInventory = async (operator: number, object: any) => {
    try {
        let result = await axiosPut(update, object);
        result = Object.assign({
            optionId: operator,
            dataSend: JSON.stringify(object),
            apiName: "/api/proClothNote/invBatch"
        }, result);
        return RequestResult(result);
    } catch (e) {
        let msg = yourErrorHandler(e);
        return RequestResultEx(false, msg);
    }
};

export const checkExist = async (noteCode: string) => {
    if (noteCode != null && noteCode != "" && noteCode != undefined) {
        try {
            let result = await axiosGet(stockOutInspect, {clothNoteCode: noteCode});
            return RequestResult(result);
        } catch (e) {
            let msg = yourErrorHandler(e);
            return RequestResultEx(false, msg);
        }
    }
};

export const getPallet = async (palletCode: string) => {
    if (palletCode != null && palletCode != "" && palletCode != undefined) {
        try {
            let result = await axiosGet(URL, {invStoreLoadCode: palletCode, clothState: 2, rows: 200});
            return RequestResultPage(result);
        } catch (e) {
            let msg = yourErrorHandler(e);
            return RequestResultEx(false, msg);
        }
    }
};

export const getDeliNo = async (palletCode: string) => {
    if (palletCode != null && palletCode != "" && palletCode != undefined) {
        try {
            let result = await axiosGet(whseNot, {storeLoadCode: palletCode});
            return RequestResultAll(Object.assign({data: result}));
        } catch (e) {
            let msg = yourErrorHandler(e);
            return RequestResultEx(false, msg);
        }
    }
}

export const getWhsePartition = async () => {
    try {
        let result = await axiosGet(whsePartition, {
            whseWarehouseFk: "52884C90-BCB0-442A-B2AB-6952D55FDE8F",
            degFlag: 0
        });
        return RequestResultPage(result);
    } catch (e) {
        let msg = yourErrorHandler(e);
        return RequestResultEx(false, msg);
    }
};

export const getWhseLocation = async (whsePartitionFk: string) => {
    try {
        let result = await axiosGet(whseLocation + "/page", {whsePartitionFk: whsePartitionFk, rows: 200, start: 1});
        return RequestResultPage(result);
    } catch (e) {
        let msg = yourErrorHandler(e);
        return RequestResultEx(false, msg);
    }
};

export const correctLocation = async (code: string) => {
    try {
        let result = await axiosGet(whseLocation, {locationCode: code});
        if (result.length == 0) {
            return RequestResultOld(Object.assign({data: result}));
        }
        let pbResult = await axiosGet(proClothNote, {invLocationCode: code, clothState: 2,});
        console.log(pbResult);

        return RequestResultPage(result);
    } catch (e) {
        let msg = yourErrorHandler(e);
        return RequestResultEx(false, msg);
    }
};

export const getInfoWeave = async (vatNo: string) => {
    if (vatNo != null && vatNo != "" && vatNo != undefined) {
        try {
            let result = await axiosGet(runJob, {vatNo: vatNo, delFlag: 0});
            if (result != null && result.length != 1) {
                return RequestResultOld(
                    Object.assign({
                            data: result,
                            optionId: 2,
                            dataSend: {vatNo: vatNo, delFlag: false},
                            apiName: "/api/proBleadyeRunJob"
                        }
                    ));
            }
            console.log(result[0].clothWeight);
            let ExCheck = await axiosGet(whseMaterial, {retBatch: vatNo});
            if (ExCheck != null && ExCheck.length != 0) {
                return exportResult(ExCheck);
            }

            // @ts-ignore
            if (result[0].weaveJobCode == undefined || result[0].weaveJobCode == null || result[0].weaveJobCode == "") {
                return DontFindResultId(
                    Object.assign({
                            id: null,
                            optionId: 2,
                            dataSend: {vatNo: vatNo, delFlag: false},
                            apiName: "/api/proBleadyeRunJob",
                            note: "weaveJobCode dont found " + JSON.stringify({weaveJobCode: result[0].weaveJobCode})
                        }
                    ));
            }
            let weaveJobCode = result[0].weaveJobCode;
            let wResult = await axiosGet(proWeaveJob, {weaveJobCode: weaveJobCode});
            return RequestResultW(
                Object.assign({
                        id: null,
                        clothWeight: result[0].clothWeight,
                        data: wResult,
                        optionId: 2,
                        dataSend: {weaveJobCode: weaveJobCode},
                        apiName: proWeaveJob,
                        note: ""
                    }
                ));
        } catch (e) {
            let msg = yourErrorHandler(e);
            return RequestResultEx(false, msg);
        }
    }
};

export const getClothInPallet = async (pallet: string) => {
    if (pallet == null && pallet == "" && pallet == undefined) {
        return;
    }
    try {
        let result = await axiosGet(proClothNote, {invStoreLoadCode: pallet, clothState: 2,});
        console.log(result);
        return RequestResultAll(Object.assign({data: result}));
    } catch (e) {
        let msg = yourErrorHandler(e);
        return RequestResultEx(false, msg);
    }
};

export const getClothInLocation = async (location: string) => {
    if (location == null && location == "" && location == undefined) {
        return;
    }
    try {
        let result = await axiosGet(proClothNote, {invLocationCode: location, clothState: 2,});
        return RequestResultAll(Object.assign({data: result}));
    } catch (e) {
        let msg = yourErrorHandler(e);
        return RequestResultEx(false, msg);
    }
};





