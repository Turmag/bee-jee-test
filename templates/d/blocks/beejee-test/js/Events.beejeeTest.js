$(document).ready(function(){
    // Установка событий на всю структуру
	setBeeJeeEventActions();
});

function setBeeJeeEventActions(){
    // Фокус на поля
    $(".js-beejee-test-grid-el-txt-fill input").focus(function(){
        $(this).closest(".js-beejee-test-grid-el-txt-fill").removeClass("beejee-test-grid-el-txt--error");
        $(this).closest(".js-beejee-test-grid-el-txt-fill").removeClass("beejee-test-grid-el-txt--error-popup");
    });

    // Создать задачу
    $(".js-beejee-test-btn").click(function(){
        if(!$(this).hasClass("beejee-test-btn--disabled")){
            $(this).addClass("beejee-test-btn-create--disabled");

            let createTaskPromise = new Promise(function(resolve, reject){
                // Показываем прелоадер
                $(".js-beejee-test-preloaders-wrapper").addClass("beejee-test-preloaders-wrapper--active");
    
                // Проверяем поля
                let isCheckedFields = beejeeTestObjModel.checkFields();
    
                if(isCheckedFields == 1){
                    resolve();
                }
                else {
                    reject("Не все поля заполнены");
                }
            }).then(function(){
                // Берём поля и передаём их на сервер
                return new Promise(function(resolve, reject){
                    let sendData = {};
                    sendData["user"] = $(".js-beejee-test-grid-el-txt-fill[data-type=user]").find("input").val();
                    sendData["email"] = $(".js-beejee-test-grid-el-txt-fill[data-type=email]").find("input").val();
                    sendData["text"] = $(".js-beejee-test-grid-el-txt-fill[data-type=text]").find("input").val();
        
                    $.ajax({
                        type: "POST",
                        url: "/beejee-test/api/createTask.php",
                        data: sendData,
                        success: function(result) {
                            if(result == "success"){
                                beejeeTestObjModel.showPopup("Задача успешно создана");
    
                                // Делаем поля пустыми
                                $(".js-beejee-test-grid-el-txt-fill").find("input").val("");
    
                                resolve();
                            }
                            else {
                                reject("Ошибка с созданием задачи");
                            }
                        },
                        error: function(xhr){
                            reject("Ошибка с созданием задачи " + xhr.status);
                        }
                    });
                });
            }).catch(function(e){
                console.error("Ошибка:", e);
                beejeeTestObjModel.showPopup(e);
            }).finally(function(){
                // Скрываем прелоадер
                $(".js-beejee-test-preloaders-wrapper").removeClass("beejee-test-preloaders-wrapper--active");

                // Делаем кнопку активной
                $(".js-beejee-test-btn").removeClass("beejee-test-btn-create--disabled");
            });  
        }
    });

    // Установка событий на попап
    beejeeTestObjModel.setPopupEvents();

    // Установка событий на таблицу, если пользователь авторизован
    beejeeTestObjModel.setAdminActionsGridEvents();

    // Установка событий на форму авторизации
    beejeeTestObjModel.setAuthorizeFormEvents();
}

/**
 * Проверка полей
 */
