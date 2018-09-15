var genuine = false;
function verifyDemo() {
    genuine= !genuine
    if(genuine) {
        showGenuine();
    } else {
        showInDoubt();
    }
}


function showGenuine() {
    callTranzparency("#genuine");
    var element = document.getElementById("home");
    element.classList.add("d-none");
    element = document.getElementById("genuineContainer");
    element.classList.remove("d-none");
    element = document.getElementById("inDoubtContainer");
    element.classList.add("d-none");
}

function showInDoubt() {
    callTranzparency("3inDoubt");
    var element = document.getElementById("home");
    element.classList.add("d-none");
    element = document.getElementById("genuineContainer");
    element.classList.add("d-none");
    element = document.getElementById("inDoubtContainer");
    element.classList.remove("d-none");
}


function callTranzparency(container){
     
    $.ajax({
        type: "GET",
        url: 'https://fishoutofwater.azurewebsites.net/api/v1/verify',
        dataType: 'json',
        async: true,
        success: function(msg) {
            var data = msg;
            if(container == "#genuine") {
                buildGenuineHTML(data, container);
            } else {
                buildInDoubtHTML(data, container);
            }
           
        }
    });
}
function buildGenuineHTML(jsonArray, container){
    var productType = jsonArray[0].ProductType;
    //productType = "Tuna in Spring Water"
    var htmlString = '<div class="container"><div class="row"><div class="col-sm-6">To reach your plate, this <b>' + productType +  '</b> had these stops:</div>';
    $.each(jsonArray,function(i,jsonObject) {
        htmlString += '<div class="col-sm-6">';
        htmlString += '<br/><h1>' + jsonObject.EventType + '</h1>';
        htmlString += jsonObject.DateTimeStamp;
        htmlString += '<br/>' + jsonObject.Info;
        htmlString += '<br/><a href="#'+jsonObject.Geolocation+'">View stop location</a>' ;
        
        
        htmlString += '<br/></div>';
    });
    htmlString += '</div></div>';
    $(container).html(htmlString);
}

function buildInDoubtHTML(jsonObject, container){
   $(container).html(JSON.stringify(jsonObject));//[0].Fishid;
}



