const clearForm = () => {
    $('#addFirstName').val('');
    $('#addLastName').val('');
}

const clearinput = () => {
    $('#inputTattle').val('');
}

function Snackbar(){
    var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

  }

  function Snackbar2(){
    var x = document.getElementById("snackbar2");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

  }


