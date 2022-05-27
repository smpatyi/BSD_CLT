let files =['./tests.json', './bmp.json', './cbc.json', './et.json', './lpc.json', './lfp.json'];
let dataContainer =[];

function loadJSON(path, success, error) { 
    var xhr = new XMLHttpRequest(); xhr.onreadystatechange = function() { if (xhr.readyState === XMLHttpRequest.DONE) { if (xhr.status === 200) { if (success) success(JSON.parse(xhr.responseText)); } else { if (error) error(xhr); } } }; xhr.open("GET", path, true); xhr.send(); }




function createHeader(columnData, myTable, myTheader, myTbody){
        //insert the thead
    let newHead = myTheader.insertRow(0);

    if(columnData){
        var columnDataSize = columnData.length;  
        for(let i=0; i<columnDataSize; i++){
            let textName = columnData[i];
            let myTh = myTheader.appendChild(newHead),
            th = document.createElement('th');
            window["newCell" + i] = myTh.appendChild(th);
            th.innerHTML = textName;
        }
    
    }
    
}


function createStndrdRow(columnData, myTable, myTheader, myTbody){
    
    var newRow   = myTbody.insertRow(-1);
    if(columnData){
        //console.log(columnData);
        var columnDataSize = columnData.length;
        for(var nmbr = 0; nmbr < columnDataSize; nmbr++){
            // Insert a cell in the row at index 0
            let textVar = columnData[nmbr];
            let myTd = myTbody.appendChild(newRow),
            td = document.createElement('td');
            window["newCell" + nmbr] = myTd.appendChild(td);
            td.innerHTML = textVar;
        } 
    }
    
}


function createBleHeader(columnData, myTable, myTheader, myTbody, linkData){


    var fifthRow = myTbody.insertRow();

    if (columnData){
        var columnDataSize = columnData.length;
        for(let i=0; i<columnDataSize; i++){
            let insideText = columnData[i];
            let myTd = myTbody.appendChild(fifthRow),
            td = document.createElement('td');
            td.setAttribute('colspan', '3');
            td.setAttribute('class', 'blue');
            let a = document.createElement('a');
            window["newCell" + i] = myTd.appendChild(td); 
            td.appendChild(a);
            a.innerHTML = insideText;
            a.setAttribute('href', linkData)
        }
    }
    
}


function createGryHeader(columnData, myTable, myTheader, myTbody){
    
    var newGryHead = myTbody.insertRow(-1);
    console.log(columnData);
    if (columnData){
        for (let i=0; i<1; i++){
        let inGryText = columnData;
        let myTd = myTbody.appendChild(newGryHead),
        td = document.createElement('td');
        td.setAttribute('colspan', '4');
        td.setAttribute('class', 'explainer');
        td.setAttribute('id', 'grayHead');
        window["newCell" + i] = myTd.appendChild(td);
        td.innerHTML = inGryText;
        }  
    }
}


function createGryLink(columnData, myTable,  myTheader, myTbody, linkData){

    console.log('what is myTbody', myTbody);
    var newGryLink = myTbody.insertRow();

    if (columnData){
        for(let i=0; i<1; i++){
            let insideGryTxt = columnData;
            let myTd = myTbody.appendChild(newGryLink),
            td = document.createElement('td');
            td.setAttribute('colspan', '4');
            td.setAttribute('class', 'explainer');
            let a = document.createElement('a');
            window["newCell" + i] = myTd.appendChild(td);
            td.appendChild(a);
            a.innerHTML = insideGryTxt;
            a.setAttribute('href', linkData);
        }
    }
}


//createStndrdRow();
//createBleHeader();
//createGryHeader();
//createGryLink();

function createTable(data){ 
    for (k=0; k<files.length; k++){
    console.log(data);
    let table = document.createElement('table');
    let tHead = document.createElement('thead');
    let tBody = document.createElement('tbody');

    table.appendChild(tHead);
    table.appendChild(tBody);
    let myBody = document.getElementById('allTables');
    myBody.appendChild(table);
   
        var removeFileStart = files[k].split("./").pop();
        var removeExtension = removeFileStart.split(".json").shift();
        var tableID = removeExtension;
        table.setAttribute('id', tableID);
   

    console.log(table);

    let myTable = document.getElementById(tableID);
    let myTheader = myTable.getElementsByTagName('thead')[0];
    let myTbody = myTable.getElementsByTagName('tbody')[0];
    //var bmpTable = document.getElementById("bmp");
    //var bmpBody = bmpTable.getElementsByTagName("tbody")[0];
    buildTable(dataContainer[k], myTable, myTheader, myTbody);
}
}

function buildTable(passedData, myTable, myTheader, myTbody){// 
    createHeader(myTable, myTheader, myTbody);
    for(let j=0; j<passedData.length; j++){
        //console.log('this is my for loop', j);
        var rowData = passedData[j]['column-type'][0].column;
        var linkData = passedData[j]['link'];
        if(passedData[j]['row-type'] === 'data'){
            createStndrdRow(rowData, myTable, myTheader, myTbody);
        }
        if(passedData[j]['row-type'] === 'header'){
            if(passedData[j]['color'] === 'blue'){
                createBleHeader(rowData, myTable, myTheader, myTbody, linkData);
            }
        }
        if(passedData[j]['row-type'] === 'header'){
            if(passedData[j]['color'] === 'green'){
                createHeader(rowData, myTable, myTheader, myTbody);
            }
        }
        if(passedData[j]['row-type'] === 'header'){
            if(passedData[j]['color'] === 'gray'){
               
               if(passedData[j]['hasLink'] === true){
                    createGryLink(rowData, myTable, myTheader, myTbody, linkData);
               }
            }
        }
        if(passedData[j]['row-type'] === 'header'){
            if(passedData[j]['color'] === 'gray'){
               if(passedData[j]['hasLink'] === false){
                    createGryHeader(rowData, myTable, myTheader, myTbody);
                }
               
            }
        }
        
    }
    //console.log('this is my passed data', passedData);

}

function fileProcessing(){

   // for (l=0; l<dataContainer.length; l++){
        console.log('tsblrlirkrlltsj');

        createTable();
   // }

}

function init(){
    for (k=0; k<files.length; k++){
       
        loadJSON(files[k], 
        function(data) {
        
            this.data = data; 
            console.log(data);
            console.log('this is dataContainer before push', dataContainer.length);
            dataContainer.push(data);
            console.log('this is dataContainer after push', dataContainer.length);
            console.log(dataContainer);
            if(dataContainer.length === files.length){
                fileProcessing();
            }
           }, 
        function(xhr) { console.error(xhr); } )
        
    }
    console.log('tsblrlirkrlltsj');
    ;
    
}

init();