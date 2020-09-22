//will be used to assing and ID to current task being created
var taskIDCounter = 0;
//var buttonEl = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");


var taskFormHandler = function(event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.log(taskTypeInput);


    //check if input values are empty strings
    if (!taskNameInput || !taskTypeInput){
        alert("You need to fill out the task form!");
        return false;
    }
    formEl.reset(); //THIS ISNT WORKING/////////////////////////////////////////////////////////////

    
    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an arguement to createTaskEl
    createTaskEl(taskDataObj);
    
  };


  var createTaskEl = function(taskDataObj){
     //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item"; 

    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIDCounter);
    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content do div
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";
    //listItemEl.textContent = taskNameInput;
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIDCounter);
    
    listItemEl.appendChild(taskActionsEl);
    //add entire item to list
    tasksToDoEl.appendChild(listItemEl);

    //increase task counter for next unique ID
    taskIDCounter++;

  }


  var createTaskActions = function(taskID){
      var actionContainerEl = document.createElement("div");
      actionContainerEl.className = "task-actions";

      //create edit button
      var editButtonEl = document.createElement("button");
      editButtonEl.textContent = "Edit";
      editButtonEl.className = "btn edit-btn";
      editButtonEl.setAttribute("data-task-id", taskID);

      actionContainerEl.appendChild(editButtonEl);

      //create delete button
      var deleteButtonEl = document.createElement("button");
      deleteButtonEl.textContent = "Delete";
      deleteButtonEl.className = "btn delete-btn";
      deleteButtonEl.setAttribute("data-task-id", taskID);

      actionContainerEl.appendChild(deleteButtonEl);


      //dropdown
      var statusSelectEl = document.createElement("select");
      statusSelectEl.className = "select-status";
      statusSelectEl.setAttribute("name", "status-change");
      statusSelectEl.setAttribute("data-task-id", taskID);

      actionContainerEl.appendChild(statusSelectEl);

      var statusChoices = ["To Do", "In Progress", "Completed"];
      for(var i = 0; i < statusChoices.length; i++){
          //create option element
          var statusOptionEl = document.createElement("option");
          statusOptionEl.textContent = status[i];
          statusOptionEl.setAttribute("value", statusChoices[i]);

          //append to select
          statusSelectEl.appendChild(statusOptionEl);
      }

      return actionContainerEl;
  }

  formEl.addEventListener("submit", taskFormHandler);
//buttonEl.addEventListener("click", createTaskHandler);

//THIS DOESNT WORK!///////////////////////////////////////////////////////////////////////////
    var deleteTask = function(taskID) {
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
         taskSelected.remove();
    }


    var taskButtonHandler = function(event) {
        console.log(event.target);

        if(event.target.matches(".delete-btn")){
            var taskID = event.target.getAttribute("data-task-id");
            deleteTask(taskID);
        }
    }

pageContentEl.addEventListener("click", taskButtonHandler);