
var socket = io();

socket.on('bemvindo', function(){
  $('#updates').append('<li>Bem vindo, voce entrou no chat</li>');

  // socket.on('login', function(data){
  //   $('#chat ul').append('<li><strong>' + data.nome + ': </strong> entrou no chat</li>');
  // });
});

// socket.on('usuario entrou', function(data){
//   $('#updates').append('<li>O usuário <strong>' + data.usuarioid + '</strong> entrou no chat.</li>');
// });

socket.on('nome alterado', function(data){
  $('#updates').append('<li>Seu nome foi alterado para: <strong>' + data.nome + '</strong></li>');
});

socket.on('usuario alterou nome', function(data){
  $('#updates').append('<li>O usuário <strong>' + data.usuarioid + '</strong> alterou seu nome para: <strong>' + data.nome + '</strong></li>');
});

socket.on('mensagem enviada', function(data){
  $('#chat ul').append('<li><strong>Me: </strong>' + data.message + '</li>');
});

socket.on('mensagem enviada por usuario', function(data){
  $('#chat ul').append('<li><strong>' + data.nome + ': </strong>' + data.message + '</li>');
});

socket.on('voce entrou', function(data){
  $('#login').fadeOut('slow');
  $('#chat-body').fadeIn('slow');
});

socket.on('usuario entrou', function(data){
  $('#chat ul').append('<li><strong>' + data.nome + ': </strong> entrou no chat</li>');
});

$(function() {
  $('#form-alterar-nome').submit(function(e){
    e.preventDefault();

    var nome = $('#name').val();
    socket.emit('altera nome', { nome: nome });
    $('#name').val(' ');
  });

  $('#form-enviar-mensagem').submit(function(e){
    e.preventDefault();

    var nome = socket.username;
    var message = $('#message').val();
    socket.emit('envia menssagem', { message: message, nome: nome });
    $('#message').val(' ');
  });

  $('#formlogin').submit(function(e){
    e.preventDefault();

    var nome = $('#nome').val();
    socket.username = nome;
    socket.emit('login', { nome: nome });
  });
});
