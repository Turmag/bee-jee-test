<div class="beejee-test-pagination">
    {% for pagefor in 1..pagesCount %}
        {% if pagefor == page %}
            <span class="beejee-test-page">{{ pagefor }}</span>
        {% else %}
            {% set currentLink = "/beejee-test/?page=" ~ pagefor %}
            {% for key, value in urlParams %}
                {% if key != "page" and key != "" %}
                    {% set currentLink = currentLink ~ "&" ~ key ~ "=" ~ value %}
                {% endif %}
            {% endfor %}
            <a href="{{ currentLink }}" class="beejee-test-page">{{ pagefor }}</a>
        {% endif %}
    {% endfor %}
</div>