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
            //document.getElementById('name').innerHTML = data[1].Fishid;
            //document.getElementById('name').innerHTML = JSON.stringify(msg);
        }
    });
}
function buildGenuineHTML(jsonArray, container){
    var productType = jsonArray[0].ProductType;
    productType = "Tuna in Spring Water"
    var htmlString = '<div class="container"><div class="row"><div class="col-sm-6">This ' + productType +  ' made this journey to your plate: </div>';
    $.each(jsonArray,function(i,jsonObject) {
        htmlString += '<div class="col-sm-6">';
        htmlString += '<br/>At ' + jsonObject.DateTimeStamp;
        htmlString += ' the ' + jsonObject.ProductType;
        htmlString += ' was at ' + jsonObject.Geolocation;
        htmlString += ' for ' + jsonObject.EventType;
        htmlString += '<br/>Other Information: ' + jsonObject.Info;
        htmlString += '<br/></div>';
    });
    htmlString += '</div></div>';
    $(container).html(htmlString);
}

function buildInDoubtHTML(jsonObject, container){
   $(container).html(JSON.stringify(jsonObject));//[0].Fishid;
}



