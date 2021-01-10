import * as XLSX from 'xlsx'


// 读取一个文件
function readOneFile(file) {
    return new Promise((resolve, reject) => {
        // 获取文件名称
        let name = file.name;
        // 获取文件后缀
        let suffix = name.substr(name.lastIndexOf("."));

        // 判断文件类型是否正确
        if (".xls" !== suffix && ".xlsx" !== suffix) {
            console.error("选择Excel格式的文件导入！");
            reject({});
        }

        let reader = new FileReader();

        reader.onload = (event) => {
            let {
                result
            } = event.target
            // 读取文件
            let workbook = XLSX.read(result, {
                type: 'binary'
            });

            let data = [];

            // 循环文件中的每个表
            for (let sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    // 将获取到表中的数据转化为json格式
                    let currentSheetData = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    data.push({
                        sheetName: sheet,
                        data: currentSheetData
                    })
                }
            }

            resolve(data);
        }

        reader.readAsBinaryString(file);
    }).catch(error => {
        console.error(error);
    })
}

/**
 * 
 * @param {blob} files excel文件
 */
export async function readExcel(files) {

    if (!Array.isArray(files)) {
        files = Array.from(files);
    }

    if (files.length === 0) return;

    let excelData = [];

    // 假如存在多个文件，则循环读取
    for (let i = 0; i < files.length; i++) {
        let data = await readOneFile(files[i]);
        excelData.push({
            excelName: files[i].name,
            sheet: data
        });
    }

    return excelData;
}



// 写入文件
/**
 * 
 * @param {json} json json数据
 * @param {string} fileName excel文件名
 */
export async function writeExcel(json, fileName) {

    let workOption = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
    }

    let workbook = {
        SheetNames: ['Sheet1'],
        Sheets: {},
        Props: {}
    }

    function jsonToExcel(dataSource) {
        workbook.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(dataSource);

        saveAs(new Blob([changeData(XLSX.write(workbook, workOption))], { type: 'application/octet-stream' }))
    }

    // 转换为二进制数据
    function changeData(s) {

        if (typeof ArrayBuffer !== 'undefined') {

            let buf = new ArrayBuffer(s.length);

            let view = new Uint8Array(buf);

            for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }

        let buf = new Array(s.length);
        for (let i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    // 下载文件
    function saveAs(xlsxObj) {

        let xlsxFile = document.createElement("a");

        xlsxFile.download = (fileName || "盘点单") + '.xlsx';
        xlsxFile.href = URL.createObjectURL(xlsxObj);
        xlsxFile.click();

        setTimeout(() => {
            URL.revokeObjectURL(xlsxObj);
        }, 100);

    }

    // 调用
    jsonToExcel(json);
}



