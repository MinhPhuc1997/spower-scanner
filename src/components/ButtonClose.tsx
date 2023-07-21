import { Box } from "./Theme";

const buttonClose =()=>{
  return(
    <Box
      height={24}
      width={24}
      borderRadius={"l"}
      borderColor={"secondary"}
      borderWidth={2}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        height={10}
        width={10}
        borderRadius={"l"}
        backgroundColor={"secondary"}

      />

    </Box>
  )
}

export default buttonClose;
