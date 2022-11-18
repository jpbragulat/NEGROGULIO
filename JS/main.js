
$( document ).ready(function() 
{
    console.log( "ready!" );
    $.get( "https://localhost:7233/api/GetAllUsers", function( data ) 
    {
            //console.log (data[0]["id"]); //test
            //console.log ("adentro del get"); //test
            //console.log (data[1]["userName"]);
            let i = 0; // init en 0
            //console.log(data[i]["id"]); //test
            for (i = 0; i < data.length; i++)
            {   
                $("#result").append(data[i]["id"]); //el object id esta ok pero no graficaba porq con data solo no trae todo el json es necesario poner por partes asi

            }

            let activador = false; // para que no traiga la info denuevo cuando apretas btnalluser
           // boton para todos los usuarios
            $("#btnallusers").click(function(){
                
                let z = 0;
                if (!activador) //esta cabezada se llama flag - deberia ser BOOL TRUE or FALSE
                {
                    for (z = 0; z < data.length; z++)
                    {
                        $("#listini").append('<li> Id: ' + data[z]["id"] + '</li>' + '<li> UserName: ' + data[z]["userName"] + '</li>' + '<li> FirstName: ' + data[z]["firstName"] + '</li>'); //en otro div pero en forma de list
                    }
                    activador = true;  
                }
                $("#listini").toggle();
                    

            });
           // post un User
           $("#buttonSubmit").click(function()
            {
                var usernameForm = $("#userName").val();
                var firstName = $("#firstName").val();
                var lastName = $("lastName").val();
                var country = $("country").val();
                var state = $("state").val();
                var city = $("city").val();

                $.ajax(
                {
                    'url':'https://localhost:7233/api/AddUser',
                    'method':'POST',
                    'dataType': 'json',
                    processData: false,
                    'contentType': 'application/json',
                    'data':JSON.stringify(
                        {
                            "UserName":usernameForm,
                            "FirstName":firstName,
                            "LastName":lastName,
                            "Country":country,
                            "State":state,
                            "City":city
                        }),
                        success: function(msg){
                            alert( "Data Saved: " + msg );
                      },
                      error: function(XMLHttpRequest, textStatus, errorThrown) {
                         alert("some error: " + XMLHttpRequest.responseText);
                      }
                });
                    //'success': getHandlingStatus
                
            });
    });
});
