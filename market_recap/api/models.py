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



class Overview(models.Model):
    ticker = models.TextField(db_column='Ticker', blank=True, null=True)  # Field name made lowercase.
    company = models.TextField(db_column='Company', blank=True, null=True)  # Field name made lowercase.
    sector = models.TextField(db_column='Sector', blank=True, null=True)  # Field name made lowercase.
    industry = models.TextField(db_column='Industry', blank=True, null=True)  # Field name made lowercase.
    country = models.TextField(db_column='Country', blank=True, null=True)  # Field name made lowercase.
    market_cap = models.TextField(db_column='Market_Cap', blank=True, null=True)  # Field name made lowercase.
    pe = models.TextField(db_column='PE', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    price = models.FloatField(db_column='Price', blank=True, null=True)  # Field name made lowercase.
    change = models.TextField(db_column='Change', blank=True, null=True)  # Field name made lowercase.
    volume = models.TextField(db_column='Volume', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'overview'


class Valuation(models.Model):
    no_field = models.IntegerField(db_column='No.', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.
    ticker = models.TextField(db_column='Ticker', blank=True, null=True)  # Field name made lowercase.
    market_cap = models.TextField(db_column='Market_Cap', blank=True, null=True)  # Field name made lowercase.
    p_e = models.TextField(db_column='P/E', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    fwd_p_e = models.TextField(db_column='Fwd_P/E', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    peg = models.TextField(db_column='PEG', blank=True, null=True)  # Field name made lowercase.
    p_s = models.TextField(db_column='P/S', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    p_b = models.TextField(db_column='P/B', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    p_c = models.TextField(db_column='P/C', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    p_fcf = models.TextField(db_column='P/FCF', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    eps_this_y = models.TextField(db_column='EPS_this_Y', blank=True, null=True)  # Field name made lowercase.
    eps_next_y = models.TextField(db_column='EPS_next_Y', blank=True, null=True)  # Field name made lowercase.
    eps_past_5y = models.TextField(db_column='EPS_past_5Y', blank=True, null=True)  # Field name made lowercase.
    eps_next_5y = models.TextField(db_column='EPS_next_5Y', blank=True, null=True)  # Field name made lowercase.
    sales_past_5y = models.TextField(db_column='Sales_past_5Y', blank=True, null=True)  # Field name made lowercase.
    price = models.FloatField(db_column='Price', blank=True, null=True)  # Field name made lowercase.
    change = models.TextField(db_column='Change', blank=True, null=True)  # Field name made lowercase.
    volume = models.TextField(db_column='Volume', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'valuation'
        