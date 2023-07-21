import { addResult } from "./RequestResult";
import {Error} from "./Error";
export const removeEnter = (val: string) => {
  return val.replace(/\n/g, "").toUpperCase();
};

export const convertObjectToArray = (e: any, hide: string[] | undefined) => {
  let arr = [];
  for (let key in e) {
    if (hide != undefined) {
      if (hide.findIndex((item) => item == key) == -1) {
        arr.push({ label: e[key] });
      }
    } else {
      arr.push({ label: e[key] });
    }
  }
  return arr;
};

export const convertObjectToArrayWithIcon = (e: any, hide: string[] | undefined,iconArr:any[]) => {
  let arr = [];
  let i=0;
  for (let key in e) {
    if (hide != undefined) {
      if (hide.findIndex((item) => item == key) == -1) {
        arr.push({ label: e[key],icon: iconArr[i].icon });
        i++;
      }

    } else {
      arr.push({
        label: e[key] ,
        icon: iconArr[i].icon
      });
      i++;
    }

  }
  return arr;
};


export const newElement = (val: any, arr: any[]) => {

  if (arr.findIndex((item) => item.id === val.id) == -1) {
    val = Object.assign({
      index: arr.length + 1
    }, val);
    let arrMer = [val, ...arr];
    return addResult(true, arrMer, "");
  } else {
    let err = Error["204"]
    return addResult(false, [], err);
  }
};

export const inputLength = (val: string, min: number, max: number) => {
  let result = (val.length > min) && (val.length < max);
  let msg = (val.length < min) ? "Chiều dài nhập vào quá ngắn" : (val.length > max) ? "Chiều dài nhập vào quá dài" : "";
  return {
    result: result,
    msg: msg
  };
};

export const checkIncludes= (id:string,listId:any[]) => {
  console.log(id,listId)
  return listId.findIndex((e)=>e.id.toUpperCase()==id.toUpperCase())!=-1
};


export const findElment=(list:any,val:any)=>{
  if(list.length===0 || val==""){
    return false
  }
  return list.findIndex((e)=>e.noteCode.toUpperCase()==val.toUpperCase())!==-1
}

export const getNowMonth=()=>{
  const d = new Date();
 return d.getMonth()+1
}

export const getNowDate=()=>{
  const d = new Date();
  return d.getMonth()
}

export const subDate=(date:any, val:number)=> {
  if(val == 0) { return date}
  let d = new Date(Date.now() - val * 24 * 60 * 60 * 1000)
  return d.getUTCDate();
}

