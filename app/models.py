"""
Модели базы данных
===========================================
Здесь описывается структура таблиц в базе данных.
Каждый класс — это таблица, атрибуты — это колонки.
"""

from datetime import datetime
from app import db


class Order(db.Model):
    """
    Модель заявки с формы обратной связи
    -------------------------------------
    Хранит данные, которые пользователь отправляет через форму на сайте.
    
    Поля:
    - name: Имя клиента
    - phone: Телефон клиента  
    - email: Email клиента
    - message: Сообщение клиента
    - created_at: Дата и время создания заявки
    - status: Статус заявки (new/processed/closed)
    """
    
    # Название таблицы в базе данных
    __tablename__ = 'orders'
    
    # === Колонки таблицы ===
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    """ID заявки (автоматически генерируется)"""
    
    name = db.Column(db.String(100), nullable=False)
    """Имя клиента (обязательное поле)"""
    
    phone = db.Column(db.String(20), nullable=False)
    """Телефон клиента (обязательное поле)"""
    
    email = db.Column(db.String(100))
    """Email клиента (необязательное поле)"""
    
    message = db.Column(db.Text)
    """Текст сообщения клиента"""
    
    created_at = db.Column(db.DateTime, default=datetime.now)
    """Дата и время создания заявки (автоматически)"""
    
    status = db.Column(db.String(20), default='new')
    """Статус заявки: new (новая), processed (в работе), closed (закрыта)"""
    
    def __repr__(self):
        """Как будет выглядеть объект при выводе"""
        return f'<Заявка #{self.id}: {self.name}>'


class Service(db.Model):
    """
    Модель услуги
    -------------------------------------
    Услуги: Кондиционирование, Сервис, Вентиляция.
    Можно редактировать через админ-панель.
    
    Поля:
    - title: Название услуги
    - description: Краткое описание
    - price: Цена (строка, чтобы можно было написать "от 17000 руб.")
    - content: Полный текст с деталями
    - is_active: Показывать ли услугу на сайте
    """
    
    __tablename__ = 'services'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    """Название услуги (обязательно)"""
    
    description = db.Column(db.Text)
    """Краткое описание услуги"""
    
    price = db.Column(db.String(50))
    """Цена (строка, например "от 17 500 руб.")"""
    
    content = db.Column(db.Text)
    """Полный текст с деталями услуги"""
    
    is_active = db.Column(db.Boolean, default=True)
    """Показывать услугу на сайте? (по умолчанию да)"""
    
    def __repr__(self):
        return f'<Услуга: {self.title}>'


class GalleryPhoto(db.Model):
    """
    Модель фотографии в галерее
    -------------------------------------
    Хранит информацию о фотографиях работ.
    
    Поля:
    - filename: Имя файла изображения
    - category: Категория (private - частные лица, corporate - юрлица)
    - is_active: Показывать фото в галерее?
    """
    
    __tablename__ = 'gallery_photos'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    filename = db.Column(db.String(200), nullable=False)
    """Имя файла изображения (например: 'photo1.jpg')"""
    
    category = db.Column(db.String(20), default='private')
    """Категория: 'private' (частные лица) или 'corporate' (юридические лица)"""
    
    is_active = db.Column(db.Boolean, default=True)
    """Показывать фото в галерее?"""
    
    def __repr__(self):
        return f'<Фото: {self.filename}>'
