import { Box } from "../../../components";
import Header from "../../../components/Header";
import InputText from "../../../components/InputText";
import Button from "../../../components/Button";
import { useEffect, useRef, useState } from "react";
import { Dimensions, TextInput } from "react-native";
import AlertModal from "../../../components/AlertModal";
import { headerList2 } from "../../../Utils/Contants";
import { getImportDetail } from "../../../Utils/Product";
import TableCheck from "../../../components/TableCheck";

interface StateProps {
  pallet: string,
  code: string,
  visiable: boolean,
  location: string,
  load: boolean
}

const initState = { pallet: "", code: "", visiable: false, location: "", load: false };

const initNotif = { visiable: false, title: "", content: "", type: 0 };

const { width, height } = Dimensions.get("window");
const ProductImportDetail = ({ navigation, route }) => {

  const { id } = route.params;

  const inputCode = useRef<TextInput>(null);

  const [state, setState] = useState<StateProps>(initState);
  const [list, setList] = useState<any>([]);
  const [notif, setNotif] = useState(initNotif);

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

        return;
    }
  };

  const getData = async () => {
    let dResult = await getImportDetail(id);
    if (dResult.result) {
      let data = [];
      dResult.data.map((e, i) => {
        data.push({
          index: i + 1,
          cardId: e.cardId,
          productNo: e.productNo,
          netWeight: e.netWeight,
          scan: "uncheck"
        });
      });
      setList(data);
      inputCode.current?.focus();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Header title={"Nhập kho vải thành phẩm"} />
      <Box padding={"s"}>
        <Box
          flexDirection={"row"}
          marginBottom={"s"}>
          <Box width={width * 0.7}>
            <InputText
              ref={inputCode}
              min={2}
              max={40}
              error={(msg) => {
                Notification("Lỗi nhập liệu", msg, 1);
              }}
              placeholder={"Scan mã vải ở đây!"}
              value={state.pallet}
              ChangeText={(val) => {
                setState({ ...state, pallet: val });
              }}
              submit={() => console.log(state.pallet)}
            />
          </Box>
          <Box
            flex={1}
            marginLeft={"s"}
            justifyContent={"center"}>
            <Button title={"Từ chối"} onPress={() => {
            }} color={"danger"} />
          </Box>
        </Box>
        <TableCheck
          data={list}
          hide={["cardId"]}
          header={headerList2}
          headerColor={"edit"}
          height={height * 0.8}
          loading={state.load}
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
        onPress={() => {
          ModalOnPress();
        }}
        visible={notif.visiable}
        exit={() => setNotif({ ...notif, visiable: false })}
        title={notif.title}
        content={notif.content} />
    </Box>
  );
};

export default ProductImportDetail;

