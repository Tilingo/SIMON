//Board game object, it controls most of the flow of the game
const BoardGame = {
    level: 0,
    dificulty: 0,
    HighLevel: 0,
    isRunning: false,
    //Set the conditions to start the game
    start: () => {
        if (BoardGame.isRunning == false) {
            BoardGame.isRunning = true
            UserExperience.ShowStart()
            $('#reset').disabled = true
            AppController.AIturn()
        }
    },
    //Called after user's sequence is wrong
    gameOver: () => {
        Audio.Failure()
        $('.color').css('pointer-events', 'none')
        $('#board').addClass('failure')
        $('#reset').disabled = false

    },
    //It sets all the coditions to zero except for high score,
    //to start playing again
    reset: function () {
        $('#board').removeClass('failure')
        Player.sequence = []
        AI.sequence = []
        Player.sequenceIndex = 0
        BoardGame.level = 0
        BoardGame.isRunning = false
        UserExperience.ShowLevel()

    },
    //Called after user's sequence is correct,
    //it resets some turn values and call the AI turn
    nextTurn: function () {
        Audio.Success()
        UserExperience.ShowSuccess()
        Player.sequenceIndex = 0
        Player.sequence = []
        BoardGame.level++
        UserExperience.ShowLevel()
        BoardGame.HighestLevel()
        AppController.AIturn()
    },
    //It checks if the highest score has been beaten
    HighestLevel: function () {

        if (BoardGame.level > BoardGame.HighLevel) {
            BoardGame.HighLevel = BoardGame.level
            AppController.ShowHighest(BoardGame.HighLevel)
        }
    }
}

//Object with the audio play functions
const Audio = {
    Success: () => {
        document.getElementById('success-sound').play()
    },
    Red: () => {
        document.getElementById('red-sound').play()
    },
    Green: () => {
        document.getElementById('green-sound').play()
    },
    Blue: () => {
        document.getElementById('blue-sound').play()
    },
    Yellow: () => {
        document.getElementById('yellow-sound').play()
    },
    Failure: () => {
        document.getElementById('failure-sound').play()
    }
}

//Object with some information about the player
const Player = {
    sequence: [],
    sequenceIndex: 0,
    playerPick: function (numero) { //It storage the value of the player sequence in the array
        Player.sequence.push(numero)
        Player.sequenceIndex++
        AppController.CheckSequence()//Call the function that checks if player move is correct
    }
}

//Object with some AI information
const AI = {
    sequence: [],
    sequenceIndex: 0,
    //Randomly pick a Color and storage it into the AI array
    AIpickColor: function () {
        this.sequence.push(Math.floor(Math.random() * 4));
        UserExperience.ShowAIonBoard(UserExperience.delay)
        AppController.playerTurn()
    }
}

