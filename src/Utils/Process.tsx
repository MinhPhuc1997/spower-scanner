import { Alert } from "react-native";
import * as Network from 'expo-network';

export const NetworkInfo=async () => {
  return await Network.getNetworkStateAsync();
}

export const beforeRemove = (e:any,hasUnsavedChanges:boolean,navigation:any)=>{
  if (!hasUnsavedChanges) {
    return;
  }
  e.preventDefault();
  Alert.alert(
    'Xác nhận thoát?',
    'Bạn đã scan qua vài cuộn vải, bạn có chắc chắn muốn thoát?',
    [
      { text: "Hủy bỏ", style: 'cancel', onPress: () => {} },
      {
        text: 'Chấp nhận thoát',
        style: 'destructive',
        onPress: () => navigation.dispatch(e.data.action),
      },
    ]
  );
}

export const checkClothWeight=(list:any[])=>{
  return list.findIndex((item)=>item.clothWeight===undefined || item.clothWeight==null || item.clothWeight==0)==-1
}

export const checkValueSame=(list:any[],field:string)=>{
  let valueTest = list[0][field].toUpperCase() ;
  return list.findIndex((e)=>e[field].toUpperCase()!=valueTest)==-1

}
