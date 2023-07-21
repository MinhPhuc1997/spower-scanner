import { Box } from "../../components";
import * as React from "react";
import Header from "../../components/Header";
import Calendar from "../Components/Calendar";
import ContentDetail from "../Components/ContentDetail";

// @ts-ignore
const ManagerDetail = ({ route, navigation }) => {
  const { title } = route.params;
  return (
    <Box>
      <Header title={(title != undefined) ? title : ""} />
      <Calendar />
      <ContentDetail />
    </Box>
  );
};

export default ManagerDetail;
