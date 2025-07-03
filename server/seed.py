# server/seed.py

from app import app
from models import db, User, Recipe

with app.app_context():
    # Clear existing data (optional, for clean seeding)
    db.drop_all()
    db.create_all()

    #  Step 1: Create and commit a user
    user = User(
        username="chef_nyokabi",
        image_url="https://i.imgur.com/chef.png",
        bio="I love cooking delicious meals!"
    )
    user.password_hash = "strongpassword123"

    db.session.add(user)
    db.session.commit()  #  Commit so the user gets an ID

    #  Step 2: Create a recipe with user_id or user relationship
    recipe = Recipe(
        title="Spaghetti Carbonara",
        instructions=(
            "Boil spaghetti until al dente. In a separate bowl, whisk eggs and cheese. "
            "Fry pancetta until crispy. Mix everything together off heat to avoid scrambling eggs. "
            "Serve hot and enjoy!"
        ),
        minutes_to_complete=30,
        user_id=user.id  # or: user=user
    )

    db.session.add(recipe)
    db.session.commit()

    print(" Seeded user and recipe successfully!")
