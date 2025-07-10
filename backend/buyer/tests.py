from django.test import TestCase
from common.models import CustomUser
from .models import BuyerProfile

class BuyerProfileModelTest(TestCase):
    def test_create_buyer_profile(self):
        user = CustomUser.objects.create_user(email='buyer@example.com', password='testpass', user_type='buyer')
        profile = BuyerProfile.objects.create(user=user, preferences='Test preferences')
        self.assertEqual(profile.user.email, 'buyer@example.com')
        self.assertEqual(profile.preferences, 'Test preferences')
