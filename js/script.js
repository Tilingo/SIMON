$(document).ready(function(){

    
    const BoardGame = {
        
    colors: ['green', 'red', 'blue', 'yellow'],

    }

    const Player = {
        playerMove: function(){

        }
    }

    const AI = {
        AIpickColor: function (){
            return Math.floor(Math.random() * 4)
        }
    }

    console.log(AI.AIpickColor())





})