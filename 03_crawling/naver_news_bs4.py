import urllib.request
from bs4 import BeautifulSoup
# pip install urllib3 BeautifulSoup4
import json
import datetime

link_dict = [
    {
        'Id': 'politics',
        'Url': [],
    },
    {
        'Id': 'economy',
        'Url': [],
    },
    {
        'Id': 'society',
        'Url': [],
    },
    {
        'Id': 'life/culture',
        'Url': [],
    },
    {
        'Id': 'world',
        'Url': [],
    },
    {
        'Id': 'science/IT',
        'Url': [],
    },
    {
        'Id': 'entertainments',
        'Url': [],
    },
    {
        'Id': 'sports',
        'Url': [],
    },
]

# link_dict = {}
# link_dict = {'politics':[], 'economy':[], 'society':[], 'life/culture':[], 'world':[], 'science/IT':[]}
# link_list = [[] for _ in range(6)]

for url_num in range(6):
    category_url = f'https://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=10{url_num}'

    source_code = urllib.request.urlopen(category_url).read()
    parser_soup = BeautifulSoup(source_code, 'html.parser')
    news_atag = parser_soup.select('#main_content > div > div._persist > div:nth-child(1) > div > div.cluster_body > ul > li:nth-child(1) > div.cluster_text > a')

    tmp_list = []
    for news in news_atag:
        tmp_list.append(news.get('href'))
        link_dict[url_num]['Url'] = tmp_list

# 연예
enter_url = 'https://entertain.naver.com'
enter_code = urllib.request.urlopen(f'{enter_url}/home').read()
enter_parser = BeautifulSoup(enter_code, 'html.parser')
enter_atag = enter_parser.select('#ranking_news > div > div.rank_lst > ul > li > a')

tmp_list = []
for enter in enter_atag:
    tmp_list.append(enter_url + enter.get('href'))
    link_dict[6]['Url'] = tmp_list 

# 스포츠
sport_url = 'https://sports.news.naver.com/'
sport_code = urllib.request.urlopen(f'{sport_url}ranking/index.nhn').read()
sport_parser = BeautifulSoup(sport_code, 'html.parser')
sport_atag = sport_parser.select('#news_best > div.aside_rank_news > ul > li > a')

tmp_list = []
for sport in sport_atag:
    tmp_list.append(sport_url + sport.get('href'))
    link_dict[7]['Url'] = tmp_list

dt = datetime.datetime.now()
dt = dt.strftime('%Y%m%d%H%M%S')

# with open(f'{dt}.json', 'w') as json_file:
#     json.dump(link_dict, json_file)
