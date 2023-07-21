import { Error } from "./Error";
import { postFeedBack } from "./Feedback";
import { FeedBackType } from "./Contants";

export const RequestResultPage = (object: any) => {
  let result = object.total > 0;
  let msg = (object.total == 0) ? "Không tìm thấy mã này" : "Tra cứu thành công";
  let data = (object.total > 0) ? object.records : [];
  return {
    result: result,
    data: data,
    msg: msg
  };
};

export const RequestResultW = (object: any) => {
  console.log(object.data.length);
  if (object.data != null && object.data.length == 0) {
    let err = Error["405"];
    postFeedBack(object.optionId, FeedBackType.danger, object.dataSend, object.apiName, JSON.stringify(err), "");
    return { result: false, data: [], msg: err };
  }
  if (object.data.length > 2) {
    let err = Error["406"];
    postFeedBack(object.optionId, FeedBackType.danger, object.dataSend, object.apiName, JSON.stringify(err), "");
    return { result: false, data: [], msg: err };
  }
  let arr:any[] = [];
  object.data.map((e: any) => {
    arr.push({ id: e.weaveJobId });
  });
  let weight =(object.clothWeight!=null)?object.clothWeight :0;
  return { result: true, data: arr, msg: "ok",clothWeight:weight };
};

export const RequestResult = (object: any) => {
  let err = Error["400"];
  console.log(object)
  err.massage = object.msg;
  let result = object.code == 200;
  let data = (object.code == 200) ? object.data : [];
  let type = (object.code == 200) ? FeedBackType.success : FeedBackType.danger;
  if (object.optionId != undefined) {
    postFeedBack(object.optionId, type, object.dataSend, object.apiName, err, "");
  }
  return {
    result: result,
    data: data,
    msg: err
  };
};


export const DontFindResultId = (object: any) => {
  if (object.id === null || object.id === undefined) {
    let err = Error["403"];
    if (object.optionId != undefined) {
      postFeedBack(object.optionId, FeedBackType.danger, object.dataSend, object.apiName, err.massage, object.note);
    }
    return { result: false, data: [], msg: err };
  }
  return { result: true, data: object.data, msg: "ok" };
};

export const RequestResultOld = (object: any) => {
  if (object.data.length == 0) {
    let err = Error["203"];
    return { result: false, data: [], msg: err };
  }

  if (object.data.length > 1) {
    let err = Error["402"];
    if (object.optionId != undefined) {
      postFeedBack(object.optioId, FeedBackType.danger,
        JSON.stringify(object.dataSend), object.apiName, err.massage, "");
    }
    return { result: false, data: [], msg: err };
  }
  return { result: true, data: object.data[0], msg: "ok" };
};



export const RequestResultEx = (result: boolean, msg: object) => {
  return {
    result: result,
    data: null,
    msg: msg
  };
};

export const addResult = (result: boolean, data: any[], msg: any) => {
  return {
    result: result,
    data: data,
    msg: msg
  };
};

export const exportResult = (object:any) => {
  if (object != null && object.length !=0) {
    let err = Error["210"];
    return { result: false, data: object, msg: err };
  }
};

export const RequestResultAll = (object:any) => {
  if (object.data.length == 0) {
    let err = Error["203"];
    return { result: false, data: [], msg: err };
  }
  return { result: true, data: object.data, msg: "ok" }
};

export const RequestResultCheckProduct = (object: any) => {

  if (object.length == 0) {
    let err = Error["203"];
    console.log(err)
    return { result: false, data: [], msg: err };
  }
  if (object.length > 1) {
    let err = Error["402"];
    return { result: false, data: [], msg: err };
  }
  if(object[0].degFlag==1){
    let err = Error["216"];
    return { result: false, data: [], msg: err };
  }
  if(object[0].whseVouch!=9){
    let err = Error["215"];
    return { result: false, data: [], msg: err };
  }
  return { result: true, data: object[0], msg: "ok" };
};


