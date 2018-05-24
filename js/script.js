const BoardGame = {
    level: 0,
    dificulty: 0,
    HighLevel: 0,
    isRunning: false,
    gameOver: false,
    start: () => {
        if (BoardGame.isRunning == false) {
            BoardGame.isRunning = true
            UserExperience.ShowStart()
            console.log(BoardGame.isRunning)
            $('#reset').disabled = true
            // $('#start').disabled = true
            AppController.AIturn()
        }
    },
    gameOver: function () {
        Audio.Failure()
        $('.color').css('pointer-events', 'none')
        $('#board').addClass('failure')
        BoardGame.gameOver = true
        $('#reset').disabled = false
        // $('#start').disabled = true       

    },
    reset: function () {
        if (BoardGame.gameOver == true) {
            BoardGame.isRunning = false
            console.clear()
            $('#board').removeClass('failure')
            Player.sequence = []
            AI.sequence = []
            Player.sequenceIndex = 0
            BoardGame.level = 0
            BoardGame.isRunning = false
            // $('#start').disabled = false                    
            UserExperience.ShowLevel()
        }

    },
    nextTurn: function () {
        // $('#board').css('pointer-events', 'none')
        console.log('they matched')
        Audio.Success()
        UserExperience.ShowSuccess()
        Player.sequenceIndex = 0
        Player.sequence = []
        BoardGame.level++
        UserExperience.ShowLevel()
        BoardGame.HighestLevel()
        console.log(BoardGame.HighLevel)
        AppController.AIturn()
    },
    HighestLevel: function () {

        if (BoardGame.level > BoardGame.HighLevel) {
            BoardGame.HighLevel = BoardGame.level
            // console.log(score)
            // console.log(highScore)
            AppController.ShowHighest(BoardGame.HighLevel)
        }
    }
}

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

const Player = {
    sequence: [],
    sequenceIndex: 0,
    playerPick: function (numero) {
        Player.sequence.push(numero)
        Player.sequenceIndex++
        // UserExperience.LightGreen()        
        AppController.CheckSequence()
        // AppController.AIturn()
    }
}

const AI = {
    sequence: [],
    sequenceIndex: 0,
    AIpickColor: function () {
        this.sequence.push(Math.floor(Math.random() * 4));
        console.log(this.sequence)
        UserExperience.ShowAIonBoard(UserExperience.delay)
        AppController.playerTurn()
    }
}

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
                // Audio.Green()
                setTimeout(UserExperience.LightGreen, delay)
                console.log(delay)
                // index++
            }
            else if (AI.sequence[i] == 1) {
                // Audio.Red()                
                setTimeout(this.LightRed, delay)
                console.log(delay)
                //  index++
            }
            else if (AI.sequence[i] == 2) {
                // Audio.Blue()                
                setTimeout(this.LightBlue, delay)
                console.log(delay)
                // index++
            }
            else if (AI.sequence[i] == 3) {
                // Audio.Yellow()                
                setTimeout(this.LightYellow, delay)
                console.log(delay)
                // index++
            }
            delay += 500
        }

    },
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

const AppController = {

    playerTurn: function () {
        $('.color').css('pointer-events', 'auto')

    },
    AIturn: function () {
        AI.AIpickColor()
    },
    CheckSequence: function () {
        let index = Player.sequenceIndex - 1
        const playerSeq = Player.sequence
        const AIseq = AI.sequence

        if (playerSeq[index] !== AIseq[index]) {
            setTimeout(BoardGame.gameOver, 500)
            // BoardGame.gameOver()
        }
        if (playerSeq.length == AIseq.length && playerSeq[index] == AIseq[index]) {
            // BoardGame.nextTurn()
            setTimeout(BoardGame.nextTurn, 600)
        }
    },
    ShowHighest: (score) => {
        $('#highest-level').text(`${score.toString().padStart(2, '0')}`)
    }

}

$('#start').click(function () {
    // if(BoardGame.isRunning == false){
    BoardGame.start()
    // }
})

$('#reset').click(function () {
    BoardGame.reset()
})

//Player picker set of functions
$('#green').click(function () {
    Audio.Green()
    Player.playerPick(0)
    // UserExperience.LightGreen()
    console.log(Player.sequence)
})

$('#red').click(function () {
    Audio.Red()
    Player.playerPick(1)
    // UserExperience.LightRed()
    console.log(Player.sequence)
})

$('#blue').click(function () {
    Audio.Blue()
    Player.playerPick(2)
    // UserExperience.LightBlue()
    console.log(Player.sequence)
})

$('#yellow').click(function () {
    Audio.Yellow()
    Player.playerPick(3)
    // UserExperience.LightYellow()
    console.log(Player.sequence)
})

// $('#dificulty').change(function(){
//     BoardGame.dificulty = $('#dificulty').value

//     console.log(BoardGame.dificulty)
// })
