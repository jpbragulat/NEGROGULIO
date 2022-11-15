
$( document ).ready(function() {
    console.log( "ready!" );
    $.get( "https://localhost:7233/api/GetAllUsers", function( data ) {
            console.log (data[0]["id"]); //test
            console.log ("adentro del get"); //test
            console.log (data[1]["userName"]);
            let i = 0; // init en 0
            console.log(data[i]["id"]);
            for (i = 0; i < data.length; i++)
            {   
                $("#result").append(data[i]["id"]); //el object id esta ok pero no graficaba porq con data solo no trae todo el json es necesario poner por partes asi
            
            }
           
           // trae todos los usuarios al hacer clic 
            $("#btnallusers").click(function(){
                let z = 0;
                for (z = 0; z < data.length; z++)
                {
                    $("#listini").append('<li> Id: ' + data[z]["id"] + '</li>' + '<li> UserName: ' + data[z]["userName"] + '</li>' + '<li> FirstName: ' + data[z]["firstName"] + '</li>'); //en otro div pero en forma de list

                }
            });
           // post un User
           $("#btnpostuser").click(function()
           {
            $.ajax({
                'url':'https://localhost:7233/api/AddUser',
                'method':'POST',
                'dataType': 'json',
                 processData: false,
                'contentType': 'application/json',
                'data':JSON.stringify({
                    "id":7,
                    "UserName":"testfront",
                    "FirstName":"testfront",
                    "LastName":"testfront",
                    "Country":"testfront",
                    "State":"testfront",
                    "City":"testfront"
                 }),
                 //'success': getHandlingStatus
                
                });


           }); 

        });
});