//Object in charge of showing content on the screen (UX)
const UserExperience = {
    delay: 0,
    //Show the AI sequence on the screen
    //Show the player sequence on the screen
    ShowLevel: function () {
        $('#level').text(`${BoardGame.level.toString().padStart(2, '0')}`)
    },
    ShowAIonBoard: function (delay) {
        let index = AI.sequenceIndex
        for (let i = 0; i < AI.sequence.length; i++) {
            if (AI.sequence[i] == 0) {
                setTimeout(UserExperience.LightGreen, delay)
            }
            else if (AI.sequence[i] == 1) {
                setTimeout(this.LightRed, delay)
            }
            else if (AI.sequence[i] == 2) {
                setTimeout(this.LightBlue, delay)
            }
            else if (AI.sequence[i] == 3) {
                setTimeout(this.LightYellow, delay)
            }
            delay += 500
        }

    },
    //Set of functions that controls the color higlights on the screen
    LightGreen: function () {
        setTimeout(function () {
            $('#green').addClass('greenClicked')
            Audio.Green()
        }, 1300)
        setTimeout(function () {
            $('#green').removeClass('greenClicked')
        }, 1600)

    },
    LightRed: function () {
        setTimeout(function () {
            $('#red').addClass('redClicked')
            Audio.Red()
        }, 1300)
        setTimeout(function () {
            $('#red').removeClass('redClicked')
        }, 1600)

    },
    LightBlue: function () {
        setTimeout(function () {
            $('#blue').addClass('blueClicked')
            Audio.Blue()
        }, 1300)
        setTimeout(function () {
            $('#blue').removeClass('blueClicked')
        }, 1600)

    },
    LightYellow: function () {
        setTimeout(function () {
            $('#yellow').addClass('yellowClicked')
            Audio.Yellow()
        }, 1300)
        setTimeout(function () {
            $('#yellow').removeClass('yellowClicked')
        }, 1600)
    },
    //end of set

    //Function that controls the white lights after game starts
    ShowStart: function () {

        $('#green').addClass('start')

        setTimeout(function () {
            $('#green').removeClass('start')
        }, 25)

        setTimeout(function () {
            $('#red').addClass('start')
        }, 50)
        setTimeout(function () {
            $('#red').removeClass('start')
        }, 75)

        setTimeout(function () {
            $('#yellow').addClass('start')
        }, 100)
        setTimeout(function () {
            $('#yellow').removeClass('start')
        }, 125)

        setTimeout(function () {
            $('#blue').addClass('start')
        }, 250)
        setTimeout(function () {
            $('#blue').removeClass('start')
        }, 300)

        setTimeout(function () {
            $('#green').addClass('start')
        }, 325)

        setTimeout(function () {
            $('#green').removeClass('start')
        }, 350)

        setTimeout(function () {
            $('#red').addClass('start')
        }, 375)
        setTimeout(function () {
            $('#red').removeClass('start')
        }, 400)

        setTimeout(function () {
            $('#yellow').addClass('start')
        }, 425)
        setTimeout(function () {
            $('#yellow').removeClass('start')
        }, 450)

        setTimeout(function () {
            $('#blue').addClass('start')
        }, 475)
        setTimeout(function () {
            $('#blue').removeClass('start')
        }, 500)
    },
    ShowSuccess: function () {
        $('#board').addClass('success')

        setTimeout(function () {
            $('#board').removeClass('success')
        }, 1000)
    }
}
//end of function

//Object in charge of some game functionalities
const AppController = {

    playerTurn: function () { //Set the pointer events to auto on player turn, for picking colors
        $('.color').css('pointer-events', 'auto')

    },
    AIturn: function () {// Execute AI turn
        AI.AIpickColor()
    },
    CheckSequence: function () { //It checks if user match AI's sequence
        let index = Player.sequenceIndex - 1
        const playerSeq = Player.sequence
        const AIseq = AI.sequence

        if (playerSeq[index] !== AIseq[index]) {
            BoardGame.gameOver()
        }
        if (playerSeq.length == AIseq.length && playerSeq[index] == AIseq[index]) {
            setTimeout(BoardGame.nextTurn, 600)
        }
    },
    ShowHighest: (score) => {
        $('#highest-level').text(`${score.toString().padStart(2, '0')}`)
    }

}

//Set of functions on click
$('#start').click(function () {//Start the game
    BoardGame.start()
})

$('#reset').click(function () {//Reset the game
    BoardGame.reset()
})

//Player picker set of functions
$('#green').click(function () {
    Audio.Green()
    Player.playerPick(0)
})

$('#red').click(function () {
    Audio.Red()
    Player.playerPick(1)
})

$('#blue').click(function () {
    Audio.Blue()
    Player.playerPick(2)
})

$('#yellow').click(function () {
    Audio.Yellow()
    Player.playerPick(3)
})

$('#play').click(function () {//Controls how the intro screen goes away after clicking PLAY
    $('.splash').css('display', 'none')//Make the intro go away
    $('.main').css('display', 'flex')//Make the game screen visible to the computer
    setTimeout(function () {
        $('.main').css('opacity', '1')//Make the game screen visible to the user with some transition
    }, 50)
    setTimeout(function () {
        $('.main').css('transition', 'none')//Remove the transitions after game screen is visible to the user
    }, 1050)

})
//end of Click functions

// $('#dificulty').change(function(){
//     BoardGame.dificulty = $('#dificulty').value

//     console.log(BoardGame.dificulty)
// })
