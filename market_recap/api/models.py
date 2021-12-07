import random
import string
from django.db import models



# Create your models here.
def generate_uid():
    length = 8
    while True:
        uid = ''.join(random.choices(string.ascii_uppercase, k = length))
        if StockProfile.objects.filter(uid=uid).count() == 0:
    
            break
    return uid

class WatchList(models.Model):
    uid = models.CharField(max_length=8, default=generate_uid, unique=True)
    ticker = models.CharField(max_length=5, default="", unique=True)
    highlighted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class StockProfile(models.Model):
    ticker = models.CharField(max_length=5, unique=False, null=False)
    company = models.CharField(max_length=126, null=True, unique=False)
    sector = models.CharField(max_length=126, null=True)
    industry = models.CharField(max_length=126, null=True)
    country = models.CharField(max_length=64, null=True)
    market_cap = models.FloatField(null=True)
    pe = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    volume = models.IntegerField(null=True)
    closing_date = models.DateField(null=True)



