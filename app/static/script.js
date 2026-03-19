/* ============================================
   МОБИЛЬНОЕ МЕНЮ
   Управление отображением контактов в шапке на мобильных устройствах
   ============================================ */

// Находим кнопку меню и блок с контактами в шапке
const menuBtn = document.querySelector('.mobile-menu-btn');
const headerContacts = document.querySelector('.header-contacts');

// Добавляем обработчик клика на кнопку меню
menuBtn.addEventListener('click', () => {
    // Если меню уже открыто (display: flex) - скрываем его
    if (headerContacts.style.display === 'flex') {
        headerContacts.style.display = 'none';
    } else {
        // Иначе показываем меню и применяем стили для мобильной версии
        headerContacts.style.display = 'flex';
        headerContacts.style.flexDirection = 'column';           // Контакты друг под другом
        headerContacts.style.position = 'absolute';              // Абсолютное позиционирование
        headerContacts.style.top = '70px';                       // Отступ сверху
        headerContacts.style.left = '0';                         // Прижать к левому краю
        headerContacts.style.right = '0';                        // Прижать к правому краю
        headerContacts.style.background = '#fff';                // Белый фон
        headerContacts.style.padding = '20px';                   // Внутренние отступы
        headerContacts.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)'; // Тень
    }
});

/* ============================================
   ТАБЫ УСЛУГ
   Переключение между Кондиционирование, Сервис, Вентиляция
   ============================================ */

// Находим все кнопки-табы и все блоки с услугами
const serviceTabs = document.querySelectorAll('.service-tab');
const serviceBlocks = document.querySelectorAll('.service-block');

// При загрузке страницы:
// - Если есть активная кнопка - показываем соответствующий блок
// - Иначе ничего не показываем (пользователь выберет сам)
serviceTabs.forEach(tab => {
    if (tab.classList.contains('active')) {
        const targetId = tab.getAttribute('data-target');
        const targetBlock = document.getElementById(targetId);
        if (targetBlock) {
            targetBlock.style.display = 'block';
        }
    }
});
        
// Добавляем обработчик клика на каждую кнопку-таб
serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Получаем ID целевого блока из атрибута data-target
        const targetId = tab.getAttribute('data-target');
        const targetBlock = document.getElementById(targetId);
        
        // Проверяем, активен ли уже этот таб
        const isActive = tab.classList.contains('active');
        
        // Если таб уже активен - закрываем блок (скрываем его)
        if (isActive) {
            tab.classList.remove('active');       // Убираем класс active с кнопки
            targetBlock.style.display = 'none';   // Скрываем блок
        } else {
            // Если таб не активен:
            
            // 1. Убираем класс active у всех кнопок-табов
            serviceTabs.forEach(t => t.classList.remove('active'));
            
            // 2. Скрываем все блоки с услугами
            serviceBlocks.forEach(block => block.style.display = 'none');
            
            // 3. Добавляем класс active текущей кнопке
            tab.classList.add('active');
            
            // 4. Показываем нужный блок
            targetBlock.style.display = 'block';
            
            // 5. Плавно прокручиваем страницу к открытому блоку
            targetBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ============================================
   ТАБЫ ГАЛЕРЕИ (Частные лица / Юр лица)
   Переключение между галереями в разделе "Наша работа"
   ============================================ */

// Находим все кнопки табов галереи и блоки с контентом
const workTabs = document.querySelectorAll('.work-tab');
const workContents = document.querySelectorAll('.work-content');

// При загрузке: показываем контент для активного таба
workTabs.forEach(tab => {
    if (tab.classList.contains('active')) {
        const targetId = tab.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.style.display = 'block';
        }
    }
});
        
// Добавляем обработчик клика на каждый таб галереи
workTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // Получаем ID целевого блока из data-target
        const targetId = this.getAttribute('data-target');
        switchGallery(targetId);
    });
});

/* ============================================
   ЗАГРУЗКА ГАЛЕРЕИ
   Динамическая генерация HTML для фотографий из массивов
   ============================================ */

// Функция загрузки и отображения галереи
// Массивы с названиями файлов находятся в photo/photos.js
function loadGallery() {
    const privateGallery = document.getElementById('private-gallery');
    const corporateGallery = document.getElementById('corporate-gallery');
    
    // Загрузка галереи частных лиц
    if (privateGallery && typeof chasnikiPhotos !== 'undefined' && chasnikiPhotos.length > 0) {
        privateGallery.innerHTML = chasnikiPhotos.map(photo => `
            <div class="gallery-item">
                <img src="static/photo/chasniki/${photo}" alt="Фото объекта" onerror="this.parentElement.style.display='none'">
            </div>
        `).join('');
        console.log('Загружено фото частных лиц:', chasnikiPhotos.length);
    }
    
    // Загрузка галереи юрлиц
    if (corporateGallery && typeof yrikiPhotos !== 'undefined' && yrikiPhotos.length > 0) {
        corporateGallery.innerHTML = yrikiPhotos.map(photo => `
            <div class="gallery-item">
                <img src="static/photo/yriki/${photo}" alt="Фото объекта" onerror="this.parentElement.style.display='none'">
            </div>
        `).join('');
        console.log('Загружено фото юрлиц:', yrikiPhotos.length);
    }
    
    // Если галерея пустая - показываем сообщение для отладки
    if (privateGallery && privateGallery.innerHTML === '') {
        privateGallery.innerHTML = '<p style="color:white; padding:20px;">Галерея загружается...</p>';
    }
}

