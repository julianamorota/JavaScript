//array global -
var local = [];

$(document).ready(function()
{
  //resetar array (localStorage)
  /*
  local = [];
  localStorage.setItem('local', JSON.stringify(local));
  */

  function limparLista()
  {
    $('#lista').empty();
    $('#apresentacao').css('visibility', 'hidden');
  }

  //Salvar cidade e estado
  $('#btnSalvar').click(function()
  {
      var cidade = $('input[id=cidade]').val();
      var estado = $('input[id=estado]').val();
      //validações
      if (cidade && estado)
      {
        //salva no array e localStorage
        local[local.length] = {cidade: cidade, estado: estado};
        localStorage.setItem('local', JSON.stringify(local));
        //limpa os campos
        $('#cidade, #estado').val('');
        limparLista();
        mudaPagina(1);
        alert("Cadastro realizado com sucesso!");
      }
      else
        alert("Preencha os campos corretamente.");

  });

  //Editar cidade/estado
  $('#btnEditar').click(function()
  {
    //pega o array salvo em localStorage
    var retrievedObject = localStorage.getItem('local');
    local = ('retrievedObject: ', JSON.parse(retrievedObject));

    var checkbox = $('[name="item"]');
    var cont = 0; var indice = 0; var id; var inicio; var parada;
    inicio = (pagAtual-1) * itensPorPagina;
    parada = (pagAtual * itensPorPagina) -1;

    for (var i = inicio; i <= parada; i++)
    {
      if (indice < checkbox.length)
      {
        if (checkbox[indice].checked == true)
        {
          id = i; cont++;
        }
        indice++;
      }
    }


    if(cont == 1){
      $('#btnAlterar').prop("disabled", false);
      $('#btnSalvar').prop("disabled", true);
      $('#cidade').val(local[id].cidade);
      $('#estado').val(local[id].estado);
      $('#cidade').attr('name', id);

    }
    else
      alert("Selecione um item para editar");
  });
  //Salvar alterações cidade/estado
  $('#btnAlterar').click(function()
  {
    try
    {
      var cidade = $('input[id=cidade]').val();
      var estado = $('input[id=estado]').val();
      //*************
      var id = $('#cidade').attr('name');
      //pega o array salvo em localStorage
      var retrievedObject = localStorage.getItem('local');
      local = ('retrievedObject: ', JSON.parse(retrievedObject));

      //validações
      if (cidade && estado)
      {
        //salva no array e localStorage
        local[id] = {cidade: cidade, estado: estado};
        localStorage.setItem('local', JSON.stringify(local));
        //limpa os campos
        $('#cidade, #estado').val('');
        mudaPagina(1);
        $('#btnAlterar').prop("disabled", true);
        $('#btnSalvar').prop("disabled", false);
        alert("Alteracao realizada com sucesso!");
      }
      else
        alert("Preencha os campos corretamente.");
    }
    catch(e)
    {
      alert(e);
    }
  });

  //excluir
  $('#btnExcluir').click(function()
  {
    try
    {
      //pega o array salvo em localStorage
      var retrievedObject = localStorage.getItem('local');
      local = ('retrievedObject: ', JSON.parse(retrievedObject));

      var checkbox = $('[name="item"]');
      var checked = false; var inicio; var parada; var indice;

      inicio = (pagAtual * itensPorPagina) - 1;
      parada = (pagAtual-1) * itensPorPagina;
      indice = itensPorPagina-1;
       while(indice >= checkbox.length)
       {
           indice--; inicio--;
       }

       for (var i = inicio; i >= parada; i--)
       {
         if (indice >= 0)
           if (indice >= 0 && checkbox[indice].checked == true)
           {
             local.splice(i, 1);checked = true;
           }
         indice--;
       }
       if(checked)
       {
         localStorage.setItem('local', JSON.stringify(local));
         mudaPagina(1);
         alert("Exclusao realizada com sucesso!");
       }
       else
        alert("Selecione pelo menos um item para excluir");

    }
    catch (e)
    {
      alert(e);
    }
  });

  //---------------------------------------------------------------
  //PAGINAÇÃO
  var retrievedObject = localStorage.getItem('parametroLocal');
  var parametro = ('retrievedObject: ', JSON.parse(retrievedObject));
  var pagAtual = 1;
  if (parametro)
    itensPorPagina = parametro;
  else
	itensPorPagina = 3; //padrão
  //Listar cidades e estados
  $('#btnListar').click(function()
  {
    mudaPagina(1);
  });

  function mudaPagina(page)
  {
    try
    {
      pagAtual = page;
      var retrievedObject = localStorage.getItem('local');
      local = ('retrievedObject: ', JSON.parse(retrievedObject));
  	  if(local)
  	  {
        if(local.length > 0)
        {
          limparLista();
    		  $('#apresentacao').css('visibility', 'visible');

    		  for (var i = (page-1) * itensPorPagina; i < (page * itensPorPagina) && i < local.length; i++)
    		  {
    			var lista = $('#lista');
    			var desc = local[i].cidade + " - " + local[i].estado;
    			var input = lista.find('input');
    			var status = $('#page');

    			$('<input />', {type: 'checkbox', id: i, name: 'item'}).appendTo(lista);
    			$('<label />', {text: desc}).appendTo(lista);
    			$('<br>').appendTo(lista);

    			status.html(page + "/" + contarPaginas());

    			if(page == 1)
    			  $('#pagAnt').css('visibility', 'hidden');
    			else
    			  $('#pagAnt').css('visibility', 'visible');

    			if(page == contarPaginas())
    			  $('#pagProx').css('visibility', 'hidden');
    			else
    			  $('#pagProx').css('visibility', 'visible');

    			var lista = $("[name='item']");
    			var x = lista.length; var y = local.length;
    			var pri = parseInt(lista[0].id); var ult = pri + parseInt(itensPorPagina);

    			if(ult > y) ult = y;

    			var expressao = "exibindo " + (pri + 1) + "-" + ult + " (" + x + ") itens de " + y;
    			$('#total').html(expressao);
    		  }
        }
        else
          alert("Nenhum local cadastrado");
  	  }
  	  else
  		  alert("Nenhum local cadastrado");

    }
    catch (e)
    {
      alert(e);
    }

  }
  function contarPaginas()
  {
    var retrievedObject = localStorage.getItem('local');
    local = ('retrievedObject: ', JSON.parse(retrievedObject));
    return Math.ceil(local.length / itensPorPagina);
  }

  $('#pagAnt').click(function()
  {
    if (pagAtual > 1)
    {
      pagAtual--; mudaPagina(pagAtual);
    }
  });
  $('#pagProx').click(function()
  {
    if(pagAtual < contarPaginas())
    {
      pagAtual++; mudaPagina(pagAtual);
    }
  });

  $('#btnConfig').click(function()
  {
    $('#config').css('visibility', 'visible');
    $('#paginas').val(itensPorPagina);
  });
  $('#btnSalvarConfig').click(function()
  {
    try
    {
      var paginas = $('#paginas').val();
      if(paginas.length > 0)
      {
        itensPorPagina = paginas;
        localStorage.setItem('parametroLocal', JSON.stringify(itensPorPagina));
        $('#paginas').val('');
        mudaPagina(1);
        alert("Cadastro de parametro de paginas realizado com sucesso!");
      }
      else
        alert("Digite o numero de paginas.");
      $('#config').css('visibility', 'hidden');
    }
    catch (e)
    {
      alert(e);
    }
  });
});
