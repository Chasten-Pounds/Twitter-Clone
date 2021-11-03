$(document).ready(function () {
  //Execute after document is loaded
    getTattles();
});

const firebase = new Firebase ('https://tattletale-6f92d-default-rtdb.firebaseio.com');

//create

const addUser = async () => {

//capture values from the form
const firstName = $('#addFirstName').val();
const lastName = $('#addLastName').val();

//build a user object with those values

const user = new UserDBModel(firstName, lastName, userName);

//send the user object to firebase
await firebase.addUser(user);

//refresh the form/users table
clearForm();
getUsers();


};

let postName = $('#loginName').val();

const addTattle = async () => {

  

  var objToday = new Date(),
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() : objToday.getDate(),
	months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear(),
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";

  var today = curHour + ":" + curMinute + curMeridiem + " "  + curMonth + dayOfMonth + ", " + curYear;
 
  const message = $('#inputTattle').val();
  const userName = sessionStorage.getItem("username");
  const timeStamp = today;
  const image = sessionStorage.getItem("image");

  console.log(timeStamp);
  //build a tattle object with those values

const tattle = new TattleDBModel(userName, message, timeStamp, image);

//send the user object to firebase
await firebase.addTattle(tattle);

//refresh the form/users table
clearinput();
getTattles();
setTimeout(Verify,1000);
}

//read

const getUsers= async () => {
  const users =  await  firebase.getUsers();
  
  let userTable = $('#userTable');
  let tattle = $('#newsFeed');
  userTable.empty();

  users.forEach(user => {
      userTable.append (`

      <tr>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.userName}</td>
      <td> 
          <button class="btn btn-warning" data-toggle="modal" data-target="#userModal"><i class="fa fa-edit"></i></button>
          <button class="btn btn-danger"><i class="fa fa-trash"></i></button>
      </td>
    </tr>
      
      `);

      tattle.append(`
      
      <div style="padding-bottom:1em; padding-left: 3em; padding-right: 3em; padding-top: 1em;">
            <div class="card flex-md-row mb-4 box-shadow h-md-250">
              <div class="card-body display-flex;" >
                <img class="card-img-left" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17c44b6c5a0%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17c44b6c5a0%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2256.1953125%22%20y%3D%22131%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" style="width: 100px; height: 100px;">
                <h5 class="col-10 d-inline-block mb-2" id="UserName">${user.userName}</h5>
              </div>
                <div>
                <div class="card-body responsive">
                  <br>
                  <p class="card-text mb-auto">${user.tattle}</p>
                     <div style="display: flex; padding-top: 10%; margin-left: 5em;">
                       <h6 style="padding-right: 2em;" id="timeStamp">${tattle.timeStamp}</h6>
                       <i class="fa-regular fa-heart" style="padding: 1em; "></i>
                       <i class="fa-regular fa-comment" style="padding: 1em;"></i>
                       <i class="fa-solid fa-link" style="padding: 1em;"></i>
                     </div>
                </div>
              </div>
             
            </div>
          </div>
      
      `)

  });

  

};

const getTattles= async () => {

  const tattles =  await  firebase.getTattles();

  let tattletale = $('#newsFeed');
  tattletale.empty();

  tattles.forEach(tattle => {

      tattletale.prepend (`
      
      <div style="padding-bottom:1em; padding-left: 3em; padding-right: 3em; padding-top: 1em;">
            <div class="card flex-md-row mb-4 box-shadow h-md-250">
              <div class="card-body display-flex;" >
                <img class="card-img-left" style="width:100px; height: 100px;" src="${tattle.image}" id="postImage">
                <h5 class="col-10 d-inline-block mb-2" id="UserName">@${tattle.userName}</h5>
              </div>
                <div>
                <div class="card-body responsive">
                  <br>
                  <p class="card-text mb-auto" id="tattleMessage">${tattle.message}</p>
                     <div style="display: flex; padding-top: 10%;">
                       <h6 class="col-8"  id="timeStamp">${tattle.timeStamp}</h6>
                       <i class="fa-regular fa-heart" style="padding: 1em; "></i>
                       <button class="${tattle.userName}" style="display: none;" onclick="getTattle('${tattle.id}')" data-toggle="modal" data-target="#updateModal"><i class="fa-solid fa-edit" style="padding: .5em;"></i> </button>
                       <button class="${tattle.userName}" style="display: none;"  onclick="deleteTattle('${tattle.id}')" ><i class="fa-solid fa-trash" style="padding: .5em;"></i> </button>
                     </div>
                </div>
              </div>
             
            </div>
          </div>
      
          
      `);

  });
  

}

