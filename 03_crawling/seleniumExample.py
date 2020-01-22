from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

chromedriver = 'C:/gitlab/chromedriver.exe' 
driver = webdriver.Chrome(chromedriver)

# driver.get("https://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=100")

title = driver.find_element_by_class_name('cluster_text')
# elem = driver.find_element_by_xpath('//div[@class=cluster_body]'/div[@class=])
print(title)