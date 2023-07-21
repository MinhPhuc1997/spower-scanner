import { Box } from "../../../components";
import Header from "../../../components/Header";
import InputText from "../../../components/InputText";
import Button from "../../../components/Button";
import { useEffect, useRef, useState } from "react";
import AlertModal from "../../../components/AlertModal";
import { headerList1 } from "../../../Utils/Contants";
import { Dimensions, TextInput, ToastAndroid } from "react-native";
import { checkExist, getPallet, putInventory } from "../../../Utils/ClothNote";
import { Error } from "../../../Utils/Error";
import { newElement } from "../../../Utils/Tools";
import { beforeRemove, checkClothWeight, checkValueSame, NetworkInfo } from "../../../Utils/Process";
import TableSimple from "../../../components/TableSimple";

interface StateProps {
  pallet: string,
  code: string,
  visiable: boolean,
  location: string,
  loading:boolean,
  error:boolean
}

const initState = { pallet: "", code: "", visiable: false, location: "",loading:false,error:false };

const initNotif = { visiable: false, title: "", content: "", type: 0 };

const { width, height } = Dimensions.get("window");
const ChangeCloth = ({navigation}) => {

  const inputCode = useRef<TextInput>(null);

  const [state, setState] = useState<StateProps>(initState);
  const [list, setList] = useState<any>([]);
  const [notif, setNotif] = useState(initNotif);

  const hasUnsavedChanges = Boolean(list.length > 0 && !state.error);

  const scanPallet=async ()=>{
    setState({ ...state, loading: true });
    setList([]);
    let value = await getPallet(state.pallet);
    if (value != undefined) {
      if (!value.result) {
        let ms = (value.msg != null) ? value.msg : "";
        let err = Error["401"];
        Notification(err.title, ms, 0);
        setState({ ...state, loading: false });
        return;
      } else {
        let arr: any[] = [];
        // kiểm tra vị trí của pallet

        let total = value.data.length;
        value.data.map((e: any, i: number) => {
          arr.push({
            index: total-i ,
            noteId: e.noteId,
            noteCode: e.noteCode,
            clothWeight: e.clothWeight,
            invLocationCode:e.invLocationCode
          });
        });
        setList(arr);
        setState({ ...state, loading: false });
        if(!checkValueSame(value.data,'invLocationCode')){
          let err = Error["208"];
          Notification(err.title, err.massage, 0);
          setState({...state,error:true});
          return;
        }
        Notification("Tra cứu thông tin", `Tổng cộng có ${arr.length} cuộn vải`, 0);
      }
    } else {
      let err = Error["301"];
      Notification(err.title, err.massage, 0);
    }
  }

  const scanData = async (val: string) => {
    if(state.error){
      let err = Error["208"];
      Notification(err.title, err.massage, 0);
      return;
    }
    let value = await checkExist(val);
    if (value != undefined) {
      if (!value.result) {
        let ms = (value.msg != null) ? value.msg : "";
        let err = Error["401"];
        Notification(err.title, ms, 0);
        return;
      }
      const { noteCode, noteId, clothWeight , invLocation } = value.data;
      let object = {
        noteCode: noteCode,
        noteId: noteId,
        clothWeight: clothWeight,
        invLocation:invLocation
      };
      let addResult = newElement(object, list);
      if (addResult.result) {
        setList(addResult.data);
        setState({ ...state, code: "" });
      //  inputRef.current?.focus();
      } else {
        Notification(addResult.msg.title, addResult.msg.massage, 0);
      }
    } else {
      let err = Error["301"];
      Notification(err.title, err.massage, 0);
    }
  };

  const BeforeSave = () => {
    if(state.pallet==""){
      let err = Error["205"];
      Notification(err.title, err.massage, 0);
      return;
    }
    if (list.length == 0) {
      let err = Error["207"];
      Notification(err.title, err.massage, 0);
    } else {
      Notification("Xác nhận lưu","Bạn có chắc mún lưu không", 1);
    }
  };

  const saveEntity =async () => {
    if (!checkClothWeight(list)) {
      let err = Error["206"];
      Notification(err.title, err.massage, 0);
      return;
    }
    let pushArr: any[] = [];
    list.map((e: any) => {
      pushArr.push({
        noteId: e.noteId,
        clothWeight: e.clothWeight,
        invFlag: 1,
        invStoreLoadCode: state.pallet
      });
    });
    let data = await putInventory(1, pushArr);
    if (data.result) {
      setState(initState);
      setList([]);
      ToastAndroid.show(data.msg, 1000);
    } else {
      let ms = (data.msg != null) ? data.msg : "";
      let err = Error["401"];
      Notification(err.title, ms, 0);
      return;
    }
  }

  const Notification = (title: string, massage: string, type: number) => {
    setNotif({
      visiable: true,
      title: title,
      content: massage,
      type: type
    });
  };

  const ModalOnPress = () => {
    setNotif({ ...notif, visiable: false });
    switch (notif.type) {
      case 0:
        return;
      case 1:
        saveEntity();
        return;
    }
  };

  useEffect(
    () => {
      navigation.addListener("beforeRemove", (e:any) => {
        beforeRemove(e, hasUnsavedChanges, navigation);
      });
      NetworkInfo().then(r => console.log(r));
    },
    [navigation, hasUnsavedChanges]
  );

  return (
    <Box>
      <Header title={"Thay đổi vị trí pallet"} />
      <Box padding={"s"}>
        <Box
          flexDirection={"row"}
          marginBottom={"s"}>
          <Box width={width * 0.7}>
            <InputText
              min={2}
              max={40}
              error={(msg) => {
                Notification("Lỗi nhập liệu", msg, 1);
              }}
              placeholder={"Nhập mã pallet"}
              value={state.pallet}
              ChangeText={(val) => {
                setState({ ...state, pallet: val });
              }}
              submit={scanPallet}
            />
          </Box>
          <Box
            flex={1}
            marginLeft={"s"}
            justifyContent={"center"}>
            <Button title={"Hoàn tất"} onPress={() => { BeforeSave();  }} />
          </Box>
        </Box>
        <Box
          flexDirection={"row"}
          marginBottom={"s"}>
          <Box width={width * 0.7}>
            <InputText
             // ref={inputCode}
              min={2}
              max={40}
              error={(msg) => {
                Notification("Lỗi nhập liệu", msg, 1);
              }}
              placeholder={"Scan mã vải ở đây!"}
              value={state.code}
              ChangeText={(val) => {
                setState({ ...state, code: val });
              }}
              submit={() => scanData(state.code)}
            />
          </Box>
          <Box
            flex={1}
            marginLeft={"s"}
            justifyContent={"center"}>
            <Button title={"Camera"} onPress={() => {
             navigation.navigate("camera")
            }} />
          </Box>
        </Box>
        <TableSimple
          height={height-200}
          headerColor={"edit"}
          header={headerList1}
          data={list}
          hide={["noteId"]}
         loading={state.loading}
        />

      </Box>
      {(notif.visiable) && (
        <Box position={"absolute"}
             width={width}
             height={height + 200}
             opacity={0.4}
             backgroundColor={"secondary"}
        />)}
      <AlertModal
        onPress={() => { ModalOnPress() }}
        visible={notif.visiable}
        exit={() => setNotif({ ...notif, visiable: false })}
        title={notif.title}
        content={notif.content} />
    </Box>
  );
};

export default ChangeCloth;
