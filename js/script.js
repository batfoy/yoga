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

    let deadline = '2021-03-10'; //время до которого длится отчет

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

            // добавляем нуль перед единичной цифрой например 5 => 05
            function addZero(num){
                if(num <= 9) {
                    return '0' + num;
                } else return num;
            };

            //подставляем таймер с нулем перед если нужно в верстку
            hours.textContent = addZero(t.hour);
            minutes.textContent = addZero(t.minute);
            seconds.textContent = addZero(t.second);

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

    // // modal на одну кнопку
    // let more = document.querySelector('.more'), // переменная класса с кнопкой
    //     overlay = document.querySelector('.overlay'), // переменная оверлея
    //     close = document.querySelector('.popup-close'), // переменная крестика
        

    // //обработчик события клик, при нажатии оверлей становится блок
    // more.addEventListener('click', function() {
    //     overlay.style.display = 'block';
    //     this.classList.add('more-splash'); //добавляем класс к кнопке more анимация
    //     document.body.style.overflow = 'hidden'; //запретить прокрутку при всплытии оверлея
    // });
    // //обработчик события клик, при нажатии close закрыть оверлей
    // close.addEventListener('click', function() {
    //     overlay.style.display = 'none';
    //     more.classList.remove('more-splash');
    //     document.body.style.overflow = ''; //отменить запрет прокрутки при закрытии оверлея
    // });


    // modal на несколько кнопок
    let btn = document.querySelectorAll('.description-btn, .more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
         

        //используем метод перебора  forEach 
    btn.forEach(function(item) { // в функции указываем аргумент btn как название массива с нашими классами
        item.addEventListener('click', function() { //навешиваем событие клик на кнопку
            overlay.style.display = 'block'; //при клике оверлей становится дисплей блок
            this.classList.add('more-splash'); //метод this как обращение к item в обработчике событий добавляем к btn новый класс
            document.body.style.overflow = 'hidden';    //запрещаем прокрутку при оверлее
        })
    });

    close.addEventListener('click', function() { //навешиваем событие клик на close
        overlay.style.display = 'none'; //закрываем оверлей
        document.body.style.overflow = ''; //отменяем отмену прокрутки
        btn.forEach(function(item) {
            item.classList.remove('more-splash');
        })
    });
});