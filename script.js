  //array global - cadastro.escola e cadastro.cidade
  var cadastro = [];

  //limpa a lista de escolas
  function limparLista()
  {
    var lista = document.getElementById("lista");

    while(lista.firstChild)
    {
      lista.removeChild(lista.firstChild);
    }
  }

  function buscar()
  {
    var retrievedObject = localStorage.getItem('cadastro');
    cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));
  	var opcao = document.getElementById("cbbFiltro").value;
  	var pesquisa = document.getElementById("pesquisa").value;
    var id = -1;
  	if (pesquisa.length > 0)
  	{

  		if (opcao == "escola")
  			for (var i = 0; i < cadastro.length; i++)
        {
          if (cadastro[i].escola == pesquisa)
  					id = i;
        }
  		else
  			for (var i = 0; i < cadastro.length; i++)
        {
          if (cadastro[i].cidade == pesquisa)
            id = i;
        }

  		if (id == -1)
  		{
  		  alert("Nenhuma escola/cidade encontrada");
        limparLista();
  		}
  		else
  		{
        limparLista();

        var lista = document.getElementById("lista");
  		  var cidade = cadastro[id].cidade;
  		  if(typeof cidade == "undefined")
  			  cidade = "-"
  		  var desc = cadastro[id].escola + " / " + cidade;
  		  var checkbox = document.createElement("input");
  		  checkbox.type = "checkbox";
  		  checkbox.name = "item";
  		  checkbox.id = id;
  		  lista.appendChild(checkbox);

  		  var label = document.createElement('label')
  		  label.htmlFor = desc;
  		  label.appendChild(document.createTextNode(desc));

  		  lista.appendChild(label);
  		  lista.appendChild(document.createElement("br"));
  		}
  	}
  	else
  		alert("Digite o nome da escola/cidade");
  }
  //-----------------------------------------------------------------------------

  function excluirEscola()
  {
    try
    {
      var retrievedObject = localStorage.getItem('cadastro');
      cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));
      var checkbox = document.getElementsByName("item");
      var checked = false; var inicio; var parada; var indice;
      inicio = (pagAtual * itensPorPagina) - 1;
      parada = (pagAtual-1) * itensPorPagina;
      indice = itensPorPagina-1;
       while(indice >= checkbox.length)
       {
           indice--;
           inicio--;
       }

      for (var i = inicio; i >= parada; i--)
      {
        if (indice >= 0)
          if (indice >= 0 && checkbox[indice].checked == true)
          {
            cadastro.splice(i, 1);
            checked = true;
          }
        indice--;
      }
      if(checked)
      {
        localStorage.setItem('cadastro', JSON.stringify(cadastro));
        mudaPagina(1);
        alert("Exclusao realizada com sucesso!");
      }
      else
      {
        alert("Selecione pelo menos um item para excluir");
      }
    }
    catch (e)
    {
      alert(e);
    }
  }

  function isNew()
  {
    var retrievedObject = localStorage.getItem('cadastro');
    cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));
    var retrievedObject = localStorage.getItem('redirect');
    var redirect = ('retrievedObject: ', JSON.parse(retrievedObject));
    if(redirect == "false")
    {
      var retrievedObject = localStorage.getItem('idEscola');
      var idEscola = ('retrievedObject: ', JSON.parse(retrievedObject));
      document.getElementById("escola").value = cadastro[idEscola].escola;
      document.getElementById('escola').name = idEscola;
      document.getElementById("btnAlterar").disabled = false;
      document.getElementById("btnAddEscola").disabled = true;
    }
  }

  function editarEscola()
  {
    try
    {
      var retrievedObject = localStorage.getItem('cadastro');
      cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));


      var id = document.getElementById("escola").name;
      var escola = document.getElementById("escola").value;

      cadastro[id].escola = escola;

      document.getElementById("btnAlterar").disabled = true;
      document.getElementById("btnAddEscola").disabled = false;
      document.getElementById("escola").value = "";
      localStorage.setItem('cadastro', JSON.stringify(cadastro));
      mudaPagina(1);
      localStorage.setItem('redirect', JSON.stringify("true"));
      alert("Alteracao realizada com sucesso!");

    }
    catch (e)
    {
      alert(e);
    }
  }

  function adicionarEscola()
  {
    try
    {
      var nomeEscola = document.getElementById("escola").value;
      //verifica se o campo está em branco
      if(nomeEscola.length == 0)
        alert("Digite o nome de uma escola");
      else
      {
        var retrievedObject = localStorage.getItem('cadastro');
        cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));
        cadastro[cadastro.length] = {escola: nomeEscola};
        //limpa text da escola
        document.getElementById("escola").value = "";
        localStorage.setItem('cadastro', JSON.stringify(cadastro));
        mudaPagina(1);
        alert("Cadastro realizado com sucesso!");
      }
    }
    catch (e)
    {
      alert(e);
    }
  }


  function validarEdicao()
  {
   var retrievedObject = localStorage.getItem('cadastro');
   cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));
   var checkbox = document.getElementsByName("item");
   var cont = 0; var indice=0; var id; var inicio; var parada;
   inicio = (pagAtual-1) * itensPorPagina;
   parada = (pagAtual * itensPorPagina) -1;
   for (var i = inicio; i <= parada; i++)
   {
     if (indice < checkbox.length)
     {
       if (checkbox[indice].checked == true)
       {
         id = i;	cont++;
       }
       indice++;
     }
   }

   if(cont == 1)
   {
     document.getElementById("btnAlterar").disabled = false;
     document.getElementById("btnAddEscola").disabled = true;
     document.getElementById("escola").value = "";
     document.getElementById('escola').value = cadastro[id].escola;
     document.getElementById('escola').name = id;
   }
   else
     alert("Selecione um item para editar");
  }