beejeeTestObj.prototype.checkFields = function(){
    let requiredFields = $(".js-beejee-test-grid-el-txt-fill input"),
        errorFields = [],
        isPopupShown = 0,
        isCheckedEmail = 0,
        isCheckedFields = 1;

    // Пустые поля помечаем ошибочными
    requiredFields.each(function(){
        let isEmailError = 0;
        if($(this).closest(".js-beejee-test-grid-el-txt-fill").attr("data-type") == "email"){
            isCheckedEmail = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9-.]*\.[a-zA-Z0-9-]{2,32}$/.test($(this).val());
            if(isCheckedEmail == 0){
                isEmailError = 1;
            }
        }

        if($(this).val() == "" || isEmailError == 1){
            errorFields.push($(this));
        }
    });

    // Показываем ошибку, если у нас поле с ошибкой
    let errorFieldsLen = errorFields.length;

    for(let i = 0; i < errorFieldsLen; i++){
        if(isPopupShown == 0){
            isPopupShown = 1;

            if(errorFields[i].val() == ""){
                // Ставим в полях ошибки начальное значения текста ошибки
                errorFields[i].closest(".js-beejee-test-grid-el-txt-fill").find(".js-beejee-test-grid-el-error-popup-text").html("Поле не заполнено!");
            }
            else if(errorFields[i].closest(".js-beejee-test-grid-el-txt-fill").attr("data-type") == "email") {
                // Даём понять, что поле email заполнено неверно
                errorFields[i].closest(".js-beejee-test-grid-el-txt-fill").find(".js-beejee-test-grid-el-error-popup-text").html("Неправильно указан email!");
            }
            errorFields[i].closest(".js-beejee-test-grid-el-txt-fill").addClass("beejee-test-grid-el-txt--error-popup");
        }

        errorFields[i].closest(".js-beejee-test-grid-el-txt-fill").addClass("beejee-test-grid-el-txt--error");
    }

    if(errorFieldsLen > 0 || isCheckedEmail == 0){
        isCheckedFields = 0;
    }

    return isCheckedFields;
}

/**
 * Установка событий на модалку
 */
beejeeTestObj.prototype.setPopupEvents = function(){
    // Нажатие на задний фон, крестик и ссылку закрывает попап
    $(".js-beejee-test-popup__overlay, .js-beejee-test-popup__close, .js-beejee-test-popup__close-link").click(function(){
        beejeeTestObjModel.closePopup();
    });
}

/**
 * Показ попапа
 * @param {*} text 
 */
beejeeTestObj.prototype.showPopup = function(text){
    if(beejeeTestObjModel.isExistValue(text)){
        $(".js-beejee-test-popup__text").html(text);
    }

    $(".beejee-test-popup-wrapper").fadeIn();
}

/**
 * Закрытие попапа
 */
beejeeTestObj.prototype.closePopup = function(){
    $(".beejee-test-popup-wrapper").fadeOut();
}

/**
 * Установка событий на форму авторизации
 */
beejeeTestObj.prototype.setAuthorizeFormEvents = function(){
    // Отправка формы
    $(".js--beejee-test-authorization-form").submit(function(e){
        if(beejeeTestObjModel.isExistValue($(".js-beejee-test-authorization input[name=login]").val()) && 
        beejeeTestObjModel.isExistValue($(".js-beejee-test-authorization input[name=password]").val())){
            // Сбрасываем начальное событие
            e.preventDefault();

            // Затем делаем ajax-запрос на авторизацию
            let sendData = {};
            sendData["login"] = $(".js-beejee-test-authorization input[name=login]").val();
            sendData["password"] = $(".js-beejee-test-authorization input[name=password]").val();

            $.ajax({
                type: "POST",
                url: "/beejee-test/api/authorize.php",
                data: sendData,
                success: function(result) {
                    if(result == "success"){
                        beejeeTestObjModel.showSuccessLog("Авторизация успешна!");

                        // Перебрасываем на главную страницу
                        setTimeout(function(){
                            location.href = "/beejee-test/";
                        }, 1000);                       
                    }
                    else {
                        beejeeTestObjModel.showErrorLog("Ошибка с авторизацией");
                    }
                },
                error: function(xhr){
                    beejeeTestObjModel.showErrorLog("Ошибка с авторизацией");
                }
            });
        }
    });
}

/**
 * События на таблицу, если пользователь авторизован
 */
