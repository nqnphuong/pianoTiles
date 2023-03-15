// class này xử lý phần file csv của music

import Papa from 'papaparse';
import { randomInt } from '../utils';

export class processFileCSV {
    constructor(nameOfSong) {
        // hàm này xử lý file csv và chuyển nó thành dạng mảng 2 chiều là input của noteMusci
        // rowOfData là 1 row của dữ liệu input NoteMusic ( không phải là row của cvs file)
        this.fileDirect = '../audios/csv/' + nameOfSong.trim() + '.csv';
        let dataInputNote = [];
        return new Promise((resolve, reject) => {
            fetch(this.fileDirect) //bất đồng bộ
                .then(response => response.text())
                .then(csvData => {
                    let parsedData = Papa.parse(csvData, { header: true }).data;

                    let minShortNote = 1000;
                    let heightValue;
                    let heightArray = [];
                    let randomPass; // biến dùng để kiểm tra sao cho 2 note đơn ko cùng line

                    for (let i = 0; i < parsedData.length; i++) {
                        // tính thời gian các note và tìm min
                        if (i === 0) {
                            heightValue = parsedData[i][' shortNote'] - 0;
                        } else {
                            heightValue = parsedData[i][' shortNote'] - parsedData[i - 1][' shortNote'];
                        }
                        heightArray.push(heightValue);
                        if (heightValue < minShortNote) {
                            minShortNote = heightValue;
                        }
                    }
                    // console.log(minShortNote);
                    heightArray.forEach(row => {
                        let oneRow = [];
                        // chuyển thời gian các note thành số note và tạo input data
                        let lineOfNote = randomInt(1, 4);
                        while (lineOfNote === randomPass && randomPass !== undefined) {
                            lineOfNote = randomInt(1, 4);
                        }
                        for (let j = 0; j < 4; j++) {
                            if (j === lineOfNote - 1) {
                                // console.log(parseInt((row / minShortNote)));
                                oneRow.push(parseInt((row / minShortNote)));
                            } else {
                                // console.log(0);
                                oneRow.push(0);
                            }
                        }
                        dataInputNote.push(oneRow);
                        randomPass = lineOfNote;
                    });

                    // console.log(dataInputNote);
                    resolve(dataInputNote);
                })
                .catch(err => reject(err));
        });
    }
}

    //độ dài của note 1 - 2 - 3 = shortNote
    //trước tiên chạy note đơn ( 1 row 1 note )
    //có 1 hàm random để xác định note được chạy của line nào
