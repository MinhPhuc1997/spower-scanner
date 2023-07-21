import { Box } from "../../../components";
import Header from "../../../components/Header";
import InputText from "../../../components/InputText";
import Button from "../../../components/Button";
import { useState } from "react";
import { Dimensions, ToastAndroid } from "react-native";
import AlertModal from "../../../components/AlertModal";
import { headerList } from "../../../Utils/Contants";
import Location from "../../Components/Location";
import { getPallet, putInventory } from "../../../Utils/ClothNote";
import { Error } from "../../../Utils/Error";
import TableSimple from "../../../components/TableSimple";
import { checkClothWeight } from "../../../Utils/Process";

interface FormProps {
  pallet: string,
  visiable: boolean,
  location: string,
  loading: boolean
}

const initForm = { pallet: "", visiable: false, location: "", loading: false };

const initNotif = { visiable: false, title: "", content: "", type: 0 };
const { width, height } = Dimensions.get("window");
const ChangeLocation = () => {

  const [form, setForm] = useState<FormProps>(initForm);
  const [list, setList] = useState<any>([]);
  const [notif, setNotif] = useState(initNotif);

  const scanData = async () => {
    setForm({ ...form, loading: true });
    setList([]);
    let value = await getPallet(form.pallet);
    if (value != undefined) {
      if (!value.result) {
        let ms = (value.msg != null) ? value.msg : "";
        let err = Error["401"];
        Notification(err.title, ms, 0);
        setForm({ ...form, loading: false });
        return;
      } else {
        let arr: any[] = [];
        value.data.map((e: any, i: number) => {
          arr.push({
            index: i + 1,
            noteId: e.noteId,
            noteCode: e.noteCode,
            clothWeight: e.clothWeight
          });
        });
        setList(arr);
        setForm({ ...form, loading: false });
        Notification("Tra cứu thông tin", `Tổng cộng có ${arr.length} cuộn vải`, 0);
      }
    } else {
      let err = Error["301"];
      Notification(err.title, err.massage, 0);
    }
  };

  const openLocation = () => {
    if (list.length == 0) {
      let err = Error["205"];
      Notification(err.title, err.massage, 0);
    } else {
      Location
      setForm({ ...form, visiable: true });
    }
  };

  const confirmSave = (val: string) => {
    setForm({ ...form, location: val, visiable: false });
    setTimeout(() => {
      Notification(
        "Xác nhận lưu",
        "Bạn có muốn thay đổi vị trí thành " + val,
        1);
    }, 600);
  };

  const pushData = async () => {
    if (!checkClothWeight(list)) {
      let err = Error["206"];
      Notification(err.title, err.massage, 0);
      return;
    }
    if (form.location == "") {
      let err = Error["302"];
      Notification(err.title, err.massage, 0);
      return;
    }
    let pushArr: any[] = [];
    list.map((e: any) => {
      pushArr.push({
        noteId: e.noteId,
        clothWeight:e.clothWeight,
        invFlag:1,
        invLocationCode: form.location
      });
    });
    console.log(pushArr);
    let data = await putInventory(1,pushArr);
    console.log(data.result,data.msg);

    if (data.result) {
      setForm(initForm);
      setList([]);
      ToastAndroid.show(data.msg.massage, 1000);
    } else {
      let ms = (data.msg.massage != null) ? data.msg.massage : "";
      let err = Error["401"];
      Notification(err.title, ms, 0);
      return;
    }
  };

  const ModalOnPress = () => {
    setNotif({ ...notif, visiable: false });
    switch (notif.type) {
      case 0:
        return;
      case 1:
        pushData();
        return;
    }
  };

  const Notification = (title: string, massage: string, type: number) => {
    setNotif({
      visiable: true,
      title: title,
      content: massage,
      type: type
    });
  };

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
              value={form.pallet}
              ChangeText={(val) => {
                setForm({ ...form, pallet: val });
              }}
              submit={() => scanData()}
            />
          </Box>
          <Box
            flex={1}
            marginLeft={"s"}
            justifyContent={"center"}>
            <Button title={"Đổi vị trí"} onPress={() => openLocation()} />
          </Box>
        </Box>
        <TableSimple
          height={height * 0.8}
          headerColor={"edit"}
          header={headerList}
          data={list}
          hide={["noteId"]}
          loading={form.loading}
        />
      </Box>
      {(notif.visiable || form.visiable) && (
        <Box position={"absolute"}
             width={width}
             height={height + 200}
             opacity={0.4}
             backgroundColor={"secondary"}/>)}
      <AlertModal
        onPress={() => ModalOnPress()}
        visible={notif.visiable}
        exit={() => setNotif({ ...notif, visiable: false })}
        title={notif.title}
        content={notif.content} />
      <Location
        submit={(val) => confirmSave(val)}
        exit={() => setForm({ ...form, visiable: false })}
        visible={form.visiable} />
    </Box>
  );
};

export default ChangeLocation;
