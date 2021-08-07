<div class="beejee-test-grid-el beejee-test-grid-el--br beejee-test-grid-el--center">
    <div class="beejee-test-grid-el-txt">{{ task.user }}</div>
</div>
<div class="beejee-test-grid-el beejee-test-grid-el--br beejee-test-grid-el--center">
    <div class="beejee-test-grid-el-txt">{{ task.email }}</div>
</div>
<div class="beejee-test-grid-el beejee-test-grid-el--br">
    <div class="beejee-test-grid-el-txt">
        <textarea class="beejee-test-grid-el-txt-textarea js-beejee-test-grid-el-txt-textarea" data-id="{{ task.id }}">{{ task.text }}</textarea>
    </div>
</div>
<div class="beejee-test-grid-el beejee-test-grid-el--center beejee-test-grid-el--br js-beejee-test-grid-el
    {% if task.status == 1 %}
        beejee-test-grid-el--green
    {% else %}
        beejee-test-grid-el--red
    {% endif %}
">
    <div class="beejee-test-grid-el-txt js-beejee-test-grid-el-txt">
        {% if task.status == 1 %}
            Выполнена
        {% else %}
            Не выполнена
        {% endif %}
    </div>
    <div class="beejee-test-grid-el-check js-beejee-test-grid-el-check
        {% if task.status == 1 %}
            beejee-test-grid-el-check--checked
        {% endif %}
    "
        data-id="{{ task.id }}"
    >
        <img src="/templates/d/blocks/beejee-test/img/check.svg">
    </div>
</div>
<div class="beejee-test-grid-el beejee-test-grid-el--center">
    <button class="beejee-test-grid-el-txt beejee-test-grid-el-txt--button js-beejee-test-grid-el-button" data-id="{{ task.id }}">Сохранить</button>
</div>