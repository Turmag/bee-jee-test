<div class="beejee-test js-beejee-test">
    {% if isAuthorized == 1 %}
        <a href="/beejee-test/unauthorize" class="beejee-test-icon beejee-test-icon--exit beejee-test-icon--right-top js-beejee-test-icon-enter" title="Выйти"></a>
    {% else %}
        <a href="/beejee-test/authorize" class="beejee-test-icon beejee-test-icon--right-top js-beejee-test-icon-enter" title="Авторизоваться"></a>
    {% endif %}
    <div class="beejee-test-header">Оставь задачу!</div>

    {% set defaultLink = "/beejee-test/" %}
    {% set isPageParamExist = 0 %}
    {% for key, value in urlParams %}
        {% if key == "page" %}
            {% set isPageParamExist = 1 %}
            {% set defaultLink = defaultLink ~ "?" ~ key ~ "=" ~ value %}
        {% endif %}
    {% endfor %}

    {% if isPageParamExist == 1 %}
        {% set defaultLink = defaultLink ~ "&" %}
    {% else %}
        {% set defaultLink = defaultLink ~ "?" %}
    {% endif %}
    {% set defaultLink = defaultLink ~ "sortparam=" %}

    {% set userLink = defaultLink %}
    {% set userLink = userLink ~ "user" %}

    {% set emailLink = defaultLink %}
    {% set emailLink = emailLink ~ "email" %}

    {% set statusLink = defaultLink %}
    {% set statusLink = statusLink ~ "status" %}

    {% set isSortDirectionParamExist = 0 %}
    {% if sortDirection == "ASC" %}
        {% set userLink = userLink ~ "&sortdirection=desc" %}
        {% set emailLink = emailLink ~ "&sortdirection=desc" %}
        {% set statusLink = statusLink ~ "&sortdirection=desc" %}
    {% else %}
        {% set userLink = userLink ~ "&sortdirection=asc" %}
        {% set emailLink = emailLink ~ "&sortdirection=asc" %}
        {% set statusLink = statusLink ~ "&sortdirection=asc" %}
    {% endif %}

    <div class="beejee-test-grid-wrapper-box">
        <div class="beejee-test-grid-wrapper">
            {% if isAuthorized == 1 %}
                {% include "d/blocks/beejee-test/beejee-test-grid-authorized.tpl" %}
            {% else %}
                {% include "d/blocks/beejee-test/beejee-test-grid.tpl" %}
            {% endif %}    

            {% include "d/blocks/beejee-test/beejee-test-pagination.tpl" %}

            {% include "d/blocks/beejee-test/beejee-test-preloader.tpl" %}
        </div>

        <div class="beejee-test-btn-create js-beejee-test-btn">
            <div class="beejee-test-btn-create-txt">
                <div class="beejee-test-btn-create-txt-nowrap">Создать задачу</div>
            </div>
        </div>
    </div>

    {% include "d/blocks/beejee-test/beejee-test-popup.tpl" %}
</div>