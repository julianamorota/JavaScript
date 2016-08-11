var cadastro = [];

//inicializa o array com 5 escolas
function inicializaArray()
{
  var i;
  for (i=0; i<5; i++)
  {
    cadastro[i] = {escola: "escola " + (i+1)};
  }
  //reseta combo
  //localStorage.setItem('cadastro', JSON.stringify(cadastro));
}

//carregar combo da escola
function carregaCombo()
{
  try
  {
    var retrievedObject = localStorage.getItem('cadastro');
    cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));
    //limpa os combos
    document.getElementById("cbbEscola").innerHTML = "";
    var cbbEscola = document.getElementById("cbbEscola");
    //opção de busca vazia
    var opVazia = document.createElement('option');
    opVazia.innerHTML = "-";
    opVazia.value = -1;

    cbbEscola.appendChild(opVazia);
    //preenche combos
    for (var i = 0; i < cadastro.length; i++)
    {
      var opE = document.createElement('option');
      opE.innerHTML = cadastro[i].escola;
      opE.value = i;
      cbbEscola.appendChild(opE);
    }
  }
  catch (e)
  {
    alert(e);
  }
}

function adicionarCidade()
{
  try
  {
    //pega id da escola
    var id = document.getElementById("cbbEscola").value;
    var cidade = document.getElementById("cidade").value;
    if(id != -1 && cidade)
    {
      var retrievedObject = localStorage.getItem('cadastro');
      cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));

      if(cadastro[id].cidade)
      {
        var decisao = confirm("Ja existe uma cidade cadastrada para essa escola.\nContinuar?");
        if(decisao)
        {
          cadastro[id].cidade = document.getElementById("cidade").value;
          localStorage.setItem('cadastro', JSON.stringify(cadastro));
          //limpa e recarrega
          carregaCombo();
          document.getElementById("cidade").value = "";
          mudaPagina(1);
          alert("Cadastro realizado com sucesso!");
        }
      }
      else
      {
        cadastro[id].cidade = document.getElementById("cidade").value;
        localStorage.setItem('cadastro', JSON.stringify(cadastro));
        //limpa e recarrega
        carregaCombo();
        document.getElementById("cidade").value = "";
        mudaPagina(1);
        alert("Cadastro realizado com sucesso!");
      }
    }
    else
      alert("Selecione/preencha os campos corretamente");
  }
  catch(e)
  {
    alert(e);
  }
}

inicializaArray();
carregaCombo();
