import {createStackNavigator} from "@react-navigation/stack";
import Dashboard from "./Dashboard";
import Inventory from "./ClothNote/Inventory";
import DetailNote from "./ClothNote/DetailNote";
import ChangeWeight from "./ClothNote/ChangeWeight";
import Export from "./ClothNote/Export";
import QueryCloth from "./ClothNote/QueryCloth";
import ChangeLocation from "./ClothNote/ChangeLocation";
import changeCloth from "./ClothNote/ChangeCloth";

import ProductImport from "./Product/Import";
import ProductInventory from "./Product/Inventory";
import ProductImportDetail from "./Product/ImportDetail";
import ProductExport from "./Product/Export";
import ExportScan from "./Product/ExportScan";
import Import from "./ClothNote/Import";
import QueryImport from "./ClothNote/QueryImport";
import HistoryCloth from "./ClothNote/HistoryCloth";
import ImportOut from "./ClothNote/ImportOut";
import ProductCheck from "./Product/Check";
import ImportView from "./Product/ImportView";


const DashboardStack = createStackNavigator();

const DashboardNavigator = () => {
    return (
        <DashboardStack.Navigator screenOptions={{headerShown: false}}>
            <DashboardStack.Screen name={"dashboard_screen"} component={Dashboard}/>
            <DashboardStack.Screen name={"cn_inventory"} component={Inventory}/>
            <DashboardStack.Screen name={"cn_change_weight"} component={ChangeWeight}/>
            <DashboardStack.Screen name={"cn_import"} component={Import}/>
            <DashboardStack.Screen name={"cn_import_out"} component={ImportOut}/>
            <DashboardStack.Screen name={"query_import"} component={QueryImport}/>
            <DashboardStack.Screen name={"cn_export"} component={Export}/>
            <DashboardStack.Screen name={"cn_detail"} component={DetailNote}/>
            <DashboardStack.Screen name={"cn_query"} component={QueryCloth}/>
            <DashboardStack.Screen name={"his_cn_cloth"} component={HistoryCloth}/>
            <DashboardStack.Screen name={"cn_change_location"} component={ChangeLocation}/>
            <DashboardStack.Screen name={"cn_change_cloth"} component={changeCloth}/>
            <DashboardStack.Screen name={"p_import"} component={ProductImport}/>
            <DashboardStack.Screen name={"p_import_detail"} component={ProductImportDetail}/>
            <DashboardStack.Screen name={"p_inventory"} component={ProductInventory}/>
            <DashboardStack.Screen name={"p_invCheck"} component={ProductCheck}/>
            <DashboardStack.Screen name={"p_export"} component={ProductExport}/>
            <DashboardStack.Screen name={"p_export_scan"} component={ExportScan}/>
            <DashboardStack.Screen name={"p_import_view"} component={ImportView}/>
        </DashboardStack.Navigator>
    )
}

export default DashboardNavigator;

