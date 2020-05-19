import { Injectable } from '@angular/core';

/* 
 * This service's main purpose to allow lists of data to  
 * to be converted and downloaded into a CSV file.
 * By passing data and headers (in array format) and
 * and optional way of setting the filename per file.
 * 
 * This service will be implemented in the tables to 
 * allow the users to send copies of the files after
 * doing filtered searches.
 */

@Injectable({
  providedIn: 'root'
})
export class ExportCSVService {

  constructor() { }

  // Downloads file to browser
  downloadFile(data, headers, filename = 'data') {

    // Converts data to CSV
    let csvData = this.ConvertToCSV(data, headers);
    console.log(csvData)

    // Creates blob object
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);

    // Download from browser
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  // Convert data and headers to CSV format
  ConvertToCSV(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';

    // Format headers
    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';

    // Format data
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in headerList) {
        let head = headerList[index];

        line += array[i][head] + ',';
      }
      str += line + '\r\n';
    }
    return str;
  }
}
