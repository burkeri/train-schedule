// when form is submitted,
// 1) save the data to a variable
// 2) push info to firebase
// 3) calculate train next arrival 
// 4) calculate train minutes away
// 4) create new table data
// 5) create new table row
// 6) push the data into the row
// 7) append the row to the div

// Initialise Firebase
var config = {
    apiKey: "AIzaSyA83iAMQIgJjlrslq7aZZ9fGMNYni2lnPc",
    authDomain: "train-schedule-16703.firebaseapp.com",
    databaseURL: "https://train-schedule-16703.firebaseio.com",
    projectId: "train-schedule-16703",
    storageBucket: "train-schedule-16703.appspot.com",
    messagingSenderId: "410786936798"
  };
  firebase.initializeApp(config);

  // Create Firebase global vairable
  var database = firebase.database();

  // Submit button functionallity
  $("#submit").click( function (){

    //prevent form from submitting
    event.preventDefault();

    //save form data to variable
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var trainTime = $("#train-time").val().trim();
    var trainFrequency = $("#train-frequency").val().trim();

    // push form data to firebase
    database.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        trainTime: trainTime,
        trainFrequency: trainFrequency
    })

    // calculate minutes away
    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
    var remainder = timeDifference % trainFrequency;
    var minutesAway = trainFrequency - remainder;

    // calculate next arrival
    var arrivalTime = moment().add(minutesAway, "minutes");
    var nextArrival = moment(arrivalTime).format("hh:mm");

    // create new table cells and row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
    );
    
    // push the new row into the table
    $("tbody").append(newRow);

  });