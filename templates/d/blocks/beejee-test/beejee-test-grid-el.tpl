<div class="beejee-test-grid-el beejee-test-grid-el--br beejee-test-grid-el--center">
    <div class="beejee-test-grid-el-txt">{{ task.user }}</div>
</div>
<div class="beejee-test-grid-el beejee-test-grid-el--br beejee-test-grid-el--center">
    <div class="beejee-test-grid-el-txt">{{ task.email }}</div>
</div>
<div class="beejee-test-grid-el beejee-test-grid-el--br">
    <div class="beejee-test-grid-el-txt">{{ task.text }}</div>
</div>
<div class="beejee-test-grid-el beejee-test-grid-el--center
    {% if task.status == 1 %}
        beejee-test-grid-el--green
    {% else %}
        beejee-test-grid-el--red
    {% endif %}
">
    <div class="beejee-test-grid-el-txt">
        {% if task.status == 1 %}
            Выполнена
        {% else %}
            Не выполнена
        {% endif %}
    </div>
</div>