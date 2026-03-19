/**
 * Русский язык для Flask-Admin
 * Этот скрипт заменяет английские надписи на русские
 */

document.addEventListener('DOMContentLoaded', function() {
    // Объект с переводами
    const translations = {
        'List': 'Список',
        'Create': 'Создать',
        'Add Filter': 'Добавить фильтр',
        'With selected': 'С выбранными',
        'Delete': 'Удалить',
        'Edit': 'Редактировать',
        'View': 'Просмотр',
        'Save': 'Сохранить',
        'Cancel': 'Отмена',
        'Search': 'Поиск',
        'Filter': 'Фильтр',
        'Reset': 'Сброс',
        'Yes': 'Да',
        'No': 'Нет',
        'True': 'Да',
        'False': 'Нет',
        'Actions': 'Действия',
        'Export': 'Экспорт',
        'Export as CSV': 'Экспорт в CSV',
        'Sort by': 'Сортировать по',
        'ascending': 'по возрастанию',
        'descending': 'по убыванию',
        'first': 'первая',
        'last': 'последняя',
        'previous': 'предыдущая',
        'next': 'следующая',
        'No items found': 'Ничего не найдено',
        'Are you sure you want to delete this item?': 'Вы уверены, что хотите удалить этот элемент?',
        'There were errors processing the form': 'При обработке формы возникли ошибки',
        'This field is required': 'Обязательное поле',
        'Invalid email address': 'Неверный адрес электронной почты',
        'Please fix the errors below': 'Пожалуйста, исправьте ошибки ниже',
        'Show': 'Показать',
        'entries': 'записей',
        'Showing': 'Показано',
        'of': 'из',
    };
    
    // Функция замены текста
    function replaceText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim();
            if (translations.hasOwnProperty(text)) {
                node.textContent = translations[text];
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Не обрабатываем скрипты и стили
            if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
                node.childNodes.forEach(replaceText);
                
                // Проверяем значение input
                if (node.tagName === 'INPUT' && node.type === 'submit') {
                    const value = node.value.trim();
                    if (translations.hasOwnProperty(value)) {
                        node.value = translations[value];
                    }
                }
                
                // Проверяем placeholder
                if (node.placeholder && translations.hasOwnProperty(node.placeholder)) {
                    node.placeholder = translations[node.placeholder];
                }
            }
        }
    }
    
    // Запускаем замену
    replaceText(document.body);
    
    // Также следим за изменениями в DOM (для динамически добавляемых элементов)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(replaceText);
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
