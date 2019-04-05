var wrong = 0;
var correct = 0;
var numQuest = 0;
var askedQuest = [];

var questions = [
    {
        q: "What should you do in the Arab countries to show that the food was delicious?",
        a: ["Belch", "Say Thank's", "Nothing"]
    },
    {
        q: "From which cactus is tequila made?",
        a: ["Agave", "Aloe vera", "Nopal"]
    },
    {
        q: "From which country does pitta bread originate?",
        a: ["Greece", "Italy", "France"]
    },
    {
        q: "Which country is the origin of the cocktail Mojito?",
        a: ["Cuba", "Mexico", "Republica Dominicana"]
    },
    {
        q: "What is called a meal in open air?",
        a: ["Picnic", "Bruch", "Lnch"]
    },
    {
        q: "Which cheese is traditionally used for pizzas?",
        a: ["Mozzarella", "Monterrey Jack", "Manchego"]
    },
    {
        q: "Which country is the origin of the Stella beer?	",
        a: ["Belgium", "Germam", "Mexican"]
    },
    {
        q: "What is the most famous Mexican beer?",
        a: ["Corona", "Tecate", "Victoria"]
    },
    {
        q: "What is Japanese sake made from?",
        a: ["Rice", "Tofu", "Ginger"]
    },
    {
        q: "Which French town is known for its mustard?",
        a: ["Dijon", "Barjols", "Domfront"]
    },
    {
        q: "What beer is marketed as The king of beers?",
        a: ["Budweiser", "Miller", "Becks"]
    },
    {
        q: "What is the most famous beer in Ireland?",
        a: ["Guiness", "Murphy's", "O'Hara's"]
    }
];

function createQuestion() {

    if (numQuest < 5) {
        var quest = Math.floor(Math.random() * 11);
        //var ranQ = [];
        if (!askedQuest.includes(quest)) {
            $("#question").text(questions[quest].q);

            for (let i = 0; i < questions[quest].a.length; i++) {
                $('#a' + i).html(questions[quest].a[i]);
                if (i === 0) {
                    $('#r' + i).val(1);
                } else {
                    $('#r' + i).val(0);
                }
            }
            $("#images").attr("src", "./assets/img/" + questions[quest].a[0] + ".jpg");


            var items = $('.list-group > li').get();
            items.sort(function (a, b) {
                var keyA = $(a).text();
                var keyB = $(b).text();

                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            var ul = $('.list-group');
            $.each(items, function (i, li) {
                ul.append(li); /* This removes li from the old spot and moves it */
            });
            $('input:checked').removeAttr('checked');       
            $("#questionsCard").show();
        } else {
            createQuestion();
        }
        askedQuest.push(quest);
        numQuest++;
        $("#timer").text("10");
        stop();
        reset();
        start();
    } else {
        $("#questionsCard").hide();
        $("#ca").text(correct);
        $("#wa").text(wrong);
        $("#resultsCard").show();
        stop();
        reset();
    }

}

function validateAnswer() {

    var isChecked = $("input[name='resp']").is(':checked');
    if (isChecked) {
        stop();
        reset();
        var a = $("input[name='resp']:checked").val();

        if (a === '1') {
            correct++;
            $("#ansMH").text("Correct");
            $("#ansModal").modal({
                backdrop: 'static',
                keyboard: false
            });
        } else {
            wrong++;
            $("#ansMH").text("Wrong");
            $("#ansModal").modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    }

}
/* I reuse the time control functios from the acctivite 10 to save some time, and I made somo changes to run backwards */
//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;
var time = 10;
var lap = 1;

function reset() {

    time = 10;
    lap = 1;

    // DONE: Change the "display" div to "00:00."
    $("#display").text("00:00");

    // DONE: Empty the "laps" div.
    $("#laps").text("");
}
function start() {

    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
    }
}
function stop() {

    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
}

function count() {
    if (time !== 0) {

        // DONE: increment time by 1, remember we cant use "this" here.
        time--;

        // DONE: Get the current time, pass that into the timeConverter function,
        //       and save the result in a variable.
        var converted = timeConverter(time);
        //console.log(converted);

        // DONE: Use the variable we just created to show the converted time in the "display" div.
        $("#timer").text(converted);
    } else {
        stop();
        reset();
        $("#myModal").modal({
            backdrop: 'static',
            keyboard: false
        });
        wrong++;
    }
}
function timeConverter(t) {

    var minutes = Math.floor(t / 10);
    var seconds = t - (minutes * 10);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return seconds;
}