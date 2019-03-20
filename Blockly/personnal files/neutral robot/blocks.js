Blockly.Blocks['move'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["Avancer","forward"], ["Reculer","backward"], ["Pivoter à gauche","left"], ["Pivoter à droite","right"]]), "direction")
          .appendField("à la vitesse")
          .appendField(new Blockly.FieldDropdown([["Normale","normal"], ["Lente","slow"], ["Rapide","fast"]]), "speed");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
   this.setTooltip("Fait se déplacer le robot dans la direction choisie");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['move_speed'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["Avancer","forward"], ["Reculer","backward"], ["Pivoter à gauche","left"], ["Pivoter à droite","right"]]), "direction")
          .appendField("à la vitesse");
      this.appendValueInput("speed")
          .setCheck("Number");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
   this.setTooltip("Fait se déplacer le robot dans la direction choisie");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['stop'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Arrêter");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
   this.setTooltip("Arrête le robot");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['distance_sensor_test'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("le capteur")
          .appendField(new Blockly.FieldDropdown([["1","one"], ["2","two"], ["3","three"], ["4", "four"]]), "sensor")
          .appendField("détecte un obstacle")
          .appendField(new Blockly.FieldDropdown([["très proche","very_close"], ["proche","close"], ["éloigné","away"]]), "distance");
      this.setOutput(true, "Boolean");
      this.setColour(270);
   this.setTooltip("Indique si le capteur détecte un obstacle");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['distance_sensor_value'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Distance du capteur")
          .appendField(new Blockly.FieldDropdown([["1","one"], ["2","two"], ["3","three"], ["4","four"]]), "sensor");
      this.setOutput(true, null);
      this.setColour(270);
   this.setTooltip("Retourne la distance en millimètres mesurée par le capteur");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['wait'] = {
    init: function() {
      this.appendValueInput("duration")
          .setCheck("Number")
          .appendField("Attendre");
      this.appendDummyInput()
          .appendField("secondes");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(50);
   this.setTooltip("Marque une pause");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['loop_counter'] = {
    init: function() {
      this.appendValueInput("counter")
          .setCheck("Number")
          .appendField("Répéter");
      this.appendDummyInput()
          .appendField("fois");
      this.appendStatementInput("statements")
          .setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
   this.setTooltip("Répète les instructions plusieurs fois");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['rgb_led_on'] = {
    init: function() {
      this.appendValueInput("color")
          .setCheck("Colour")
          .appendField("Allumer la LED en ");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(15);
   this.setTooltip("Allume la LED de la carte avec la couleur choisie");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['rgb_led_off'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Eteindre la LED");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(15);
   this.setTooltip("Eteint la LED");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['random_color'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Couleur aléatoire");
      this.setOutput(true, "Colour");
      this.setColour(15);
   this.setTooltip("Retourne une couleur aléatoire");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['infinite_loop'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Répéter indéfiniment");
      this.appendStatementInput("statements")
          .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setColour(120);
    this.setTooltip("Répète les instructions à l'infini");
    this.setHelpUrl("");
    }
  };