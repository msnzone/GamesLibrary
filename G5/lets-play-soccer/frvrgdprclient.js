
;(function(scope) {

	function getFrvrGdpr(scope) {
		var GDPR_STORAGE_KEY = 'FRVR.GDPR.1';
		var GDPR_ID = 'frvrgdprserver';
		var GDPR_URL = '.';
		var REQUEST_TIMEOUT = 15000;
		var frvrgdpr = {};
		var gdprIframe, requestId = 0, requests = {};

		if(scope[GDPR_ID] !== undefined) return scope[GDPR_ID];

		function cbOnce(cb) {
			return function() {
				var _cb = cb;
				cb = undefined;
				if(typeof _cb === 'function') return _cb.apply(this, arguments);
			}
		}

		function parseMsg(msg) {
			var json = {error: 'parse errror'};
			try {
				json = JSON.parse(msg);
			} catch(err) {
				console.error(err);
			}
			return json;
		}

		function gdprInit(callback) {
			if(document.body === null) return document.addEventListener('DOMContentLoaded', gdprInit.bind(null, callback));
			gdprIframe = document.getElementById(GDPR_ID);
			if(gdprIframe !== null) return callback();
			var frm = gdprIframe = document.createElement('iframe');
			Object.assign(frm.style, {
				position: 'absolute',
				top: '-200px', left: '-200px',
				width: '0', height: '0',
				border: '0'
			});
			frm.id = GDPR_ID;
			frm.src = "";
			frm.onload = cbOnce(callback);
			document.body.appendChild(frm);
		}

		function postRequest(msg, callback) {
			if(gdprIframe === undefined) return gdprInit(postRequest.bind(null, msg, callback));
			msg.id = ++requestId;
			requests[msg.id] = {
				msg: msg,
				callback: cbOnce(callback),
				timeoutId: setTimeout(closeRequest.bind(null, msg.id, 'Request [' + msg.id + '] timed out'), REQUEST_TIMEOUT)
			};
			var win = gdprIframe && gdprIframe.contentWindow;
			if(win && win.postMessage) {
				win.postMessage(JSON.stringify(msg), '*');
			}
			else { // Fall back to localStorage if we cannot reach server iframe
				var res = {type: msg.type + '-res', id: msg.id};
				switch(msg.type) {
					case 'gdpr-get': res.val = localStorage.getItem(GDPR_STORAGE_KEY); break;
					case 'gdpr-set':
						localStorage.setItem(GDPR_STORAGE_KEY, msg.val);
						res.val = msg.val;
						break;
					default: throw new Error('invalid request type: ' + msg);
				}
				handleResponseMessge({data: JSON.stringify(res)});
			}
		}

		function closeRequest(id, err, res) {
			var req = requests[id];
			if(req) {
				clearTimeout(req.timeoutId);
				var _callback = req.callback;
				delete requests[id];
				_callback(err, res);
			} else console.warn('GDPR Error: No request found for id: %s / err: %s / res: %s', id, err, res);
		}

		function handleResponseMessge(event) {
			var json, err, res;
			try {
				json = JSON.parse(event.data);
				switch(json.type) {
					case 'gdpr-get-res': case 'gdpr-set-res': closeRequest(json.id, err, json.val); break;
					case 'gdpr-error': closeRequest(json.id, json.error); break;
				}
			} catch(err) {
				// Ignore these as they are likely not meant for us
			}
		}

		function getGdpr(callback) {
			postRequest({type: 'gdpr-get'}, callback);
		};
		function setGdpr(val, callback) {
			postRequest({type: 'gdpr-set', val: val}, callback);
		};

		window.addEventListener('message', handleResponseMessge, false);

		return scope[GDPR_ID] = {get: getGdpr, set: setGdpr};
	}

	var styles = {
		backgroundColor: 'rgba(4, 15, 11, 0.9)',
		textColor: '#80afba',
		linkColor: '#bdd6db',
		consentBtnColor: '#4080fa',
		consentBtnTextColor: '#fff',
	};
	styles.css = ''
		+'#gdpr-overlay {'
			+'position: absolute;'
			+'right: 0; bottom: 0; left: 0;'
			+'height: auto;'
			+'z-index: 1000;'
			+'font-size: 11px;'
			+'background: '+styles.backgroundColor+';'
			+'color: '+styles.textColor+';'
		+'}'
		+'#gdpr-dialog {'
			+'right: 0; bottom: 0; left: 0;'
			+'background: '+styles.backgroundColor+';'
			+'user-select: none;'
		+'}'
		+'#gdpr-wrapper {'
			+'max-width: 40em;'
			+'margin: 0 auto;'
			+'padding: 0.5em 1em;'
			+'position: relative;'
			+'display: table;'
		+'}'
		+'#gdpr-content { display: table-cell; font-size: 10px; line-height: 14px; }'
		+'#gdpr-content p, #gdpr-content a { margin: 0; line-height: 130%; }'
		+'#gdpr-content a, .link { color: '+styles.linkColor+'; }'
		+'#gdpr-controls { display: table-cell; vertical-align: middle; }'
		+'#gdpr-button {'
			+'padding: 0.5em 1.3em;'
			+'margin-left: 1em;'
			+'border: 0;'
			+'border-radius: 4px;'
			+'background: none;'
			+'font-size: 1em;'
			+'text-align: center;'
			+'background-color: '+styles.consentBtnColor+';'
			+'color: '+styles.consentBtnTextColor+';'
			+'cursor: pointer;'
		+'}'
		+'#gdpr-button.highlight { animation: highlight 3s infinite ease-in-out; }'
		+'@keyframes highlight {'
			+'0% { -moz-box-shadow: 0 0 0 0 '+styles.consentBtnColor+'; -webkit-box-shadow: 0 0 0 0 '+styles.consentBtnColor+'; box-shadow: 0 0 0 0 '+styles.consentBtnColor+'; }'
			+'10% { -moz-box-shadow: 0 0 2em 0.5em '+styles.consentBtnColor+'; -webkit-box-shadow: 0 0 2em 0.5em '+styles.consentBtnColor+'; box-shadow: 0 0 2em 0.5em '+styles.consentBtnColor+'; }'
			+'15% { -moz-box-shadow: 0 0 0 0 '+styles.consentBtnColor+'; -webkit-box-shadow: 0 0 0 0 '+styles.consentBtnColor+'; box-shadow: 0 0 0 0 '+styles.consentBtnColor+'; }'
			+'20% { -moz-box-shadow: 0 0 2em 0.5em '+styles.consentBtnColor+'; -webkit-box-shadow: 0 0 2em 0.5em '+styles.consentBtnColor+'; box-shadow: 0 0 2em 0.5em '+styles.consentBtnColor+'; }'
			+'30% { -moz-box-shadow: 0 0 0 0 '+styles.consentBtnColor+'; -webkit-box-shadow: 0 0 0 0 '+styles.consentBtnColor+'; box-shadow: 0 0 0 0 '+styles.consentBtnColor+'; }'
			+'100% { -moz-box-shadow: 0 0 0 0 '+styles.consentBtnColor+'; -webkit-box-shadow: 0 0 0 0 '+styles.consentBtnColor+'; box-shadow: 0 0 0 0 '+styles.consentBtnColor+'; }'
		+'}'
		+'@media only screen and (min-width: 401px) {'
			//+'#gdpr-overlay { font-size: 100%; }'
			//+'#gdpr-wrapper { padding: 1em 2em; }'
		+'}'
		+'#gdpr-overlay #gdpr-learnmoreframe { display: block; height: 0; width: 38em; margin: 0 auto; background: #fff; border: 0 solid #f0f0f0; }'
		+'#gdpr-overlay.showmore #gdpr-learnmoreframe { height: 90vh; border-width: 0.5em; margin-top: 1em; transition: height 1s; }'
		;
	var content = {
		//text: 'FRVR Games respect your privacy under GDPR and use cookies to ensure you get the best experience and ads. <a href="https://frvr.com/legal/#gdpr" target="_blank" id="gdpr-learnmore">Learn more</a>',
		text: 'FRVR use cookies as we serve you with great games and ads. See our privacy policy on <span class="link">https://S/legal/#gdpr</span>',
		btnConsent: 'OK',
	};
	var uiElements = {tag: 'div', id: 'gdpr-overlay', children: [
		{tag: 'div', id: 'gdpr-dialog', children: [
			//{tag: 'iframe', id: 'gdpr-learnmoreframe'},
			{tag: 'div', id: 'gdpr-wrapper', children: [
				{tag: 'div', id: 'gdpr-content', innerHTML: content.text},
				{tag: 'div', id: 'gdpr-controls', children: {tag: 'button', id: 'gdpr-button', innerHTML: content.btnConsent}},
			]}
		]}
	]};


	function launchGDPR(callback) {

		function appendStyle(css) {
			var style = document.createElement('style');
			style.type = 'text/css';
			if(style.styleSheet) {
				style.styleSheet.cssText = css;
			}
			else {
				style.appendChild(document.createTextNode(css));
			}
			var head = document.head || document.getElementsByTagName('head')[0]
			head.appendChild(style);
			return style;
		}

		function addElem(parent, children) {
			(children.forEach ? children : [children]).forEach(function(props) {
				var elem = document.createElement(props.tag), children = props.children, forAttr = props.for;
				delete props.tag; delete props.children; delete props.for;
				parent.appendChild(Object.assign(elem, props));
				if(forAttr) elem.setAttribute('for', forAttr);
				if(children) addElem(elem, children);
			});
			return parent.children[parent.children.length - 1];
		};

		function showGDPRDialog(callback) {
			var btnConsent, gdprStyle, gdprElem, learnMore, gdprSubmitted = false;
			function handleLearnMore(event) {
				event.preventDefault();
				var overlay = document.getElementById('gdpr-overlay');
				document.getElementById('gdpr-learnmoreframe').src = learnMore.href;
				overlay.className = 'showmore';
			}
			function handleMouseClick(event) {
				if(event.button === 0) handleSubmit(event);
			}
			function handleTouchStart(event) {
				handleSubmit(event);
			}
			function attachEventHandlers() {
				btnConsent.addEventListener('click', handleMouseClick);
				btnConsent.addEventListener('touchstart', handleTouchStart);
				//learnMore.addEventListener('click', handleLearnMore);
				//learnMore.addEventListener('touchstart', handleLearnMore);
			}
			function detachEventHandlers() {
				btnConsent.removeEventListener('click', handleMouseClick);
				btnConsent.removeEventListener('touchstart', handleTouchStart);
				//learnMore.removeEventListener('click', handleLearnMore);
				//learnMore.removeEventListener('touchstart', handleLearnMore);
				gdprStyle.parentElement.removeChild(gdprStyle);
				gdprElem.parentElement.removeChild(gdprElem);
			}
			function handleSubmit(event) {
				if(gdprSubmitted) return;
				gdprSubmitted = true;
				detachEventHandlers();
				if(typeof callback === 'function') callback(true);
			}

			gdprStyle = Object.assign(appendStyle(styles.css), {id: 'gdpr-style'});
			gdprElem = addElem(document.body, uiElements);
			learnMore = document.getElementById('gdpr-learnmore');
			btnConsent = document.getElementById('gdpr-button');
			attachEventHandlers();
		}

		showGDPRDialog(callback);
	}

	var hasGdprDialog = document.getElementById('gdpr-overlay') !== null;
	if(hasGdprDialog) return;

	var trackIntervalId, trackTimeoutId, eventQ = [], waitInterval = 5, waitTimeout = 10000;
	function sendGA(name, value) {
		gax('send', 'event', {
			eventCategory: Config.id, eventAction: name, eventValue: value,
			appId: 'com.frvr.' + Config.id, appName: Config.id, appVersion: Config.version
		});
	};
	function isTrackReady() {
		return typeof XS === 'object' && typeof XS.track === 'object';
	}
	function trackGdpr() {
		if(arguments.length > 0) eventQ.push(arguments);
		if(window.gax) while(eventQ.length > 0) sendGA.apply(this, eventQ.shift());
	}
	function startTracking() {
		clearInterval(trackIntervalId);
		clearTimeout(trackTimeoutId);
		trackGdpr();
	}
	trackIntervalId = setInterval(function() { if(window.gax) startTracking(); }, waitInterval *= 2);
	trackTimeoutId = setTimeout(startTracking, waitTimeout);

	var frvrGdpr = getFrvrGdpr(scope);
	frvrGdpr.get(function(err, val) {
		if(err) return console.error(err);
		if(val === 'gdpr_consent_given') return trackGdpr('gdpr_consent_given');
		var timeGdprShow = Date.now();
		trackGdpr('gdpr_consent_prompt_show');
		launchGDPR(function(consent) {
			if(consent === true) {
				trackGdpr('gdpr_consent_prompt_accept', Date.now() - timeGdprShow);
				frvrGdpr.set('gdpr_consent_given', function(err, val) {
					if(err) return console.error(err);
					console.info('Consent status updated: gdpr_consent_given = ' + Boolean(consent).toString());
				});
			}
		});
	});

})(this);