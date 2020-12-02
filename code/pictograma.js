const GLOBAL = 
{
    baseURL: "https://api.arasaac.org/api/",
    lang: "es",
    pictograms: "pictograms",
    imageURL: "https://static.arasaac.org/pictograms/",
    URLOptional: "?url=true"
}

var API_RESULT;
var correctWord = "";
var currentWord = "";

function obtainPictogram()
{
    let hitWord = $("#hiddenHint").val();

    let obtainPictogramURL = hitWord.length != 0 ?
        GLOBAL.pictograms + "/" + GLOBAL.lang + "/search/" + hitWord :
        GLOBAL.pictograms + "/" + GLOBAL.lang + "/new/30";

    if(hitWord.length != 0 || API_RESULT === undefined) // Cogemos nuevos datos
    {
        fetch(GLOBAL.baseURL + obtainPictogramURL)
        .then(response => response.json())
        .then(json => 
          {
            API_RESULT = json;
            processData();
          });
    }
    else // Reutilizamos los datos ya obtenidos
    {
        processData();
    }   

}

function processData()
{
    if(API_RESULT === undefined)
    {
        Swal.fire(
            'Se ha encontrado un problema',
            'Contacte con el servicio técnico para mas detalles e intentelo de nuevo mas adelante',
            'error'
          );
        return;
    }
    
    if(API_RESULT.hasOwnProperty("err"))
    {
        Swal.fire(
            'Se ha encontrado un problema',
            'El proble responde al siguiente error: "' + API_RESULT.err +'"',
            'error'
          );

        return;
    }

    if(API_RESULT.length === 0)
    {
        Swal.fire(
            'Se ha encontrado un problema',
            'No se han encontrado pictogramas con la palabra "' + $("#hiddenHint").val() + '". Intente buscar pictogramas con otra palabra.',
            'warning'
          );

          $("#hiddenHint").val("");

        return;

    }
    else
    {
        $("#searchPictogram_container").hide();
        $("#playPictogram_container").css("display", "inline-flex");

        let id = getRndInteger(0, API_RESULT.length - 1);

        do
        {
            id = getRndInteger(0, API_RESULT.length - 1);
        }
        while(API_RESULT[id].keywords[0].keyword.includes(" "));

        correctWord = API_RESULT[id].keywords[0].keyword;
        currentWord = hide_vocals_words(API_RESULT[id].keywords[0].keyword);

        $("#pictogram_word").html(currentWord);

        fetch(GLOBAL.baseURL + GLOBAL.pictograms + "/" + API_RESULT[id]._id + "/" + GLOBAL.URLOptional)
        .then(response => response.json())
        .then(images => {
            $("#pictogram_image").attr("src", images.image);
        });


    }

    console.log("HOLA");
}

function hide_vocals_words(word)
{
    word = word.toLowerCase();
    let encrypted_word = "";

    for(let i = 0; i < word.length; i++)
    {
        encrypted_word += isVocal(word[i]) ? "_" : word[i];
    }

    return encrypted_word;
}

function isVocal(char) {
    return 'aeiou'.includes(char);
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + 1);
}

function clickOnVocal(vocal)
{
    let i = currentWord.indexOf("_");

    if(vocal == correctWord[i])
    {
        currentWord = currentWord.replaceAt(i, vocal);       
        let fixedWord = currentWord;
        $("#pictogram_word").html(fixedWord.replaceAt(i, "<span style='color: green;'>" + vocal + "</span>"));
    }

    if(!currentWord.includes("_"))
    {
        finishGame();
    }

}

function finishGame()
{
    confetti.start();
    Swal.fire({
        title: 'Correcto',
        text: 'La palabra secreta era: ' + currentWord,
        icon: 'success',
        confirmButtonText: 'Siguiente'
      }).then((result) => {
        confetti.stop();
        correctWord = "";
        currentWord = "";
        $("#pictogram_word").html("");
        $("#pictogram_image").attr("src", "");
        $("#searchPictogram_container").show();
        $("#playPictogram_container").hide();
        $(".pictograma_container i").removeClass();
        $(".pictograma_container i").addClass("far fa-eye");
      });

    


}

function show_pictograma_hint()
{
    // toggle the type attribute
    const type =  $("#hiddenHint").attr('type') === 'password' ? 'text' : 'password';
    $("#hiddenHint").attr('type', type);
    // toggle the eye slash icon
    $(".pictograma_container i").toggleClass("fa-eye-slash");
    
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

