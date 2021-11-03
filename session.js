$(document).ready(function () {
    //Execute after document is loaded
     CreateSession();
      setTimeout(Verify, 1000)

  });

  function CreateSession(){

    document.getElementById('userName2').innerHTML= "@" + sessionStorage.getItem("username");
    document.getElementById('postImage').src = sessionStorage.getItem("image");
    

  }

  function removeSession(){

    sessionStorage.setItem("username", "")

  }

  
  function Verify(){

    const validUsers = ["LordVader", "TheLastJedi", "Obi-Wan", "MilleniumFalcon" ];
    const editBtn = sessionStorage.getItem('username')
    console.log(editBtn);
    
    switch(editBtn) {

     case validUsers[0]:
       HideBtn1();
     function HideBtn1(){
       $( ".LordVader" ).show();
       console.log("You chose vader");
     }
     break;
     case validUsers[1]:
       HideBtn2();
     function HideBtn2(){
       $( ".TheLastJedi" ).show();
       console.log("This is the one.")
     }
     break;
     case validUsers[2]:
       HideBtn3();
     function HideBtn3(){
       $( ".Obi-Wan" ).show();
       console.log("You chose Obi");
     }
     break;
     case validUsers[3]:
      HideBtn4();
     function HideBtn4(){
       $( ".MilleniumFalcon" ).show();
       console.log("You chose falcon...why");
     }
     default:
       console.log("How did it get down here?")

    }

  }



  
  