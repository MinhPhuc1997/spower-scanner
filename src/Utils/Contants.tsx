export const API = "http://192.168.5.1:91" // "http://192.168.102.205:91"

export const listMenu = [
    {
        label: "Nhập kho ",
        icon: "log-in-sharp",
        action: "cn_import",
        subLabel: "vải thô"
    },
    {
        label: "Kiểm kho",
        icon: "list-outline",
        action: "cn_inventory",
        subLabel: "vải thô"
    },
    {
        label: "Tiến trình",
        icon: "ios-analytics-outline",
        action: "his_cn_cloth",
        subLabel: "Vải thô"
    },
    // {
    //   label: "Cân vải",
    //   icon: "md-pencil",
    //   action: "cn_change_weight",
    //   subLabel: "vải thô"
    // },
    {
        label: "Xuất kho",
        icon: "log-out-sharp",
        action: "cn_export",
        subLabel: "vải tho"
    },
    {
        label: "Chuyển vị trí",
        icon: "location-outline",
        action: "cn_change_location",
        subLabel: "Đổi vị trí pallet"
    },
    {
        label: "Chuyển vải",
        icon: "return-down-forward",
        action: "cn_change_cloth",
        subLabel: "Đổi vị trí vải"
    },
    {
        label: "Nhập kho gia công",
        icon: "log-in-sharp",
        action: "cn_import_out",
        subLabel: "Nhập kho vải thô"
    },

    {
        label: "Kiểm kho",
        icon: "list-outline",
        action: "p_inventory",
        subLabel: "Vải thành phẩm"
    },
    // {
    //   label: "Cân vải thô",
    //   icon: "home",
    //   action: "cn_change_weight",
    //   subLabel: "Cân vải gia công"
    // },
     {
      label: "Xuất kho",
      icon: "home",
      action: "p_import",
      subLabel: "Xuất kho thành phẩm"
    }
];

export const headerList = [
    {
        label: "STT"
    },
    {
        label: "Mã vải"
    },
    {
        label: "Trọng lượng"
    }
];

export const headerProductList = [
    {
        label: "STT"
    },
    {
        label: "Mã hàng"
    },
    {
        label: "Số cây"
    },
    {
        label: "Trọng lượng"
    }
];


export const headerProduct = [
    {
        label: "STT"
    },
    {
        label: "Mã vải"
    },
    {
        label: "Trọng lượng"
    },
    {
        label: "Đơn vị"
    }
];

export const FeedBackType = {
    success: 0,
    danger: 1,
    warning: 2,
    info: 3
}

export const lanList = [
    {
        label: "Tiếng việt",
        value: "vn",
        choose: true
    },
    // {
    //   label: "English",
    //   value: "en",
    //   choose: false
    // },
    {
        label: "中文（简体）",
        value: "cn",
        choose: false
    },
    // {
    //   label: "中文（）",
    //   value: "hk",
    //   choose: false
    // }
];

export const headerList1 = [
    {
        label: "STT"
    },
    {
        label: "Mã vải"
    },
    {
        label: "Trọng lượng"
    },
    {
        label: "Vị trí"
    }
];

export const headerList2 = [
    {
        label: "STT",
        type: "text"
    },
    {
        label: "Mã vải",
        type: "text"
    },
    {
        label: "Trọng lượng",
        type: "text"
    },
    {
        label: "Đã scan",
        type: "checkbox"
    }
];

export const OptionSys = {
    productExport: 15,
    productExportScan: 16,
}

