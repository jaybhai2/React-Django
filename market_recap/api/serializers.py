
from rest_framework import serializers
from .models import StockProfile, WatchList


class StockProfileSerializer(serializers.ModelSerializer):
    """
    """
    class Meta:
        model = StockProfile
        fields = '__all__' #[f.name for f in StockProfile._meta.get_fields()]
        #fields = ('id', 'uid', 'ticker')



class AddToWatchListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WatchList
        fields = ('ticker', 'highlighted')
        extra_kwargs = {
            'ticker': {'validators': [], 'required': True},
        }

class WatchListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WatchList
        fields = '__all__'
        