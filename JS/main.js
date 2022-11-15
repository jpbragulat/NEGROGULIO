
$( document ).ready(function() {
    console.log( "ready!" );
    $.get( "https://localhost:7233/api/GetAllUsers", function( data ) {
            console.log (data[0].id); //test
            console.log ("adentro del get"); //test
            let i = 0; // init en 0
            for (i = 0; i <= data.length; i++){   
                $("#result").append(data[i].id, data[i].userName); //el object id esta ok pero no graficaba porq con data solo no trae todo el json es necesario poner por partes asi
                i++; 
            }
            console.log ("despues del result") //test
            $("#listini").append('<li> Id: ' + data[0].id + '</li>' + '<li> UserName: ' + data[0].userName + '</li>' + '<li> FirstName: ' + data[0].firstName + '</li>'); //en otro div pero en forma de list
            console.log ("pasé por acá"); //test
    });
});