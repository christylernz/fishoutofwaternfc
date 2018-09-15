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
    callTranzparency();
    var element = document.getElementById("home");
    element.classList.add("d-none");
    element = document.getElementById("genuine");
    element.classList.remove("d-none");
    element = document.getElementById("indoubt");
    element.classList.add("d-none");
}

function showInDoubt() {
    callTranzparency();
    var element = document.getElementById("home");
    element.classList.add("d-none");
    element = document.getElementById("genuine");
    element.classList.add("d-none");
    element = document.getElementById("indoubt");
    element.classList.remove("d-none");
}


function callTranzparency(){
    data = new Array(); 
    $.ajax({
        type: "GET",
        url: 'https://fishoutofwater.azurewebsites.net/api/v1/verify',
        dataType: 'json',
        async: true,
        success: function(msg) {
            data = JSON.parse(msg);
            document.getElementById('name').innerHTML = data[1].Fishid;
            //document.getElementById('name').innerHTML = JSON.stringify(msg);
        }
    });
}

//function TranzparencyCallback(){
    
//}