// Запускаем функцию загрузки галереи после полной загрузки HTML
document.addEventListener('DOMContentLoaded', loadGallery);

/* ============================================
   ПЕРЕКЛЮЧЕНИЕ ГАЛЕРЕИ (Частные/Юр лица)
   Вызывается из HTML при клике на кнопки
   ============================================ */

function switchGallery(targetId) {
    console.log('Переключаю на:', targetId);
    
    const targetContent = document.getElementById(targetId);
    const gallerySection = document.getElementById('gallery-section');
    const targetTab = document.querySelector(`.work-tab[data-target="${targetId}"]`);
    
    // Проверяем, активна ли уже эта кнопка
    const isActive = targetTab && targetTab.classList.contains('active');
    
    if (isActive) {
        // Если кнопка уже активна - скрываем контент и убираем active
        if (targetContent) {
            targetContent.style.display = 'none';
        }
        if (targetTab) {
            targetTab.classList.remove('active');
        }
    } else {
        // Если кнопка не активна - показываем контент
        
        // Показываем секцию галереи
        if (gallerySection) {
            gallerySection.style.display = 'block';
        }
            
        // Скрываем все блоки
        workContents.forEach(content => content.style.display = 'none');
        
        // Убираем active у всех кнопок
        workTabs.forEach(t => t.classList.remove('active'));
        
        // Показываем нужный блок
        if (targetContent) {
            targetContent.style.display = 'block';
        }
        
        // Добавляем active нужной кнопке
        if (targetTab) {
            targetTab.classList.add('active');
        }
    }
}

/* ============================================
   КНОПКА "НАША РАБОТА"
   Показ/скрытие секции галереи при клике
   ============================================ */

// Находим кнопку "Наша работа" в блоке "О компании"
const ourWorkBtn = document.getElementById('our-work-btn');

// Если кнопка существует на странице
if (ourWorkBtn) {
    ourWorkBtn.addEventListener('click', function(e) {
        e.preventDefault();  // Отменяем стандартное поведение ссылки
        
        // Находим блок галереи
        const gallerySection = document.getElementById('gallery-section');
        
        // Получаем реальный стиль элемента
        const galleryStyle = window.getComputedStyle(gallerySection);
        const isHidden = galleryStyle.display === 'none';
        
        // Если галерея скрыта - показываем только секцию (без контента)
        if (isHidden) {
            gallerySection.style.display = 'block';
            
            // Скрываем все блоки контента
            workContents.forEach(content => content.style.display = 'none');
            // Убираем active со всех кнопок
            workTabs.forEach(t => t.classList.remove('active'));
            
            gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Если галерея видима - скрываем её
            gallerySection.style.display = 'none';
        }
    });
}

/* ============================================
   ФУНКЦИЯ ОТКРЫТИЯ УСЛУГИ ИЗ ФУТЕРА
   Используется в подвале сайта для быстрого перехода к услуге
   ============================================ */

// Функция открывает нужный блок услуг по его ID
// Принимает параметр: serviceId - строка с ID услуги ('conditioning', 'service', 'ventilation')
function openService(serviceId) {
    const targetBlock = document.getElementById(serviceId);
    
    if (!targetBlock) return;
    
    // Скрываем все блоки
    serviceBlocks.forEach(block => block.style.display = 'none');
    // Убираем активность у всех табов
    serviceTabs.forEach(t => t.classList.remove('active'));
    
    // Показываем нужный блок
    targetBlock.style.display = 'block';
    
    // Находим и активируем нужный таб
    const targetTab = document.querySelector(`.service-tab[data-target="${serviceId}"]`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Прокрутка к блоку
    targetBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ============================================
   МОДАЛЬНОЕ ОКНО (ФОРМА ОБРАТНОЙ СВЯЗИ)
   Управление открытием, закрытием и отправкой формы
   ============================================ */

// Находим все необходимые элементы на странице
const callbackBtn = document.getElementById('callback-btn');      // Кнопка "Обратная связь"
const modalOverlay = document.getElementById('modal-overlay');    // Затемнённый фон
const modalClose = document.getElementById('modal-close');        // Кнопка закрытия (X)
const callbackForm = document.getElementById('callback-form');    // Форма
const formSuccess = document.getElementById('form-success');      // Сообщение об успехе

// Если элементы есть на странице, добавляем обработчики
if (callbackBtn && modalOverlay) {
    // === Открытие модального окна ===
    callbackBtn.addEventListener('click', function(e) {
        e.preventDefault();  // Отменяем переход по ссылке
        modalOverlay.classList.add('show');  // Добавляем класс для показа
    });

    // === Закрытие модального окна при клике на крестик ===
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modalOverlay.classList.remove('show');
        });
    }

    // === Закрытие модального окна при клике на затемнённый фон ===
    modalOverlay.addEventListener('click', function(e) {
        // Если кликнули именно на фон (а не на форму внутри)
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('show');
        }
    });
}

/* ============================================
   ОТПРАВКА ФОРМЫ
   Обработка данных и отправка через форму (теперь на сервер)
   ============================================ */

if (callbackForm) {
    callbackForm.addEventListener('submit', function(e) {
        // Форма отправляется на сервер, никаких дополнительных действий не нужно
        // Но покажем пользователю сообщение об успехе (эмуляция)
        const submitBtn = callbackForm.querySelector('.submit-btn');
        
        // Блокируем кнопку, чтобы нельзя было отправить дважды
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        
        // Форма отправится на сервер обычным способом
        // Сервер обработает и перенаправит обратно
    });
}
