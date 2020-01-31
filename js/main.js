window.onload = function() {
    database = configFirebase();
    detailsRef = getReferenceDatabase(database,"detalle/");

    this.processReferenceDetails(detailsRef);
};

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
    // Get a reference to the database service
    var database = firebase.database();
    return database;
}

function getReferenceDatabase(database,referenceName){
    return database.ref(referenceName);
}

function processReferenceDetails(detailsRef){
    detailsRef.on("child_added", function(data) {
        console.log("key "+data.key);
        self.createResumeInformationTitle(data.key);
        //console.log(Object.keys(data.val()));
        //console.log(Object.values(data.val()));
    });
}

function createResumeInformationTitle(key){
    console.log("passo por createResumeInformationTitle")

    var listTab = document.getElementById("resume-information-title");
    if (listTab.getElementsByTagName("li").length === 0){
        classActive = "active";
    }else{
        classActive = "";
    }
    var itemTab = document.createElement("li");
    itemTab.setAttribute('class',classActive);
    itemTab.setAttribute('onclick',"changeClassToActive(this.id);");
    var elementItem = document.createElement("a");
    elementItem.setAttribute('id',"title_"+key);
    elementItem.appendChild(document.createTextNode(key.toUpperCase()));
    elementItem.setAttribute('class',"tab-title");
    elementItem.setAttribute('data-toggle',"tab");
    elementItem.setAttribute('data-target',"#"+key);
    
    itemTab.appendChild(elementItem);        
    listTab.appendChild(itemTab);

    self.createResumeInformationContent(key);
}

function createResumeInformationContent(key){
    console.log("passo por createResumeInformationTitle")

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

function changeClassToActive(id){
    document.getElementById(id).setAttribute('class',"tab-pane fade in active");
}