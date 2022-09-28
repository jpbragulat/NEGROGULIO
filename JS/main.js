
$( document ).ready(function() {
    console.log( "ready!" );
    $.get( "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", function( data ) {
            console.log (data.date); //test
            console.log ("adentro del get"); //test
            $("#result").append(data.date, data.copyright); //el object id esta ok pero no graficaba porq con data solo no trae todo el json es necesario poner por partes asi
            console.log ("despues del result") //test
            $("#listini").append('<li>' + data.date + '</li>' + '<li>' + data.copyright + '</li>'); //en otro div pero en forma de list
            console.log ("pasé por acá"); //test
    });
});