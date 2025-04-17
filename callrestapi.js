//var url = "http://localhost:3300/api/users";
var url = "https://mysql-restapigio.onrender.com/api/users";
//var url = "https://giovanni-rest.onrender.com/api/users";

function postUser() {
    console.log(url);

    var myuser = {
        name: $('#name').val(),
        email: $('#email').val(),
        age: $('#age').val(),
        comments: $('#comments').val()
    };
    console.log(myuser);

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            limpiarInputs();
            $('#resultado').html('<div class="mensaje-exito">Usuario creado correctamente</div>');
        },
        data: JSON.stringify(myuser)
    });
}

function getUsers() {
    console.log(url);

    $.getJSON(url, function(json) {
        console.log(json);

        var arrUsers = json.users;

        var htmlTableUsers = '<table border="1">' +
            '<tr><th>ID</th><th>Nombre</th><th>Email</th><th>Edad</th><th>Comentarios</th><th>Acciones</th></tr>';

        arrUsers.forEach(function(item) {
            htmlTableUsers += '<tr>' +
                '<td>' + item.id + '</td>' +
                '<td>' + item.name + '</td>' +
                '<td>' + item.email + '</td>' +
                '<td>' + item.age + '</td>' +
                '<td>' + item.comments + '</td>' +
                '<td>' +
                    '<button onclick="editarUser(' + item.id + ')">Editar</button> ' +
                    '<button onclick="deleteUser(' + item.id + ')">Eliminar</button>' +
                '</td>' +
                '</tr>';
        });

        htmlTableUsers += '</table>';

        $('#resultado').html(htmlTableUsers);
    });
}

function getByIdUser() {
    const id = $('#id').val();

    $.getJSON(url + '/' + id, function (data) {
        const user = data.user;

        if (user) {
            var htmlTableUser = '<table border="1">' +
                '<tr><th>ID</th><th>Nombre</th><th>Email</th><th>Edad</th><th>Comentarios</th><th>Acciones</th></tr>' +
                '<tr>' +
                '<td>' + user.id + '</td>' +
                '<td>' + user.name + '</td>' +
                '<td>' + user.email + '</td>' +
                '<td>' + user.age + '</td>' +
                '<td>' + user.comments + '</td>' +
                '<td>' +
                    '<button onclick="editarUser(' + user.id + ')">Editar</button> ' +
                    '<button onclick="deleteUser(' + user.id + ')">Eliminar</button>' +
                '</td>' +
                '</tr>' +
                '</table>';
            $('#resultado').html(htmlTableUser);
        } else {
            alert('Usuario no encontrado.');
        }
    });
}

function editarUser(id) {
    $.getJSON(url + '/' + id, function (data) {
        const user = data.user;

        if (user) {
            $('#name').val(user.name);
            $('#email').val(user.email);
            $('#age').val(user.age);
            $('#comments').val(user.comments);

            $('#btn-update').show().data('id', id);
            $('#resultado').html('');
        } else {
            alert('Usuario no encontrado.');
        }
    });
}

function updateUser() {
    const id = $('#btn-update').data('id');

    var myuser = {
        name: $('#name').val(),
        email: $('#email').val(),
        age: $('#age').val(),
        comments: $('#comments').val()
    };

    $.ajax({
        url: url + '/' + id,
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(myuser),
        success: function (data) {
            alert('Usuario actualizado correctamente');
            $('#btn-update').hide();
            limpiarInputs();
            getUsers();
        },
        error: function (err) {
            alert('Error al actualizar usuario');
            console.error(err);
        }
    });
}

function deleteUser(id) {
    if (!confirm("¿Estás seguro de eliminar el usuario con ID " + id + "?")) return;

    $.ajax({
        url: url + '/' + id,
        type: 'DELETE',
        success: function (data) {
            alert('Usuario eliminado con éxito: ' + JSON.stringify(data));
            getUsers();
        },
        error: function (err) {
            alert('Error al eliminar usuario');
            console.error(err);
        }
    });
}

function limpiarInputs() {
    $('#name').val('');
    $('#email').val('');
    $('#age').val('');
    $('#comments').val('');
    $('#id').val('');
}

