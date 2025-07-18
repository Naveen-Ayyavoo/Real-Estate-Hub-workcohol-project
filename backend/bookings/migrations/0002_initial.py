# Generated by Django 5.2.4 on 2025-07-13 07:02

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bookings', '0001_initial'),
        ('properties', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='favorite',
            name='property',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='favorited_by', to='properties.property'),
        ),
        migrations.AddField(
            model_name='favorite',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='favorites', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='inquiry',
            name='property',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inquiries', to='properties.property'),
        ),
        migrations.AddField(
            model_name='inquiry',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inquiries', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='purchase',
            name='buyer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='purchases', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='purchase',
            name='property',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='purchases', to='properties.property'),
        ),
        migrations.AlterUniqueTogether(
            name='favorite',
            unique_together={('user', 'property')},
        ),
        migrations.AlterUniqueTogether(
            name='purchase',
            unique_together={('buyer', 'property')},
        ),
    ]
