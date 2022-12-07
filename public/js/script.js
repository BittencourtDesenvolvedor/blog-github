function deletarForm(event, form){
    event.preventDefault();

    var res = confirm("Você tem certeza que quer deletar? essa ação será irreversivel!");
    if(res){
       form.submit();
    }
  }