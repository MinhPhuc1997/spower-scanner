import { Box ,Text} from "../../../components";
import Header from "../../../components/Header";

// @ts-ignore
const DetailNote =({route})=>{
  const {id} = route.params;
  return(
    <Box flex={1}>
      <Header title={"Chi tiết vải thô"} />
      <Text variant={"body"}>{id}</Text>
    </Box>
  )
}
export default DetailNote;
