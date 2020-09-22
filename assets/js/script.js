//will be used to assing and ID to current task being created
var taskIDCounter = 0;
//var buttonEl = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");


var taskFormHandler = function(event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    


    //check if input values are empty strings
    if (!taskNameInput || !taskTypeInput){
        alert("You need to fill out the task form!");
        return false;
    }
    formEl.reset(); //THIS ISNT WORKING/////////////////////////////////////////////////////////////

    var isEdit = formEl.hasAttribute("data-task-id");
  
    //has data attribte
    if(isEdit){
        var taskID = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskID);
    }
    //no data attribute
    else {
        var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
        };
        //package up data as an object
        createTaskEl(taskDataObj);
    }
};
    var completeEditTask = function(taskName, taskType, taskID){
        //find matching task list itemt
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");

        //set new values
        taskSelected.querySelector("h3.task-name").textContent = taskName;
        taskSelected.querySelector("span.task-type").textContent = taskType;

        alert("Task Updated");

        formEl.removeAttribute("data-task-id");
        document.querySelector("#save-task").textContent = "Add Task";

    }
    
  


  var createTaskEl = function(taskDataObj){
     //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item"; 

    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIDCounter);
    listItemEl.setAttribute("draggable", "true");
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


    var deleteTask = function(taskID) {
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");
        console.log(taskSelected);
         taskSelected.remove();
    }

    var editTask = function(taskID){
        console.log("editing task# " + taskID);

        //get task list item element
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");

        //get content from task name and type
        var taskName = taskSelected.querySelector("h3.task-name").textContent;
       

        var taskType = taskSelected.querySelector("span.task-type").textContent;
        
        ////DOESNT APPEAR IN THE PROMPTS///////////////////////////////////////////////////////////////
        document.querySelector("input[name='task-name']").value = taskName;
        document.querySelector("select[name='task-type']").value = taskType;

        document.querySelector("#save-task").textContent = "Save Task";

        formEl.setAttribute("data-task-id", taskID);
    }

    var taskButtonHandler = function(event) {
        console.log(event.target);

        //get target element from event
        var targetEl = event.target;
        /*if(event.target.matches(".delete-btn")){
            var taskID = event.target.getAttribute("data-task-id");
            deleteTask(taskID);
        }*/
        
        //edit button clicked
        if(event.target.matches(".edit-btn")){
            var taskID = targetEl.getAttribute("data-task-id");
            editTask(taskID);
        }

        //delete button clicked
        else if(targetEl.matches(".delete-btn")){
            var taskID = targetEl.getAttribute("data-task-id");
            deleteTask(taskID);
        }
    };

    var taskStatusChangeHandler = function(event){
        //get task item's ids
        var taskID = event.target.getAttribute("data-task-id");

        //get currently selected options value and conver to lowercase
        var statusValue = event.target.value.toLowerCase();

        //find parent task item element based on id
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");

        if(statusValue === "to do"){
            tasksToDoEl.appendChild(taskSelected);
        }
            else if (statusValue === "in progres"){
                tasksInProgressEl.appendChild(taskSelected);
            }
            else if (statusValue === "completed"){
                tasksCompletedEl.appendChild(taskSelected);
            }
        }


        var dragTaskHandler = function(event){
            var taskID = event.target.getAttribute("data-task-id");
            event.dataTransfer.setData("text/plain", taskID);
        }

        var dropZoneDragHandler = function(event){
          
            var taskListEl = event.target.closest(".task-list");
            if(taskListEl){
                event.preventDefault();
            }

            taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
             
        }


        var dropTaskHandler = function(event){
            var id = event.dataTransfer.getData("text/plain");
            var draggableElement = document.querySelector("[data-task-id='" + id + "']");
            var dropZoneEl = event.target.closest(".task-list");
            var statusType = dropZoneEl.id;

            var statusSelectEl = draggableElement.querySelector("select[name='status-change']");

            if (statusType === "tasks-to-do") {
                statusSelectEl.selectedIndex = 0;
              } 
              else if (statusType === "tasks-in-progress") {
                statusSelectEl.selectedIndex = 1;
              } 
              else if (statusType === "tasks-completed") {
                statusSelectEl.selectedIndex = 2;
              }

              dropZoneEl.appendChild(draggableElement);
              //dropZoneEl.removeAttribute("style");

        }


        var dragLeaveHandler = function(event){
            var taskListEl = event.target.closes(".task-list");
            if(taskListEl){
                taskListEl.removeAttribute("style");
            }
        }
    

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);

pageContentEl.addEventListener("dragstart", dragTaskHandler);

pageContentEl.addEventListener("dragover", dropZoneDragHandler);

pageContentEl.addEventListener("drop", dropTaskHandler);

pageContentEl.addEventListener("dragleave", dragLeaveHandler);