//--------------------------------------------------------------
//PAGINAÇÃO

//ver se existe valor cadastrado de parâmetro, se não
//coloca o valor padrão que é 3
var retrievedObject = localStorage.getItem('parametro');
var parametro = ('retrievedObject: ', JSON.parse(retrievedObject));
var pagAtual = 1;

if (parametro)
  itensPorPagina = parametro;
else
  itensPorPagina=3; //padrão

function salvarParametro()
{
  try
  {
    var pesquisa = document.getElementById("parametroPag").value;
    if (pesquisa.length > 0)
    {
      itensPorPagina = pesquisa;
      localStorage.setItem('parametro', JSON.stringify(itensPorPagina));
      document.getElementById("parametroPag").value = "";
      alert("Cadastro de parametro de paginas realizado com sucesso!");
    }
    else
      alert("Digite o numero de paginas.");
  }
  catch(e)
  {
    alert(e);
  }
}

function pagAnt()
{
  if(pagAtual > 1)
  {
    pagAtual--;
    mudaPagina(pagAtual);
  }
}

function pagProx()
{
  if(pagAtual < contarPaginas())
  {
    pagAtual++;
    mudaPagina(pagAtual);
  }
}

function mudaPagina(page)
{
  document.getElementById("paginacao").setAttribute('style', 'visibility:visible');
  pagAtual = page;
  var btnProx = document.getElementById("pagProx");
  var btnAnt = document.getElementById("pagAnt");
  var lista = document.getElementById("lista");
  var status = document.getElementById("page");

  //valida página
  if(page < 1) page = 1;
  if(page > contarPaginas()) page = contarPaginas();
  limparLista();
  document.getElementById("pagAnt").setAttribute('style', 'visibility:visible');
  var retrievedObject = localStorage.getItem('cadastro');
  cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));

  for (var i = (page-1) * itensPorPagina; i < (page * itensPorPagina) && i < cadastro.length; i++)
  {
    var lista = document.getElementById("lista");
    var cidade = cadastro[i].cidade;
    if(typeof cidade == "undefined") cidade = "-"

    var desc = cadastro[i].escola + " / " + cidade;
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "item";
    checkbox.id = i;
    lista.appendChild(checkbox);

    var label = document.createElement('label')
    label.htmlFor = desc;
    label.appendChild(document.createTextNode(desc));

    lista.appendChild(label);
    lista.appendChild(document.createElement("br"));
  }

  status.innerHTML = page + "/" + contarPaginas();

  if(page == 1)
    btnAnt.style.visibility = "hidden";
  else
    btnAnt.style.visibility = "visible";

  if(page == contarPaginas())
    btnProx.style.visibility = "hidden";
  else
    btnProx.style.visibility = "visible";

  //total (exibindo x itens de y)
  //"exibindo " + x + " itens de " + y;
  var lista = document.getElementsByName("item");
  var x = lista.length;
  var y = cadastro.length;
  var pri = parseInt(lista[0].id);
  var ult = pri + parseInt(itensPorPagina);
  if (ult > y)
    ult=y;
  var expressao = "exibindo "+(pri+1)+"-"+ult+" ("+x+") itens de " + y;
  document.getElementById("total").innerHTML =expressao;
}

function contarPaginas()
{
  var retrievedObject = localStorage.getItem('cadastro');
  cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));
  return Math.ceil(cadastro.length / itensPorPagina);
}
//--------------------------------------------------------------
function editarOutraPagina()
{
  var checkbox = document.getElementsByName("item");
  var cont = 0; var indice=0; var id; var inicio; var parada;
  inicio = (pagAtual-1) * itensPorPagina;
  parada = (pagAtual * itensPorPagina) -1;
  for (var i = inicio; i <= parada; i++)
  {
    if (indice < checkbox.length)
    {
      if (checkbox[indice].checked == true)
      {
        id = i;	cont++;
      }
      indice++;
    }
  }

  if(cont == 1)
  {
    localStorage.setItem('redirect', JSON.stringify("false"));
    localStorage.setItem('idEscola', JSON.stringify(id));

    window.location="Escola.html";
  }
  else
    alert("Selecione um item para editar");

}
  //document.getElementById("btnAlterar").disabled = true;
