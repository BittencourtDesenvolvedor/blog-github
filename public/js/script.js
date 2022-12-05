function deletarForm(event, form){
    event.preventDefault();

    var res = confirm("Você tem certeza que quer deletar essa categoria?");
    if(res){
       form.submit();
    }
  }