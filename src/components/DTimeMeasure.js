import React from 'react';

const TICK_MS = 500;
const IDLE_MS = 4000;

let hidden					 = null;
let visibilityChange = null;

if (typeof document.hidden !== 'undefined') { 
	hidden 					 = 'hidden';
	visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
	hidden 					 = 'msHidden';
	visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
	hidden 					 = 'webkitHidden';
	visibilityChange = 'webkitvisibilitychange';
}

const timeObjectBlueprint = { hh: 0, mm: 0, ss: 0, ms: 0 }

class DTimeMeasure extends React.Component {
	constructor(props) {
		super(props);
		
		this.countdownTimer = null;
		this.idleTimer			= null;
		this.lastActive     = 0;
		this.idling					= false;
		this.timePassive		= Object.assign({},timeObjectBlueprint);
		this.timeActive			= Object.assign({},timeObjectBlueprint);
		this.timeAway				= Object.assign({},timeObjectBlueprint);
		
		this.state = {
			passiveTime	: '00:00:00',
			activeTime	:	'00:00:00',
			afkTime			: '00:00:00'
		}
	}
	
	formatZeros(timeValue) {
		return (timeValue < 10) ? "0"+timeValue : timeValue;
	}
	
	updateTimeString(timeObject) {
		return 		 this.formatZeros(timeObject.hh)
					+":"+this.formatZeros(timeObject.mm)
					+":"+this.formatZeros(timeObject.ss);
	}
	
	/*
		This function uses short-circuit evaluation aka McCarthy evaluation.
		Оценка короткого замыкания, или оценка Маккарти.
		
		Алгоритм (что пока на уме):
			- Вычитаем 1000 из extraTime, если extraTime больше тысячи.
				(если меньше - вычитаем extraTime сам из себя, т.е. Math.max(1000,extraTime))
			
			- Получим m - остаток от деления extraTime на 1000 - это кол-во чистых миллисекунд.
				Это значение по правилам остатка от деления лежит в диапазоне [0;999].
			- Вычтем m из extraTime.
			- Умножим extraTime на 1000.
				Теперь у нас там целое кол-во секунд.
			- Прибавим m к ms (текущему кол-ву миллисекунд).
				То, что мы получим, гарантированно не превысит числа 1998.
			- Если ms > 999, тогда у нас образовалась доп. секунда.
				В таком случае надо вычесть 1000 из ms и прибавить 1 к ss (текущему кол-ву секунд).
			- Получим s - остаток от деления extraTime на 60 - это количество чистых секунд.
				Это значение по правилам остатка от деления лежит в диапазоне [0;60].
			- Вычтем s из extraTime.
			- Умножим extraTime на 60.
				Теперь у нас там целое кол-во минут.
			- Прибавим s к ss.
			- Если ss > 59, тогда у нас образобалась доп. секунда.
				В таком случае надо вычесть 60 из ss и прибавить 1 к mm (текущему кол-ву минут).
			- Получим m - остаток от деления extraTime на 60 - это количество чистых минут.
				Это значение по правилам остатка от деления лежит в диапазоне [0;60].
			- Вычтем m из extraTime.
			- Прибавим m к mm.
			- Если mm > 59, тогда у нас образобалась доп. секунда.
				В таком случае надо вычесть 60 из ss и прибавить 1 к mm (текущему кол-ву минут).
	*/
	
	modifyTime(timeObject,extraTime) {
		let hh = timeObject.hh || 0;
		let mm = timeObject.mm || 0;
		let ss = timeObject.ss || 0;
		let ms = timeObject.ms || 0;
		
		// if timeToFormat+extraTime > MAX_SAFE_INTEGER, shit's f'd up.
		let timeToFormat  = 3600000*hh+60000*mm+1000*ss+ms+extraTime;

		let newHours      = Math.floor(timeToFormat/3600000);
		let newMinutes    = Math.floor((timeToFormat%3600000)/60000);
		let newSeconds    = Math.floor(((timeToFormat%3600000)%60000)/1000);
		let newMilSeconds = ((timeToFormat%3600000)%60000)%1000;

		return { hh: newHours, mm: newMinutes, ss: newSeconds, ms: newMilSeconds }
	}
	
	timerTick() {
		let timeToModify 	= this.idling ? this.timePassive : this.timeActive;
		let curTimeString = this.idling ? this.state.passiveTime : this.state.activeTime;
		let newTimeObject = this.modifyTime(timeToModify,TICK_MS);
		let newTimeString = this.updateTimeString(newTimeObject);
		
		if(this.idling) {
			this.timePassive = newTimeObject;
		} else {
			this.timeActive	 = newTimeObject;
		}
				
		// Do NOT render on millisecond changes, only seconds and above.
		if(newTimeString !== curTimeString) {
			this.setState(this.idling ? { passiveTime: newTimeString } : { activeTime: newTimeString });
		}
	}
	
	stopTimer() {
		clearInterval(this.countdownTimer);
	}
	
	startTimer() {
		this.countdownTimer = setInterval(this.timerTick,TICK_MS);
	}
	
	becomeIdle() {
		this.idling = true;
	}
	
	restartIdleTimer() {
		if(this.idleTimer != null) {
			clearTimeout(this.idleTimer);
		}
		
		this.idling = false;
		this.idleTimer = setTimeout(this.becomeIdle,IDLE_MS);
	}
	
	handleVisibilityChange() {
		if(document[hidden]) {
			// tab is inactive.
			this.stopTimer();
			this.lastActive = Date.now();
		} else {
			// tab is active.
			let tabbedBack = Date.now();
			let diff       = 0;
			
			if(this.lastActive !== 0) {
				diff = tabbedBack - this.lastActive;
			}
			
			this.startTimer();
			
			this.timeAway = this.modifyTime(this.timeAway,diff);
			
			this.setState({
				afkTime: this.updateTimeString(this.timeAway)
			});
		}
	}
	
	componentDidMount() {
		this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
		this.stopTimer							= this.stopTimer.bind(this);
		this.startTimer							= this.startTimer.bind(this);
		this.timerTick							= this.timerTick.bind(this);
		this.becomeIdle							= this.becomeIdle.bind(this);
		this.restartIdleTimer				= this.restartIdleTimer.bind(this);
		this.updateTimeString				= this.updateTimeString.bind(this);
		
		document.addEventListener(visibilityChange,this.handleVisibilityChange,false);
		
		if(!document[hidden]) {
			this.startTimer();
		}
		
		window.onload 			= this.restartIdleTimer; 
    window.onmousemove	= this.restartIdleTimer; 
    window.onmousedown	= this.restartIdleTimer; 
    window.ontouchstart = this.restartIdleTimer; 
    window.onclick 			= this.restartIdleTimer; 
    window.onkeypress 	= this.restartIdleTimer;
	}
	
	render() {
		return (
			<div>
				<div>
					You have spent <strong>{this.state.activeTime}</strong> here doing something, and <strong>{this.state.passiveTime}</strong> doing nothing.
				</div>
				<div>
					By the way, what were you doing for <strong>{this.state.afkTime}</strong> not staring at this wonderful app, but keeping it open? Our smart AI would be upset of sending love in nowhere T~T
				</div>
			</div>
		);
	}
}

export default DTimeMeasure;