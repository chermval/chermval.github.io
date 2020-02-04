window.onload = function() {
    database = configFirebase();
    
    // load basic info 
    basicDataRef = getReferenceDatabase(database,"datos_basicos/");
    proccessReferenceBasicData(basicDataRef);

    // load details info
    detailsRef = getReferenceDatabase(database,"detalle/");
    processReferenceDetails(detailsRef);
};

//method with config of database
function configFirebase(){
    // Initialize Firebase
    var config = {
        apiKey: " AIzaSyDOMI4ch-qGFkQKkRxHPrVOY5rvczq65rg",
        authDomain: "portfolio-38fe6.firebaseapp.com",
        databaseURL: "https://portfolio-38fe6.firebaseio.com",
        projectId: "portfolio-38fe6",
        storageBucket: "portfolio-38fe6.appspot.com",
        messagingSenderId: "608431861904"
    };
    firebase.initializeApp(config);
    
    var database = firebase.database();
    return database;
}

function getReferenceDatabase(database,referenceName){
    // Get a reference to the database service
    return database.ref(referenceName);
}

function proccessReferenceBasicData(basicDataRef){
    basicDataRef.on("value", function(data) {
        var infoPersonal = data.val();
        loadBasicInfoName(infoPersonal.name);
        loadBasicInfoResume(infoPersonal.desc);
      });
}

function loadBasicInfoName(name){
    var title = document.getElementsByClassName("title");
    title[0].appendChild(document.createTextNode(name));

    var subTitle = document.getElementsByClassName("sub-title");
    subTitle[0].appendChild(document.createTextNode("RESUMEN"));
}

function loadBasicInfoResume(desc){
    var resume = document.getElementsByClassName("resume-description");
    var description = document.createElement("p");
    description.appendChild(document.createTextNode(desc));
    resume[0].appendChild(description);
}

function processReferenceDetails(detailsRef){
    detailsRef.on("child_added", function(data) {
        createResumeInformationTitle(data.key);
        createResumeInformationContent(data.key);
        //console.log(Object.keys(data.val()));
        //console.log(Object.values(data.val()));
    });
}

function createResumeInformationTitle(key){
    var listTab = document.getElementById("resume-information-title");
    if (listTab.getElementsByTagName("li").length === 0){
        classActive = "active";
    }else{
        classActive = "";
    }
    var itemTab = document.createElement("li");
    itemTab.setAttribute('class',classActive);
    var elementItem = document.createElement("a");
    elementItem.setAttribute('id',"title_"+key);
    elementItem.appendChild(document.createTextNode(key.toUpperCase()));
    elementItem.setAttribute('class',"tab-title");
    elementItem.setAttribute('data-toggle',"tab");
    elementItem.setAttribute('data-target',"#"+key);
    
    itemTab.appendChild(elementItem);        
    listTab.appendChild(itemTab);
}

function createResumeInformationContent(key){
    var list = document.getElementById("resume-information-content");

    if (list.getElementsByTagName("div").length === 0){
        classActive = "in active";
    }else{
        classActive = "";
    }
    var item = document.createElement("div");
    item.setAttribute('id',key);
    item.setAttribute('class',"tab-pane fade "+classActive);
    var elementItem = document.createElement("p");
    elementItem.appendChild(document.createTextNode(key+" Lorem ipsum dolor sit amet, consectetur adipisicng elit."));
    item.appendChild(elementItem);        
    list.appendChild(item);
}

