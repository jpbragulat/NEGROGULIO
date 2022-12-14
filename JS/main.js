
$( document ).ready(function() 
{
    console.log( "ready!" );
    var activador = false; //para frenar que cada ves q aprieto el boton para ocultar me vuelva a cargar la lista
    
    $("#btnallusers").click(function(){
        
        console.log("btnallusers");
        $.get("https://localhost:7233/api/GetAllUsers", function( data ){
            
            let z = 0;
            if (!activador) //BOOL TRUE or FALSE
            {
                for (z = 0; z < data.length; z++)
                {
                    $("#listini").append('<li> Id: ' + data[z]["id"] + '</li>' + '<li> UserName: ' + data[z]["userName"] + '</li>' + '<li> FirstName: ' + data[z]["firstName"] + '</li>'); //en otro div pero en forma de list
                }
                activador = true;  
            }
            
            $("#listini").toggle();
        });    
    });

    //Post User
    //
    $("#btnpostuser").click(function(){
        $("#postuserform").toggle();
        $("#buttonSubmitPost").click(function(){
            var usernameForm = $("#userName").val();
            var firstName = $("#firstName").val();
            var lastName = $("#lastName").val();
            var country = $("#country").val();
            var state = $("#state").val();
            var city = $("#city").val();
            
            
            $.ajax({
                'url':'https://localhost:7233/api/AddUser',
                'method':'POST',
                'dataType': 'json',
                processData: false,
                'contentType': 'application/json',
                'data':JSON.stringify({
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
    
    //Delete User
    //
    let z = 0;
    let activador_del = false;
    $("#btndeluser").click(function(){
            
        $.get("https://localhost:7233/api/GetAllUsers", function( data ){
            
                if (!activador_del)
                {
                    for (z = 0; z < data.length; z++)
                    {
                        $("#deluserlist").append('<li> ' + '<button id="btnDel'+ data[z]["id"] +'">Del Id "' + data[z]["id"] + '"</button>' + '</li>' + '<li> UserName: ' + data[z]["userName"] + '</li>'); //en otro div pero en forma de list

                    }
                    activador_del = true;  
                }
                //$("#divuserlist").toggle(); // bugea, hace q salgan dos veces los pedidos de borrar
            
                $('[id*="btnDel"]').click(function(){
                    activador_del = false;
                    digitCounter = 0;
                    
                    for (z = 0; z < this.id.length; z++)
                    {
                        if(this.id[z] == '0' || this.id[z] == '1' || this.id[z] == '2' || this.id[z] == '3' || this.id[z] == '4' || this.id[z] == '5' || this.id[z] == '6' || this.id[z] == '7' || this.id[z] == '8' || this.id[z] == '9')
                        {
                            digitCounter++;
                        }
                    }
                    console.log(digitCounter);
                    let idDelete;
                    idDelete = this.id.substr(this.id.length - digitCounter); // se le restan la cantidad de ultimos chars que te queres llevar del array
                    /*if (digitCounter == 1)
                    {
                        idDelete = this.id.substr(this.id.length - 1);
                    }
                    else {
                        idDelete = this.id.substr(this.id.length - 2);
                    }
                    */
                    console.log(idDelete);

                    $.ajax({
                        'url':'https://localhost:7233/api/DeleteUser/' + idDelete,
                        'method':'DELETE',
                        processData: false,
                        'contentType': 'application/json',

    
                        success: function(msg){
                        alert( "Data Saved: " + msg );
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert("some error: " + XMLHttpRequest.responseText);
                        }
                    });
               });
        });
    });
    
    //Update User
    //
    let activadorUpdate = false;
    $("#btnUpdateUser").click(function(){
        $.get("https://localhost:7233/api/GetAllUsers", function( data ){
            
                if (!activadorUpdate)
                {
                    for (z = 0; z < data.length; z++)
                    {
                        $("#divUserUpdateList").append('<li> ' + '<button id="btnUpdate'+ data[z]["id"] +'">Update Id "' + data[z]["id"] + '"</button>' + '</li>' + '<li> UserName: ' + data[z]["userName"] + '</li>'); //en otro div pero en forma de list

                    }
                    activadorUpdate = true;  
                }
                //$("#divuserlist").toggle(); // bugea, hace q salgan dos veces los pedidos de borrar
            
                $('[id*="btnUpdate"]').click(function(){
                    activadorUpdate = false;
                    digitCounter = 0;
                    
                    for (z = 0; z < this.id.length; z++)
                    {
                        if(this.id[z] == '0' || this.id[z] == '1' || this.id[z] == '2' || this.id[z] == '3' || this.id[z] == '4' || this.id[z] == '5' || this.id[z] == '6' || this.id[z] == '7' || this.id[z] == '8' || this.id[z] == '9')
                        {
                            digitCounter++;
                        }
                    }
                    console.log(digitCounter);
                    //guarda en idUpdate los digitos que corresponden al ID
                    let idUpdate;
                    idUpdate = this.id.substr(this.id.length - digitCounter);
                    //
                    console.log(idUpdate);
                    console.log(data[idUpdate]["userName"]);
                    $("#updateUserForm").toggle();
                    $("#result").append("#updateUserForm");
                    
                    //mostrando valores actuales en el form
                    $("#userId").val(idUpdate);
                    $("#userName").val(data[idUpdate]["userName"]);
                    //termina mostrando valores actuales en el form

                    $("#buttonSubmit").click(function(){
                        var usernameForm = $("#userName").val();
                        var firstName = $("#firstName").val();
                        var lastName = $("lastName").val();
                        var country = $("country").val();
                        var state = $("state").val();
                        var city = $("city").val();
                        
                        $.ajax({
                            'url':'https://localhost:7233/api/UpdateUser',
                            'method':'PUT',
                            'dataType': 'json',
                            processData: false,
                            'contentType': 'application/json',
                            'data':JSON.stringify({
                                "Id":idUpdate, //es la var que tengo de antes
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






                    //
                });
        });        



    });
    

});


            
                













            
            
       




    /*
    $.get( "https://localhost:7233/api/GetAllUsers", function( data ) 
    {
        let i = 0; // init en 0
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
        $("#btnpostuser").click(function(){
            $("#postuserform").toggle();
            $("#buttonSubmit").click(function(){
                var usernameForm = $("#userName").val();
                var firstName = $("#firstName").val();
                var lastName = $("lastName").val();
                var country = $("country").val();
                var state = $("state").val();
                var city = $("city").val();
                
                $.ajax({
                    'url':'https://localhost:7233/api/AddUser',
                    

                    'method':'POST',
                    'dataType': 'json',
                    processData: false,
                    'contentType': 'application/json',
                    'data':JSON.stringify({
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
        //delete user
        activador = false;
        let z = 0;
        $("#btndeluser").click(function(){
            $("#divuserlist").toggle();
            
            if (!activador) //esta cabezada se llama flag - deberia ser BOOL TRUE or FALSE
            {
                for (z = 0; z < data.length; z++)
                {
                    $("#deluserlist").append('<li> ' + '<button id="btnDel'+ z +'">Del Id "' + z + '"</button>' + '</li>' + '<li> UserName: ' + data[z]["userName"] + '</li>'); //en otro div pero en forma de list
                }
                activador = true;  
            }
            
            
            $('[id*="btnDel"]').click(function(){
                
                //console.log("entro");
                //console.log(this.id);
                let idDelete = this.id.substr(this.id.length - 1);
                console.log(idDelete);

                $.ajax({
                    'url':'https://localhost:7233/api/DeleteUser/' + idDelete,
                    'method':'DELETE',
                    processData: false,
                    'contentType': 'application/json',

    
                        success: function(msg){
                            alert( "Data Saved: " + msg );
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert("some error: " + XMLHttpRequest.responseText);
                        }
                });

            });
            
                
        });
            



    });*/
    //});
                        




