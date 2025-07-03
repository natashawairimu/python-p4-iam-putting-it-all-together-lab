from app import app
from models import db, User, Recipe

with app.app_context():
    print("Clearing database...")
    Recipe.query.delete()
    User.query.delete()

    print("Seeding users...")
    user1 = User(
        username="natasha",
        image_url="https://i.pravatar.cc/150?img=8",
        bio="I love cooking tasty meals."
    )
    user1.password_hash = "password123"

    user2 = User(
        username="chefmax",
        image_url="https://i.pravatar.cc/150?img=3",
        bio="Master of spices and flavors."
    )
    user2.password_hash = "secret456"

    db.session.add_all([user1, user2])
    db.session.commit()

    print("Seeding recipes...")
    recipe1 = Recipe(
        title="Spaghetti Carbonara",
        instructions="Boil pasta. Cook bacon. Mix eggs and cheese. Combine all and serve hot.",
        minutes_to_complete=25,
        user_id=user1.id
    )

    recipe2 = Recipe(
        title="Beef Stew",
        instructions="Brown beef. Add onions, garlic, and carrots. Simmer for 2 hours. Season and serve hot.",
        minutes_to_complete=120,
        user_id=user2.id
    )

    recipe3 = Recipe(
        title="Avocado Toast",
        instructions="Toast bread. Mash ripe avocado. Spread on toast. Add salt, pepper, and chili flakes.",
        minutes_to_complete=10,
        user_id=user1.id
    )

    db.session.add_all([recipe1, recipe2, recipe3])
    db.session.commit()

    print(" Done seeding!")
