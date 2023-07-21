/*
 * @Author: MinhPhuc
 * @Date: 2022-08-02 15:54:22
 * @Last Modified by: MinhPhuc
 * @Last Modified time: 2022-10-11 14:48:47
 */

import React, {useState, useEffect} from "react";
import {
    View,
    Image,
    Dimensions,
} from "react-native";
import UpdateApp from "./Update";
import {Box, Text} from "./components";

const {width, height} = Dimensions.get("window");

const UpdateScreen = (props) => {
    const [progress, setProgress] = useState(100);

    const showUpdataLog = () => {
        if (props.updataLog != null) {
            return props.updataLog.split('--').map((e, i) => {
                return (<Text key={i}>{e}</Text>)
            })
        } else {
            return null
        }
    }
    const downloadApk = () => {
        const RNFS = require("react-native-fs");
        const progress = data => {
            if (data.contentLength != -1) {
                const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
                setProgress(percentage);
                console.log(percentage)
            }
            ;

        };
        const begin = res => {
            console.log("RNUpdateAPK::downloadApk - downloadApkStart");
        };
        const progressDivider = 1;
        const downloadDestPath = `${RNFS.CachesDirectoryPath}/NewApp.apk`;
        const ret = RNFS.downloadFile(
            Object.assign(
                {
                    fromUrl: 'http://192.168.5.1:92/api/appVersionUpdate/downloadApp?appId=7',
                    toFile: downloadDestPath,
                    begin,
                    progress,
                    background: true,
                    progressDivider
                },
            )
        );
        ret.promise
            .then(res => {
                if (res['statusCode'] >= 400 && res['statusCode'] <= 599) {
                    throw "Failed to Download APK. Server returned with " + res['statusCode'] + " statusCode";
                }
                setProgress(100);
                UpdateApp.getApkInfo(downloadDestPath);
                UpdateApp.installApk(
                  downloadDestPath
                );
            })
            .catch(err => {
                console.log(err)
            });
    };

    useEffect(() => {
        downloadApk();
    }, [])

    return (
        <View style={{
            width: width,
            height: height,
            backgroundColor: "#fff",
            alignItems: "center"
        }}>
            <Image source={require("../assets/update.jpg")} style={{width: width, height: height * 0.6, top: 0}}/>
            <Box marginLeft={"s"} marginTop={"s"} alignItems={"center"}>
                <Text variant={"title2"}>Cập nhật phiên bản mới</Text>
                <Box padding={"s"}>
                    <Text variant={"bodyI"}>Hệ thống đã có phiên bản mới tất cả thiết bị sẽ tự động cập nhật khi mở lại
                        APP</Text>
                </Box>
                <Box width={width} paddingLeft={"s"} marginTop={"s"}>
                    <Text variant={"title3"}>Nội dung cập nhật:</Text>
                </Box>
            </Box>
            <Box flex={1} alignItems={"center"}>
                <View style={{marginTop: 17, marginBottom: height / 9, alignItems: 'flex-start', width: width * 0.7}}>
                    {showUpdataLog()}
                </View>
                <Box flex={1}>
                </Box>
                <Box flexDirection={"row"}>
                    <View style={{
                        width: width * 0.7,
                        height: 25,
                        borderRadius: 3,
                        borderColor: "#91d5ff",
                        borderWidth: 1,
                    }}>
                        <View style={{
                            width: (width * 0.7) * progress / 100,
                            height: 23,
                            margrinTop: -3,
                            borderRadius: 3,
                            backgroundColor: "#1890ff"
                        }}>
                        </View>
                    </View>
                    <Box marginLeft={"s"} marginBottom={"s"}>
                        <Text variant={"body"}>{progress} %</Text>
                    </Box>
                </Box>
            </Box>
        </View>
    )
}

export default UpdateScreen;
