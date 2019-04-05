$(document).ready(function () {

    $("#startBtn").on("click", function () {
        $("#instructionsCard").hide();
        createQuestion();
    });

    $("#nextBtn").on("click", function () {
       validateAnswer();
    });

    $("#restartBtn").on("click", function () {
        window.location.reload();
    });
    $(".nxt").on("click", function () {
        createQuestion();
    });
});

