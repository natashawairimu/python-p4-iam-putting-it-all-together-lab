# server/testing/models_testing/recipe_test.py

import pytest


from app import app
from models import db, User, Recipe

class TestRecipeModel:

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
            #  Step 1: Create user first
            user = User(
                username="chefkenya",
                image_url="https://example.com/image.png",
                bio="I love cooking Kenyan food"
            )
            user.password_hash = "secret123"
            db.session.add(user)
            db.session.commit()

            #  Step 2: Create recipe with valid user_id
            recipe = Recipe(
                title="Ugali",
                instructions="Boil water. Add maize flour gradually while stirring to avoid lumps. Cook until firm.",
                minutes_to_complete=20,
                user_id=user.id  #  Critical fix
            )
            db.session.add(recipe)
            db.session.commit()

            assert recipe.title == "Ugali"
            assert recipe.minutes_to_complete == 20
            assert recipe.user_id == user.id
