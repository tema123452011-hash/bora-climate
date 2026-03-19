"""
Скрипт для создания таблиц в базе данных
===========================================
Запусти: py init_db.py
"""

from app import app, db
from app.models import Order, Service, GalleryPhoto


def create_tables():
    """Создаёт все таблицы в базе данных"""
    
    print("Sozdanie tablic...")
    
    # Создаём все таблицы
    db.create_all()
    
    print("Tablicy sozdany!")
    
    # Проверяем, какие таблицы созданы
    print("\nSozdannye tablicy:")
    print("  - orders (Zayavki)")
    print("  - services (Uslugi)")
    print("  - gallery_photos (Foto galerei)")
    
    # Добавляем начальные данные (если нужно)
    add_initial_data()
    
    print("\nBaza dannyh gotova!")


def add_initial_data():
    """Добавляет начальные данные"""
    
    # Проверяем, есть ли уже услуги
    if Service.query.first() is None:
        print("\nDobavlenie nachalnyh dannyh...")
        
        services = [
            Service(
                title="Кондиционирование",
                description="Профессиональный монтаж и ремонт систем кондиционирования",
                price="от 17 500 руб.",
                is_active=True
            ),
            Service(
                title="Сервис",
                description="Сервисное обслуживание кондиционеров и вентиляции",
                price="от 6 000 руб.",
                is_active=True
            ),
            Service(
                title="Вентиляция",
                description="Проектирование и монтаж вентиляции",
                price="от 30 000 руб.",
                is_active=True
            )
        ]
        
        db.session.bulk_save_objects(services)
        db.session.commit()
        print("  Dobavleny nachalnye uslugi")
    else:
        print("\n  Uslugi uzhe sushestvuyut, propusk...")


if __name__ == '__main__':
    with app.app_context():
        create_tables()
