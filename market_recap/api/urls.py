
from django.urls import path
from .views import main, StockProfileView, AddToWatchListView, GetStockProfile, StockOverviewView



urlpatterns = [
    path('hello/', main),
    path('stock/', StockProfileView.as_view()),
    path('stock/<str:ticker>', GetStockProfile.as_view()),
    path('overview/', StockOverviewView.as_view()),
    path('watchlist/', AddToWatchListView.as_view()),

]
