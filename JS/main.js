
$( document ).ready(function() 
{
    console.log( "ready!" );
    $.get( "https://localhost:7233/api/GetAllUsers", function( data ) 
    {
            console.log (data[0]["id"]); //test
            console.log ("adentro del get"); //test
            console.log (data[1]["userName"]);
            let i = 0; // init en 0
            console.log(data[i]["id"]); //test
            for (i = 0; i < data.length; i++)
            {   
                $("#result").append(data[i]["id"]); //el object id esta ok pero no graficaba porq con data solo no trae todo el json es necesario poner por partes asi
            
            }

            let activador = 0; // para que no traiga la info denuevo cuando apretas btnalluser
           // boton para todos los usuarios
            $("#btnallusers").click(function()
            {
                $("#listini").toggle();
                let z = 0;
                if (activador == 0)
                {
                    for (z = 0; z < data.length; z++)
                        {
                            $("#listini").append('<li> Id: ' + data[z]["id"] + '</li>' + '<li> UserName: ' + data[z]["userName"] + '</li>' + '<li> FirstName: ' + data[z]["firstName"] + '</li>'); //en otro div pero en forma de list
                            activador++;
                        }
                }
            });
           // post un User
           //$("#btnpostuser").click(function()
            //{
                //$("#postuserform").toggle();
                $("form").submit(function (event) 
                {
                    var formData = {
                      Id: $("#userId").val(),
                      UserName: $("#userName").val(),
                      FirstName: $("#firstName").val(),
                      LastName: $("#lastName").val(),
                      Country: $("#country").val(),
                      State: $("#state").val(),
                      City: $("#city").val(),
                    };
                    $.ajax({
                    'url':'https://localhost:7233/api/AddUser',
                    'method':'POST',
                    'data': 'formData',

                    'dataType': 'json',
                    processData: false,
                    'contentType': 'application/json',
                //    'data':JSON.stringify({
                //    "id":10,
                //    "UserName":"dmaradona",
                //    "FirstName":"Diego",
                //    "LastName":"Maradona",
                //    "Country":"Argentina",
                //    "State":"CABA",
                //    "City":"VillaFiorito"
                // }),
                // //'success': getHandlingStatus
                    });
                
                    //$.ajax({
                    //  type: "POST",
                    //  url: "https://localhost:7233/api/AddUser",
                    //  data: formData,
                    //  dataType: "json",
                    //  contentType:'application/json', //agregado para probar
                    //  encode: true,
                    //}).done(function (data) 
                    //{
                    //  console.log(data);
                    //});
                
                    event.preventDefault();
                });
           // });
                
                //$.ajax({
                //'url':'https://localhost:7233/api/AddUser',
                //'method':'POST',
                //'dataType': 'json',
                // processData: false,
                //'contentType': 'application/json',
                //'data':JSON.stringify({
                //    "id":10,
                //    "UserName":"dmaradona",
                //    "FirstName":"Diego",
                //    "LastName":"Maradona",
                //    "Country":"Argentina",
                //    "State":"CABA",
                //    "City":"VillaFiorito"
                // }),
                // //'success': getHandlingStatus
                //});
    }); 
});
