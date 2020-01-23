import urllib.request
from bs4 import BeautifulSoup
# pip install urllib3 BeautifulSoup4
import json

link_dict = [
    {
        'Id': 0,
        'Title': 'politics',
        'Url': [],
    },
    {
        'Id': 1,
        'Title': 'economy',
        'Url': [],
    },
    {
        'Id': 2,
        'Title': 'society',
        'Url': [],
    },
    {
        'Id': 3,
        'Title': 'life/culture',
        'Url': [],
    },
    {
        'Id': 4,
        'Title': 'world',
        'Url': [],
    },
    {
        'Id': 5,
        'Title': 'science/IT',
        'Url': [],
    }
]
# link_dict = {}
# link_dict = {'politics':[], 'economy':[], 'society':[], 'life/culture':[], 'world':[], 'science/IT':[]}
link_list = [[] for _ in range(6)]

for url_num in range(6):
    category_url = f'https://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=10{url_num}'

    source_code = urllib.request.urlopen(category_url).read()
    parser_soup = BeautifulSoup(source_code, 'html.parser')
    news_atag = parser_soup.select('#main_content > div > div._persist > div:nth-child(1) > div > div.cluster_body > ul > li:nth-child(1) > div.cluster_text > a')

    tmp_list = []
    for news in news_atag:
        tmp_list.append(news.get('href'))
        link_dict[url_num]['Url'] = tmp_list

with open('link_file.json', 'w') as json_file:
    json.dump(link_dict, json_file)