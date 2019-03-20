// Initialization ---------------------------------------------------------------------------------

// Blocks generators ------------------------------------------------------------------------------
// Move with a set of speed
Blockly.JavaScript['move'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var dropdown_speed = block.getFieldValue('speed');

  var code = dropdown_direction + " " + dropdown_speed + "\n";
  return code;
};

// Move with a specific speed
Blockly.JavaScript['move_speed'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);

  var code = dropdown_direction + " " + value_speed + "\n";
  return code;
};
  // Stop the robot
  Blockly.JavaScript['stop'] = function(block) {

    var code = 'stop\n';
    return code;
  };

  // Inidicates if the distance sensor has detected an obstacle within a specified range
  Blockly.JavaScript['distance_sensor_test'] = function(block) {
    var dropdown_sensor = block.getFieldValue('sensor');
    var dropdown_distance = block.getFieldValue('distance');

    var code = "(sensor_" + dropdown_sensor;

    if (dropdown_distance == "away")
    {
      code += " >= close";
    }
    else
    {
      code += " < " + dropdown_distance;
    }

    code += ")";

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  // Returns the distance of the specified sensor
  Blockly.JavaScript['distance_sensor_value'] = function(block) {
    var dropdown_sensor = block.getFieldValue('sensor');

    var code = "sensor_" + dropdown_sensor;

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  // Waiting
  Blockly.JavaScript['wait'] = function(block) {
    var value_duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "wait " + value_duration + "\n";
    return code;
  };

// Basic loop
Blockly.JavaScript['loop_counter'] = function(block) {
    var value_counter = Blockly.JavaScript.valueToCode(block, 'counter', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var statements_statements = Blockly.JavaScript.statementToCode(block, 'statements');

    var code = "loop " + value_counter + " :\n" + statements_statements + "end\n";
    return code;
  };

  Blockly.JavaScript['infinite_loop'] = function(block) {
    var statements_statements  = Blockly.JavaScript.statementToCode(block, 'statements');
  
    var code = "while true :\n" + statements_statements  + "end\n";
    return code;
  };

  // If
  Blockly.JavaScript['logic_if'] = function(block) {
    var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_statements = Blockly.JavaScript.statementToCode(block, 'statements');

    var code = "if " + value_condition + " :\n" + statements_statements + "end\n";
    return code;
  };

  Blockly.JavaScript['logic_if_else'] = function(block) {
    var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_if_statements = Blockly.JavaScript.statementToCode(block, 'if_statements');
    var statements_else_statements = Blockly.JavaScript.statementToCode(block, 'else_statements');

    var code = "if " + value_condition + " :\n" + statements_if_statements + "else :\n" + statements_else_statements + "end\n";
    return code;
  };

  // Card led
  Blockly.JavaScript['rgb_led_on'] = function(block) {
    var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "led " + value_color + "\n";
    return code;
  };

  Blockly.JavaScript['rgb_led_off'] = function(block) {

    var code = "led #000000\n";
    return code;
  };

  Blockly.JavaScript['random_color'] = function(block) {

    var code = "random_color";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  // Overriding -----------------------------------------------------------------------------------

  Blockly.JavaScript['math_arithmetic'] = function(block) {
    // Basic arithmetic operators, and power.
    var OPERATORS = {
      'ADD': [' + ', Blockly.JavaScript.ORDER_ADDITION],
      'MINUS': [' - ', Blockly.JavaScript.ORDER_SUBTRACTION],
      'MULTIPLY': [' * ', Blockly.JavaScript.ORDER_MULTIPLICATION],
      'DIVIDE': [' / ', Blockly.JavaScript.ORDER_DIVISION],
      'POWER': [' ^ ', Blockly.JavaScript.ORDER_COMMA]  // Handle power separately.
    };
    var tuple = OPERATORS[block.getFieldValue('OP')];
    var operator = tuple[0];
    var order = tuple[1];
    var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
    var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
    var code;

    code = argument0 + operator + argument1;
    return [code, order];
  };

  Blockly.JavaScript['controls_if'] = function(block) {
    // If/elseif/else condition.
    var n = 0;
    var code = "", branchCode, conditionCode;
    do {
      conditionCode = Blockly.JavaScript.valueToCode(block, 'IF' + n,
        Blockly.JavaScript.ORDER_NONE) || 'false';
      branchCode = Blockly.JavaScript.statementToCode(block, 'DO' + n);
      code += (n > 0 ? 'el' : '') +
          "if " + conditionCode + " :\n" + branchCode;
  
      ++n;
    } while (block.getInput('IF' + n));
  
    if (block.getInput('ELSE')) {
      branchCode = Blockly.JavaScript.statementToCode(block, 'ELSE');
      code += "else :\n" + branchCode;
    }
    return code + "end\n";
  };

Blockly.JavaScript['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL', Blockly.JavaScript.ORDER_NONE) || 'false';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block.id);

  var code = (until ? "until " : "while ") + argument0 + " :\n" + branch + "end\n";
  return code;
};

// Colour picker
Blockly.JavaScript['colour_picker'] = function(block) {

  var code = block.getFieldValue('COLOUR').toUpperCase();
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Variable setter
Blockly.JavaScript['variables_set'] = function(block) {

  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + '\n';
};