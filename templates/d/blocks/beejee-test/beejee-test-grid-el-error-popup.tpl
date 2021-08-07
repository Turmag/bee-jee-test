{% if errorText is defined and errorText is not empty %}
{% else %}
    {% set errorText = "Поле не заполнено!" %}
{% endif %}

<div class="beejee-test-grid-el-error-popup-wrapper">
    <div class="beejee-test-grid-el-error-popup">
        <div class="beejee-test-grid-el-error-popup-icon"></div>
        <div class="beejee-test-grid-el-error-popup-text js-beejee-test-grid-el-error-popup-text">{{ errorText }}</div>    
    </div>
</div>