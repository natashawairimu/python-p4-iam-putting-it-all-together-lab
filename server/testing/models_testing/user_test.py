# server/testing/models_testing/user_test.py

import pytest

from app import app

from models import db, User, Recipe

class TestUserModel:

    def setup_method(self):
        with app.app_context():
            db.drop_all()
            db.create_all()

    def teardown_method(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_recipe_has_attributes(self):
        with app.app_context():
            #  Step 1: Create a valid user
            user = User(
                username="testuser",
                image_url="https://example.com/image.jpg",
                bio="I test recipes"
            )
            user.password_hash = "securepassword"
            db.session.add(user)
            db.session.commit()

            # Step 2: Create recipe linked to user
            recipe = Recipe(
                title="Chapati",
                instructions="Mix flour and water, knead to dough. Roll into circles and fry each side until golden.",
                minutes_to_complete=25,
                user_id=user.id  # ✅ FIX: Assign user_id
            )
            db.session.add(recipe)
            db.session.commit()

            #  Step 3: Assert values
            assert recipe.title == "Chapati"
            assert recipe.minutes_to_complete == 25
            assert recipe.user_id == user.id
            assert recipe.instructions.startswith("Mix flour")
            assert recipe in user.recipes
