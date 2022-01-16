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

    let deadline = '2021-12-31'; //время до которого длится отчет

    // узнать промежуток времени между сейчас и дедлайном
    function getTimeRemaining(endtime) { 
        let t = Date.parse(endtime) - Date.parse(new Date()), //техническая переменная количество милисекунд от сейчас до дедлайна
        //получаем секунды, минуты, часы округлив до целого, получаем остаток до елого с помощью %
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        //если нужны часы и дни
        hours = Math.floor((t/1000/60/60) % 24),
        days = Math.floor((t/1000/60/60/24));

        //говорим чтобы функция вернула обьект в виде: пара ключ - значение
        return {
            'total' : t,
            'days' : days,
            'hour' : hours,
            'minute' : minutes,
            'second' : seconds
        };
    }
    
    //превращаем статическую функцию в динамическую
    function setClock(id, endtime) { //функция которая выставляет и запускает наши часы
        let timer = document.getElementById(id),
            days = timer.querySelector('.days'),
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
            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hour);
            minutes.textContent = addZero(t.minute);
            seconds.textContent = addZero(t.second);

            //условие при котором остановится таймер и значения останутся 00:00:00
            if (t.total <=0) {
                clearInterval(timeInterval);
                days.textContent = '00';
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

    // //Form отправка при помощиAJAX 

    // //создаем объект с сообщениями
    // let message = {
    //     loading: 'Загрузка...',
    //     success: 'Спасибо! Скоро мы с вами свяжемся!',
    //     failure: 'Что-то пошло не так...'
    // }

    // //Получаем эллементы со страницы, с которыми мы будем работать (форму, инпуты...)
    // let form = document.querySelector('.main-form'), //1я форма
    //     formBottom = document.getElementById('form'), //2я форма
    //     input = form.getElementsByTagName('input'),
    //     statusMessage = document.createElement('div'); //эллемент оповещающий пользователя об отправки сообщения
    //     statusMessage.classList.add('status'); //присвоим созданному диву класс

    // //вешаем обработчик событий на форму с событием submit т.е. отправление 
    // function sendForm(elem) { //создаем доп функцию чтобы обьединить обе формы со страницы в одном эллементе elem
    //     elem.addEventListener('submit', function(event) {
    //         event.preventDefault();
    //         //оповещаем пользователя об отправке
    //         elem.appendChild(statusMessage);
    
    //         //создаем запрос, чтобы отправить данные на сервер при помощи AJAX
    //         let request = new XMLHttpRequest();
    //         request.open('POST', 'server.php'); //метод post т.к. мы отправляем данные
    //         request.setRequestHeader ('Content-type', 'application/x-www-form-urlencoded');
    
    //         //получаем данные которые ввел пользователь используя объект formData (создает структуру в формате ключ-значение)
    //         let formData = new FormData(elem); //создаем переменную, в которую будем записывать все данные из формы
    //         request.send(formData);  //отправляем запрос на сервер с данными
    
    //         //наблюдаем за изменениями состояния нашего запроса
    //         request.addEventListener('readystatechange', function() {
    //              //если долго грузится, вызываем соответствующее сообщение
    //             if (request.readyState < 4) {   
    //                 statusMessage.innerHTML = message.loading; //в эллемент statusmessage добавляем loading
    //             } else if (request.readyState === 4 && request.status == 200) { //иначе все ок
    //                 statusMessage.innerHTML = message.success;
    //             } else {
    //                 statusMessage.innerHTML = message.failure; //иначе ошибка
    //             }
    //         });
    
    //         //очищаем форму после отправления
    //             for (let i = 0; i < input.length; i++) {
    //                 input[i].value = ''; // у каждого input возьмем value и превратим его в пустую строку
    //             }
    //     });
    // }

    // sendForm(form);
    // sendForm(formBottom);

    

    //Form отправка при помощиAJAX с промисами PROMISE

    //создаем объект с сообщениями
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    }

    //Получаем эллементы со страницы, с которыми мы будем работать (форму, инпуты...)
    let form = document.querySelector('.main-form'), //1я форма
        formBottom = document.getElementById('form'), //2я форма
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'); //эллемент оповещающий пользователя об отправки сообщения
        statusMessage.classList.add('status'); //присвоим созданному диву класс

    //вешаем обработчик событий на форму с событием submit т.е. отправление 
    function sendForm(elem) { //создаем доп функцию чтобы обьединить обе формы со страницы в одном эллементе elem
        elem.addEventListener('submit', function(event) {
            event.preventDefault();
            //оповещаем пользователя об отправке
            elem.appendChild(statusMessage);
            
            let formData = new FormData(elem); //создаем переменную, в которую будем записывать все данные из формы

            function postData(data) { // функция которая возвращает новое обещание new promise
                return new Promise(function(resolve, reject) {
                    //создаем запрос, чтобы отправить данные на сервер при помощи AJAX
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php'); //метод post т.к. мы отправляем данные
                    request.setRequestHeader ('Content-type', 'application/x-www-form-urlencoded');
            
                    //получаем данные которые ввел пользователь используя объект formData (создает структуру в формате ключ-значение)
                    
                    request.send(data);  //отправляем запрос на сервер с данными
            
                    //наблюдаем за изменениями состояния нашего запроса
                    request.addEventListener('readystatechange', function() {
                        //если долго грузится, вызываем соответствующее сообщение
                        if (request.readyState < 4) {   
                            resolve() // если все хорошо (идет загрузка) то resolve
                        } else if (request.readyState === 4 && request.status == 200) { //иначе все ок
                            resolve() //если все хорошо (все загрузилось) то resolve
                        } else {
                            reject() //иначе (ошибка) reject 
                        }
                    });
                })
            }
    
            //очищаем форму после отправления
                function clearInput() {
                    for (let i = 0; i < input.length; i++) {
                        input[i].value = ''; // у каждого input возьмем value и превратим его в пустую строку
                    }
                }
                postData(formData)
                    .then(()=> statusMessage.innerHTML = message.loading)
                    .then(()=> statusMessage.innerHTML = message.success)
                    .catch(()=> statusMessage.innerHTML = message.failure)
                    .then(clearInput)
        });
    }

    sendForm(form);
    sendForm(formBottom);
   

    //slider 

    let slideIndex = 1, //переменная котоая отвечает за показ первого слайда в начале загрузки страницы (параметр текущего слайда)
        slides = document.querySelectorAll('.slider-item'), // получаем все слайды на странице
        prev = document.querySelector('.prev'), 
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'), //обертка точек для использования делегирования событий
        dots = document.querySelectorAll('.dot') // все точки со страницы

    //функция проверяет слайды, скрывает все слайды кроме определенного а также убирает классы активности с точек кроме определенного
    function showSlides(n) {
        //проверка если n > количества слайдов, то возвращаемся к 1, если меньше, то к последнему.
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        //перебераем все слайды, скрываем и показываем только нжный
        slides.forEach((item) => item.style.display = 'none'); //современный метод
        //старый метод
        // for (let i = 0; i < slides.length; i++) {
        //     slides[i].style.display = 'none';
        // }
        dots.forEach((item) => item.classList.remove('dot-active'));
        //показываем конкретный слайд и активность точки при загрузке страницы
        slides[slideIndex - 1].style.display = 'block'; //конвертируем обычную нумерацию в js (1 в 0)
        dots[slideIndex - 1].classList.add('dot-active');
    }
    showSlides(slideIndex);

    //функция увеличивает параметр slideIndex и вызывает showSlides с измененным параметром
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    //функция принимает текущий параметр (при клике на конкретную точку будет показываться конкретный слайд )
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1)
    });
    next.addEventListener('click', function() {
        plusSlides(1);
    });

    //делегирование при клике на точки и  цикл не привязан к стилям, взаимодействует только с эллементами
    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i]) {
                currentSlide(i+1);
            }
        }
    });

    //calc
    let persons = document.querySelectorAll('.counter-block-input')[0], //инпут с количеством людей
        restDays = document.querySelectorAll('.counter-block-input')[1], //инпут с количеством дней
        place = document.getElementById('select'), //выбор места
        totalValue = document.getElementById('total'), //общая сумма  
        personsSum = 0, //переменная необходимая для расчета людей по умолчанию 0
        daysSum = 0, //переменная необходимая для расчета дней по умолчанию 0
        total = 0; //переменная необходимая для расчета общей суммы по умолчанию 0

        totalValue.innerHTML = 0; //ставим в общую сумму по умолчанию 0

        //вводим количество людей в инпут persons и производим расчет
        persons.addEventListener('change', function() {
            personsSum = +this.value; //записываем в personsSum значение которое пользователь ввел в инпут persons(знак + говорит что это число)
            total = (daysSum + personsSum)*4000;

            if(restDays.value == '' || restDays.value == 0 || persons.value == '' || persons.value == 0) {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        restDays.addEventListener('change', function() {
            daysSum = +this.value; //записываем в dayssSum значение которое пользователь ввел в инпут restDays(знак + говорит что это число)
            total = (daysSum + personsSum)*4000;

            if(persons.value == '' || persons.value == 0 || restDays.value == '' || restDays.value == 0) {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change', function() {
            if (restDays.value == '' || persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                let a = total //чтобы избежать баг с селектом (каждый раз при переключении селекта будет умножаться на кэф селекта)
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        });

});