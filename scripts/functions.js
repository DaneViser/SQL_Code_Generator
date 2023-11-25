 // Global variables Begin //
 var TableName = "";
 var listColNames = [];
 var listColTypes = [];
 var mapColNames = new Map();
 // Global variables End //

 function processTableColumns(){ 
    if(validateInput()){
        console.log(listColNames);
        console.log(listColTypes);
        var selectElement = document.getElementById('columns');
        for (var i = 0; i < listColNames.length; i++) {
             
            mapColNames.set(listColNames[i].toUpperCase(), '');
            var option = document.createElement('option');
            
            option.value = listColNames[i].toLowerCase();
            option.text = listColNames[i];

            selectElement.appendChild(option);
         }
         hideShowElements();
    }
 }
 
 function addColumnFinal() {
    let tblObj = document.getElementById("myTable");
    
    tblObj.style.opacity = 0;
    window.setTimeout(function()
    {
        addColumn();
        tblObj.style.opacity = 1;

    },500)
    
    
    return false;
 } 

 function addColumn(){
    addTable();
    let colObj = document.getElementById("colInput");
    let colValue = colObj.value
    let table = document.getElementById('myTable');
    let th = document.createElement('th');
    let headerRow = table.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0];
    if(colValue === ""){
        alert("Enter a column name !");
        return false;
    }
    else if (listColNames.includes(colValue)){
        alert("Column already exists !");
        return false;
    }
    if(addType()){
        listColNames.push(colValue);
        th.textContent = colValue;
        headerRow.appendChild(th);
        colObj.value = "";
        return true; 
    }
 }

 function addType() {
    let availableTypes = ["string","int"];
    let typeObj = document.getElementById("typeInput");
    let typeVal = typeObj.value;
    if(typeVal === "") {
        typeVal = "string";
    }
    if(!availableTypes.includes(typeVal)){
        alert("Not supported type");
        typeObj.value = "";
        return false;
    }
    listColTypes.push(typeVal);
    return true;
 }
 function addTable(){
    let tbl = document.getElementById("tblInput");
    let cap = document.getElementById("myCaption");

    if(TableName !== tbl.value && TableName !== ""){
        resetGlobalVars();
        TableName = tbl.value
        cap.innerHTML = TableName;
        alert("Table name changed, all input has been reset !");
    }
    else{
        TableName = tbl.value
        cap.innerHTML = TableName;
        
    }

 }

 function generateSqlCode(){
    times = document.getElementById("counter").options[document.getElementById("counter").selectedIndex].value;
    IsFirst = true;
    let randomValues = [];
    let txtArea = document.getElementById("sqlcode");
    let type = "";
    let charHelp = "";
    let query = `INSERT INTO ${TableName} (${listColNames})<br>`;
    
    while(times > 0){
        for(var i = 0;i < listColNames.length; i++){
            if(mapColNames.has(listColNames[i].toUpperCase())){
                if(listColTypes[i] === "string" || listColTypes[i] === "int"){
                    type = listColTypes[i];
                }
                else{
                    alert('Invalid type inserted !');
                    return;
                }
                if(type === "string"){
                    charHelp = '\"';
                }
                else{
                    charHelp = '';
                }
                let listVal = mapColNames.get(listColNames[i].toUpperCase()).split(',');
                let randomIndex = Math.floor(Math.random() * listVal.length);
                let newVal = charHelp + listVal[randomIndex] + charHelp; 
                randomValues.push(newVal);
            }
        }
            
        if(IsFirst === true){
            query += `VALUES(${randomValues}),<br>`; 
            IsFirst = false;
        }
        else{
            query += `(${randomValues}),<br>`;
        }
        txtArea.style.display = 'inherit'
        randomValues = [];
        times--;
    }
    query = removeCharFromRight(query, ',');
    txtArea.innerHTML = query;
 }

 function addValuesToColumn(){
    var selectElement = document.getElementById("columns");
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    var keyToUpdate = selectedOption.value;
    var newValue = document.getElementById("curCol").value;
    console.log(keyToUpdate);
    if(mapColNames.has(keyToUpdate.toUpperCase())){
        mapColNames.set(keyToUpdate.toUpperCase(), newValue);
    }
    else{
        alert("Failed to update selected column");
    }

    mapColNames.forEach((value, key) => {
        console.log(`Key: ${key}, Value: ${value}`);
    });
 }

 function validateInput(){
    let tblName = document.getElementById("tblInput").value;
    if(listColNames.length > 0 && listColTypes.length > 0 && tblName != ""){
        return true;
    }
    else {
        alert("No table created !");
        return false;
    }
 }

 function hideShowElements(){
    var elements = document.querySelectorAll('.hidden, .new-class');
    document.getElementById("sqlcode").style.display = 'none';
    elements.forEach(function(element){
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
        element.classList.add('new-class');
    } 
    else {
        element.classList.add('hidden');
        element.classList.remove('new-class');
    }
   });
 }
 
 function removeCharFromRight(str, char) {
    for (let i = str.length - 1; i >= 0; i--) {
        if (str.charAt(i) === char) {
            return str.substring(0, i) + str.substring(i + 1).replace(char, '');
        }
    }
    return str;
}

function resetGlobalVars(){
    let cap = document.getElementById("myCaption");
    let tblTr = document.getElementById("myCol");
    
    cap.innerHTML = "";
    tblTr.innerHTML = "";
    TableName = "";
    listColNames = [];
    listColTypes = [];
    mapColNames = new Map();
}