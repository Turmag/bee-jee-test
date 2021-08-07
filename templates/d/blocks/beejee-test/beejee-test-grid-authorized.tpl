<div class="beejee-test-grid js-beejee-test-grid beejee-test-grid--authorized">
    <a href="{{ userLink }}" class="beejee-test-grid-el beejee-test-grid-el--br beejee-test-grid-el--center beejee-test-grid-el--title beejee-test-grid-el--title-sortable js-beejee-test-grid-el-title
        {% if sortParam == "user" %}
            {% if sortDirection == "ASC" %}
                beejee-test-grid-el--sort-asc
            {% else %}
                beejee-test-grid-el--sort-desc
            {% endif %}
        {% endif %}
    " data-type="user">
        <div class="beejee-test-grid-el-txt">Имя пользователя</div>
        <div class="beejee-test-grid-el-sort-wrapper">
            <div class="beejee-test-grid-el-sort"></div>
        </div>
    </a>
    <a href="{{ emailLink }}" class="beejee-test-grid-el beejee-test-grid-el--br beejee-test-grid-el--center beejee-test-grid-el--title beejee-test-grid-el--title-sortable js-beejee-test-grid-el-title
        {% if sortParam == "email" %}
            {% if sortDirection == "ASC" %}
                beejee-test-grid-el--sort-asc
            {% else %}
                beejee-test-grid-el--sort-desc
            {% endif %}
        {% endif %}
    " data-type="email">
        <div class="beejee-test-grid-el-txt">E-mail</div>
        <div class="beejee-test-grid-el-sort-wrapper">
            <div class="beejee-test-grid-el-sort"></div>
        </div>
    </a>
    <div class="beejee-test-grid-el beejee-test-grid-el--br beejee-test-grid-el--center beejee-test-grid-el--title js-beejee-test-grid-el-title">
        <div class="beejee-test-grid-el-txt">Текст задачи</div>
    </div>
    <a href="{{ statusLink }}" class="beejee-test-grid-el beejee-test-grid-el--br beejee-test-grid-el--center beejee-test-grid-el--title beejee-test-grid-el--title-sortable js-beejee-test-grid-el-title
        {% if sortParam == "status" %}
            {% if sortDirection == "ASC" %}
                beejee-test-grid-el--sort-asc
            {% else %}
                beejee-test-grid-el--sort-desc
            {% endif %}
        {% endif %}
    " data-type="status">
        <div class="beejee-test-grid-el-txt">Статус</div>
        <div class="beejee-test-grid-el-sort-wrapper">
            <div class="beejee-test-grid-el-sort"></div>
        </div>
    </a>
    <div class="beejee-test-grid-el beejee-test-grid-el--center beejee-test-grid-el--title js-beejee-test-grid-el-title">
        <div class="beejee-test-grid-el-txt">Сохранить</div>
    </div>
    {% for task in tasks %}
        {% include "d/blocks/beejee-test/beejee-test-grid-el-authorized.tpl" %}
    {% endfor %}
    {% include "d/blocks/beejee-test/beejee-test-grid-el-fill-authorized.tpl" %}
</div>