

    var targetNumber = 53;
    var counter = 0;
    var wins = 0;
    var losses = 0;

    //The random number shown at the start of the game should be between 19 - 120.
    targetNumber = Math.floor(Math.random() * (120-19)) + 19;

    displayUpdate();

  //  console.log("targetNumber ", targetNumber);

    // Now for the hard part. Creating multiple crystals each with their own unique number value.

    // We begin by expanding our array to include four default options.
    var numberOptions = [10, 5, 3, 7];
    
    var colorCrystals = ["red.png","blue.png","yellow.png","green.png"];

    function displayUpdate() {

      // print values to screen
      $("#number-to-guess").text(targetNumber);
      $("#userScore").text(counter);
      $("#userWins").text(wins);
      $("#userLosses").text(losses);
    } // end displayUpdate()

    function createCrystalValues( crystalCnt, array ) {
       var number = 1;
       var tmp = 0;
       var newNumber = true;
       console.log("createCrystalValues");
       while ( newNumber ) 
        {
         
         for ( var i = 0; i < crystalCnt; i++ )
           {
             array[i] = Math.floor(Math.random() * (12-1)) + 1;
             console.log( "values" + "[" + i + "]" + array[i]);
           }

          newNumber = TheSame( array );
          console.log("same as newNumber " + newNumber);
          tmp++;
          if ( tmp > 3 )
            newNumber = false;
          console.log("tmp "+tmp);
        } // end while newNumber

        for ( i = 0; i < crystalCnt; i++ )
        {
          numberOptions[i] = array[i];
          if ( i == 0 )
            $("#crystal0").attr("data-crystalvalue",numberOptions[i]);
          if ( i == 1 )
            $("#crystal1").attr("data-crystalvalue",numberOptions[i]);
          if ( i == 2 )
            $("#crystal2").attr("data-crystalvalue",numberOptions[i]);
         if ( i == 3 )
            $("#crystal3").attr("data-crystalvalue",numberOptions[i]);

          console.log("createCrystalValues numberOptions[" + i + "]" + numberOptions[i]);
        }   
        

    } // end createCrystalValues()

    function TheSame(array) {
    var first  = array[0];
    var second = array[1];
    var third  = array[2];
    var fourth = array[3];
    console.log( "TheSame array is " + array );
      for ( var index = 0; index < array.length; index++)
      {
        //console.log("TheSame every index is " + index);
        //console.log("TheSame array is " + array);
        if ( index == 0  && (
             (array[index] == array[index+1]) 
          || (array[index] == array[index+2])
          || (array[index] == array[index+3]) ))
        {
          console.log( "TheSame index " + index + "first " + first );
          return true;
        }
        if ( index == 1 && ( 
             (array[index] == array[index-1]) 
          || (array[index] == array[index+1])
          || (array[index] == array[index+2])  ))
        {
          console.log("TheSame index " + index + "second " + second);
          return true;
        }
        if (index == 2 && (
             (array[index] == array[index-1]) 
          || (array[index] == array[index-2])
          || (array[index] == array[index+1]) ))
        {
          console.log("TheSame index " + index + "third " + third );
          return true;
        }
        if (index == 3 && (
             (array[index] == array[index-1]) 
          || (array[index] == array[index-2])
          || (array[index] == array[index-3]) ))
        {
          console.log("TheSame index " + index + "fourth " + fourth);
          return true;
        }
        if ( index == 3 )
        {
          //console.log("TheSame return false");
          return false;
        }

      }
  } // end TheSame function

  // Next we create a for loop to create crystals for every numberOption.
  for ( var i = 0; i < numberOptions.length; i++ ) {

      // get crystal value
      //numberOptions[i] = createCrystalValue( i, numberOptions.length );
    if ( i == 0 )
      createCrystalValues( numberOptions.length, numberOptions );

    //  console.log( "Creating crystal images after num is " + numberOptions[i]);
    
    // For each iteration, we will create an imageCrystal
    var imageCrystal = $("<img>");

    // First each crystal will be given the class ".crystal-image".
    // This will allow the CSS to take effect.
    imageCrystal.addClass("crystal-image");

    // add crystal id
    if ( i == 0)
      imageCrystal.attr("id","crystal0");
    if ( i == 1 )
      imageCrystal.attr("id","crystal1");
    if ( i == 2 )
      imageCrystal.attr("id","crystal2");
    if ( i == 3 )
      imageCrystal.attr("id","crystal3");

    crystalFile = "assets/images/" + colorCrystals[i];
    imageCrystal.attr("src",crystalFile);

    // Each imageCrystal will be given a data attribute called data-crystalValue.
    // This data attribute will be set equal to the array value.
    imageCrystal.attr("data-crystalvalue", numberOptions[i]);

    // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
    $("#crystals").append(imageCrystal);
  } // end for


/* Create an "on-click" event attached to the ".crystal-image" class. */
// This time, our click event applies to every single crystal on the page. Not just one.
  $(".crystal-image").on("click", function() {

    // Determining the crystal's value requires us to extract the value from the data attribute.
    // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
    // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
    
    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
//    console.log("============");
 //   console.log("crystalValue " + crystalValue);

    // We then add the crystalValue to the user's "counter" which is a global variable.
    // Every click, from every crystal adds to the global counter.
//    console.log("counter " + counter);

    counter += crystalValue;

//    console.log("click counter " + counter + " crystalValue " + crystalValue);

    // print new value to screen
    $("#userScore").text(counter);

    if (counter === targetNumber) {
      wins++;
      $("#userWins").text(wins);
      alert("You win!");
        //The random number shown at the start of the game should be between 19 - 120.
      targetNumber = Math.floor(Math.random() * (120-19)) + 19;
      // print value to screen
      $("#number-to-guess").text(targetNumber);
      counter = 0;
      // regenerate new crystal values
      createCrystalValues( numberOptions.length, numberOptions );
    }
    else if (counter >= targetNumber) {
      losses++;
      $("#userLosses").text(losses);
      alert( "You lose!!" + " Your total was " + counter );
      //The random number shown at the start of the game should be between 19 - 120.
      targetNumber = Math.floor(Math.random() * (120-19)) + 19;
      // print value to screen
      $("#number-to-guess").text(targetNumber);
      counter = 0;
      // regenerate new crystal values
      createCrystalValues( numberOptions.length, numberOptions );
    }

    // print new value to screen
    $("#userScore").text(counter);
  });
