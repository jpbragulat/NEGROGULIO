
$( document ).ready(function() {
    console.log( "ready!" );
    $("#dialog").toggle();
  
    $.get( "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", function( data ) {
        $( "#result" ).html(data[1]["date"] + " - " + data[1]["explanation"] + " - " + data[1]["url"]); // accede a id objeto porq quiere cambiar solo ese y no se pueden repetir
            console.log (data); // para modificar una clase es con ".nombre" //probando github //
         
         let i = 0;
         for (i=0; i < data.length; i ++)
         {
            $("#listini").append('<li>' + data[i]["date"] + data[i]["url"] + data[i]["explanation"] + '</li>');
            console.log ("pasé por acá");
        }
    });
});