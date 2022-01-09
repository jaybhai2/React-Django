
import time
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status

from .models import StockProfile, WatchList, Overview
from .serializers import StockProfileSerializer, AddToWatchListSerializer, WatchListSerializer, StockOverviewSerializer


# Create your views here.

def main(request):
    return HttpResponse("<h1>hello</h1>")

def timer(func):
    def wrapper(*args, **kwrags):
        t_start = time.time()
        func_return = func(*args, **kwrags)
        t_elapse = time.time() - t_start
        print(t_elapse)
        return func_return
    return wrapper



class StockProfileView(generics.ListAPIView):
    """
    List all stock profiles
    """
    queryset = StockProfile.objects.all()
    serializer_class = StockProfileSerializer 
    

class StockOverviewView(generics.ListAPIView):
    """
    List all stock profiles
    """
    queryset = Overview.objects.all()
    serializer_class = StockOverviewSerializer 
    


class GetStockProfile(APIView):
    serializer = StockProfileSerializer
    @timer
    def get(self, request, ticker):
        queryset = StockProfile.objects.filter(ticker=ticker)
        resultset = self.serializer(queryset, many=True)
        return Response(data=resultset.data)


class AddToWatchListView(APIView):

    serializer_class = AddToWatchListSerializer
    
    def post(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid(raise_exception=True):
           
            ticker = serializer.data.get('ticker').upper()
            highlighted = serializer.data.get('highlighted')

            queryset = WatchList.objects.filter(ticker=ticker)
            
            if queryset.exists():
                watchlist_item = queryset[0]
                watchlist_item.highlighted = highlighted
                watchlist_item.save(update_fields=['highlighted'])
                return Response(data=WatchListSerializer(watchlist_item).data, 
                                status=status.HTTP_200_OK)
            else:
                watchlist_item = WatchList(ticker=ticker)
                watchlist_item.save()
                return Response(data=WatchListSerializer(watchlist_item).data, 
                                status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        watchlist_objs = WatchList.objects.all()
        
        watchlist_serializer = WatchListSerializer(watchlist_objs, many=True)
        
        return Response(data=watchlist_serializer.data)
