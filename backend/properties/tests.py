from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import Property, PropertyImage, SavedProperty
from common.models import CustomUser
from PIL import Image
import tempfile

class PropertyAPITest(APITestCase):
    def setUp(self):
        self.seller = CustomUser.objects.create_user(username='seller', password='pass', user_type='seller')
        self.buyer = CustomUser.objects.create_user(username='buyer', password='pass', user_type='buyer')
        self.property = Property.objects.create(
            title='Test Property',
            description='A nice place',
            price=100000,
            property_type='house',
            bedrooms=3,
            bathrooms=2,
            area=1200,
            address='123 Main St',
            city='Testville',
            state='TS',
            zip_code='12345',
            seller=self.seller
        )
        self.client = APIClient()

    def authenticate(self, user):
        url = reverse('login')
        resp = self.client.post(url, {'username': user.username, 'password': 'pass'})
        self.assertEqual(resp.status_code, 200)
        token = resp.data['data']['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

    def get_test_image(self, format='JPEG', size=(100, 100)):
        image = Image.new('RGB', size)
        tmp_file = tempfile.NamedTemporaryFile(suffix='.jpg')
        image.save(tmp_file, format)
        tmp_file.seek(0)
        return SimpleUploadedFile(tmp_file.name, tmp_file.read(), content_type='image/jpeg')

    def test_property_list(self):
        url = reverse('property-list')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        self.assertIn('results', resp.data)

    def test_property_create_permission(self):
        url = reverse('property-list')
        data = {
            'title': 'New Property',
            'description': 'Desc',
            'price': 50000,
            'property_type': 'apartment',
            'bedrooms': 2,
            'bathrooms': 1,
            'area': 800,
            'address': '456 Side St',
            'city': 'Testville',
            'state': 'TS',
            'zip_code': '54321',
        }
        # Unauthenticated
        resp = self.client.post(url, data)
        self.assertEqual(resp.status_code, 401)
        # Authenticated as buyer
        self.authenticate(self.buyer)
        resp = self.client.post(url, data)
        self.assertEqual(resp.status_code, 403)
        # Authenticated as seller
        self.authenticate(self.seller)
        resp = self.client.post(url, data)
        self.assertEqual(resp.status_code, 201)

    def test_property_create_with_features_negotiable(self):
        self.authenticate(self.seller)
        url = reverse('property-list')
        data = {
            'title': 'Feature Test',
            'description': 'With features',
            'price': 123456,
            'property_type': 'house',
            'beds': 4,
            'baths': 2.5,
            'sqft': 2000,
            'address': '789 New St',
            'city': 'Testville',
            'state': 'TS',
            'zip_code': '99999',
            'negotiable': True,
            'features': {"swimmingPool": True, "gym": False}
        }
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, 201)
        self.assertTrue(resp.data['id'])
        self.assertEqual(resp.data['negotiable'], True)
        self.assertIn('features', resp.data)
        self.assertEqual(resp.data['features']['swimmingPool'], True)

    def test_property_image_upload(self):
        self.authenticate(self.seller)
        url = reverse('property-upload-images', args=[self.property.id])
        img = self.get_test_image(size=(2000, 2000))
        resp = self.client.post(url, {'images': [img]}, format='multipart')
        self.assertEqual(resp.status_code, 201)
        self.assertTrue(resp.data['success'])
        self.assertTrue(len(resp.data['data']) > 0)

    def test_save_unsave_property(self):
        self.authenticate(self.buyer)
        url = reverse('property-save', args=[self.property.id])
        resp = self.client.post(url)
        self.assertEqual(resp.status_code, 200)
        self.assertIn('Property saved', resp.data['message'])
        # Unsave
        resp = self.client.post(url)
        self.assertIn('Property unsaved', resp.data['message'])

    def test_search_properties(self):
        url = reverse('property-search')
        resp = self.client.get(url, {'city': 'Testville'})
        self.assertEqual(resp.status_code, 200)
        self.assertIn('results', resp.data)
