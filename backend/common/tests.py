from django.test import TestCase
from .models import CustomUser
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from django.http import request
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from common.models import CustomUser

class CustomUserModelTest(TestCase):
    def test_create_user(self):
        user = CustomUser.objects.create_user(email='test@example.com', password='testpass', user_type='buyer')
        self.assertEqual(user.email, 'test@example.com')
        self.assertTrue(user.check_password('testpass')) 

class AuthAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(username='testuser', password='testpass', user_type='buyer')

    def test_register(self):
        url = reverse('register')
        data = {
            'username': 'newuser',
            'password': 'newpass123',
            'user_type': 'buyer',
            'phone': '1234567890'
        }
        resp = self.client.post(url, data)
        self.assertEqual(resp.status_code, 201)
        self.assertTrue(resp.data['success'])
        self.assertEqual(resp.data['data']['username'], 'newuser')

    def test_login(self):
        url = reverse('login')
        resp = self.client.post(url, {'username': 'testuser', 'password': 'testpass'})
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(resp.data['success'])
        self.assertIn('access', resp.data['data'])
        self.token = resp.data['data']['access']

    def authenticate(self):
        url = reverse('login')
        resp = self.client.post(url, {'username': 'testuser', 'password': 'testpass'})
        token = resp.data['data']['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

    def test_profile_get_update(self):
        self.authenticate()
        url = reverse('user_profile')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(resp.data['success'])
        # Update
        resp = self.client.put(url, {'phone': '9999999999'})
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['data']['phone'], '9999999999')

    def test_change_password(self):
        self.authenticate()
        url = reverse('change_password')
        data = {'old_password': 'testpass', 'new_password': 'newpass456'}
        resp = self.client.post(url, data)
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(resp.data['success'])
        # Try login with new password
        resp = self.client.post(reverse('login'), {'username': 'testuser', 'password': 'newpass456'})
        self.assertEqual(resp.status_code, 200)

    def test_logout(self):
        url = reverse('login')
        resp = self.client.post(url, {'username': 'testuser', 'password': 'testpass'})
        refresh = resp.data['data']['refresh']
        access = resp.data['data']['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        url = reverse('logout')
        resp = self.client.post(url, {'refresh': refresh})
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(resp.data['success'])

    def test_token_refresh(self):
        url = reverse('login')
        resp = self.client.post(url, {'username': 'testuser', 'password': 'testpass'})
        refresh = resp.data['data']['refresh']
        url = reverse('token_refresh')
        resp = self.client.post(url, {'refresh': refresh})
        self.assertEqual(resp.status_code, 200)
        self.assertIn('access', resp.data) 