let database = firebase.database();

function alertUser() {
  if (sessionStorage.getItem('alerted') != 'yes') {
    alert("ALERT : Using Cloud service requires internet.");
    sessionStorage.setItem('alerted', 'yes');
  }
}


function pushData() {
  debugger;
  let taskTitle = document.querySelector('input').value;
  let taskDesc = document.querySelector('textarea').value;
  let taskTime = document.getElementById('usr_time').value;

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

  // Pushing To DATABASE
  var newDataSet = firebase.database().ref("toDoList").push()
  newDataSet.set({
    Title: taskTitle,
    Description: taskDesc,
    Time: taskTime
  });
  document.querySelector('form').reset();
}
dataGet();

function dataGet() {
  debugger;
  var table = document.querySelector('tbody');

  // Getting Data From Database
  var dataPull = database.ref('toDoList');
  dataPull.on('child_added', function (data) {
    console.log(data.val());
    let dataRow = createRow(data.val(), data.key)
    let tr = document.createElement('tr')
    table.innerHTML += dataRow;
  })
}

function deleteRow(key, row) {
  document.querySelector('tbody').removeChild(row.parentElement.parentElement);
  var ref = database.ref('toDoList/').orderByKey().equalTo(key).on('value', function(Response){
    console.log(Response)
  })
}

function createRow(data, key) {
  return `<tr>
    <td>${data.Title}</td>
    <td>${data.Description}</td>
    <td>${data.Time}</td>
    <td><button class='btn btn-danger' onclick="deleteRow('${key}',this)">X</button></td>
    </tr>`
}