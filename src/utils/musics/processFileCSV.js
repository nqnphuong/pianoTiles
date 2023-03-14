// class này xử lý phần file csv của music

import Papa from 'papaparse';
import { randomInt } from '../utils';

export class ProcessFileCSV {
    // hàm này xử lý file csv và chuyển nó thành dạng mảng 1 chiều là input của noteMusci
    // rowOfData là 1 row của dữ liệu input NoteMusic ( không phải là row của cvs file)
    process(nameOfSong) {
        this.fileDirect = '../audios/csv/' + nameOfSong.trim() + '.csv';
        let dataInputNote = [];
        fetch(this.fileDirect)
            .then(response => response.text())
            .then(csvData => {
                let parsedData = Papa.parse(csvData, { header: true }).data;
                
                let minShortNote = 1000;
                let timeValue;
                let timeArray = [];
                let randomPass; // biến dùng để kiểm tra sao cho 2 note đơn ko cùng line

                for (let i = 0; i < parsedData.length; i++) {
                    if (i === 0) {
                        timeValue = parsedData[i][' shortNote'] - 0;
                    } else {
                        timeValue = parsedData[i][' shortNote'] - parsedData[i - 1][' shortNote'];
                    }
                    timeArray.push(timeValue);
                    if (timeValue < minShortNote) {
                        minShortNote = timeValue;
                    }
                }
                // console.log(timeArray);
                // console.log(minShortNote);
                timeArray.forEach((time) => {
                    let rowOfData = [];
                    let lineOfNote = randomInt(1, 4);
                    while (lineOfNote === randomPass && randomPass !== undefined) {
                        lineOfNote = randomInt(1, 4);
                    }
                    for (let i = 0; i < 4; i++) {
                        if ( i === lineOfNote - 1) {
                            rowOfData.push((time/minShortNote).toFixed(0));
                        } else {
                            rowOfData.push(0);
                        }
                    }
                    dataInputNote.push(rowOfData);
                    randomPass = lineOfNote;
                });
            });
            return dataInputNote;
    }

    //độ dài của note 1 - 2 - 3 = shortNote
    //trước tiên chạy note đơn ( 1 row 1 note )
    //có 1 hàm random để xác định note được chạy của line nào
}