const GLOBAL = 
{
    baseURL: "https://api.arasaac.org/api/",
    lang: "es",
    pictograms: "pictograms"
}

function obtainPictogram()
{
    let hitWord = $("#hiddenHint").val();

    let obtainPictogramURL = hitWord.length != 0 ?
        GLOBAL.pictograms + "/" + GLOBAL.lang + "/search/" + hitWord :
        GLOBAL.pictograms + "/" + GLOBAL.lang + "/new/30";

    fetch(GLOBAL.baseURL + obtainPictogramURL)
      .then(response => response.json())
      .then(json => 
        {console.log(json)}
        );

}

function show_pictograma_hint()
{
    // toggle the type attribute
    const type =  $("#hiddenHint").attr('type') === 'password' ? 'text' : 'password';
    $("#hiddenHint").attr('type', type);
    // toggle the eye slash icon
    $(".pictograma_container i").toggleClass("fa-eye-slash");
    
}