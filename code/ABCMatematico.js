const char_dictionary = "abcdefghijklmnñopqrstuvwxyz ?¿!¡$%€&(),;.:-_+-*/@|º=".split("");
var conversion_array = [];
var word = "";

function show_abecedario_matematico_word()
{
    // toggle the type attribute
    const type =  $("#hiddenPassword").attr('type') === 'password' ? 'text' : 'password';
    $("#hiddenPassword").attr('type', type);
    // toggle the eye slash icon
    $(".abc_container i").toggleClass("fa-eye-slash");
    
}

function ABCMatematico()
{
    if($(".ABCButton").html() === "JUGAR")
        startABC();
    else
        checkABC();
}

function startABC()
{
    conversion_array = [];
    word = $("#hiddenPassword").val();

    if(word.length === 0)
    {
        Swal.fire(
            'Palabra incorrecta',
            'Debes introducir una palabra',
            'question'
          )
          return;

    }

    word = word.toLowerCase();

    for(let i = 0; i < word.length; i++)
    {
        conversion_array.push(char_dictionary.indexOf(word[i]) + 1);
    }

    $("#ABC_game_container").show();
    $("#ABC_Game_word").html(values_to_encrypted_word(conversion_array));

    $("#hiddenPassword").attr('type', "text");
    $("#hiddenPassword").val("");

    $(".abc_container i").hide();
    $(".abc_container p").html("¿Cúal es la palabra secreta?");
    $(".ABCButton").html("ENVIAR");
}

function checkABC()
{

    let suggestedPasword = $("#hiddenPassword").val();

    if(resolveABC(suggestedPasword.toLowerCase()))
    {
        confetti.start();
        Swal.fire({
            title: 'Correcto',
            text: 'Has encontrado la palabra secreta',
            icon: 'success',
            confirmButtonText: 'Siguiente'
          }).then((result) => {
            confetti.stop();
          });
        finishABC();
    }
    else
    {
        Swal.fire({
            title: 'Ui casi',
            text: '¡inténtalo otra vez!',
            icon: 'warning',
            confirmButtonText: 'Otra vez'
          });
    }
}

function finishABC()
{
    $("#hiddenPassword").attr('type', "password");
    $(".abc_container i").show();
    $(".abc_container i").removeClass();
    $(".abc_container i").addClass("far fa-eye");
    $(".abc_container p").html("Introduce una palabra para empezar a jugar");
    $(".ABCButton").html("JUGAR");
    $("#hiddenPassword").val("");
    $("#ABC_game_container").hide();

}

function values_to_encrypted_word(array)
{

    let encrypted_word = "";

    for(let i = 0; i < array.length; i++)
    {
        encrypted_word += array[i];
        encrypted_word += (i + 1) < array.length ? " - " : "";
    }

    return encrypted_word;
}

function resolveABC(suggested_word)
{

    let constructed_word = "";

    for(let i = 0; i < conversion_array.length; i++)
    {
        constructed_word += char_dictionary[conversion_array[i] - 1];
    }

    return constructed_word === suggested_word;
}