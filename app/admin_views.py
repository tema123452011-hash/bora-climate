"""
Настройка админ-панели
===========================================
Здесь подключаются модели к админке.
Flask-Admin автоматически создаёт интерфейс для управления данными.
"""

from flask_admin import AdminIndexView, Admin, expose
from flask_admin.contrib.sqla import ModelView
from app import db


class MyAdminIndexView(AdminIndexView):
    """
    Кастомная главная страница админки
    =======================================
    Можно добавить свою статистику или приветствие.
    """
    
    # Используем кастомный базовый шаблон с русским языком
    base_template = 'admin/base.html'
    
    @expose('/')
    def index(self):
        """
        Главная страница админ-панели
        """
        return self.render('admin/dashboard.html')


class OrderAdminView(ModelView):
    """
    Админ-панель для заявок
    =======================================
    Настраиваем отображение и редактирование заявок.
    """
    
    # Используем кастомный базовый шаблон с русским языком
    base_template = 'admin/base.html'
    
    # Отображаемые колонки в списке
    column_list = ['id', 'name', 'phone', 'email', 'created_at', 'status']
    
    # Названия колонок на русском
    column_labels = {
        'id': 'ID',
        'name': 'Имя',
        'phone': 'Телефон',
        'email': 'Email',
        'message': 'Сообщение',
        'created_at': 'Дата создания',
        'status': 'Статус'
    }
    
    # Поля только для чтения (нельзя изменить)
    column_readonly_fields = ['created_at']
    
    # Поля, которые не показывать при создании/редактировании
    form_excluded_columns = ['created_at']
    
    # По умолчанию сортировать по дате (новые сверху)
    column_default_sort = ('created_at', True)
    
    # Поиск по этим полям
    column_searchable_list = ['name', 'phone', 'email']
    
    # Фильтры в боковой панели
    column_filters = ['status', 'created_at']


class ServiceAdminView(ModelView):
    """
    Админ-панель для услуг
    =======================================
    """
    
    # Используем кастомный базовый шаблон с русским языком
    base_template = 'admin/base.html'
    
    column_list = ['id', 'title', 'price', 'is_active']
    
    column_labels = {
        'id': 'ID',
        'title': 'Название',
        'description': 'Описание',
        'price': 'Цена',
        'content': 'Детали',
        'is_active': 'Показывать на сайте'
    }
    
    column_searchable_list = ['title']


class GalleryPhotoAdminView(ModelView):
    """
    Админ-панель для фотогалереи
    =======================================
    """
    
    # Используем кастомный базовый шаблон с русским языком
    base_template = 'admin/base.html'
    
    column_list = ['id', 'filename', 'category', 'is_active']
    
    column_labels = {
        'id': 'ID',
        'filename': 'Имя файла',
        'category': 'Категория',
        'is_active': 'Показывать'
    }
    
    # Выпадающий список для категории
    form_choices = {
        'category': [
            ('private', 'Частные лица'),
            ('corporate', 'Юридические лица')
        ]
    }
    
    column_filters = ['category', 'is_active']


def init_admin(admin_instance: Admin):
    """
    Инициализация админ-панели
    ==============================
    Добавляем все модели в админку с настройками.
    
    Args:
        admin_instance: Объект Flask-Admin
    """
    
    # Импортируем модели (избегаем циклического импорта)
    from app.models import Order, Service, GalleryPhoto
    
    # Добавляем модели в админ-панель
    # ModelView — стандартный вид для редактирования
    # category='Контент' — группировка в меню
    
    admin_instance.add_view(
        OrderAdminView(
            Order, 
            db.session, 
            name='Заявки', 
            category='Контент'
        )
    )
    
    admin_instance.add_view(
        ServiceAdminView(
            Service, 
            db.session, 
            name='Услуги', 
            category='Контент'
        )
    )
    
    admin_instance.add_view(
        GalleryPhotoAdminView(
            GalleryPhoto, 
            db.session, 
            name='Галерея', 
            category='Контент'
        )
    )
