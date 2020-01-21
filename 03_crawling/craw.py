import urllib.request
from bs4 import BeautifulSoup

def main():
    url = 'https://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=100'

    source_code = urllib.request.urlopen(url).read()
    soup = BeautifulSoup(source_code, 'html.parser')
    # print(soup)
    # tmp = soup.find_all('div', class_='hdline_article_tit')

    list_title = []
    for news in soup.find_all('li', class_='cluster_item', limit=1):
        list_title.append(news)
    # print(list_title)

    atag = soup.find_all('a', class_='cluster_text_headline nclicks(cls_pol.clsart)')
    ctag = soup.find_all('div', class_='cluster_text_lede')
    print(ctag)
    for a in atag:
        print(a)
        print('link: ', a['href'])
        print('title: ', a.text)
        print('content: ', )


    # tmp = soup.find_all('div', class_='cluster_body')  #['href']
    # tmp2 = soup.find_all('a', class_='href')
    # print(tmp2)
    # for content in tmp2:
    #     print(content['href'])
    # print(tmp)

    # print(soup.select('#main_content > div > div._persist > div:nth-child(1) > div:nth-child(1) > div.cluster_body > ul > li:nth-child(1) > div.cluster_text > a'))

    # print(soup.body.wrap.ek.states())

    list_title = []
    list_content = []

    for news_title in soup.find_all('div', class_='cluster_text_headline nclicks(cls_pol.clsart)'):
        list_title.append(news_title.get_text())

    for news_content in soup.find_all('p', class_='cluster_text_lede'):
        list_content.append(news_content.get_text())

    # print(list_title)
    # print(list_content)
    # return

if __name__ == '__main__':
    main()