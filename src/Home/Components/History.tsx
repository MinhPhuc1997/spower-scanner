import { Box } from "../../components";
import { ScrollView, StyleSheet } from "react-native";
import HistoryItem from "./HistoryItem";

const HistoryList = [
  {
    label:"Vải thô",
    action:"Detail",
    backdColor:"back1",
    mainColor:"#00D191"
  },
  {
    label:"Thành phẩm",
    action:"Detail",
    backdColor:"back2",
    mainColor:"#EBB520"
  },
  {
    label:"tets",

    action:"Detail",
    backdColor:"back3",
    mainColor:"#6349F4"
  }
]

const History =()=>{

  return(
    <Box>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {HistoryList.map((e,i)=>{
          return(<HistoryItem {...e} key={i} />)
        })}
      </ScrollView>
  </Box>
  )
}

export default History;
