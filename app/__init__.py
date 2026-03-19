"""
Инициализация Flask-приложения
===========================================
Здесь настраивается подключение к базе данных,
инициализируется админ-панель и подключаются маршруты.
"""

import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_migrate import Migrate
from dotenv import load_dotenv

# Загружаем переменные окружения из файла .env
load_dotenv()

# Получаем путь к корневой папке проекта
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# Создаём приложение Flask
# template_folder='templates' — папка с HTML-шаблонами внутри app/
# static_folder='static' — папка со статикой внутри app/ (styles, script, photo)
app = Flask(__name__, 
            template_folder='templates',
            static_folder='static',
            static_url_path='/static')

# ============================================
# КОНФИГУРАЦИЯ ПРИЛОЖЕНИЯ
# ============================================

# Секретный ключ для шифрования сессий и форм
# В продакшене обязательно замени на сложную строку
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')

# Подключение к базе данных PostgreSQL
# Формат: postgresql://username:password@host:port/database_name
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL', 
    'postgresql://postgres:postgres@localhost:5432/bora_climate'
)

# Отключаем предупреждения об изменениях в SQLAlchemy
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# ============================================
# ИНИЦИАЛИЗАЦИЯ РАСШИРЕНИЙ
# ============================================

# SQLAlchemy — работа с базой данных через ORM
db = SQLAlchemy(app)

# Flask-Migrate — управление миграциями базы данных
migrate = Migrate(app, db)

# Flask-Admin — админ-панель
admin = Admin(app, name='BORA Climate Админка')

# ============================================
# РЕГИСТРАЦИЯ МОДЕЛЕЙ И МАРШРУТОВ
# ============================================

# Импортируем модели и административные представления
# Делаем это после инициализации db, чтобы избежать циклических импортов
from app import models
from app.admin_views import init_admin

# Инициализируем админ-панель (добавляем модели)
init_admin(admin)

# Импортируем и регистрируем маршруты (страницы сайта)
from app import routes
app.register_blueprint(routes.bp)

# ============================================
# ЗАПУСК ПРИЛОЖЕНИЯ
# ============================================

if __name__ == '__main__':
    # Запускаем сервер в режиме отладки (только для разработки)
    # host='0.0.0.0' — чтобы было доступно с других устройств в сети
    app.run(debug=True, host='0.0.0.0', port=5000)
