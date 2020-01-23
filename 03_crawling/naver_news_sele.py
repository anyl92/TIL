from selenium import webdriver

driver = webdriver.Chrome('./chromedriver.exe')
driver.get(category_url)

def clickHeadLine(repeat):
    for _ in range(repeat):
        driver.find_element_by_xpath('/html/body/div[1]/table/tbody/tr/td[2]/div/div/div[2]/div[2]/div/a').click()
    crawling(driver)

def crawling(driver):
    crawling_results = []
    crawling_results.append(driver.find_element_by_xpath('/html/body/div[1]/table/tbody/tr/td[2]/div/div/div[2]/div[1]/div/div[1]/ul/li[1]/div[2]/a').text)
    print(crawling_results)
    return

clickHeadLine(2)

print(driver.find_element_by_xpath('//*[@id="main_content"]/div/div[2]/div[1]/div[1]/div[1]/ul/li[1]/div[2]/a').text)