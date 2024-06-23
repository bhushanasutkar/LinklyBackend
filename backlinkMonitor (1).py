import mysql.connector
import requests
import json
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from slugify import slugify
import re

mydb = mysql.connector.connect(
    host='localhost',
    user='root',
    password='root',
    port='3304',
    database='backlink_marketplace'
)

mycursor = mydb.cursor()
query = "SELECT l.Id, l.OrderId, l.checked_on, l.status, u.source_link, u.target_link FROM linkmonitor l, user_link_table u WHERE l.OrderId = u.order_id AND DATEDIFF(CURDATE(), l.checked_on) > 7 GROUP BY l.OrderID;"

mycursor.execute('select source_link, target_link from user_link_table;')

linktable = mycursor.fetchall()

print(linktable)

for index, row in linktable:#get the responses
    try:
        source_link = row[0]
        req = requests.get(source_link)
        soup = BeautifulSoup(req.text, 'lxml')
        for link in soup.find_all('a'):
            source_link = (link.get('href'))
        url_list = []
        count = 0
        for index, row in linktable:
            try:
                target_link = row[1]
                req = requests.get(target_link)
                soup = BeautifulSoup(req.text, 'lxml')
                for link in soup.find_all('a'):
                    target_link = (link.get('href'))
                try:
                    if source_link in target_link["href"] or "http" not in target_link["href"]:
                        pass
                    else:
                        url_list.append([source_link, link["href"]])
                except:
                    pass
            except:
                pass

        print(url_list)
    except:
        pass

