"""
Маршруты (routes) — страницы сайта
===========================================
Здесь описываются все страницы и URL-адреса сайта.
"""

from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_admin import expose
from app import db
from app.models import Order

# Создаём Blueprint — это "контейнер" для маршрутов
# 'main' — имя Blueprint, используется для группировки
bp = Blueprint('main', __name__)


@bp.route('/')
def index():
    """
    Главная страница сайта
    =========================
    Просто отображает шаблон index.html
    """
    return render_template('index.html')


@bp.route('/order', methods=['POST'])
def submit_order():
    """
    Обработка формы обратной связи
    ================================
    Принимает данные из формы и сохраняет в базу данных.
    
    Метод: POST (данные отправляются в теле запроса)
    """
    
    # Получаем данные из формы
    name = request.form.get('name')
    phone = request.form.get('phone')
    email = request.form.get('email')
    message = request.form.get('message')
    
    # Проверяем, что обязательные поля заполнены
    if not name or not phone:
        flash('Пожалуйста, заполните имя и телефон', 'error')
        return redirect(url_for('main.index'))
    
    # Создаём объект заявки
    order = Order(
        name=name,
        phone=phone,
        email=email,
        message=message,
        status='new'  # По умолчанию статус "новая"
    )
    
    # Сохраняем в базу данных
    try:
        db.session.add(order)      # Добавляем в сессию
        db.session.commit()        # Фиксируем изменения в базе
        flash('Заявка отправлена! Мы свяжемся с вами.', 'success')
    except Exception as e:
        # Если ошибка — откатываем изменения
        db.session.rollback()
        flash(f'Ошибка при отправке заявки: {str(e)}', 'error')
    
    # Перенаправляем обратно на главную страницу
    return redirect(url_for('main.index'))


@bp.route('/admin/')
def admin_index():
    """
    Перенаправление на админ-панель
    ==================================
    /admin/ — админ-панель Flask-Admin
    """
    return redirect('/admin/')
