window.addEventListener('DOMContentLoaded', function() { // запускаем функцию после построения всего дом дерева

    'use strict';

//tabs

    let tab = document.querySelectorAll('.info-header-tab'), // присваиваем переменную всех табов       
        info = document.querySelector('.info-header'), // переменная родителя табов
        tabContent = document.querySelectorAll('.info-tabcontent'); // переменная контента табов

    function hideTabContent(a) { // скрыть контент (технический аргумент необходим для подставления его в вызов функции чтобы отображать 1 конкретный в начале)
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1); // технический аргумент, отоброжать только первый контент

    function showTabContent(b) { // показать контент
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) { // событие клик с помощью делегирования событий (навешивание события на родителя)
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0); // скрыть все
                    showTabContent(i); // показать на который кликнули
                    break; // прервать
                }
            }
        }

    });

//timer

    let deadline = '2021-02-21'; //время до которого длится отчет

    // узнать промежуток времени между сейчас и дедлайном
    function getTimeRemaining(endtime) { 
        let t = Date.parse(endtime) - Date.parse(new Date()), //техническая переменная количество милисекунд от сейчас до дедлайна
        //получаем секунды, минуты, часы округлив до целого, получаем остаток до елого с помощью %
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/1000/60/60));
        //если нужны часы и дни
        // hours = Math.floor((t/1000/60/60) % 24),
        // days = Math.floor((t/1000/60/60/24));

        //говорим чтобы функция вернула обьект в виде: пара ключ - значение
        return {
            'total' : t,
            'hour' : hours,
            'minute' : minutes,
            'second' : seconds
        };
    }
    
    //превращаем статическую функцию в динамическую
    function setClock(id, endtime) { //функция которая выставляет и запускает наши часы
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        // функция которая обновляет часы каждую секунду
        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hour;
            minutes.textContent = t.minute;
            seconds.textContent = t.second;

            //условие при котором остановится таймер и значения останутся 00:00:00
            if (t.total <=0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock('timer', deadline); //вызов функции где в качестве переменных мы указываем название нашего id и deadline как параметр аргумента endtime
});