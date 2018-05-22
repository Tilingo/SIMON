const BoardGame = {
    gameOver: function () {
        $('#board').css('pointer-events', 'none')
        alert('You loose!')
        $('#reset').css('display', 'block')
    },
    reset: function () {
        Player.sequence = []
        AI.sequence = []
        Player.sequenceIndex = 0
        AppController.AIturn()
        $('#reset').css('display', 'none')
    },
    nextTurn: function () {
        $('#board').css('pointer-events', 'none')
        console.log('they matched')
        Player.sequenceIndex = 0
        Player.sequence = []
        this.AIturn()
    }
} 

const Player = {
    sequence: [],
    sequenceIndex: 0,
    playerPick: function (numero) {
        Player.sequence.push(numero)
        Player.sequenceIndex++
        AppController.CheckSequence()
        // AppController.AIturn()
    }
}

const AI = {
    sequence: [],
    AIpickColor: function () {
        this.sequence.push(Math.floor(Math.random() * 4));
        console.log(this.sequence)
        AppController.playerTurn()
    }
}

const UserExperience = {
    //Show the AI sequence on the screen
    ShowAIonBoard: function () {

    },
    //Show the player sequence on the screen
    ShowPlayerOnBoard: function () {

    }
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

window.onload = function () {
    AppController.AIturn()
};

//Player picker set of functions
$('#green').click(function () {
    Player.playerPick(0)
    console.log(Player.sequence)
})

$('#red').click(function () {
    Player.playerPick(1)
    console.log(Player.sequence)
})

$('#blue').click(function () {
    Player.playerPick(2)
    console.log(Player.sequence)
})

$('#yellow').click(function () {
    Player.playerPick(3)
    console.log(Player.sequence)
})

$('#reset').click(function () {
    console.clear()
    BoardGame.reset()
})
