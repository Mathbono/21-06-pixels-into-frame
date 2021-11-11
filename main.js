function getStylesheetRules(sheetName, selectorName = null) {
	const rulesList = document.querySelector(`link[href*=${sheetName}]`).sheet
		.cssRules;
	if (selectorName) {
		for (let rule of rulesList) {
			if (rule.selectorText === selectorName) {
				return rule.style;
			}
		}
	}
	return rulesList;
}

let A = null;
let B = null;
let firstMove = false;

window.addEventListener('mousedown', e => {
	try {
		document.getElementById('frame').remove();
	} catch (e) {}
	A = {
		x: e.clientX,
		y: e.clientY
	};
	const frameElement = document.createElement('div');
	frameElement.setAttribute('id', 'frame');
	const frameElementStyle = getStylesheetRules('main', '#frame');
	frameElementStyle.setProperty('display', 'none');
	for (let i = 0; i < 3; i++) {
		const frameTextElement = document.createElement('p');
		frameTextElement.setAttribute('class', 'frameText');
		frameElement.appendChild(frameTextElement);
	}
	document.body.appendChild(frameElement);
});

window.addEventListener('mousemove', e => {
	if (A !== null) {
		B = {
			x: e.clientX,
			y: e.clientY
		};
		const frameElement = document.getElementById('frame');
		const frameTextElements = document.getElementsByClassName('frameText');
		frameTextElements[0].innerHTML =
			'Largeur&nbsp;: ' + frameElement.clientWidth + 'px';
		frameTextElements[1].innerHTML =
			'Hauteur&nbsp;: ' + frameElement.clientHeight + 'px';
		frameTextElements[2].innerHTML =
			'Diagonale&nbsp;: ' +
			Math.round(
				Math.sqrt(
					frameElement.clientWidth ** 2 + frameElement.clientHeight ** 2
				)
			) +
			'px';
		const frameElementStyle = getStylesheetRules('main', '#frame');
		// POSITION DE B PAR RAPPORT À A
		// COMMENCER À BOUGER LA SOURIS PAR BAS DROITE
		if (firstMove === false) {
			// BAS DROITE
			if (B.x - A.x > 0 && B.y - A.y > 0) {
				frameElementStyle.setProperty('display', 'grid');
				firstMove = true;
			}
		} else {
			// BAS DROITE
			if (B.x - A.x > 0 && B.y - A.y > 0) {
				frameElementStyle.setProperty('left', `${A.x}px`);
				frameElementStyle.setProperty('top', `${A.y}px`);
				frameElementStyle.setProperty('width', `${B.x - A.x}px`);
				frameElementStyle.setProperty('height', `${B.y - A.y}px`);
				//HAUT GAUCHE
			} else if (B.x - A.x < 0 && B.y - A.y < 0) {
				frameElementStyle.setProperty('left', `${B.x}px`);
				frameElementStyle.setProperty('top', `${B.y}px`);
				frameElementStyle.setProperty('width', `${A.x - B.x}px`);
				frameElementStyle.setProperty('height', `${A.y - B.y}px`);
				// HAUT DROITE
			} else if (B.x - A.x > 0 && B.y - A.y < 0) {
				frameElementStyle.setProperty('right', `${B.x}px`);
				frameElementStyle.setProperty('top', `${B.y}px`);
				frameElementStyle.setProperty('width', `${B.x - A.x}px`);
				frameElementStyle.setProperty('height', `${A.y - B.y}px`);
				// BAS GAUCHE
			} else if (B.x - A.x < 0 && B.y - A.y > 0) {
				frameElementStyle.setProperty('left', `${B.x}px`);
				frameElementStyle.setProperty('bottom', `${B.y}px`);
				frameElementStyle.setProperty('width', `${A.x - B.x}px`);
				frameElementStyle.setProperty('height', `${B.y - A.y}px`);
			}
		}
	}
});

window.addEventListener('mouseup', () => {
	A = null;
	firstMove = false;
});
