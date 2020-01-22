import urllib.request
from bs4 import BeautifulSoup
from selenium import webdriver
# pip install urllib3 BeautifulSoup4 selenium

category_url = 'https://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=100'

driver = webdriver.Chrome('./chromedriver.exe')
driver.get(category_url)

def clickHeadLine(repeat):
    for _ in range(repeat):
        driver.find_element_by_xpath('//*[@id="main_content"]/div/div[2]/div[2]/div/a').click()
    crawling(driver)
    # news = driver.find_element_by_xpath('//*[@id="main_content"]/div/div[2]/div[1]/div[1]/div[1]/ul/li[1]/div[2]/a').text
    # print(news)

def crawling(driver):
    crawling_results = []
    crawling_results.append(driver.find_element_by_xpath('/html/body/div[1]/table/tbody/tr/td[2]/div/div/div[2]/div[1]'))
    print(crawling_results)
    return
    
clickHeadLine(3)

# print(driver.find_element_by_xpath('//*[@id="main_content"]/div/div[2]/div[1]/div[1]/div[1]/ul/li[1]/div[2]/a').text)


# source_code = urllib.request.urlopen(category_url).read()
# parser_soup = BeautifulSoup(source_code, 'html.parser')
# news_atag = parser_soup.select('#main_content > div > div._persist > div:nth-child(1) > div > div.cluster_body > ul > li:nth-child(1) > div.cluster_text > a')
# print(news_atag)
