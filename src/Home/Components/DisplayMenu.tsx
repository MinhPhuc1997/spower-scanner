import { Box } from "../../components";
import HomeItem from "./HomeItem";

interface DisplayMenuProps {
  list: {
    label: string,
    icon: string,
    action: string,
    subLabel:string
  }[];
}

const DisplayMenu = ({ list }: DisplayMenuProps) => {
  const row = (list.length / 2).toFixed(0);
  console.log(row);
  return (
    <Box>
      {list.map((_e, i) => {
        return (
          <Box
            key={i}
            backgroundColor={"background"}
            borderBottomWidth={1}
            borderColor={"drawer5"}
          >
            {(i % 2 == 0) && (i < list.length) && (
              <Box flexDirection={"row"} key={i}>
                {(list[i] != null) && (
                 <HomeItem  {...list[i]} draw={true}/>
                )}
                {(list[i + 1] != null) && (
                  <HomeItem  {...list[i+1]}/>
                )}
              </Box>
            )}
          </Box>
        );
      })}
      {}
    </Box>
  );
};
export default DisplayMenu;