beejeeTestObj.prototype.setAdminActionsGridEvents = function(){
    // Изменить статус
    $(".js-beejee-test-grid-el-check").click(function(){
        if(!$(this).hasClass("beejee-test-grid-el-check--checked")){
            // Ставим галочку
            $(this).addClass("beejee-test-grid-el-check--checked");

            // Убираем класс красного текста
            $(this).closest(".js-beejee-test-grid-el").removeClass("beejee-test-grid-el--red");

            // Ставим класс зелёного текста
            $(this).closest(".js-beejee-test-grid-el").addClass("beejee-test-grid-el--green");

            // Пишем "Выполнена"
            $(this).closest(".js-beejee-test-grid-el").find(".js-beejee-test-grid-el-txt").html("Выполнена");
        }
        else {
            // Убираем галочку
            $(this).removeClass("beejee-test-grid-el-check--checked");

            // Убираем класс зелёного текста
            $(this).closest(".js-beejee-test-grid-el").removeClass("beejee-test-grid-el--green");

            // Ставим класс красного текста
            $(this).closest(".js-beejee-test-grid-el").addClass("beejee-test-grid-el--red");

            // Пишем "Выполнена"
            $(this).closest(".js-beejee-test-grid-el").find(".js-beejee-test-grid-el-txt").html("Не выполнена");
        }
    });

    // Кнопка "Сохранить"
    $(".js-beejee-test-grid-el-button").click(function(){
        let id = $(this).attr("data-id"), sendData = {};
        sendData["text"] = $(".js-beejee-test-grid-el-txt-textarea[data-id=" + id + "]").val();
        sendData["status"] = $(".js-beejee-test-grid-el-check[data-id=" + id + "]").hasClass("beejee-test-grid-el-check--checked") ? 1 : 0;
        sendData["id"] = id;

        let changeTaskPromise = new Promise(function(resolve, reject){
            // Показываем прелоадер
            $(".js-beejee-test-preloaders-wrapper").addClass("beejee-test-preloaders-wrapper--active");

            // Отправляем запрос на изменение задачи
            $.ajax({
                type: "POST",
                url: "/beejee-test/api/changeTask.php",
                data: sendData,
                success: function(result) {
                    if(result == "success"){
                        beejeeTestObjModel.showPopup("Задача успешно сохранена!");
                        resolve();
                    }
                    else {
                        reject("Ошибка с сохранением задачи");
                    }
                },
                error: function(xhr){
                    reject("Ошибка с сохранением задачи " + xhr.status);
                }
            });
        }).catch(function(e){
            console.error("Ошибка:", e);
            beejeeTestObjModel.showPopup(e);
        }).finally(function(){
            // Скрываем прелоадер
            $(".js-beejee-test-preloaders-wrapper").removeClass("beejee-test-preloaders-wrapper--active");
        });  

        
        console.log("sendData", sendData);
    });
}

/**
 * Показ лога ошибки
 * @param {*} str 
 */
beejeeTestObj.prototype.showErrorLog = function(str){
    clearTimeout(beejeeTestObjModel.errorLogTimeout);
	$(".js-beejee-test-authorization-form-error-log").find("span").html(str);

    // Убираем успешный класс
    $(".js-beejee-test-authorization-form-error-log").removeClass("beejee-test-authorization-form-error-log--success");

	$(".js-beejee-test-authorization-form-error-log").find("span").fadeIn("slow", function(){
		beejeeTestObjModel.errorLogTimeout = setTimeout(function(){
			$(".js-beejee-test-authorization-form-error-log").find("span").fadeOut("slow");
		}, 2000);
	});
}

/**
 * Показ лога успеха
 * @param {*} str 
 */
 beejeeTestObj.prototype.showSuccessLog = function(str){
    clearTimeout(beejeeTestObjModel.errorLogTimeout);
	$(".js-beejee-test-authorization-form-error-log").find("span").html(str);

    // Ставим успешный класс
    $(".js-beejee-test-authorization-form-error-log").addClass("beejee-test-authorization-form-error-log--success");
    
	$(".js-beejee-test-authorization-form-error-log").find("span").fadeIn("slow", function(){
		beejeeTestObjModel.errorLogTimeout = setTimeout(function(){
			$(".js-beejee-test-authorization-form-error-log").find("span").fadeOut("slow");
		}, 2000);
	});
}

/**
 * Проверка на существование значения
 * @param {*} value 
 */
beejeeTestObj.prototype.isExistValue = function(value){
    return !!value;
}