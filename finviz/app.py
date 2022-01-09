#!/usr/bin/python3
from datetime import date
import os
from s3io.s3io import S3IO

from finviz.screener import Screener
from time import sleep
import logging
import traceback
import re

def main():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    # YYmmdd
    date_str = date.today().strftime("%Y%m%d")

    log_dir = os.path.join(dir_path, 'logs/')
    os.makedirs(log_dir, exist_ok=True)

    logging.basicConfig(filename=f'{log_dir}{date_str}.log', level=logging.INFO, format='%(levelname)s | %(name)s | %(asctime)s | %(message)s')


    filters = ['idx_dji'] 

    table_types = ["Overview", "Valuation", "Financial", "Performance", "Technical",
                    "Custom", "Ownership",]

    
    s3 = S3IO()

    for table in table_types:
 
        logging.info(f"Screening {table}...")

        stock_list = Screener(filters=filters, order="ticker", table=table)

        file_name = f'{dir_path}/data/{table}/{table}_{date_str}'

        os.makedirs(os.path.dirname(file_name), exist_ok=True)

        # Export the screener results to CSV file
        stock_list.to_csv(f"{file_name}.csv")

        s3.put_object(content=stock_list.data,  bucket='finviz-ingest', key=file_name + '.json')

        logging.info(f"{file_name} extracted")

        sleep(1)

if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        logging.error(traceback.format_exc())
