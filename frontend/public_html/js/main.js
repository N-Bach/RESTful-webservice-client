$(document).ready(function() {
        
    $(".panel-title").html("Users List (Loading...)");

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/restful-java/user/all",        
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Basic " + btoa("admin:admin"));
        }       
    })
    .done(function(data) {        
        $(".panel-title").html("Users List");        
        var table = $('#users-list').DataTable({
            data: data,
            columns: [
                {
                    title: 'Id',
                    data: 'id'
                },
                {
                    title: 'Name',
                    data: 'name'
                },
                {
                    title: 'Email',
                    data: 'email'
                },
                {
                    title: 'Actions',
                    render: function () {
                        return '<button class="btn btn-primary btn-sm"><i class="fa fa-list-ul"></i> Detail</button>';
                    }
                }
            ]
        });
        
        $('#users-list tbody').on('click', 'button', function () {                        
            var selected = table.row($(this).parents('tr')).data();
            
            $('#details-modal-label').html('<b> ' + selected.username + '</b>\'s information');
            $('#details-id').attr('value', selected.id);
            $('#details-username').attr('value', selected.username);
            $('#details-password').attr('value', selected.password);
            $('#details-email').attr('value', selected.email);
            $('#details-name').attr('value', selected.name);                                
            $('#details-status').attr('value', selected.status);

            $('#details-modal').modal('show');            
        });
                        
    })
    .fail(function() {
        console.log("error");
    });
    
    


});