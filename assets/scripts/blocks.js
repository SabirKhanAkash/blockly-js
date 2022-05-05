//SABIR KHAN AKASH ~ @ 22 APRIL 2022 ~ 4175.akash@gmail.com

//FOR DATE AND TIME
var today = new Date();
var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});

//BOT BLOCK
Blockly.Blocks["bot"] = {
  init: function () {
    this.appendStatementInput("bot")          //ADDING THE "BOT" STATEMENT INPUT BLOCK
      .appendField("BOT")                     //RENAMING THE "BOT" BLOCK

    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

//DROPDOWN BLOCK
Blockly.Blocks["dropdown"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Ask me a question:\n")     //RENAMING THE "DROPDOWN" BLOCK

      //ADDED THE REQUIRED DROPDOWN OPTIONS ALONG WITH THE PREDEFINED ANSWERS
      .appendField(new Blockly.FieldDropdown([["a. What is the date today?",`${date}`],["b. What is the time now?",`${time}`],["c. How are you?","I am fine."],["d. What is JavaScript?","It's a programming language."],["e. What is your name?","My name is Sabir Khan Akash."]]),"input");
    
      this.setPreviousStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

//RUNNING COMMAND FOR PARENT BOT BLOCK WHERE DROPDOWN BLOCK IS ITS CHILD BLOCK
Blockly.JavaScript["bot"] = function (block) {
  var firstChild = this.getInputTargetBlock('bot');         //LOCATING THE PARENT BLOCK
  //console.log(firstChild);

  var text_input2 = firstChild.getFieldValue('input');      //LOCATING THE DROPDOWN VALUE
  var code = `
	var inputTextValue = "${text_input2}";
  `;
  return code;
};


var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
});

function redrawUi() {
  if (typeof inputTextValue !== "undefined") {
    $("#inputBox").text(inputTextValue);
  } else {
    $("#inputBox").text("");
  }
}

function runcode() {
  // Generate JavaScript code and run it.
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

function reset() {
  Blockly.mainWorkspace.clear();          //REMOVING ALL THE BLOCKS OF WORKSPACE
  delete inputTextValue;
  redrawUi();
}