//update

const getTattle= async tattleId => {
  
  const tattle = await firebase.getTattle(tattleId);

  $('#updateMessage').val(tattle.message);
  $('#UserName').val(tattle.userName);
  $('#postImage').val(tattle.image);
  



  $('#updateSaveBtn').attr('onclick', `updateTattle('${tattleId}')`);

}



const getUser= async userId => {

  const user = await firebase.getUser(userId);

  $('#updateFirstName').val(user.firstName);
  $('#updateasLastName').val(user.LastName);


};

const updateUser= () => {

};

const updateTattle = async tattleId => {

  var objToday = new Date(),
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() : objToday.getDate(),
	months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear(),
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";

  var today = curHour + ":" + curMinute + curMeridiem + " "  + curMonth + dayOfMonth + ", " + curYear;

 const message = $('#updateMessage').val();
 const username = $('#UserName').val();
 const timeStamp = "Edited " + today;
 const image = $('#postImage').val();
 



 const tattle = new TattleDBModel(username,message,timeStamp, image);

 await firebase.updateTattle(tattle, tattleId);

 getTattles();
 setTimeout(Verify,1000);

 $('#updateModal').modal('hide');

  //get values off the from
  //crete a user object from those alues
  //send that off to the 


};



//Delete
const deleteUser= () => {


};

const deleteTattle = async tattleId =>
{
    //Are you sure you want to delete?

    if(confirm('Are you sure you want to delete this tattle?')){
        //Pass in a tattle Id send to fire base with command to delete
        await firebase.deleteTattle(tattleId);
        Snackbar();
        getTattles();

    }
 
}

function showUserModal(){

 $('#userModal').modal('show')
}




  function addClass() {

    var element = document.getElementById("change");
    element.classList.add("vader");
    
var temp = document.querySelectorAll("#change");

// Apply CSS property to it
for (var i = 0; i < temp.length; i++) {
  temp[i].style.visibility = "hidden";

}

}







function validate(){

const validUsers = ["lordvader", "thelastjedi", "obi-wan", "milleniumfalcon" ];

const userInput = $('#loginName').val();


  switch(userInput){

    case validUsers[0]:

      window.open('home.html', "_self");
      sessionStorage.setItem("username", "LordVader");
      sessionStorage.setItem("image","images/darthvader.jpg");
      var user = sessionStorage.getItem("username");
      console.log("You are logged in as LordVader!");
      console.log(sessionStorage);
      console.log(user);
      break;
    case validUsers[1]:

      window.open('home.html', "_self");
      sessionStorage.setItem("username", "TheLastJedi");
      sessionStorage.setItem("image","images/Luke.jpg")
      console.log("You are logged in as TheLastJedi!");
      var user = sessionStorage.getItem("username");
      setTimeout(HideBtn,5000)
      function HideBtn(){
        $( ".-MlEJLAl8IPaoH-82L8N" ).show();
        
      }
      console.log(sessionStorage);
      console.log(user);
      break;
    case validUsers[2]:

      window.open('home.html', "_self");
      sessionStorage.setItem("username", "Obi-Wan");
      sessionStorage.setItem("image","images/ben.jpg")
      console.log("You are logged in as Obi-Wan!");
      var user = sessionStorage.getItem("username");
      console.log(sessionStorage);
      console.log(user);
      break;
    case validUsers[3]:

      window.open('home.html',"_self");
      sessionStorage.setItem("username", "MilleniumFalcon");
      sessionStorage.setItem("image","images/solo.jpg")
      console.log("You are logged in as MilleniumFalcon!");
      var user = sessionStorage.getItem("username");
      console.log(sessionStorage);
      console.log(user);
      break;
      
    default:
     Snackbar2();

      console.log("You are not logged in!");


};




   
}


const validation = async () => {

  var query =
  firebase.database().ref("users").orderByKey();
  query.once("value").then(function(childSnapshot){

    var key = childSnapshot.key;
    var childData =
    childSnapshot.val();

    console.log(childData);

  })
 
}

