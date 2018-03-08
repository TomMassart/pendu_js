
/*Fonction utilitaire pour faire des requêtes Ajax*/

const ajax =  (url = '', fn, method='GET', data=null) => {
	if( !url || !fn)return
	let req = new XMLHttpRequest()
	req.onreadystatechange = fn
	req.open(method, url, true)
	req.send(data)
}


/*Démarrage du jeu*/


const play = () => {
	document.querySelector('#game').insertAdjacentHTML('beforeend', gameData[`${gameData.state}Html`])
	document.querySelector('form').addEventListener('submit', e=> {
		e.preventDefault()
		const selectLetter = document.querySelector('#select-letter')
		const triedLetter = selectLetter.options[selectLetter.selectedIndex].value
		gameData.alphabet = gameData.alphabet.replace(triedLetter,'')
		gameData.triedLetters += triedLetter
		let replacementString = ''
	let letterFound = false
	for( let i=0;i<gameData.lettersCount;i++){
		if(gameData.word.charAt(i) === triedLetter.toUpperCase()){
			replacementString += triedLetter
			letterFound = true
		}else{
			replacementString += gameData.replacementString.charAt(i)
		}
	}
	gameData.replacementString = replacementString

	if (!letterFound) {	
		gameData.trials += 1
		gameData.remainingTrials = gameData.maxTrials - gameData.trials 
		if (gameData.remainingTrials === 0) {
			gameData.state = gameData.states[1]
		}
	}else{
		if(gameData.replacementString.toUpperCase() === gameData.word){
			alert('tu as gagné !')
			gameData.state = gameData.states[2]
			
		}
	}
	
	render()

	})
	render()
}
	


const render = () => {
	console.table(gameData)
	document.querySelector('#max-trials').textContent = gameData.maxTrials;
	document.querySelector('#letters-count').textContent = gameData.lettersCount;
	document.querySelector('#replacement-string').textContent = gameData.replacementString;
	document.querySelector('#tried-letters').textContent = gameData.triedLetters;
	gameData.alphabet.split('').forEach (letter => document.querySelector('#select-letter').append(`<option value="${letter}">${letter}</option>`)
	)
if(gameData.state !== gameData.states[0]){
	document.querySelector(`#${gameData.states[0]}`).remove()
	document.querySelector('#game').insertAdjacentHTML('beforeend',gameData[`${gameData.state}Html`])

}

	document.querySelector('#remaining-trials').textContent = gameData.remainingTrials
	document.querySelector('#image-file').src = `images/pendu${gameData.trials}.gif`
	if(gameData.state !== gameData.states[0]){
		const gameStateNode = document.querySelector(`#${gameData.state}`)
		gameStateNode.querySelector('.word').textContent = gameData.word
	}


	document.querySelectorAll('#select-letter option').forEach(opt=>opt.remove())
	gameData.alphabet.split('').forEach(letter =>
		document.querySelector('#select-letter').insertAdjacentHTML('beforeend', `<option value="${letter}">${letter}</option>`)
		)
	
}


const gameData = {}
gameData.maxTrials = 8
gameData.trials = 0
gameData.remainingTrials = gameData.maxTrials
gameData.word = ''
gameData.lettersCount = 0
gameData.replacementString = ''
gameData.alphabet = "abcdefghijklmnopqrstuvwxyz"
gameData.triedLetters = ''
gameData.states = ['playing', 'losing', 'winning']
gameData.state = gameData.states[0]
gameData.states.forEach(state=>gameData[`${state}Html`] = '')


/*Récupération des ressources nécessaires avant de jouer*/ 


ajax('./api/index.php', function(e){
	if(e.target.readyState !== 4 || e.target.status !== 200) return
	gameData.word = e.target.responseText
	gameData.lettersCount = gameData.word.length
	gameData.replacementString = gameData.replacementString.padStart
	(gameData.lettersCount, '*')
	gameData.states.forEach(state=>{
		ajax(`./partials/${state}.html`, e=>{
			if(e.target.readyState !== 4 || e.target.status !== 200) return
				gameData[`${state}Html`] = e.target.responseText
			if (state === gameData.states[0]) play()
		})	


	})
})

		/*On a 3 états possible ( winning, losing, playing )
	Mais il n'y a qu'un état actif à la fois - playing 
	-> cacher les états inactifs .hide()
	-> afficher l'état actif .show()*/