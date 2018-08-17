var todos;
var todosArray = [];
var data;

function pushData() {
  let taskTitle = document.querySelector('input').value;
  if (checkInputText(taskTitle, "Please enter a Task Title!")) return;
  let taskDesc = document.querySelector('textarea').value;
  if (checkInputText(taskDesc, "Please enter a Task Description!")) return;
  let taskTime = document.getElementById('usr_time').value;
  if (checkInputText(taskTime, "Please enter a Task time!")) return;



  var timeSplit = taskTime.split(':'),
    hours,
    minutes,
    meridian;
  hours = timeSplit[0];
  minutes = timeSplit[1];
  if (hours > 12) {
    meridian = 'PM';
    hours -= 12;
  } else if (hours < 12) {
    meridian = 'AM';
    if (hours == 0) {
      hours = 12;
    }
  } else {
    meridian = 'PM';
  }

  taskTime = hours + ':' + minutes + ' ' + meridian;

  var newDataObject = {
    Title: taskTitle,
    Description: taskDesc,
    Time: taskTime
  };


  // Pushing To localStorage
  if (localStorage.getItem('ToDo-List') !== null) {
    todosArray = JSON.parse(localStorage.getItem('ToDo-List'));
  } else {
    todosArray = [];
  }
  todosArray.push(newDataObject);
  localStorage.setItem('ToDo-List', JSON.stringify(todosArray));

  document.querySelector('form').reset();
}
dataGet();






function dataGet() {
  var table = document.querySelector('tbody');

  // Getting Data From LocalStorage
  data = JSON.parse(localStorage.getItem('ToDo-List'));
  todosArray = data
  // console.log(todosArray)
  for (var i = 0; i < data.length; i++) {
    var produce = data[i]
    var dataRow = createRow(produce)
    table.innerHTML += dataRow;
  }

  // let tr = document.createElement('tr')
}


function deleteRow(row) {
  document.querySelector('tbody').removeChild(row.parentElement.parentElement);
  localStorage.removeItem('ToDo-List');
}


function createRow(data) {
  return `<tr>
  <td>${data.Title}</td>
  <td>${data.Description}</td>
  <td>${data.Time}</td>
  <td><button class='btn btn-danger' onclick="deleteRow(this)">X</button></td>
  </tr>`
}


function checkInputText(value, msg) {
  if (value == null || value == "") {
    alert(msg);
    return true;
  }
  return false;
}