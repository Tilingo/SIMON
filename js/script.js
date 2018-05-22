const BoardGame = {
    level: 0,
    start: () => {
        AppController.AIturn()
        $('#start').css('display', 'none')
        

    },
    gameOver: function () {
        $('#board').css('pointer-events', 'none')
        alert('You loose!')
        $('#reset').css('display', 'block')
    },
    reset: function () {
        Player.sequence = []
        AI.sequence = []
        Player.sequenceIndex = 0
        this.level = 0
        UserExperience.ShowLevel()        
        $('#reset').css('display', 'none')
        $('#start').css('display', 'block')        
    },
    nextTurn: function () {
        $('#board').css('pointer-events', 'none')
        console.log('they matched')
        Player.sequenceIndex = 0
        Player.sequence = []
        this.level++
        UserExperience.ShowLevel()
        AppController.AIturn()
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
        $('#level').text(`Level: ${BoardGame.level.toString().padStart(2, '0')}`)
    },
    ShowAIonBoard: function (delay) {
        let index = AI.sequenceIndex
        for (let i = 0; i < AI.sequence.length; i++) {
            if (AI.sequence[i] == 0) {
                setTimeout(UserExperience.LightGreen, delay)
                console.log(delay)
                // index++
            }
            else if (AI.sequence[i] == 1) {
                setTimeout(this.LightRed, delay)
                console.log(delay)
                //  index++
            }
            else if (AI.sequence[i] == 2) {
                setTimeout(this.LightBlue, delay)
                console.log(delay)
                // index++
            }
            else if (AI.sequence[i] == 3) {
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
        }, 1000)
        setTimeout(function () {
            $('#green').removeClass('greenClicked')
        }, 1300)

    },
    LightRed: function () {
        setTimeout(function () {
            $('#red').addClass('redClicked')
        }, 1000)
        setTimeout(function () {
            $('#red').removeClass('redClicked')
        }, 1300)

    },
    LightBlue: function () {
        setTimeout(function () {
            $('#blue').addClass('blueClicked')
        }, 1000)
        setTimeout(function () {
            $('#blue').removeClass('blueClicked')
        }, 1300)

    },
    LightYellow: function () {
        setTimeout(function () {
            $('#yellow').addClass('yellowClicked')
        }, 1000)
        setTimeout(function () {
            $('#yellow').removeClass('yellowClicked')
        }, 1300)

    },
}

const AppController = {

    playerTurn: function () {
        $('#board').css('pointer-events', 'auto')

    },
    AIturn: function () {
        AI.AIpickColor()
    },
    CheckSequence: function () {
        let index = Player.sequenceIndex - 1
        const playerSeq = Player.sequence
        const AIseq = AI.sequence

        if (playerSeq[index] !== AIseq[index]) {
            BoardGame.gameOver()
        }
        if (playerSeq.length == AIseq.length && playerSeq[index] == AIseq[index]) {
            BoardGame.nextTurn()
        }
    }

}

$('#start').click(function () {
    BoardGame.start()
})

$('#reset').click(function () {
    console.clear()
    BoardGame.reset()
})

//Player picker set of functions
$('#green').click(function () {
    Player.playerPick(0)
    // UserExperience.LightGreen()
    console.log(Player.sequence)
})

$('#red').click(function () {
    Player.playerPick(1)
    // UserExperience.LightRed()
    console.log(Player.sequence)
})

$('#blue').click(function () {
    Player.playerPick(2)
    // UserExperience.LightBlue()
    console.log(Player.sequence)
})

$('#yellow').click(function () {
    Player.playerPick(3)
    // UserExperience.LightYellow()
    console.log(Player.sequence)
})
$('#yellow').keypress(function () {
    playAudio()
    // UserExperience.LightYellow()
    console.log(Player.sequence)
})
