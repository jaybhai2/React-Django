from types import prepare_class
import unittest
import os
import json
from s3io import S3IO
import warnings
# python -m unittest --help
# python -m unittest discover -v -s s3io -p test_s3io.py -k test_list_bucket


class MyTestCase(unittest.TestCase):

    def setUp(self) -> None:
        self.dir_path = os.path.dirname(os.path.realpath(__file__))
        self.s3 = S3IO()

        self.test_bucket = 'jay-buckets'
        self.test_data_file = 'data.csv'
        
        warnings.filterwarnings("ignore", category=ResourceWarning, message="unclosed.*<ssl.SSLSocket.*>") 
       

    def test_create_bucket(self):
        res = self.s3.create_bucket(bucket=self.test_bucket)
        self.assertEqual(True, res)


    def test_list_bucket(self):
        r = self.s3.list_bucket()
        is_created = self.test_bucket in r
        self.assertEqual(True, is_created)


    def test_upload_file(self):
        r = self.s3.upload_file(os.path.join(self.dir_path, self.test_data_file), bucket=self.test_bucket)
        self.assertEqual(True, r)
    
    def test_put_object(self):
        r = self.s3.put_object(content=['hello from test_put_object'], bucket=self.test_bucket, key=self.test_data_file)
        self.assertEqual(True, r)

    def test_read_object(self):
        data = self.s3.read_object(bucket=self.test_bucket, key = self.test_data_file)
        self.assertEqual(data, '["hello from test_put_object"]')


    def test_list_objects(self):
        objs = self.s3.list_objects(bucket=self.test_bucket)
        print(objs)

    def test_list_folders(self):
        dirs = self.s3.list_folders(bucket=self.test_bucket)
        print(dirs)


if __name__ == '__main__':
    unittest.main()