// Simple mobile menu toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const headerContacts = document.querySelector('.header-contacts');

menuBtn.addEventListener('click', () => {
    if (headerContacts.style.display === 'flex') {
        headerContacts.style.display = 'none';
    } else {
        headerContacts.style.display = 'flex';
        headerContacts.style.flexDirection = 'column';
        headerContacts.style.position = 'absolute';
        headerContacts.style.top = '70px';
        headerContacts.style.left = '0';
        headerContacts.style.right = '0';
        headerContacts.style.background = '#fff';
        headerContacts.style.padding = '20px';
        headerContacts.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
    }
});

        // Service Tabs
        const serviceTabs = document.querySelectorAll('.service-tab');
        const serviceBlocks = document.querySelectorAll('.service-block');
        
        // Скрываем все блоки при загрузке
        serviceBlocks.forEach(block => block.style.display = 'none');
        
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-target');
                const targetBlock = document.getElementById(targetId);
                const isActive = tab.classList.contains('active');
                
                // Если блок уже активен - скрываем его
                if (isActive) {
                    tab.classList.remove('active');
                    targetBlock.style.display = 'none';
                } else {
                    // Убираем активный класс у всех табов
                    serviceTabs.forEach(t => t.classList.remove('active'));
                    // Скрываем все блоки
                    serviceBlocks.forEach(block => block.style.display = 'none');
                    
                    // Добавляем активный класс текущему табу
                    tab.classList.add('active');
                    // Показываем нужный блок
                    targetBlock.style.display = 'block';
                    
                    // Плавная прокрутка к блоку
                    targetBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Work Tabs (Частные/Юр лица)
        const workTabs = document.querySelectorAll('.work-tab');
        const workContents = document.querySelectorAll('.work-content');
        
        // Скрываем все блоки галереи при загрузке
        workContents.forEach(content => content.style.display = 'none');
        
        workTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);
                const isActive = tab.classList.contains('active');
                
                // Если блок уже активен - скрываем его
                if (isActive) {
                    tab.classList.remove('active');
                    targetContent.style.display = 'none';
                } else {
                    workTabs.forEach(t => t.classList.remove('active'));
                    workContents.forEach(content => content.style.display = 'none');
                    
                    tab.classList.add('active');
                    targetContent.style.display = 'block';
                }
            });
        });

// Функция генерации галереи
function loadGallery() {
    const privateGallery = document.getElementById('private-gallery');
    const corporateGallery = document.getElementById('corporate-gallery');
    
    // Загрузка галереи частных лиц
    if (privateGallery && chasnikiPhotos) {
        privateGallery.innerHTML = chasnikiPhotos.map(photo => `
            <div class="gallery-item">
                <img src="photo/chasniki/${photo}" alt="Фото объекта" onerror="this.parentElement.style.display='none'">
            </div>
        `).join('');
    }
    
    // Загрузка галереи юрлиц
    if (corporateGallery && yrikiPhotos) {
        corporateGallery.innerHTML = yrikiPhotos.map(photo => `
            <div class="gallery-item">
                <img src="photo/yriki/${photo}" alt="Фото объекта" onerror="this.parentElement.style.display='none'">
            </div>
        `).join('');
    }
}

// Загружаем галерею при загрузке страницы
document.addEventListener('DOMContentLoaded', loadGallery);

// Кнопка "Наша работа" в блоке About
const ourWorkBtn = document.getElementById('our-work-btn');
if (ourWorkBtn) {
    ourWorkBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Показываем/скрываем блок gallery-section
        const gallerySection = document.getElementById('gallery-section');
        
        // Если блок скрыт - показываем, иначе скрываем
        if (gallerySection.style.display === 'none') {
            gallerySection.style.display = 'block';
            // Прокрутка к блоку
            gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            gallerySection.style.display = 'none';
        }
    });
}

// Функция открытия блока услуг из футера
function openService(serviceId) {
    const targetBlock = document.getElementById(serviceId);
    
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

// Инициализация EmailJS
(function() {
    emailjs.init("lQnwTxuPAi8YXEnxK");
})();

// Модальное окно
const callbackBtn = document.getElementById('callback-btn');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const callbackForm = document.getElementById('callback-form');
const formSuccess = document.getElementById('form-success');

// Открытие модального окна
callbackBtn.addEventListener('click', function(e) {
    e.preventDefault();
    modalOverlay.classList.add('show');
});

// Закрытие модального окна
modalClose.addEventListener('click', function() {
    modalOverlay.classList.remove('show');
});

modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('show');
    }
});

// Отправка формы
callbackForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(callbackForm);
    
    // Проверка honeypot (если заполнено - это робот)
    if (formData.get('website')) {
        return; // Блокируем отправку
    }
    
    const submitBtn = callbackForm.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';
    
    // Отправка через EmailJS
    emailjs.sendForm('service_c1t76on', 'template_2o1v2vy', callbackForm)
        .then(function() {
            callbackForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Закрыть через 3 секунды
            setTimeout(function() {
                modalOverlay.classList.remove('show');
                callbackForm.reset();
                callbackForm.style.display = 'block';
                formSuccess.style.display = 'none';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить';
            }, 3000);
        }, function(error) {
            alert('Ошибка отправки. Попробуйте позже.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить';
        });
});
