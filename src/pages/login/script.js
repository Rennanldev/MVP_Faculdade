function logar(){
  var login = document.getElementById('usuario').value;
  var senha = document.getElementById('senha').value;

  if(login == 'admin' && senha == '1234'){
  alert('sucesso')
 window.location.href = "../admin/admin-index.html";
}
else{
  alert('usuario ou senha incorretos') ;
}


}