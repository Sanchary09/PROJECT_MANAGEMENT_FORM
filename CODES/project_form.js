/* global result */

// Set focus on the Project ID field
$("#projectID").focus();

// Initialize a variable to track the current operation (save or update)
var currentOperation = "save";

function validateAndGetFormData() {
  var projectID = $("#projectID").val();
  if (projectID === "") {
    alert("Project ID is a required value");
    $("#projectID").focus();
    return "";
  }
  
  var projectName = $("#projectName").val();
  if (projectName === "") {
    alert("Project Name is a required value");
    $("#projectName").focus();
    return "";
  }
  
  var assignedTo = $("#assignedTo").val();
  if (assignedTo === "") {
    alert("Assigned To is a required value");
    $("#assignedTo").focus();
    return "";
  }

  var assignmentDate = $("#assignmentDate").val();
  if (assignmentDate === "") {
    alert("Assignment Date is a required value");
    $("#assignmentDate").focus();
    return "";
  }

  var deadline = $("#deadline").val();
  if (deadline === "") {
    alert("Deadline is a required value");
    $("#deadline").focus();
    return "";
  }

  var projectData = {
    projectID: projectID,
    projectName: projectName,
    assignedTo: assignedTo,
    assignmentDate: assignmentDate,
    deadline: deadline
  };

  return JSON.stringify(projectData);
}

function createPUTRequest(connToken, jsonData, dbName, relName) {
  var cmd = currentOperation === "save" ? "PUT" : "UPDATE"; // Adjust the command based on the current operation
  var putRequest = "{\n" +
    "\"token\" : \"" + connToken + "\",\n" +
    "\"dbName\": \"" + dbName + "\",\n" +
    "\"cmd\" : \"" + cmd + "\",\n" + // Use updated command
    "\"rel\" : \"" + relName + "\",\n" +
    "\"jsonStr\": " + jsonData + "\n" +
    "}";

  return putRequest;
}

function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
  var url = dbBaseUrl + apiEndPointUrl;
  var resultData;

  $.ajax({
    type: "POST",
    url: url,
    data: reqString,
    async: false,
    success: function (result) {
      console.log("Success Response:", result);
      resultData = JSON.parse(result);
    },
    error: function (result) {
      console.log("Error Response:", result);
      var dataJsonObj = result.responseText;
      resultData = JSON.parse(dataJsonObj);
    }
  });

  return resultData;
}


function resetForm() {
  $("#projectID").val("");
  $("#projectName").val("");
  $("#assignedTo").val("");
  $("#assignmentDate").val("");
  $("#deadline").val("");
  $("#projectID").focus();
}

function saveProject() {
  var jsonData = validateAndGetFormData();
  if (jsonData === "") {
    return;
  }

  var putRequestString = createPUTRequest("90931592|-31949332131830499|90961725",
    jsonData, "PROJECT-TABLE", "COLLEGE-DB");

  alert(putRequestString);
    var result = executeCommand(putRequestString,
"http://api.login2explore.com:5577", "/api/iml");


  alert(JSON.stringify(result));
  resetForm();
}

function updateProject() {
  // Set the current operation to "update"
  currentOperation = "update";
  saveProject(); // Call the saveProject function to perform the update
  currentOperation = "save"; // Reset the operation to "save" for the next entry
}
